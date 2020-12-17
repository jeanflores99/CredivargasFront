import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import Swal from 'sweetalert2';
import { url } from '../env'
import Router from 'next/router';
const axios = require('axios');
const VerificarDatosCard = ({ auth, carrito, setpass, pass, setcomplete, complete, totalCarrito }) => {

    const [card, setcard] = useState({
        titularname: auth.first_name + " " + auth.last_name,
        codigo: '',
        expirate: '',
        code: ''



    });
    useEffect(() => {
        validar()
    }, [card]);
    const [error, seteerror] = useState(true)
    const handleInput = async ({ name, value }) => {



        if (name == "expirate") {
            let dato = ""
            let regex = new RegExp("^[0-9/ ]+$");
            if (regex.test(value)) {
                if (value.length <= 7) {
                    if (value.length >= 2 && value.length < 3) {
                        dato = value + "/"
                        setcard({ ...card, [name]: dato })

                    } else {

                        setcard({ ...card, [name]: value })

                    }

                }

            }

        }

        else if (name == "codigo") {


            if (value.length <= 16) {

                // console.log(value)
                setcard({ ...card, [name]: value })



            }



        }
        else if (name == "code") {
            if (value.length <= 3) {
                setcard({ ...card, [name]: value })


            }
        }

        else {
            setcard({ ...card, [name]: value })

        }


    }
    const validar = async () => {
        if (card.titularname.length >= 5 && card.codigo.length == 16 && card.expirate.length == 7 && card.code.length == 3) {
            seteerror(false)


        } else {

            seteerror(true)
        }
    }
    const FinalizarCompra = async () => {
        try {
            let datos = {
                card: card,
                totalCarrito
            }
            let { API_LOGIN } = url;
            await axios.post(API_LOGIN + 'carrito/finalizarcompra/' + auth.id, datos)
                .then(async (response) => {
                    let { success, meesage } = response.data

                    await Swal.fire({ icon: 'success', text: meesage })
                    Router.push('/')
                })
                .catch(async (err) => {
                    console.log(err)
                })
        } catch (error) {

        }
        // await Swal.fire({ icon: 'success', text:'Su compra se ha Realizado con Éxito!'})
        // console.log()
    }
    return (
        <Form>

            <div className="col-md-12 mt-4">
                <hr />
                <h6><i className="fas fa-thumbtack"></i> Ingrese los Datos de su Tarjeta</h6>
                <hr />
            </div>
            <Form.Field>

                <label>Nombre del Titular</label>
                <input name="titularname" onChange={(e) => { handleInput(e.target) }} value={card.titularname || ""} />
            </Form.Field>
            <Form.Group widths='equal'>

                <Form.Field>

                    <label>Numero de Tarjeta</label>
                    <input type="number" onChange={(e) => { handleInput(e.target) }} name="codigo" placeholder="xxxx xxxx xxxx xxxx" value={card.codigo || ""} />
                </Form.Field>
                <Form.Field>

                    <label>Vencimiento de Tarjeta</label>
                    <input type="text" name="expirate" onChange={(e) => { handleInput(e.target) }} value={card.expirate || ""} placeholder="DD/YYYY" />
                    {/* <SemanticDatepicker className="ml-2 " allowOnlyNumbers locale="es-ES" format="MM/YYYY" name="expirate"  onChange={(e, obj) => { handleInput(obj) }} /> */}


                </Form.Field>

                <Form.Field>

                    <label>Código </label>
                    <input placeholder="CCV" name="code" onChange={(e) => { handleInput(e.target) }} value={card.code || ""} />
                </Form.Field>


            </Form.Group>
            <Form.Field>
                <Button onClick={() => { FinalizarCompra() }} color="facebook" disabled={error}>Finalizar Pedido</Button>
            </Form.Field>
        </Form>
    );
}

export default VerificarDatosCard;
