import React from 'react'
import {Container, Nav, Tab, Col, Row} from "react-bootstrap"
import axios from '../axios'
import DashboardProducts from '../components/DashboardProducts'
import OrdersAdminPage from '../components/OrdersAdminPage'
import ClientsAdminPage from '../components/ClientsAdminPage'
import Footer from '../components/Footer'
import '../css/AdminDashboard.css'

function AdminDashboard() {
  return (
    <div className="admin-dashboard-wrapper">
    <Container className="content">
        <Tab.Container defaultActiveKey="products">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className = "flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="products">
                                Products
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="orders">
                                Orders
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="clients">
                                Clients
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content >
                    <Tab.Pane eventKey ="products">
                    <DashboardProducts/>
                    </Tab.Pane>
                
                <Tab.Pane eventKey ="orders">
                    <OrdersAdminPage/>
                    </Tab.Pane>

                <Tab.Pane eventKey ="clients">
                    <ClientsAdminPage/>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </Container>
    <Footer/>
    </div>
  )
}

export default AdminDashboard