import React from 'react';
import { Form } from 'semantic-ui-react'

const verificardatos = ({ auth, carrito, setpass, pass, setcomplete, complete }) => {
    return (
        <Form>
            <div className="col-md-12 mt-4">
                <hr />
                <h6><i className="fas fa-thumbtack"></i> Información Personal</h6>
                <hr />
            </div>
            <Form.Group widths='equal'>
                <Form.Field>

                    <label>DNI</label>
                    <input disabled value={auth.dni || ""} />
                </Form.Field>
                <Form.Field>

                    <label>Nombres</label>
                    <input value={auth.first_name || ""} disabled />
                </Form.Field>

            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>

                    <label>Apellidos</label>
                    <input value={auth.last_name || ""} disabled />
                </Form.Field>
                <Form.Field>

                    <label>Email</label>
                    <input disabled value={auth.email || ""} />
                </Form.Field>

            </Form.Group>
            <div className="col-md-12 mt-4">
                <hr />
                <h6><i className="fas fa-thumbtack"></i> Datos de envio</h6>
                <hr />
            </div>
            <Form.Group widths='equal'>
                <Form.Field>

                    <label>Dirección</label>
                    <input disabled value={auth.direccion || ""} />
                </Form.Field>
                <Form.Field>

                    <label>Region/Departamento</label>
                    <input value={auth.departamento || ""} disabled />
                </Form.Field>

            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>

                    <label>Provincia</label>
                    <input disabled value={auth.provincia || ""} />
                </Form.Field>
                <Form.Field>

                    <label>Distrito</label>
                    <input value={auth.distrito || ""} disabled />
                </Form.Field>

            </Form.Group>
            <Form.Group widths='2'>
                <Form.Field>

                    <label>Celular / Teléfono</label>
                    <input disabled value={auth.telefono || ""} />
                </Form.Field>

            </Form.Group>

            <Form.Button color='facebook' onClick={() => { setpass(pass + 1), setcomplete([...complete, pass]) }}>Continuar</Form.Button>
        </Form>
    );
}

export default verificardatos;
