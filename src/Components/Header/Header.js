import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Fresh Valley</a>
                <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </Button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/home" className="nav-item nav-link">Home</Link>
                        <Link to="/orders" className="nav-item nav-link">Orders</Link>
                        <Link to="/admin" className="nav-item nav-link">Admin</Link>
                        <Link to="/login" className="nav-item nav-link">Login</Link>
                      
                    </div>
                </div>
            </Nav>
        </div>
    );
};

export default Header;