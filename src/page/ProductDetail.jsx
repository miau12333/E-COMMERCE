import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addProductSideThunk } from '../store/slice/purSideBar.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.newProducts)

   const [rate, setRate] = useState(0);
    const productsShop = productList.find(product => product.id === Number(id)) 

    console.log(productsShop);
    
    const relatedProduct = productList.filter(
        (products) => products.category.id === productsShop.category.id
    );

    useEffect(() =>{
        setRate(0);
    }, [id])
    
    const addPurchases = () =>{
        const purchase = {
            id: id,
            quantity: rate
        };
        dispatch(addProductSideThunk(purchase))
    }
    return (
        <div>
            <h1>Your Product</h1>
            
                <Row>
                <Col >
                <Carousel fade variant="dark">
                    
                        {
                            productsShop.productImgs?.map((img) =>(
                                
                                <Carousel.Item key={img}> 
                                <img
                                className="d-block w-100 img"
                                src={img}
                                />
                            </Carousel.Item>
                           )) 
                        }
                </Carousel>
                </Col>
                <Col>
                
                <div className="rate">
                    <Button className="me-3 btnRate" onClick={() => setRate(rate - 1)} disabled={rate === 0 }>
                        -
                    </Button>
                    {rate}
                    <Button className="ms-3 btnRate" onClick={() => setRate(rate + 1)}>
                        +
                    </Button>
                    <br />
                    <Button onClick={addPurchases}>Add to Cart</Button>
                    
                </div>
                <br />
                <h2>{productsShop.title}</h2>
                <p><b>$</b>{productsShop.price}</p>
                <p><b>Category: </b>{productsShop.category.name}</p>
                <p>{productsShop.description}</p>
                </Col>
                </Row>
            
            <div>
            <ListGroup horizontal className='listRelated'  >
                {relatedProduct.map((product) => (
                    <ListGroup.Item variant='primary' style={{width: '18rem'}}   key={product.id}>
                                <Link className='link' to={`/productDetail/${product.id}`}>
                                    <h5>{product.title}</h5>
                                <img className='imgRelated' src={product.productImgs?.[1]}/>
                                <p><b>$ </b>{product.price}</p>
                                </Link>
                            </ListGroup.Item>
                ))}
        
            </ListGroup>
            </div>
        </div>
    );
};

export default ProductDetail;