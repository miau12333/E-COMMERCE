import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slice/favorites.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector((state) => state.favorites)
    useEffect(() => {
        dispatch((getPurchasesThunk())); //siempre llevan parentesis
    }, []);
    

    return (
        <div>
            <h1>THIS IS PURCHASE</h1>
            <ListGroup variant='flush'>
                {purchases.map(purchase => (
                <ListGroup.Item className='purchase-flex' key={purchase.id}>
                    {purchase?.cart.products.map(product =>(
    
                        <div  key={product.id} onClick={()=>navigate(`/productDetail/${product.id}` )}>
                            <h4>{product.title}</h4> 
                            <p>${product.price}</p> 
                            <p>Qty: {product.productsInCart.quantity} <b>UND</b></p>
                            
                        </div>
                            
                    ))}
                </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Purchases;

