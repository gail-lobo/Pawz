import React, {useState} from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import {Link} from "react-router-dom";
import '../css/Signup.css';
import {useSignupMutation} from "../services/appApi";
import Footer from "../components/Footer";

function Signup() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, {error, isLoading, isError}] = useSignupMutation();

    function handleSignup(e){
        e.preventDefault();
        signup({firstname,lastname,email,password});
    }


  return (
    <div>
    <Container>
    <Row>
        <Col md={6} className="signup-form-container mt-5">
            <Form style={{width:"100%"}} onSubmit={handleSignup}>
                <h1>Register</h1>
                {isError && <Alert variant="danger">{error.data}</Alert>}
                <Form.Group className="mt-5">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your first name" value={firstname} required onChange={(e)=>setFirstName(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your last name" value={lastname} required onChange={(e)=>setLastName(e.target.value)}/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label> Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email address" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-4'>
                    <Form.Label> Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-2'>
                    <Button type="submit" disabled={isLoading}>Register</Button>
                </Form.Group>

                <p>
                    Already registered?&nbsp;&nbsp;
                    <Link to="/Login">Click to login</Link>
                </p>
            </Form>
        </Col>
        <Col md={6} className="signup-image-container"></Col>
    </Row>
</Container>
<Footer/>
</div>
  )
}

export default Signup;