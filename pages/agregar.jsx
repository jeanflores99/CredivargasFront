import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Button, Checkbox, Form, Card, Input, Dropdown, Dimmer, Loader, Icon, Image } from 'semantic-ui-react'
import Head from 'next/head';
import Swal from 'sweetalert2';
import DropZone from '../components/dropzone';
// import { useDropzone } from 'react-dropzone'


import { url } from '../env'
// import { set } from 'js-cookie';
const axios = require('axios');

const agregar = ({ auth}) => {
    const [errors, seterrors] = useState({});
    const [tipoEquipo, settipoEquipo] = useState([])
    const [marca, setmarca] = useState([]);
    const [filesize, setfilesize] = useState(0);
    const [filess, setfiles] = useState([]);
    const [actived, setactived] = useState(true);
    const [imgbase, setimgbase] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setactived(false)
        }, 500)
        getTipoEquipo()
        getMarca()
    }, [filess, filesize]);
    const [data, setdata] = useState({
        name: '',
        description: '',
        stock: '',
        peso: '',
        precio: '',
        marca_id: '',
        tipoequipo_id: ''

    });

    const metaDatos = (name) => {
        let items = {
            pdf: { color: '#d32f2f', icon: 'far fa-file-image' },
            docx: { color: '#1976d2', icon: 'fas fa-file-image' }
        };
        // get key
        let keyName = `${name}`.split('.').pop();
        // response 
        return items[keyName] || { color: '#37474f', icon: 'fas fa-file-alt' };
    };

    const handleInput = ({ name, value }) => {
        setdata({ ...data, [name]: value })
    }
    const getTipoEquipo = async () => {
        const { API_LOGIN } = url;
        await axios.get(API_LOGIN + "getTipoEquipo")
            .then(async (res) => {
                let data = JSON.parse(res.data.datos)
                // console.log(JSON.parse(res.data.datos))
                settipoEquipo(data)
                // console.log(data)
            })
            .catch(async (err) => {
                console.log(err)
            })
    }
    const getMarca = async () => {
        const { API_LOGIN } = url;
        await axios.get(API_LOGIN + "getMarca")
            .then(async (res) => {
                let data = JSON.parse(res.data.datos)
                // console.log(JSON.parse(res.data.datos))
                setmarca(data)
                // console.log(data)
            })
            .catch(async (err) => {
                console.log(err)
            })
    }
    const convertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const register = async () => {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        let datos = new FormData;
        // data equipo

        // datos
        for (let attr in data) {
            if (attr != 'files') datos.append(attr, data[attr])
        }


        filess.filter(f => datos.append('files', f));
        // add files

        // console.log(datos)
        const { API_ADMIN } = url;



        await axios.post(API_ADMIN + 'register', datos, config)
            .then(async res => {
                let { success, message } = res.data
                if (!success) throw new Error(message)
                await Swal.fire({ icon: 'success', text: message })
                seterrors({})
                setdata({})
                setfiles([])
                setimgbase([])

            }).catch(async err => {
                try {
                    console.log(JSON.stringify(err.message))
                    let response = JSON.parse(err.message)
                    seterrors(response)
                    await Swal.fire({ icon: 'warning', text: JSON.stringify(response.name || response.description || response.tipoequipo_id || response.marca_id || response.peso || response.precio || response.stock) })
                } catch (error) {
                    console.log(error)
                }
            })
    }
    const handleFiles = async (name, files) => {
        // console.log(name, files)
        let fil = [];
        let img64 = []
        let a;
        let size_total = filesize
        let size_limit = 6 * 1024;
        // for (let f of files) console.log(f)
        let i;
        for await (let f of files) {


            size_total += f.size;
            if ((size_total / 1024) <= size_limit) {
                await setfilesize(size_total)
                // await img64.push(convertBase64(f))
                a = await convertBase64(f);
                // await console.log(a)
                await img64.push(a)
                fil.push(f)



            } else {
                Swal.fire({ icon: 'error', text: `El limíte máximo es de 6MB, tamaño actual(${(size_total / (1024 * 1024)).toFixed(2)} MB` })
            }
        }
        // console.log(fil)
        // console.log(img64)
        await setimgbase([...imgbase, ...img64])
        await setfiles([...filess, ...fil])



    }

    const deleteFile = async (f, file) => {


        setfiles(currentImg => currentImg.filter((img, i) => i !== f.index))
        await setimgbase(currentImg => currentImg.filter((img, i) => i !== f.index))

        setfilesize(filesize - f.file.size)

    }








    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/images/icons/favicon.ico" />
                <link rel="stylesheet" href="/font/css/font-awesome.min.css" />
                <link rel="stylesheet" hbref="/animate/animate.css" />
                <link rel="stylesheet" href="/css-hamburgers/hamburgers.min.css" />
                <link rel="stylesheet" href="select2/select2.min.css" />
                <link rel="stylesheet" href="/css/util.css" />
                <link rel="stylesheet" href="/css/main.css" />
            </Head>
            {
                actived ?

                    <Dimmer active inverted>
                        <Loader size="small" />
                    </Dimmer>

                    :

                    <div className="limiter">
                        <div className="container-login100" >
                            <div className="wrap-login100">
                                <h2 style={{ alignContent: 'center' }}>Formulario de Registro de Productos</h2>
                                <Card fluid className="mb-5">
                                    <Form className="mr-3 mt-3 ml-3 mb-3">
                                        <Form.Field>
                                            <label>Nombre del Producto<b className="text-danger">(*)</b></label>
                                            <Input placeholder='name' placeholder="Ingrese el nombre del producto" value={data.name || ""} name='name' onChange={(e) => handleInput(e.target)} />
                                            {errors && errors.name ?
                                                < label className="ml-2" style={{ color: "#c91d12" }}>{errors.name}</label>
                                                : null
                                            }
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Descripcion del producto</label>
                                            <textarea placeholder="Ingrese la descripcion del producto" rows="2" name='description' value={data.description || ""} onChange={(e) => handleInput(e.target)} />
                                            {errors && errors.description ?
                                                < label className="ml-2" style={{ color: "#c91d12" }}>{errors.description}</label>
                                                : null
                                            }
                                        </Form.Field>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Seleccione el Tipo del Producto<b className="text-danger">(*)</b></label>
                                                <Dropdown
                                                    placeholder='Tipo de Producto'
                                                    selection
                                                    name="tipoequipo_id"
                                                    value={data.tipoequipo_id || ""}
                                                    options={tipoEquipo}
                                                    onChange={(e, obj) => handleInput(obj)}
                                                />
                                                {errors && errors.tipoequipo_id ?
                                                    < label className="ml-2" style={{ color: "#c91d12" }}>{errors.tipoequipo_id}</label>
                                                    : null
                                                }
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Seleccione la Marca de Producto<b className="text-danger">(*)</b></label>
                                                <Dropdown
                                                    placeholder='Marca'
                                                    selection
                                                    name="marca_id"
                                                    value={data.marca_id || ""}
                                                    options={marca}
                                                    onChange={(e, obj) => handleInput(obj)}
                                                />
                                                {errors && errors.marca_id ?
                                                    < label className="ml-2" style={{ color: "#c91d12" }}>{errors.marca_id}</label>
                                                    : null
                                                }
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Ingrese su Precio<b className="text-danger">(*)</b></label>
                                                <Input type="number" name='precio' placeholder="Ingrese el precio del producto" min="0" step="0.01" value={data.precio || ""} onChange={(e) => handleInput(e.target)} />
                                                {errors && errors.precio ?
                                                    < label className="ml-2" style={{ color: "#c91d12" }}>{errors.precio}</label>
                                                    : null
                                                }
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Ingrese el Stock del producto<b className="text-danger">(*)</b></label>
                                                <Input name='stock' placeholder="Ingrese el Stock del producto" value={data.stock || ""} min='0' max='10000' onChange={(e) => handleInput(e.target)} />
                                                {errors && errors.stock ?
                                                    < label className="ml-2" style={{ color: "#c91d12" }}>{errors.stock}</label>
                                                    : null
                                                }
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Ingrese el Peso del producto / KG<b className="text-danger">(*)</b></label>
                                                <Input name='peso' placeholder="Ingrese el Peso del producto" value={data.peso || ""} onChange={(e) => handleInput(e.target)} />
                                                {errors && errors.peso ?
                                                    < label className="ml-2" style={{ color: "#c91d12" }}>{errors.peso}</label>
                                                    : null
                                                }
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Field>
                                            <label>Agregue las Fotos del producto</label>
                                            <Form.Field >
                                                {/* <label>{label}</label> */}
                                                <label className="dropzone" style={{ overflow: 'hidden' }}>
                                                    <div className="text-center dropzone-color pt-3 pb-3" style={{ fontSize: '4em' }}>
                                                        <i className={`fas fa-cloud-upload-alt`}></i>
                                                        <div style={{ fontSize: '13px', color: '#455a64' }}>
                                                            Seleccione las fotos que quiera agregar
                                                        </div>
                                                    </div>
                                                    <input type="file"
                                                        // id={id}
                                                        accept="image/jpeg, image/png"
                                                        name="img"
                                                        multiple
                                                        onChange={(e) => {
                                                            let { name, files } = e.target;
                                                            handleFiles(name, files)
                                                            // onChange(name, files)
                                                            // if (typeof onChange == 'function') onChange({ name, files });
                                                            // document.getElementById(id).value = null;
                                                        }}
                                                        hidden
                                                    />
                                                </label>
                                                {/* <label>{error || ""}</label> */}
                                                <div className="row">
                                                    {filess.map((f, a) =>

                                                        <div className="col-md-3" key={`${a}-files-${f.name}`}>
                                                            <Card>

                                                                <Button color="red" onClick={(e) => deleteFile({ index: a, file: f })} floated='right' size='mini' icon>
                                                                    <Icon name='delete' />
                                                                </Button>
                                                                <div className="card-body" style={{ overflow: 'hidden' }}>
                                                                    <div className="dropzone-text">
                                                                        <i className={metaDatos(f.name).icon} style={{ color: metaDatos(f.name).color }}></i> {f.name}
                                                                    </div>

                                                                    <Image src={imgbase[a]} size='small' rounded/>
                                                                    <hr />
                                                                    <b>{(f.size / (1024 * 1024)).toFixed(2)}MB</b>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Field>

                                        </Form.Field>
                                        {/* <input type="file" name="" id=""/> */}
                                        <Button align="center" type='submit' color="facebook" onClick={(e) => { e.preventDefault, register() }}>Registrar Producto</Button>
                                    </Form>
                                </Card>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>

    );
}

export default agregar;
