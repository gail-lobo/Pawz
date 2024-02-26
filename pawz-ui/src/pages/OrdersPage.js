import React, {useEffect, useState} from 'react';
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from 'react-redux';
import axios from "../axios";
import Loading from "../components/Loading";
import "../css/OrdersPage.css";
import Footer from '../components/Footer';


function OrdersPage() {
    const user = useSelector(state => state.user);
    const products = useSelector(state =>state.products);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`/users/${user._id}/orders`).then(({data}) =>{
            setLoading(false);
            setOrders(data);
        }).catch( (e) => {
            setLoading(false);
            console.log(e);
        });
    }, []);

    if(loading){
        return <Loading />;
    }

    if(orders.length ==0){
        return <h1 className="text-center pt-3">No orders yet</h1>
    }

  return (
    <div className="orders-page-wrapper">
        <Container className="content">
        <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '30px', marginTop: '30px' }} className="text-center">Your Orders</h1>

        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Order#</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (<tr>
                    <td>{order._id}</td>
                    <td>
                        <Badge bg={`${order.status == "processing" ? "warning" : "success"}`} text="white">
                            {order.status}
                        </Badge>
                    </td>
                    <td>{order.date}</td>
                    <td>${order.total}</td>
                </tr>))}
            </tbody>
        </Table>
    </Container>
      <Footer/>
    </div>

  )
}

export default OrdersPage