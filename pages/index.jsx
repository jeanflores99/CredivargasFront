import React, { Fragment, Component } from 'react';
// import AllProductos from '../components/allproducto'
import SHOW from './show';

function HomePage({ auth }) {

  return (
    <div>

      {/* <AllProductos /> */}
      {/* <ShowProductoUnique
        auth={auth}
      /> */}
      <SHOW auth={auth}  />
    </div>
  )
}

export default HomePage