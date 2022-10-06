import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Form, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();
    const newproducts = useSelector(state => state.newProducts);
    const [categories, setCategories] = useState([]);
    const [productFiltered, setProductFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState(""); 

    useEffect(() => {
        axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
        .then(res => setCategories(res.data.data.categories))
    }, []);
    

    useEffect(() => {
        setProductFiltered(newproducts)
    }, [newproducts])

    const filterCategory = (categoryId) => {
        const filtered = newproducts.filter((product) => 
            product.category.id === categoryId
        ) 
        setProductFiltered(filtered);
    }
        
    const searchProducts = () =>{
            const filtered = newproducts.filter(
                products => products.title.toLowerCase().includes(searchValue.toLowerCase())
            ) 
                setProductFiltered(filtered)
    }

    return (
        <Row>
        <Col lg={3}>
            <h1 className='list-Category'>Categories</h1>
            <ListGroup className='list-Category' variant='flush'>
            {
                categories.map((category) =>(
                    <ListGroupItem  key={category.id} action onClick={() => filterCategory(category.id)} >
                        {category.name}
                    </ListGroupItem>))
            }
            </ListGroup>
        </Col>
        <Col>
            <div>
            <InputGroup className="mb-3">
                <Form.Control className="size-input"
                placeholder="Search your product"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                />
                <Button variant="outline-secondary" className='size-input' id="button-addon2" onClick={searchProducts}>Search</Button>
            </InputGroup>
            </div>
            <Row xs={1} md={2} xl={3} className="g-4"> 
                {
                    productFiltered.map((newproduct) => (
                        <Col key={newproduct.id} >
                            <Card className='card1' style={{ width: '18rem', height: '25rem'}} onClick={() => navigate(`/productDetail/${newproduct.id}`)}>     
                                <Card.Img className='imgHome' variant="top" src={newproduct.productImgs?.[0]} />
                                <Card.Body>
                                <Card.Title>{newproduct.title}</Card.Title>
                                <Card.Text>
                                    <b>$ {newproduct.price}</b>
                                    <p>{newproduct.category.name}</p>
                                </Card.Text>
                                </Card.Body>

                            </Card>  
                        </Col>
                    ))
                }
            </Row>    
        </Col>

        </Row>
    );
};


export default Home;