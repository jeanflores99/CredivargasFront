import React, { Fragment, Component } from 'react';
// import AllProductos from '../components/allproducto'
import SHOW from './show';
import Link from 'next/link';

function HomePage({ auth }) {

  return (
    <div>

      {/* <AllProductos /> */}
      {/* <ShowProductoUnique
        auth={auth}
      /> */}
      <SHOW auth={auth} />
      <div className="container bg-white">
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">

              <small className="d-block mb-3 text-muted">&copy;  {new Date().getFullYear()}</small>
            </div>
            <div className="col-6 col-md">
              <h5>Acceso Rápido</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <Link href="/">
                    <a className="text-muted">Inicio</a>
                  </Link>
                </li>

                <li>
                  <Link href="/sobrenosotros">
                    <a className="text-muted">Sobre Nosotros</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
            </div>

          </div>
        </footer>
      </div>



    </div >
  )
}

export default HomePage