import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "../css/CartPage.css";
import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";

const stripePromise = loadStripe("pk_test_51NPM3zHfqXEBb9FLoAoHSspNw4QrYaKffEWHuXIhgWYs5gJPzUcqFTnzYQeC8RtMZ6bCWbxeq23LfwyhO2JB32dB001tnLpUme");

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
    

    function handleDecrease(product) {
        const quantity = user.cart[product.productId];
        if (quantity <= 0) return alert("Product Quantity can't go below 0");
        decreaseCart(product);
    }
 
    function handleIncrease(product) {
        increaseCart(product);
    }

    const cartTotal = cart.reduce((accumulator, item) => {
        return accumulator + item.price * user.cart[item._id];
      }, 0);

    const taxRate = 0.13; 
    const tax = cartTotal * taxRate;

    const deliveryRate = 0.02; 
    const delivery = cartTotal * deliveryRate;

    const total = cartTotal + tax + delivery;
  
    return (
        <>
        <Container style={{ minHeight: "95vh" }} className="cart-container">
            <h1 className="pt-2 h3">Shopping cart</h1>
            <Row>
                <Col>
                    {cart.length == 0 ? (
                        <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm total={total}/>
                        </Elements>
                    )}
                </Col>
                {cart.length > 0 && (
                    <Col md={5}>
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* loop through cart products */}
                                    {cart.map((item) => (
                                        <tr key={item._id}>
                                            <td>&nbsp;</td>
                                            <td>
                                                {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                                                <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} alt={item.name}/>
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <i className="fa fa-minus-circle" onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                    <span>{user.cart[item._id]}</span>
                                                    <i className="fa fa-plus-circle" onClick={() => handleIncrease({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                </span>
                                            </td>
                                            <td>${(item.price * user.cart[item._id]).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="cart-summary">
                                <p>
                                    <span>Cart Total:</span> ${cartTotal.toFixed(2)}
                                </p>
                                <p>
                                    <span>Tax (13%):</span> ${tax.toFixed(2)}
                                </p>
                                <p>
                                    <span>Delivery (2%):</span> ${delivery.toFixed(2)}
                                </p>
                                <h3>Total: ${total.toFixed(2)}</h3>
                            </div>
                        </>
                    </Col>
                )}
            </Row>
        </Container>
        <Footer/>
        </>
    );
}

export default CartPage;