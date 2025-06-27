import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/About.css';

const AboutUs = () => {
  return (
    <Container className="py-5 about-page">
      <h2 className="text-center mb-4">About Us</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Text>
                Welcome to ComplaintCare – your reliable platform for managing complaints efficiently.
              </Card.Text>
              <Card.Text>
                Users can submit complaints which are directly sent to the admin dashboard. Our system enables the admin to view each complaint and assign it to the most suitable agent for resolution. This ensures quick action and full transparency throughout the process.
              </Card.Text>
              <hr />
              <h5>Contact Us</h5>
              <p>Email: support@complaintcare.com</p>
              <p>Phone: +91-9876543210</p>
              <p>Address: 123 Support Lane, Help City, India</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
