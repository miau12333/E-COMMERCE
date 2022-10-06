import React, { useEffect } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  getPurSideBarThunk, purchaseCartThunk } from '../store/slice/purSideBar.slice';

const PurchasesSideBar = ({ show, handleClose}) => {

  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purSideBar)
  useEffect(() =>{
    dispatch(getPurSideBarThunk())
  }, []);


    return (
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant='flush'>
          {
            purchases?.map(purchase =>(
              <ListGroupItem  key={purchase.id}>
                <Link className='link' to={`/productDetail/${purchase.id}`}>
                  <p>{purchase.title}</p>
                  <p>${purchase.price} </p>
                  <p>Qty:{purchase.productsInCart.quantity} </p>
                </Link>
              </ListGroupItem>
              ))
            }
          </ListGroup>
          <Button className='btn' onClick={() => dispatch(purchaseCartThunk())}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default PurchasesSideBar;
