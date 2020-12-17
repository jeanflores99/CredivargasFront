import React, { useState, useEffect } from 'react';
import { Icon, Step } from 'semantic-ui-react'
import { url } from '../env'
import VerificarDatos from '../components/verificardatos'
import VerificarDatosCard from '../components/VerificarDatosCard';
const axios = require('axios');
const pagar = ({ auth }) => {
    const [pass, setpass] = useState(1)
    const [complete, setcomplete] = useState([]);
    const [carrito, setcarrito] = useState({})
    const [totalCarrito, setTotalCarrito] = useState(0)
    useEffect(() => {
        if (auth.id) {
            obtenerdatosdelcarrito()
            traerDatosBD(auth.id)
        }
    }, [auth.id]);
    const obtenerdatosdelcarrito = async () => {
        let { API_LOGIN } = url;
       
        await axios.get(API_LOGIN + 'carrito/obtenerdatosdelcarrito/' + auth.id)
            .then(async (res) => {
                let { datos } = res.data
                setcarrito(datos)


                // push({ pathname: '/pagar' })
            })
            .catch(async (err) => {
                console.log(err)
            })
    }
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
    return (
        <div style={{ width: '900px', justifyContent: 'center!important' }} className="container mt-2">
            <Step.Group fluid>
                <Step active={pass == 1} disabled={pass != 1} completed={complete.includes(1)}>
                    <Icon name='user outline' />
                    <Step.Content>
                        <Step.Title>Validar</Step.Title>
                        <Step.Description>Verificar mis Datos</Step.Description>
                    </Step.Content>
                </Step>

                <Step active={pass == 2} disabled={pass != 2} completed={complete.includes(2)}>
                    <Icon name='payment' />
                    <Step.Content>
                        <Step.Title>Pago</Step.Title>
                        <Step.Description>Información de pago</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>
            {
                pass == 1 ?
                    <VerificarDatos carrito={carrito} pass={pass} setpass={setpass} auth={auth} setcomplete={setcomplete} complete={complete} />
                    : null
            }
            {
                pass == 2 ?
                    <VerificarDatosCard carrito={carrito} pass={pass} setpass={setpass} auth={auth} setcomplete={setcomplete} complete={complete} totalCarrito={totalCarrito} />
                    : null
            }
        </div>
    );
}

export default pagar;
