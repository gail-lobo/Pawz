import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm({total}) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const [cardError, setCardError] = useState(null);

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const amountInCents = Math.round(total * 100);
      const {client_secret} = await fetch("http://localhost:3001/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ",
        },
        body: JSON.stringify({ amount: amountInCents }),
      }).then((res)=> res.json());

      console.log("client_secret:", client_secret);

      const {paymentIntent} = await stripe.confirmCardPayment(client_secret,{
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
     
     setPaying(false);
     if (paymentIntent) {
        createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
          if (!isLoading && !isError) {
            setAlertMessage(`Payment ${paymentIntent.status}`);
            setTimeout(() => {
              navigate("/orders", { state: { total } });
            }, 3000);
          }
        });
      }
  }

  function handleCardChange(event) {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  }

  return (
    <Col md={7} className="cart-payment-container">
      <Form onSubmit={handlePay}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" value={user.firstname} disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" value={user.lastname} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" value={user.email} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>
        <label htmlFor="card-element">Card</label>
        <CardElement id="card-element" onChange={handleCardChange} />
        {cardError && <Alert variant="danger">{cardError}</Alert>}
        <Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess || cardError}>
          {paying ? "Processing..." : "Pay"}
        </Button>
      </Form>
    </Col>
  );
}

export default CheckoutForm;
