import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Input, Dropdown, Dimmer, Loader, Icon, Image } from 'semantic-ui-react'
import Head from 'next/head';
const axios = require('axios');
import Swal from 'sweetalert2';
import { url } from '../../env.json'
import { useRouter } from 'next/router'

const editar = () => {
    const router = useRouter()
    const { slug } = router.query
    const [data, setdata] = useState({});
    const [actived, setactived] = useState(true);
    const [img, setimg] = useState([])
    const [errors, seterrors] = useState({});
    const [tipoEquipo, settipoEquipo] = useState([])
    const [marca, setmarca] = useState([]);

    useEffect(() => {
        if (slug) {
            getMarca()
            getTipoEquipo()
            obtenerProducto(slug)
            setTimeout(() => {
                setactived(false)
            }, 500)
        }
    }, [slug]);



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
    const deletefiles = async (f) => {
        // let currentImg = data.image_url;
        let real;

        real =

        // real = await img.filter(i => {
        //     console.log(f)
        // })


        console.log(real)
    }
    const getMarca = async () => {
        const { API_LOGIN } = url;
        await axios.get(API_LOGIN + "getMarca")
            .then(async (res) => {
                // console.log(res.data)

                let data = JSON.parse(res.data.datos)
                // console.log(JSON.parse(res.data.datos))
                setmarca(data)
            })
            .catch(async (err) => {

                console.log(err)
            })
    }
    const obtenerProducto = async (slug) => {
        let { API_LOGIN } = url
        await axios.get(API_LOGIN + "obtenerproducto/" + slug)
            .then(async (res) => {
                // console.log(res.data)


                let { success, message, dato } = res.data;
                if (!success) { throw new Error(message) }
                // console.log(dato)
                await setdata(dato)
                // setimg(data.image_url)

            })
            .catch(async (err) => {
                await Swal.fire({ icon: 'warning', text: err.message })
                console.log(err)
            })






    }
    const handleInput = ({ name, value }) => {
        setdata({ ...data, [name]: value })
    }

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/images/icons/favicon.ico" />
                <link rel="stylesheet" href="/font/css/font-awesome.min.css" />
                <link rel="stylesheet" hbref="/animate/animate.css" />
                <link rel="stylesheet" href="/css-hamburgers/hamburgers.min.css" />
                <link rel="stylesheet" href="select2/select2.min.css" />
                <link rel="stylesheet" href="/css/util.css" />
                <link rel="stylesheet" href="/css/main.css" />
            </Head>
            <div>{
                actived ?

                    <Dimmer active inverted>
                        <Loader size="small" />
                    </Dimmer>

                    :
                    <div className="limiter">
                        <div className="container-login100" >
                            <div className="wrap-login100">
                                <h2 style={{ alignContent: 'center' }}>Formulario de Editar Producto</h2>
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
                                                            Arraste o suelte algunas fotos del Equipo a registrar
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
                                                <div className="row">
                                                    {data.image_url.map((f, a) =>

                                                        <div className="col-md-3" key={`${a}`}>
                                                            <Card>

                                                                <Button color="red" onClick={(e) => deletefiles(a)} floated='right' size='mini' icon>
                                                                    <Icon name='delete' />
                                                                </Button>
                                                                <div className="card-body" style={{ overflow: 'hidden' }}>


                                                                    <Image src={f} size='small' rounded />
                                                                    {/* <b>{(f.size / (1024 * 1024)).toFixed(2)}MB</b> */}
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Field>
                                            {/* <DropZone id="files"
                                                name="img"
                                                onChange={(e) => handleFiles(e)}
                                                icon="save"
                                                result={filess}
                                                title="Select. Archivo (*.png, *.jpg)"
                                                accept="image/jpeg, image/png"
                                                onDelete={(e) => deleteFile(e.index, e.file)}
                                            /> */}
                                        </Form.Field>
                                        {/* <input type="file" name="" id=""/> */}
                                        <Button align="center" type='submit' color="facebook" onClick={(e) => { e.preventDefault, register() }}>Registrar Producto</Button>
                                    </Form>
                                </Card>

                            </div>
                        </div>
                    </div>
            }

            </div >
        </div>
    );
}

export default editar;
