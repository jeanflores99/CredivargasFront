import React, { Fragment, Component, useState, useEffect } from 'react';

import Head from 'next/head';
import { app } from '../env.json';
import 'semantic-ui-css/semantic.min.css'
import dynamic from 'next/dynamic';
import { AppProvider } from '../contexts/AppContext'
import { setToken, deleteToken, getToken, initAxiosInterceptors } from '../services/helpers';
import Axios from 'axios';
import Link from 'next/link';

// const TopProgressBar = dynamic(
//   import('components/TopProgressBar')
//   ,
//   { ssr: false }
// );


const NavBar = dynamic(() => import('../components/navbar'), { ssr: false });


initAxiosInterceptors();


// import { Search, Grid, Header, Segment } from 'semantic-ui-react'
export default function MyApp({ Component, pageProps, pathname }) {

  const [auth, setauth] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const [loading, setloading] = useState(true);


  const getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (await Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
    let { query, pathname } = ctx;
    let auth = {}
    return { pageProps, query, pathname }
  }
  // let UserActual = localStorage.getItem('UserActual')
  // state = {
  //   isLogging: true,
  //   auth: {}
  // }
  useEffect(() => {
    // let { auth, isLogging } = this.state
    async function cargarUsuario() {
      if (!getToken()) {
        setIsLogging(false)
        return;
      }
      try {

        await Axios.get('http://127.0.0.1:3333/getUser')
          .then(async res => {
            //  await
            await setauth(res.data)
            await setIsLogging(true)
            // setauth(data)
          })
          .catch(async err => {

          })
        // (data)
        // console.log(data)





        // console.log(auth, '<------')
        // auth = usuario;

      } catch (error) {
        // setIsLogging(true)

        console.log(error)
      }
    }
    cargarUsuario()

  }, []);


  // let { isLogging, auth } = this.state;

  return (
    <AppProvider>

      <Head>
        <meta charSet="utf-8" />

        <meta content="" name="keywords" />
        <meta content="" name="description" />




        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{app.name || 'Sistema'} - {app.description || ''}</title>

        <link rel="icon" href="/img/logo.png" />
        <link href="../lib/fontawesome-free/css/all.min.css" rel="stylesheet" />
        <link href="../lib/ionicons/css/ionicons.min.css" rel="stylesheet" />
        <link href="../lib/typicons.font/typicons.css" rel="stylesheet" />
        <link href="../lib/flag-icon-css/css/flag-icon.min.css" rel="stylesheet" />
        {/* <link rel="stylesheet" href="/font-awesome/css/all.min.css" media="all" /> */}
        <link rel="stylesheet" href="/images/icons/favicon.ico" />
        <link rel="stylesheet" href="/font/css/font-awesome.min.css" />
        <link rel="stylesheet" hbref="/animate/animate.css" />
        <link rel="stylesheet" href="/css-hamburgers/hamburgers.min.css" />
        <link rel="stylesheet" href="select2/select2.min.css" />
        <link rel="stylesheet" href="/css/util.css" />
        <link rel="stylesheet" href="/css/main.css" />




      </Head>



      <NavBar setIsLogging={setIsLogging} isLogging={isLogging} setauth={setauth} auth={auth} deleteToken={deleteToken} />

      <link rel="stylesheet" href="/css/azia.css" />
      <script src="../lib/jquery/jquery.min.js"></script>
      {/* <script src="../lib/bootstrap/js/bootstrap.bundle.min.js"></script> */}
      <script src="../lib/ionicons/ionicons.js"></script>
      <script src="../lib/jquery.flot/jquery.flot.js"></script>
      <script src="../lib/jquery.flot/jquery.flot.resize.js"></script>
      <script src="../lib/chart.js/Chart.bundle.min.js"></script>
      <script src="../lib/peity/jquery.peity.min.js"></script>

      <script src="../js/azia.js"></script>
      <script src="../js/chart.flot.sampledata.js"></script>
      <script src="../js/dashboard.sampledata.js"></script>
      {/* <script src="../js/custom.js"></script> */}



      <Component {...pageProps} isLogging={isLogging} setIsLogging={setIsLogging} auth={auth} setauth={setauth} setloading={setloading} />


      

      {/* <Navbar transparent={pathname == '/'} /> */}






    </AppProvider>
  )


}