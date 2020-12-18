import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Icon, Label, Menu, Table } from 'semantic-ui-react'
import { url } from '../env.json'
const moment = require('moment')
const axios = require('axios');
const miscompras = ({ auth }) => {
    const [compras, setcompras] = useState([])
    const [mostrarDetallado, setmostrarDetallado] = useState(false)
    const [itemcarro, setitemcarro] = useState([])
    useEffect(() => {
        if (auth.id) {
            mostrarmiscompras(auth.id)

        }

    }, [auth.id]);
    const mostrarmiscompras = async (id) => {
        let { API_LOGIN } = url
        let datos = {
            id
        }
        await axios.post(API_LOGIN + 'carrito/vercompras', datos)
            .then(async res => {
                let datos = JSON.parse(res.data.datos)
                setcompras(datos)
            })
            .catch(async err => {
                console.log(err)
            })
    }
    const verdatalladocompra = async (id) => {
        let { API_LOGIN } = url
        await axios.get(API_LOGIN + 'carrito/vercompradetallado/' + id)
            .then(async res => {
                let { dato } = res.data
                await setitemcarro(dato)
                setmostrarDetallado(true)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div style={{ width: '900px', justifyContent: 'center!important' }} className="container mt-2">
            <Form>
                {!mostrarDetallado ?
                    <div className="col-md-12 mt-4">
                        <Table celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell><Icon name="shop" /></Table.HeaderCell>
                                    <Table.HeaderCell>Fecha <Icon name="calendar alternate" /></Table.HeaderCell>
                                    <Table.HeaderCell>Monto <Icon name="money" /></Table.HeaderCell>
                                    <Table.HeaderCell>Ver <Icon name="archive" /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {compras.map((obj, key) =>
                                    <Table.Row key={key || ""}>
                                        <Table.Cell collapsing>
                                            {key + 1}
                                        </Table.Cell>
                                        <Table.Cell>{moment(obj.updated_at).format('DD-MM-YYYY,  h:mm a') || ""}</Table.Cell>
                                        <Table.Cell >
                                            S/ {parseFloat(obj.total || "", 10).toFixed(2)}
                                        </Table.Cell >
                                        <Table.Cell collapsing textAlign="center"><Button onClick={(e) => { verdatalladocompra(obj.id) }} textAlign="center" compact icon><Icon name="eye" /></Button></Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                    :
                    <div className="col-md-12 mt-4">
                        <Table celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell><Icon name="shop" /></Table.HeaderCell>
                                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                                    <Table.HeaderCell>Precio</Table.HeaderCell>
                                    <Table.HeaderCell>Cantidad</Table.HeaderCell>
                                    <Table.HeaderCell>SubTotal</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    itemcarro.map(
                                        (obj, key) =>
                                            <Table.Row>

                                                <Table.Cell collapsing>{key + 1}</Table.Cell>
                                                <Table.Cell>{obj.name}</Table.Cell>
                                                <Table.Cell>{parseFloat(obj.precio, 10).toFixed(2)}</Table.Cell>
                                                <Table.Cell>{obj.cantidad}</Table.Cell>
                                                <Table.Cell>{parseFloat(obj.subtotal, 10).toFixed(2)}</Table.Cell>
                                                <Table.Cell>{obj.description}</Table.Cell>
                                            </Table.Row>
                                    )

                                }
                            </Table.Body>

                        </Table>
                    </div>

                }
            </Form>
        </div>
    );
}

export default miscompras;
