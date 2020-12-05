import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Button, Card, Image, Dimmer, Loader } from 'semantic-ui-react'
import ShowProductoUnique from '../components/showproductounique';
const axios = require('axios');

import { url } from '../env'
import { compareSync } from 'bcryptjs';


const show = ({ auth }) => {
    const [actived, setactived] = useState(true);
    const [allProducto, setallProducto] = useState([])
    const [carrito, setcarrito] = useState([]);
    const [agregando, setagregando] = useState(false);
    let carritolocal = []
    let tmp = {}
    // const [allProductoCliente, setallProductoCliente] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setactived(false)
            // console.log(localStorage.getItem('carrito'), '<<<<')

        }, 500)
        // console.log(auth)
        carritolocalstorage()



        validar()

    }, [auth.isadmin]);
    useEffect(() => {

        if (agregando) {
            localStorage.setItem('carrito', JSON.stringify(carrito))
            setagregando(false)
        }

    }, [agregando]);

    const validar = async () => {

        await auth.isadmin == 1 ?
            await getAllProducto()
            :
            await getAllProductoCliente()
    }
    const carritolocalstorage = async () => {
        carritolocal = await JSON.parse(localStorage.getItem('carrito'));
        await carritolocal ? setcarrito(carritolocal) : localStorage.setItem('carrito', JSON.stringify(carrito))

    }
    const getAllProducto = async () => {
        const { API_LOGIN } = url;
        await axios.get(API_LOGIN + "getAllProducto")
            .then(async (res) => {
                let data = res.data.datos
                // console.log(res)
                setallProducto(data)
                // console.log(data)
            })
            .catch(async (err) => {
                console.log(err)
            })
    }
    const getAllProductoCliente = async () => {
        const { API_LOGIN } = url;
        await axios.get(API_LOGIN + "getAllProductoCliente")
            .then(async (res) => {
                let data = res.data.datos
                // console.log(data)
                setallProducto(data)
                // console.log(data)
            })
            .catch(async (err) => {
                console.log(err)
            })
    }
    const agregaralcarrito = async ({ id, precio, name }) => {
    
        const auth_id = auth.id
        if (auth_id == null) {
            // console.log('entrando')
            tmp = await {
                id_equipo: id,
                name: name,
                cantidad: 1,
                subtotal: precio,
                total: precio
            }
            await setcarrito([await tmp, ...carrito])
            localStorage.setItem('carrito', JSON.stringify(carrito))
            await setagregando(true)
         
            await Swal.fire({ icon: 'success', text: `${name} agregado al carrito` })
        }

        // localStorage.setItem('iduser', auth_id || null)
        // console.log(auth_id || null)
    }
    return (
        <div>{
            actived ?

                <Dimmer active inverted>
                    <Loader size="small" />
                </Dimmer>

                :



                < Card.Group className="mt-2 ml-2 mr-2 mb-2" centered>
                    {allProducto.map((obj, k) =>

                        <ShowProductoUnique
                            key={k}
                            obj={obj}
                            auth={auth}
                            agregaralcarrito={agregaralcarrito}
                        />
                    )}
                </Card.Group>

            // <Aea mensaje={'Usted no esta authenticado '} iconi={'user secret'} />

        }

        </div >
    );
}

export default show;
