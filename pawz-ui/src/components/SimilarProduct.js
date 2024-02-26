import React from 'react';
import {Badge, Card} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/LinkContainer";

function SimilarProduct({_id, category, name, pictures}) {
  return (
    <LinkContainer to = {`/product/${_id}`}  style={{cursor:'pointer', width:'13rem', margin:'10px'}}>
        <Card style={{width:"20rem", margin:"10px"}}>
            <Card.Img variant="top" className="product-preview-img" src={pictures[0].url} style={{objectFit:"contain", width: "100%", height: "300px"}}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
            </Card.Body>
            <Badge bg="warning" text="dark">
                { category.toUpperCase() }
            </Badge>
        </Card>
    </LinkContainer>
  )
}

export default SimilarProduct;