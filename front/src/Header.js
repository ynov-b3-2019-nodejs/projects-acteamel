import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
    <div className="header">
        <Navbar bg="info" expand="lg" className="shadow-lg p-3 mb-5 rounded navbar-dark">
            <Navbar.Brand href="/">Pollstar</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Créer un sondage</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

export default Header;