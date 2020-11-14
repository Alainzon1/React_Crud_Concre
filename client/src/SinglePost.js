import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './Nav';

const SinglePost = (props) => {
    const [post, setPost] = useState('')

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => setPost(response.data))
            .catch(error => alert('Error al cargar al postulante'));
    }, []);

    const showSinglePost = () => (
        <div className="row">
            <div className="col-md-8 offset-md-2 pt-3 pb-2">
                <div className="form-group col-md-6">
                    <label className="text">Nombre:</label>
                    <h1>{post.nombre}</h1>
                </div>
                <div className="form-group col-md-6">
                    <label className="text">Apellido Paterno:</label>
                    <h1>{post.apellido}</h1>
                </div>
                <div className="form-group col-md-6">
                    <label className="text">Apellido Materno:</label>
                    <h1>{post.apellidoM}</h1>
                </div>
                <div className="form-group col-md-6">
                    <label className="text">Estado:</label>
                    <h1>{post.estado}</h1>
                </div>
                <p>
                    Author <span className="badge">{post.user}</span> Published on {''}
                    <span className="badge">{new Date(post.createdAt).toLocaleDateString()}</span>
                </p>
            </div>
        </div>
    );
    return (
        <div className="container pb-5">
            <Nav />
            {post && showSinglePost()}
        </div>
    );
};

export default SinglePost;