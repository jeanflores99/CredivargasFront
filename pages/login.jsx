import React, { Fragment, Component, useState, useEffect } from 'react';
import { Input, Form, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
// import ContentLoader, { Facebook } from 'react-content-loader'
import { url } from '../env'
import Swal from 'sweetalert2';
import Head from 'next/head'
import Router from 'next/router';
// import Axios from 'axios';
// const MyLoader = () => <ContentLoader />
// const MyFacebookLoader = () => <Facebook />
const axios = require('axios');

function login({ setauth, auth, isLogging, setIsLogging }) {

    const [actived, setActive] = useState(true);
    const [Login, setLogin] = useState({
        username: '',
        password: ''
    });
    const [errors, seterrors] = useState({

    });
    let { API_LOGIN } = url;

    useEffect(() => {
        setTimeout(() => {
            setActive(false)
        }, 500)


    }, [auth]);

    // console.log(isLogging)

    const handleInputLogin = ({ name, value }) => {

        setLogin({ ...Login, [name]: value })
    }

    const InitSesion = async () => {
        let { push } = Router;
        let { API_LOGIN } = url
        let datos = Object.assign({}, Login)//clonamos el useSate Login

        await axios.post(API_LOGIN + 'login', datos)
            .then(async (res) => {

                let { success, message } = res.data

                if (!success) throw new Error(JSON.stringify(message))
                localStorage.setItem('UserActual', message.token)
                // setIsLogging(true)
                setauth(res.data.user)
                document.cookie = message.token;
                await Swal.fire({ icon: 'success', text: 'Sesión Exitosa' })
                await setIsLogging(true)
                await setLogin({
                    username: '',
                    password: ''
                })
                await seterrors({})
                push({ pathname: '/show' })
                // isLogging = true;
                // console.log(isLogging)

            }
            ).catch(
                async err => {
                    try {
                        console.log(JSON.stringify(err.message))
                        let response = JSON.parse(err.message)
                        await Swal.fire({ icon: 'warning', text: JSON.stringify(response.username || response.password || response.message) })
                        await seterrors(response)
                        // console.log(JSON.parse(repsonse))
                    } catch (error) {
                        console.log(error)
                    }
                }
            )

    }

    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/images/icons/favicon.ico" />
                <link rel="stylesheet" href="/font/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/animate/animate.css" />
                <link rel="stylesheet" href="/css-hamburgers/hamburgers.min.css" />
                <link rel="stylesheet" href="select2/select2.min.css" />
                <link rel="stylesheet" href="/css/util.css" />
                <link rel="stylesheet" href="/css/main.css" />

            </Head>
            {actived ?
                <Dimmer active inverted>
                    <Loader size="small" />
                </Dimmer>
                // <Facebook />
                :
                <div className="limiter" >
                    <div className="container-login100" >
                        <div className="wrap-login101">
                            <div className="login100-pic js-tilt " data-tilt>
                                <img src="images/img-01.png" alt="IMG" />
                            </div>
                            {/* style={{ marginBottom: '60px'} */}
                            <Form className="login100-form validate-form mb-5">
                                <span className="login100-form-title">
                                    Inicio de Sesión
                                 </span>
                                <Form.Field>
                                    <label className="ml-2">Nombre de Usuario o Email</label>
                                    <Input icon="user" className="ml-2" onChange={(e) => handleInputLogin(e.target)} value={Login.username || ""} iconPosition="left" placeholder="Ingrese su usuario o Email" fluid type="text" name="username" />
                                    {errors && errors.username ?
                                        < label className="ml-2" style={{ color: "#c91d12" }}>{errors.username}</label>
                                        : null
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label className="ml-2">Contraseña</label>
                                    <Input icon="eye slash outline" className="ml-2" onChange={(e) => handleInputLogin(e.target)} value={Login.password || ""} iconPosition="left" placeholder="Ingrese su contraseña" fluid type="password" name="password" />
                                    {errors && errors.password ?
                                        <label className="ml-2" style={{ color: "#c91d12" }}>{errors.password}</label>
                                        : null
                                    }
                                </Form.Field>

                                <Button color="facebook" className="ml-2" fluid onClick={(e) => {
                                    e.preventDefault()
                                    InitSesion()
                                }}><Icon name="sign-in" />Iniciar Sesión</Button>
                            </Form>

                        </div>
                    </div>
                </div>
            }

        </Fragment >
    )
}

export default login