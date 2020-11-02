import React, { Fragment, useState, useEffect, useContext } from 'react';
import Show from './Show';
import Link from 'next/link'
import { Button } from 'semantic-ui-react'
import { AppContext } from '../contexts/AppContext'

const NavBar = () => {


    const { isLogging } = useContext(AppContext);
    const [UserActual, setUserActual] = useState("");


    return (
        <Fragment>
            <div className="az-header">
                <div className="container">
                    <div className="az-header-left">
                        <a href="index.html" className="az-logo"><span></span> <img src="img/logocv.png" /></a>
                        <a href="" id="azMenuShow" className="az-header-menu-icon d-lg-none"><span></span></a>
                    </div>
                    <div className="az-header-menu">
                        <div className="az-header-menu-header">
                            <a href="index.html" className="az-logo"><span></span> <img src="img/logocv.png" /></a>
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

                            <Link href="/" >
                                <a>Registrate</a>
                            </Link>

                            : <div className="dropdown az-profile-menu">
                                <a href="" className="az-img-user"><img src="../img/profile.jpg" alt="" /></a>
                                <div className="dropdown-menu">
                                    <div className="az-dropdown-header d-sm-none">
                                        <a href="" className="az-header-arrow"><i className="icon ion-md-arrow-back"></i></a>
                                    </div>
                                    <div className="az-header-profile">
                                        <div className="az-img-user" >
                                            <img src="/img/profile.jpg" alt="" />
                                        </div>
                                        <h6>Aziana Pechon</h6>
                                        <span>Premium Member</span>
                                    </div>

                                    <a href="" className="dropdown-item"><i className="typcn typcn-user-outline"></i> My Profile</a>
                                    <a href="" className="dropdown-item"><i className="typcn typcn-edit"></i> Edit Profile</a>
                                    <a href="" className="dropdown-item"><i className="typcn typcn-time"></i> Activity Logs</a>
                                    <a href="" className="dropdown-item"><i className="typcn typcn-cog-outline"></i> Account Settings</a>
                                    <a href="page-signin.html" className="dropdown-item"><i className="typcn typcn-power-outline"></i> Sign Out</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NavBar;