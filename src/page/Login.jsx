import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const submit = (data) => {
        
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
        .then((res) => {
                    console.log(res.data?.data.token)
                    localStorage.setItem("token", res.data?.data.token); 
                    navigate('/');
                    
        })
        .catch(error => {
            if(error.response?.status === 401){
                alert("Credenciales inválidas")
            }
            console.log(error.response)
        })
    }

    return (
        
        <Form className='login' onSubmit={handleSubmit(submit)} >
            <h2>Login</h2>
            <div className='testData'>
                <h4>Test Data</h4>
                <p><b>Email: </b>john@gmail.com</p>
                <p><b>Password: </b>john1234</p>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email"
                {...register("email")} />
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password"
                {...register("password")} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        
    );
};

export default Login;