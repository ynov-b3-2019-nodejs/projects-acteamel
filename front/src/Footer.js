import React from 'react';
import { Form, Container } from 'react-bootstrap';

const Footer = () => (
    <Container id="footer">
        <hr></hr>
        <Form>
            <Form.Group controlId="formPlaintextEmail">
                <Form.Label className="text-info">Actimel - PollStar @ 2019</Form.Label>
                <br />
                <Form.Label className="text-info">Camille Legey - Jérémy Surieux - Théo Schmidt</Form.Label>
            </Form.Group>
        </Form>
    </Container>
);

export default Footer;