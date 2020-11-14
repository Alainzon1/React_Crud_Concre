import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './Nav';
import {getToken} from './helpers';
import 'react-quill/dist/quill.bubble.css';

const UpdatePost = (props) => {
    const [state, setState] = useState({
        nombre: '',
        apellido: '',
        apellidoM: '',
        calle: '',
        numeroD: '',
        colon: '',
        codigoP: '',
        numeroTel: '',
        rfc: '',
        user: ''
    })

    const { nombre, apellido, apellidoM, numeroD, calle, colon, codigoP, numeroTel, rfc, slug, user } = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                const { nombre, apellido, apellidoM, numeroD, calle, colon, codigoP, numeroTel, rfc, slug, user } = response.data
                setState({ ...state, nombre, apellido, apellidoM, numeroD, calle, colon, codigoP, numeroTel, rfc, slug, user })
            })
            .catch(error => alert('Error loading single post'));
    }, []);

    const handleChange = (name) => (event) => {
        // console.log('name', name, 'event', event.target.value)
        setState({ ...state, [name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.table({ title, content, user });
        axios
            .put(
                `${process.env.REACT_APP_API}/post/${slug}`, 
                { nombre, apellido, apellidoM, numeroD, calle, colon, codigoP, numeroTel, rfc, user },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                console.log(response)
                const { nombre, apellido, apellidoM, numeroD, calle, colon, codigoP, numeroTel, rfc, user } = response.data
                //vaciar el state
                setState({ ...state, nombre, apellido, apellidoM, numeroD, calle, colon, codigoP, numeroTel, rfc, user })
                //mostrar alerta de exito
                alert(`Postulante ${nombre+apellido} actualizado`)
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="text-muted">Nombre</label>
                        <input
                            onChange={handleChange('nombre')}
                            value={nombre} type="text"
                            className="form-control"
                            placeholder="Escriba su nombre"
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="text-muted">Apellido Paterno</label>
                        <input
                            onChange={handleChange('apellido')}
                            value={apellido} type="text"
                            className="form-control"
                            placeholder="Escriba su apellido paterno"
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label className="text-muted">Apellido Materno</label>
                        <input
                            onChange={handleChange('apellidoM')}
                            value={apellidoM} type="text"
                            className="form-control"
                            placeholder="Escriba su apellido materno(opcional)"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="text-muted">Calle</label>
                        <input
                            onChange={handleChange('calle')}
                            value={calle} type="text"
                            className="form-control"
                            placeholder="Escriba su calle"
                            required
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label className="text-muted">Número</label>
                        <input
                            onChange={handleChange('numeroD')}
                            value={numeroD} type="text"
                            className="form-control"
                            placeholder="Escriba su número de domicilio"
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label className="text-muted">Colonia</label>
                        <input
                            onChange={handleChange('colon')}
                            value={colon} type="text"
                            className="form-control"
                            placeholder="Escriba su colonia"
                            required
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label className="text-muted">Código Postal</label>
                        <input
                            onChange={handleChange('codigoP')}
                            value={codigoP} type="text"
                            className="form-control"
                            placeholder="Escriba su CP"
                            required
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label className="text-muted">Teléfono</label>
                        <input
                            onChange={handleChange('numeroTel')}
                            value={numeroTel} type="text"
                            className="form-control"
                            placeholder="Escriba su teléfono"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="text-muted">RFC</label>
                    <input
                        onChange={handleChange('rfc')}
                        value={rfc} type="text"
                        className="form-control"
                        placeholder="Escriba su RFC"
                        required
                    />
                </div>
                <div className="form-row">
                <div className="form-group col-md-2">
                    <button className="btn btn-primary">Crear</button>
                </div>
                </div>
        </form>
    )

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>Update Post</h1>
            {showUpdateForm()}
        </div>
    )
};

export default UpdatePost;