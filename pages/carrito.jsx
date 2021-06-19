import React, { Fragment, useEffect, useState } from 'react';
import { Icon, Label, Menu, Table, Card, Header, Button, Input, TableCell, Message } from 'semantic-ui-react'
import Router from 'next/router';
import Swal from 'sweetalert2';
import Show from '../components/Show'
const axios = require('axios');
import { url } from '../env'



const carrito = ({ isLogging, auth }) => {
    const [migrated, setmigrated] = useState(false)
    const [carrito, setcarrito] = useState([]);
    const [totalCarrito, setTotalCarrito] = useState(0)
    const validarLogin = async () => {
        if (isLogging) {
            // traetDatosLocalStorage(),

            await traerDatosBD(auth.id)

            await crearCarrito()

        } else {

            traetDatosLocalStorage()

        }
    }


    useEffect(async () => {
        await validarLogin(),
            await calcularTotal()
    }, [isLogging]);
    useEffect(() => {

    }, [totalCarrito]);

    const traerDatosBD = async (id) => {
        let { API_LOGIN } = url;
        await axios.get(API_LOGIN + 'carrito/show/' + id)
            .then(async res => {

                await setcarrito(res.data.datos)
                let aea = res.data.datos
                let tota = 0
                await aea.map(async obj => tota = tota + obj.subtotal)
                setTotalCarrito(tota)

            })
            .catch(err => {
                console.log(err)
            })
    }

    const traetDatosLocalStorage = () => {
        let carr = JSON.parse(localStorage.getItem('carrito'))
        // if (carr.lenght>=0) console.log('no hay datos')
        setcarrito(carr || [])
    }
    const crearCarrito = async () => {

        let carr = await JSON.parse(localStorage.getItem('carrito'))

        // console.log(carr)
        let { API_LOGIN } = url;
        let carrito = {
            total: 0,
            user_id: auth.id
        }
        await axios.post(API_LOGIN + 'carrito/crear', carrito)
            .then(async res => {
                let { id } = res.data.dat

                await llenarCarrito(id, carr)
                await traerDatosBD(auth.id)
            }).catch(async err => {
                console.log(err)
            })
    }
    const llenarCarrito = async (id, datos) => {
        let { API_LOGIN } = url;
        await axios.post(API_LOGIN + 'carrito/llenarproducto/' + id, datos)
            .then(res => {
                // console.log(res.data)
                localStorage.removeItem('carrito')
                setmigrated(true)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const llenarDatosLocalStorgare = (tmp_carr) => {
        localStorage.setItem('carrito', JSON.stringify(tmp_carr))
    }
    const add = async (k) => {
        if (isLogging) {
            let { API_LOGIN } = url;
            // console.log(carrito[k].id)
            let dat = {
                option: 'add'
            }
            await axios.post(API_LOGIN + 'carrito/editar/' + carrito[k].id, dat)
                .then(async res => {

                    let { success, message } = res.data
                    await traerDatosBD(auth.id)

                    if (!success) throw new Error(JSON.stringify(message))
                })
                .catch(async err => {

                    await Swal.fire({ icon: 'info', text: err.message })
                })
        } else {
            let tmp_carr = carrito
            if (tmp_carr[k].cantidad < 5) {
                tmp_carr[k] = await {
                    ...tmp_carr[k],
                    cantidad: tmp_carr[k].cantidad + 1,
                    total: tmp_carr[k].subtotal * (await tmp_carr[k].cantidad + 1)
                }
                await llenarDatosLocalStorgare(tmp_carr)
                traetDatosLocalStorage()
                calcularTotal()

            } else {

                Swal.fire({ icon: 'info', text: 'La cantidad maxima es 5', title: 'Limite Excedido' })
            }
        }

    }
    const minus = async (k) => {
        if (isLogging) {
            let { API_LOGIN } = url;
            // console.log(carrito[k].id)
            let dat = {
                option: 'minus'
            }
            await axios.post(API_LOGIN + 'carrito/editar/' + carrito[k].id, dat)
                .then(async res => {
                    let { success, message } = res.data
                    await traerDatosBD(auth.id)
                    if (!success) throw new Error(JSON.stringify(message))

                })
                .catch(async err => {

                    await Swal.fire({ icon: 'info', text: err.message })
                })
        } else {
            let tmp_carr = carrito
            if (tmp_carr[k].cantidad > 1) {
                tmp_carr[k] = await {
                    ...tmp_carr[k],
                    cantidad: tmp_carr[k].cantidad - 1,
                    total: tmp_carr[k].subtotal * (await tmp_carr[k].cantidad - 1)
                };
                await llenarDatosLocalStorgare(tmp_carr)
                traetDatosLocalStorage()
                await calcularTotal()

            }

            else {
                Swal.fire({ icon: 'info', text: 'La cantidad minima es 1' })
            }
        }
    }
    const deleted = async (k) => {
        if (isLogging) {
            let { API_LOGIN } = url;
            // console.log(carrito[k].id)
            let dat = {
                option: 'delete'
            }
            await axios.post(API_LOGIN + 'carrito/editar/' + carrito[k].id, dat)
                .then(async res => {
                    let { success, message } = res.data
                    await traerDatosBD(auth.id)
                    await Swal.fire({ icon: 'success', text: message })
                    if (!success) throw new Error(JSON.stringify(message))

                })
                .catch(async err => {

                    await Swal.fire({ icon: 'info', text: err.message })
                })
        } else {
            let tmp_carr = carrito;
            //filter for k
            let aea = await tmp_carr.filter((img, i) => i !== k)
            setcarrito(aea)
            await llenarDatosLocalStorgare(aea)

            await calcularTotal()

        }
    }
    const calcularTotal = async () => {
        if (isLogging) {
            let carr = carrito;
            // console.log(carr)
            // let total = carrito.map((a, b) => a + b, 0)
            // setTotalCarrito(await total.reduce((a, b) => a + b, 0))
            // console.log(total)
        } else {
            let carr = await JSON.parse(localStorage.getItem('carrito'))
            if (carr) {
                let total = carr.map(obj => obj.total)
                setTotalCarrito(await total.reduce((a, b) => a + b, 0))
            }
        }

    }
    // const pagarelcarrito = async () => {
    //     // let { API_LOGIN } = url;
    //     let { push } = Router;
    // await axios.get(API_LOGIN + 'carrito/obtenerdatosdelcarrito/' + auth.id)
    //     .then(async (res) => {
    //         let { datos } = res.data
    //         console.log(datos)
    // push({ pathname: '/pagar' })
    //     })
    //             .catch (async (err) => {
    //     console.log(err)
    // })
    // }

    return (
        <div style={{ width: '900px', justifyContent: 'center!important' }} className="container mt-2">

            { carrito.length == 0 ?

                <Message
                    className="mt-3"
                    icon='shop'
                    header='El carrito esta vacio!!'
                    content='Agregue algun producto a su carrito de compras'

                />
                :
                <Table   >

                    {/* <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing="2" >Tu Carrito <i className="fas fa-shopping-cart mr-2"></i></Table.HeaderCell>
                    </Table.Row>
                </Table.Header> */}
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Equipo</Table.HeaderCell>
                            <Table.HeaderCell>Cantidad</Table.HeaderCell>
                            <Table.HeaderCell>Opciones</Table.HeaderCell>
                            <Table.HeaderCell>SubTotal</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        {carrito.map((obj, k) =>
                            <Table.Row key={k}>
                                <Table.Cell>
                                    <Header as='h4' image>
                                        {/* <Image src='/images/avatar/small/lena.png' rounded size='mini' /> */}
                                        <Header.Content>
                                            Nombre del Equipo : <span className="badge badge-primary">{obj.name}</span>
                                            <Header.Subheader>Id Equipo : {obj.id_equipo}</Header.Subheader>
                                        </Header.Content>
                                    </Header>

                                </Table.Cell>
                                <Table.Cell><Input style={{ border: '2px solid #3b5998', borderRadius: '4px', color: 'black' }} type="text" value={obj.cantidad || ""} name="cantidad" readOnly={true} /></Table.Cell>
                                <Table.Cell>
                                    <Button icon color="green" basic onClick={(e) => add(k)} ><Icon name="add" /></Button>
                                    <Button icon color="orange" basic onClick={(e) => minus(k)} ><Icon name="minus" /></Button>
                                    <Button icon color="red" basic onClick={(e) => deleted(k)}><Icon name="delete" /></Button>
                                </Table.Cell>
                                <Table.Cell style={{ textAlign: "right" }} ><h5><span className="badge badge-info mr-4">S/ {parseFloat(obj.total || obj.subtotal, 10).toFixed(2)}</span></h5></Table.Cell>
                                {/* <Table.Cell><Button color="red">Eliminar</Button></Table.Cell> */}
                            </Table.Row>
                        )}



                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Menu floated='right' pagination>
                                    {isLogging ?
                                        <Menu.Item as='a'
                                            onClick={() => {
                                                Router.push('/pagar')
                                            }}
                                        ><Icon name="shopping bag" /> Comprar</Menu.Item>
                                        :
                                        <Menu.Item as='a' onClick={(e) => {
                                            e.preventDefault()
                                            Router.push('/login')
                                        }}>Inice Sesión</Menu.Item>
                                    }
                                    <Menu.Item >Total: <h5><span className="badge badge-info mb-2">S/ {parseFloat(totalCarrito, 10).toFixed(2)}</span></h5></Menu.Item>



                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            }</div >
    );
}

export default carrito;
