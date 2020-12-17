import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link'
import { Button, Card, Dimmer, Loader, Icon } from 'semantic-ui-react'
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';

const showproductounique = ({ obj, auth, agregaralcarrito }) => {
    const [state, setstate] = useState(1);

    useEffect(() => {

    }, [state]);
    const previous = async () => {
        state > 1 ? await setstate(state - 1) : null


    }

    const next = async (length) => {
        state < length ? await setstate(state + 1) : null

    }
    const imgindex = async (k) => {
        await setstate(k)
    }


    return (
        <Card>
            <div className="container my-4">

                <div id="carousel-example-1z" className="carousel slide carousel-fade z-depth-1-half" data-ride="carousel">
                    <ol className="carousel-indicators" >
                        {obj.image_url.map((oj, k) =>

                            <li data-target="#carousel-example-1z" key={k} data-slide-to={k} style={{ backgroundColor: '#3b5998' }} className={k + 1 == state ? 'active' : null} onClick={(e) => imgindex(k + 1)}></li>
                        )}
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {obj.image_url.map((oj, k) =>
                            <div className={k + 1 == state ? "carousel-item active" : "carousel-item"} key={k}>
                                <img className="d-block w-100" src={oj} alt={k + 1} />
                            </div>
                        )}

                    </div>
                    <a className="carousel-control-prev" role="button" data-slide="prev">
                        <span aria-hidden="true" onClick={(e) => previous()}><Icon name="arrow alternate circle left" color="blue" size="big" /></span>
                        <span className="sr-only" >Previous</span>
                    </a>
                    <a className="carousel-control-next" role="button" data-slide="next">
                        <span aria-hidden="true" onClick={(e) => next(obj.image_url.length)}><Icon name="arrow alternate circle right" color="blue" size="big" /></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

            <Card.Content>

                <Card.Meta style={{ textDecoration: 'line-through' }}>S/{obj.precioanterior == 0 ? parseFloat(obj.precio + 200, 10).toFixed(2) : null}</Card.Meta>
                <Card.Header >S/{parseFloat(obj.precio, 10).toFixed(2)}</Card.Header>
                <Card.Description>
                    {obj.name}
                    {/* <strong>best friends</strong> */}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    {
                        auth.isadmin == 1 ?
                            <Fragment>
                                <Link
                                    href={{
                                        pathname: 'editar/[slug]',
                                        query: { slug: obj.id },

                                        // auth: auth

                                    }}
                                >
                                    <Button basic color='blue' size='mini' compact>
                                        Editar
                                    </Button>
                                </Link>

                                {
                                    obj.activado == 1 ?
                                        <Button basic color='red' size='mini' compact>
                                            Deshabilitar
                                        </Button>
                                        // null
                                        :
                                        <Button basic color='blue' size='mini' compact>
                                            Habilitar
                                         </Button>
                                }
                            </Fragment>
                            :
                            <Fragment>
                                <Button basic color='green' size='mini' compact onClick={(e) => agregaralcarrito(obj)}>
                                    Agregar al carrito
                                </Button>
                                <Button basic color='blue' size='mini' compact>
                                    Comprar
                                </Button>
                            </Fragment>
                    }
                </div>
            </Card.Content>
        </Card >
    );
}

export default showproductounique;
