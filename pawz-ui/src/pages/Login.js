import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useLoginMutation} from "../services/appApi";
import '../css/Login.css';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [login, {isError, isLoading, error}] = useLoginMutation();


function handleLogin(e){
    e.preventDefault();
    login({email, password});
}
  return (
    <div>
    <Container>
        <Row>
            <Col md={6} className="login-form-container">
                <Form style={{width:"100%"}} onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group className="mt-5">
                        <Form.Label> Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email address" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label> Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" value={password}required onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Button type="submit" disabled={isLoading}>Login</Button>
                    </Form.Group>

                    <p>
                        No account? &nbsp;&nbsp;
                        <Link to="/Signup">Click to register</Link>
                    </p>
                </Form>
            </Col>
            <Col md={6} className="login-image-container"></Col>
        </Row>
    </Container>
    <Footer/>
    </div>
  )
}

export default Login