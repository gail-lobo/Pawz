import React, { useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import categories from "../categories";
import axios from "../axios";
import '../css/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';
import Footer from '../components/Footer';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const latestProducts = products.slice(0,8)

  useEffect(() =>{
      axios.get("/products").then(({data}) => dispatch(updateProducts(data)));
  },[]);

  return (
    <>
    <Container>      
      <Row>     
        <Col md={12} className="home-banner-container"></Col>
      </Row>

      <h2 md={12} className="mt-5 mb-4">Latest Products</h2>
      <div className='d-flex justify-content-between flex-wrap my-component-container'>
      {
        latestProducts.map((product) =>(
          <ProductPreview {...product}/>
        ))
      }
      </div>
      <Row>
        <Col md={12} className="mt-3">
          <Link to="/category/all" style={{textAlign:"right", display:"block", textDecoration:"none",}}>See more {">>"}</Link>
        </Col>
      </Row>

      <h2 md={12} className="mt-4">Categories</h2>
      <Row>
        {categories.map((category)=>(
          <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
            <Col md={4}>
              <div style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), URL(${category.img})`, gap:"10px"}} className="category-tile">
                {category.name}
              </div>
            </Col>
          </LinkContainer>
        ))}
      </Row>
    </Container>
    <Footer /> 
    </>
  )
}

export default Home;