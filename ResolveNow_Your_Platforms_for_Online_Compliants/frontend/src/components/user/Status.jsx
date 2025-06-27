import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';
import '../styles/Status.css'; // ✅ Make sure to import the new CSS

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;
    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  return (
    <div className="status-wrapper">
      <div className="status-container">
        {statusCompliants.length > 0 ? (
          statusCompliants.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <Card key={index} className="status-card">
                <Card.Body>
                  <Card.Title><strong>Name:</strong> {complaint.name}</Card.Title>
                  <Card.Text><strong>Address:</strong> {complaint.address}</Card.Text>
                  <Card.Text><strong>City:</strong> {complaint.city}</Card.Text>
                  <Card.Text><strong>State:</strong> {complaint.state}</Card.Text>
                  <Card.Text><strong>Pincode:</strong> {complaint.pincode}</Card.Text>
                  <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                  <Card.Text><strong>Status:</strong> {complaint.status}</Card.Text>
                  <Button
                    className="toggle-btn"
                    onClick={() => handleToggle(complaint._id)}
                    aria-controls={`collapse-${complaint._id}`}
                    aria-expanded={open}
                    variant="primary"
                  >
                    Message
                  </Button>

                  <Collapse in={open}>
                    <div>
                      <Card body className="chat-card">
                        <ChatWindow
                          key={complaint.complaintId}
                          complaintId={complaint._id}
                          name={complaint.name}
                        />
                      </Card>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Alert variant="info" className="w-100 text-center">
            <Alert.Heading>No complaints to show</Alert.Heading>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Status;
