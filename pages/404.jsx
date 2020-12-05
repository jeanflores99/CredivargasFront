import React from 'react';
import { Icon } from 'semantic-ui-react'


const aea = ({ mensaje, iconi }) => {
    return (

        <div style={{
            color: '#000', background: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif', height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
            <div>
                <style>body </style>
                <h1 style={{ display: 'inline - block', borderRight: '1px1 solid rgba(0, 0, 0,.3)', margin: '0', padding: '10px 23px 10px 0', fontSize: '24px', fontWeight: '500', verticalAlign: 'top' }}>{<Icon name={iconi} /> || 404}</h1>
                <div style={{ display: 'inline - block', textAlign: 'left', lineHeight: '49px', height: '9px', verticalAlign: 'middle' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: 'normal', lineHeight: 'inherit', margin: '0', padding: '0' }}>
                        <Icon name="warning sign" /> {mensaje || " Opps! hubo un error"}</h2>
                </div >

            </div>
        </div >

    );
}

export default aea;

