import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Nav from "./Nav";
import { authenticate, getUser } from './helpers';


const Login = (props) => {
    const [state, setState] = useState({
        name: '',
        password: '',
    });
    const { name, password } = state; // destructure values from state


    useEffect(() => {
        getUser() && props.history.push('/');
    }, []);

    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.table({ name, password });
        axios
            .post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then((response) => {
                console.log(response);
                // response will contain token and name
                authenticate(response, () => props.history.push('/create'));

                // redirect to create page
            })
            .catch((error) => {
                console.log(error.response);
                alert(error.response.data.error);
            });

    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>LOGIN</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Contraseña</label>
                    <input
                        onChange={handleChange("password")}
                        value={password}
                        type="password"
                        className="form-control"
                        placeholder="Your password"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div >
    );
};

export default withRouter(Login);