import React, { Fragment, Component, useState, useEffect } from 'react';
import { Button, Card, Form, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { url } from '../env'
import Head from 'next/head';
import Swal from 'sweetalert2';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

const axios = require('axios');


const registrate = () => {
    const [data, setdata] = useState({
        dni: '',
        last_name: '',
        first_name: '',
        email: '',
        username: '',
        telefono: '',
        password: '',
        password_confirmation: '',
        cod_dep: '',
        cod_pro: '',
        cod_dis: '',
        direccion: '',
        fechanacimiento: ''
    });
    const [Errors, setErrors] = useState({});
    const [dep, setdep] = useState([]);
    const [pro, setpro] = useState([]);
    const [dis, setdis] = useState([]);

    const [actived, setActive] = useState(true);
    useEffect(() => {
        // let { API_UBIGEO } = url
        setTimeout(() => {
            setActive(false)
        }, 500)

        getDepartaments()
        getProvincia(data.cod_dep)
        getDistrito(data.cod_dep, data.cod_pro)


    }, [data.cod_dep, data.cod_pro]);


    const getDepartaments = async () => {
        const { API_UBIGEO } = url
        await axios.get(API_UBIGEO + "departamento")
            .then(async (res) => {
                let data = JSON.parse(res.data.datos)
                // console.log(JSON.parse(res.data.datos))
                setdep(data)
                console.log(data)
            })
            .catch(async (err) => {
                console.log(err)
            })
    }
    const createPerson = async () => {
        let { API_LOGIN } = url;
        let datos = Object.assign({}, data)//clonamos el usestate
        await axios.post(API_LOGIN + 'register', datos)
            .then(async res => {
                let { success, message } = res.data
                if (!success) throw new Error(message)
                await Swal.fire({ icon: 'success', text: message })
                setdata({
                    dni: '',
                    last_name: '',
                    first_name: '',
                    email: '',
                    username: '',
                    telefono: '',
                    password: '',
                    password_confirmation: '',
                    cod_dep: '',
                    cod_pro: '',
                    cod_dis: '',
                    direccion: '',
                    fechanacimiento: ''
                })
                setErrors({})
                setpro([])
                setdis([])
            })
            .catch(async err => {
                try {
                    let response = JSON.parse(err.message)
                    await Swal.fire({ icon: 'warning', text: JSON.stringify(err.message) })
                    await setErrors(response)
                } catch (error) {
                    console.log(error)
                }
            })
    }
    const getProvincia = async (id) => {
        const { API_UBIGEO } = url
        await axios.get(API_UBIGEO + 'provincia/' + id).then(response => {
            let data = JSON.parse(response.data.datos)
            // console.log(data)
            setpro(data)
        }).catch(err => {
            console.log(err)
        })
    }
    const getDistrito = async (cod_dep, cod_pro) => {
        const { API_UBIGEO } = url
        await axios.get(API_UBIGEO + 'distrito/' + cod_dep + '/' + cod_pro).then(response => {
            let data = JSON.parse(response.data.datos)
            // console.log(data)
            setdis(data)
        }).catch(err => {
            console.log(err)
        })

    }
    const handleInput = ({ name, value }) => {
        setdata({ ...data, [name]: value })
    }

    return (

        < Fragment >

            <Head>
                <link rel="stylesheet" href="/images/icons/favicon.ico" />
                <link rel="stylesheet" href="/font/css/font-awesome.min.css" />
                <link rel="stylesheet" hbref="/animate/animate.css" />
                <link rel="stylesheet" href="/css-hamburgers/hamburgers.min.css" />
                <link rel="stylesheet" href="select2/select2.min.css" />
                <link rel="stylesheet" href="/css/util.css" />
                <link rel="stylesheet" href="/css/main.css" />
            </Head>
            {actived ?
                <Dimmer active inverted>
                    <Loader size="small" />
                </Dimmer>
                :
                <div className="limiter">
                    <div className="container-login100" >
                        <div className="wrap-login100">
                            <h2 style={{ alignContent: 'center' }}>Formulario de Registro de Usuarios</h2>
                            <Card fluid className="mb-5">
                                <Form className="mr-3 mt-3 ml-3 mb-3" >
                                    <Form.Field>
                                        <label>DNI <b className="text-danger">(*)</b></label>
                                        <input placeholder='Ingrese su Documento de identidad' type="text" name="dni" value={data.dni || ""} onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nombres <b className="text-danger">(*)</b></label>
                                        <input placeholder='Ingrese sus Nombres' type="text" name="first_name" value={data.first_name || ""} onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Apellidos <b className="text-danger">(*)</b></label>
                                        <input placeholder='Ingrese su Apellido' type="text" name="last_name" value={data.last_name || ""} onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email <b className="text-danger">(*)</b></label>
                                        <input placeholder='Ingrese su Email' type="email" name="email" value={data.email || ""} onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Celular<b className="text-danger">(*)</b></label>
                                        <input placeholder='Ingrese su Telefono' type="number" name="telefono" value={data.telefono || ""} onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Nombre de Usuario<b className="text-danger">(*)</b></label>
                                        <input placeholder='Ingrese un Nombre de Usuario Unico' type="text" value={data.username || ""} name="username" onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Contraseña <b className="text-danger">(*)</b></label>
                                        <input placeholder='Ingrese Su Contraseña' type="password" name="password" value={data.password || ""} onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Confirmar Contraseña <b className="text-danger">(*)</b></label>
                                        <input placeholder='Repita su Contraseña' type="password" name="password_confirmation" value={data.password_confirmation || ""} onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>
                                    <Form.Field>
                                        <lable>Ingrese su fecha de Nacimiento</lable>

                                        <SemanticDatepicker className="ml-2 " datePickerOnly  locale="es-ES" format="DD/MM/YYYY" value={data.fechanacimiento || ""} name="fechanacimiento" icon="calendar outline" onChange={(e, obj) => handleInput(obj)} />


                                    </Form.Field>
                                    <Form.Field>
                                        <label>Seleccione su Departamento<b className="text-danger">(*)</b></label>
                                        <Dropdown
                                            placeholder='Departamento'
                                            selection
                                            name="cod_dep"
                                            value={data.cod_dep || ""}
                                            options={dep}
                                            onChange={(e, obj) => handleInput(obj)}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Seleccione su Provincia<b className="text-danger">(*)</b></label>
                                        <Dropdown
                                            placeholder='Provincia'
                                            name="cod_pro"
                                            value={data.cod_pro || ""}
                                            selection
                                            options={pro}
                                            onChange={(e, obj) => handleInput(obj)}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Seleccione su Distrito<b className="text-danger">(*)</b></label>
                                        <Dropdown
                                            placeholder='Distrito'
                                            selection
                                            name="cod_dis"
                                            value={data.cod_dis || ""}
                                            options={dis}
                                            onChange={(e, obj) => handleInput(obj)} />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Ingrese una Direccion<b className="text-danger">(*)</b></label>
                                        <textarea name="direccion" value={data.direccion || ""} rows="2" onChange={(e) => handleInput(e.target)} />
                                    </Form.Field>

                                    <Button
                                        color="facebook"
                                        onClick={
                                            (e) => {
                                                e.preventDefault()
                                                createPerson()
                                            }
                                        }
                                    >Registrarse</Button>
                                </Form>
                            </Card>
                        </div>
                    </div>

                </div>
            }

        </Fragment >


    );
}

export default registrate;
