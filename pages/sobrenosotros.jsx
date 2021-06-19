import React from 'react';
import { Table } from 'semantic-ui-react'

const sobrenosotros = () => {
    return (
        <div className="container">
            <div className="row about-container">

                <div className="col-lg-12 content order-lg-1 order-2">
                    <h2 className="title">Sobre Nosotros</h2>
                    <p style={{ textAlign: 'justify' }}>
                        <strong>CREDIVARGAS </strong>



            Línea de Electrodomésticos.
            Línea de motos (Honda).
            Línea de autos (Honda).
            Línea de Homecenter y ferreterías.


            Actualmente, contamos con 19 puntos de venta a nivel nacional, tenemos más de 500 colaboradores en las diversas regiones del Perú y trabajamos con las mejores marcas del mercado.




            Establecimientos:
              </p>
                    <p>
                        Nuestra misión como grupo es desarrollar y mejorar la calidad de vida de las familias a través de nuestros productos y servicios.

                    </p>
                    <p>
                        Los valores en los que se basan nuestras operaciones son: Honestidad, servicio al cliente, puntualidad, responsabilidad y asesoría continua.


                    </p>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={2}>Departamento</Table.HeaderCell>
                                <Table.HeaderCell width='six'>Puntos de Venta</Table.HeaderCell>
                                <Table.HeaderCell width='six'>Direccion</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Lima</Table.Cell>
                                <Table.Cell>Honda V Motor Center</Table.Cell>
                                <Table.Cell>Av. Industrial 3600. Independencia - Lima Norte.</Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Lima</Table.Cell>
                                <Table.Cell> Showroom Honda V Motor Center</Table.Cell>
                                <Table.Cell>Centro Comercial Plaza Norte - Showroom vehículos. Sótano primer piso.</Table.Cell>

                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell>Lima</Table.Cell>
                                <Table.Cell>Oficinas E-commerce Lima</Table.Cell>
                                <Table.Cell>Av. Circunvalación del club Golf Los Incas 134. Torre II, piso 13 - Santiago de Surco.</Table.Cell>

                            </Table.Row>
                         
                            <Table.Row>
                                <Table.Cell>Ucayali</Table.Cell>
                                <Table.Cell>Credivargas Electrodomésticos</Table.Cell>
                                <Table.Cell>Jirón Tarapacá 969 - coronel Portillo, Pucallpa.</Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Ucayali</Table.Cell>
                                <Table.Cell>Honda Credivargas - Motos</Table.Cell>
                                <Table.Cell>Jirón Tarapacá 938 - coronel Portillo, Pucallpa.</Table.Cell>+
                                

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Ucayali</Table.Cell>
                                <Table.Cell>Honda Credivargas - Motos</Table.Cell>
                                <Table.Cell>Jirón Tarapacá 938 - coronel Portillo, Pucallpa.</Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Ucayali</Table.Cell>
                                <Table.Cell>Credivargas Electrodomésticos</Table.Cell>
                                <Table.Cell>Jirón Raimondi 503 - Coronel Portillo, Pucallpa.</Table.Cell>

                            </Table.Row>
                            
                        </Table.Body>






                    </Table>


                </div>

                <div className="col-lg-6 background order-lg-2 order-1 wow fadeInRight"></div>
            </div>

        </div>
    );
}

export default sobrenosotros;
