import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import '../styles/login.css';

const Login = () => {

    const { register, handleSubmit } = useForm();
    const isLoged = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');
    const [user, setUser] = useState({});


    useEffect(() => {
        userInfo && setUser(JSON.parse(userInfo));
    }, []);

    const navigate = useNavigate();

    const submit = data => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                navigate('/');
            })
            .catch(error => console.log(error.response))
    }

    const logOut = () => {
        localStorage.clear();
    };

    return (
        <div className='login'>
            {
                isLoged ? (
                    <div>
                        <i class="fa-solid fa-circle-user fa-xl"></i>
                        <b>{user.firstName} {user.lastName}</b>
                        <button onClick={logOut}>logout</button>
                    </div>
                ) : (
                    <div>
                        <strong>Welcome! Enter your email and password to continue</strong>

                        <div>
                            <b>Test Data</b>
                            <p><i className="fa-solid fa-envelope"></i> mason@gmail.com</p>
                            <p><i className="fa-solid fa-lock"></i> mason1234</p>
                        </div>

                        <form onSubmit={handleSubmit(submit)}>
                            <label htmlFor="email">Email</label>
                            <input type="text" {...register("email")} id="email" />
                            <label htmlFor="password">Password</label>
                            <input type="password" {...register("password")} id="password" />
                            <button type='submit'>Login</button>
                        </form>

                        <p>Don't have an account? Sign up</p>
                    </div>
                )
            }
        </div>
    );
};

export default Login;