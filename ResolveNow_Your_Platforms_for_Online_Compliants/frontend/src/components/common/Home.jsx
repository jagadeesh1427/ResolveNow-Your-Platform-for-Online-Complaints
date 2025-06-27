import React from 'react';
import { Navbar, Container, Nav, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image1 from '../../Images/Image1.png';
import Footer from './FooterC';
import '../styles/Home.css'; // ✅ Relative path

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">ComplaintCare</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container fluid className="home-hero-section d-flex align-items-center text-white">
        <Row className="justify-content-center align-items-center w-100">
          <Col md={6} className="text-center text-md-start px-5">
            <h1 className="display-4 fw-bold">Empower Your Team</h1>
            <p className="lead">
              Exceed customer expectations with our smart complaint management solution.
            </p>
            <Link to="/login">
              <Button variant="light" size="lg" className="mt-3">Register Your Complaint</Button>
            </Link>
          </Col>
          <Col md={6} className="text-center">
            <img src={Image1} alt="Hero" className="img-fluid animated-image" />
          </Col>
        </Row>
      </Container>

      

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
