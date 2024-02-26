import React from 'react';
import {Navbar, Button, Nav, NavDropdown, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import {logout} from "../features/userSlice";
import '../css/Navigation.css';

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout(){
      dispatch(logout());
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
      <Navbar.Brand>   <img src="/pawz_logo.png" height={53} width={90} alt="Logo" />
</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {user && !user.isAdmin &&(
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  {user?.cart.count >0 &&(
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}

            {user && (
            <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
              {user.isAdmin && (
                <>
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/new-product">
                    <NavDropdown.Item>Create Product</NavDropdown.Item>
                  </LinkContainer>
                </> 
              )}

              {!user.isAdmin && (
                <>
                   <LinkContainer to="/cart">
                   <NavDropdown.Item>Cart</NavDropdown.Item>
                 </LinkContainer>

                 <LinkContainer to="/orders">
                   <NavDropdown.Item>My Orders</NavDropdown.Item>
                 </LinkContainer>
                 </>
              )}
              <NavDropdown.Divider />
              <Button variant="danger" onClick={handleLogout} className="btn-logout">Logout</Button>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}



export default Navigation