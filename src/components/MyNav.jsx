import React, { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PurchasesSideBar from './PurchasesSideBar';

const MyNav = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    
    return (
        <div>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                
            <Navbar.Brand to="/" as={Link}>HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/login" >LOGIN</Nav.Link>
                    <Nav.Link as={Link} to="/purchases">PURCHASES</Nav.Link>
                    <Nav.Link onClick={handleShow} >PURCHASES (Sidebar)</Nav.Link>
                    <Nav.Link onClick={logout} >Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
      </Navbar>
      <PurchasesSideBar show={show} handleClose={handleClose}/>
        </div>
    );
};

export default MyNav;