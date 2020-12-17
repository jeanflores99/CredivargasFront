import React, { Fragment, useState, useEffect, useContext } from 'react';


import Link from 'next/link'
const axios = require('axios');
import { url } from '../env.json';
import Router from 'next/router';
import { Button, Dropdown, Image } from 'semantic-ui-react'
import { AppContext } from '../contexts/AppContext'

const NavBar = ({ isLogging, auth, setauth, deleteToken, setIsLogging }) => {

    // const [session, loading] = useSession()
    // localStorage.setItem('UserActual','aeamano')

    // const { isLogging } = useContext(AppContext);
    // const [UserActual, setUserActual] = useState("");
    const [selectedindex, setselectedindex] = useState(null);
    const trigger = (
        <span>
            <Image avatar src="/img/profile.jpg" /> {auth.first_name || ""}
        </span>
    )


    const options = [
        { key: 'settings', text: 'Configuración', icon: 'settings', value: 'settings' },
        { key: 'edit-pro', text: 'Mostrar productos', icon: 'edit', value: 'edit-pro' },
        { key: 'mis-compras', text: 'Mis Compras', icon: 'tag', value: 'mis-compras' },
        { key: 'sign-out', text: 'Cerrar Sesion', icon: 'sign out', value: 'sign-out' },
    ]

    const optionsadmin = [
        { key: 'settings', text: 'Configuración', icon: 'settings', value: 'settings' },
        { key: 'edit-pro', text: 'Editar Productos', icon: 'edit', value: 'edit-pro' },
        { key: 'add-pro', text: 'Agregar Productos', icon: 'add', value: 'add-pro' },
        { key: 'report', text: 'Reportes', icon: 'wordpress forms', value: 'report' },
        { key: 'sign-out', text: 'Cerrar Sesion', icon: 'sign out', value: 'sign-out' }

    ]

    const handleoption = ({ value }) => {
        let { push } = Router;
        switch (value) {
            case 'settings': console.log('Estas modificando tu cuenta')
                break;
            case 'edit-pro': {
                push({ pathname: '/show' })
            }
                break;
            case 'add-pro': {
                push({ pathname: '/agregar' })
            } 
            break;
            case 'mis-compras': {
                push({ pathname: '/miscompras' })
            }
                break;
            case 'sign-out': logout(), deleteToken()
                break;
        }

    }


    const logout = async () => {

        let { push } = Router
        try {
            let { API_LOGIN } = url;
            await axios.get(API_LOGIN + "logout")
                .then(async response => {
                    let data = response.data
                    console.log(data)
                    setauth({})
                    push({ pathname: '/' })
                }).catch(async error => {
                    try {
                        let response = error
                        console.log(response)
                    } catch (error) {
                        console.log(error)
                    }
                })

            setIsLogging(false)
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <Fragment>




            <div className="az-header">
                <div className="container">
                    <div className="az-header-left">
                        <a onClick={
                            (e) => {
                                e.preventDefault()
                                Router.push('/')
                            }
                        } className="az-logo"><span></span><img src="/img/logocv.png" /></a>
                        <a href="" id="azMenuShow" className="az-header-menu-icon d-lg-none"><span></span></a>
                    </div>
                    <div className="az-header-menu">
                        <div className="az-header-menu-header">
                            <a onClick={() => {
                                e.preventDefault()
                                Router.push('/')
                            }} className="az-logo"><span></span> <img src="/img/logocv.png" /></a>
                            <a href="" className="close">&times;</a>
                        </div>
                        <ul className="nav">
                            <li className="nav-item active show">
                                <a href="index.html" className="nav-link"><i className="fas fa-tv mr-2"></i>TV y Audio</a>
                            </li>
                            <li className="nav-item">
                                <a href="index.html" className="nav-link"><i className="fas fa-laptop mr-2"></i>Computo y Tecnología</a>
                                {/* <a href="" className="nav-link with-sub"><i className="typcn typcn-document"></i> Pages</a>
                                <nav className="az-menu-sub">
                                    <a href="page-signin.html" className="nav-link">Sign In</a>
                                    <a href="page-signup.html" className="nav-link">Sign Up</a>
                                </nav> */}
                            </li>
                            <li className="nav-item">
                                <a href="chart-chartjs.html" className="nav-link"><i className="fas fa-blender mr-2"></i>Linea Blanca</a>
                            </li>
                            <li className="nav-item">
                                <a href="form-elements.html" className="nav-link"><i className="fas fa-mobile-alt mr-2"></i>Celulares</a>
                            </li>
                            {/* <li className="nav-item">
                                <a href="" className="nav-link with-sub"><i className="typcn typcn-book"></i> Components</a>
                                <div className="az-menu-sub">
                                    <div className="container">
                                        <div>
                                            <nav className="nav">
                                                <a href="elem-buttons.html" className="nav-link">Buttons</a>
                                                <a href="elem-dropdown.html" className="nav-link">Dropdown</a>
                                                <a href="elem-icons.html" className="nav-link">Icons</a>
                                                <a href="table-basic.html" className="nav-link">Table</a>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    <div className="az-header-right">
                        {/*  <a href="https://www.bootstrapdash.com/demo/azia-free/docs/documentation.html" target="_blank" className="az-header-search-link"><i className="far fa-file-alt"></i></a>
                        <a href="" className="az-header-search-link"><i className="fas fa-search"></i></a>
                        <div className="az-header-message">
                            <a href="#"><i className="typcn typcn-messages"></i></a>
                        </div>
                        <div className="dropdown az-header-notification">
                            <a href="" className="new"><i className="typcn typcn-bell"></i></a>
                            <div className="dropdown-menu">
                                <div className="az-dropdown-header mg-b-20 d-sm-none">
                                    <a href="" className="az-header-arrow"><i className="icon ion-md-arrow-back"></i></a>
                                </div>
                                <h6 className="az-notification-title">Notifications</h6>
                                <p className="az-notification-text">You have 2 unread notification</p>
                                <div className="az-notification-list">
                                    <div className="media new">
                                        <div className="az-img-user"><img src="../img/faces/face2.jpg" alt="" /></div>
                                        <div className="media-body">
                                            <p>Congratulate <strong>Socrates Itumay</strong> for work anniversaries</p>
                                            <span>Mar 15 12:32pm</span>
                                        </div>
                                    </div>
                                    <div className="media new">
                                        <div className="az-img-user online"><img src="../img/faces/face3.jpg" alt="" /></div>
                                        <div className="media-body">
                                            <p><strong>Joyce Chua</strong> just created a new blog post</p>
                                            <span>Mar 13 04:16am</span>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="az-img-user"><img src="../img/faces/face4.jpg" alt="" /></div>
                                        <div className="media-body">
                                            <p><strong>Althea Cabardo</strong> just created a new blog post</p>
                                            <span>Mar 13 02:56am</span>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="az-img-user"><img src="../img/faces/face5.jpg" alt="" /></div>
                                        <div className="media-body">
                                            <p><strong>Adrian Monino</strong> added new comment on your photo</p>
                                            <span>Mar 12 10:40pm</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown-footer"><a href="">View All Notifications</a></div>
                            </div>
                        </div>
 */}
                        {!isLogging ?

                            <ul className="nav">
                                <ul className="nav">
                                    <li className="nav-link">
                                        <a onClick={
                                            (e) => {
                                                e.preventDefault()
                                                Router.push('/carrito')
                                            }
                                        }><i className="fas fa-shopping-cart mr-2"></i>Carrito</a>
                                    </li>
                                </ul>
                                <li className="nav-link">
                                    <a onClick={
                                        (e) => {
                                            e.preventDefault()
                                            Router.push('/registrate')
                                        }
                                    }><i className="fas fa-tv mr-2"></i>Registrate</a>
                                </li>
                                <li className="nav-link">
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        Router.push('/login')
                                    }}><i className="fas fa-tv mr-2 ml-2"></i>Incicie Sesión</a>
                                </li>
                            </ul>
                            : <Fragment>
                                {auth.isadmin != 1 ?
                                    <ul className="nav">
                                        <li className="nav-link">
                                            <a onClick={
                                                (e) => {
                                                    e.preventDefault()
                                                    Router.push('/carrito')
                                                }
                                            }><i className="fas fa-shopping-cart mr-2"></i>Carrito</a>
                                        </li>
                                    </ul>
                                    :
                                    null}
                                <Dropdown
                                    trigger={trigger}
                                    options={auth.isadmin == 1 ? optionsadmin : options}
                                    name="option"
                                    pointing='top right'
                                    // value={dropdown || ""}
                                    icon={null}

                                    onChange={(e, obj) => handleoption(obj)}
                                />
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default NavBar;