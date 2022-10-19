import React from "react";
import { Row, Col, Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function HomePage() {

  const SubmitForm = async (e) => {
    e.preventDefault();
    
    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      dob: e.target[2].value,
      phone_number : e.target[3].value
    }

    // validation 
    if(CalAge(data.dob) <= 18){
      alert("Age must be above 18 years");
      return;
    }

    const res = await axios.post('/api/user-form', data);
    if(res.data){
      window.location.replace('/details')
    }
  }

  const CalAge = (str) =>{
    var dob = new Date(str);  
    //calculate month difference from current date in time  
    var month_diff = Date.now() - dob.getTime();  
      
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);   
      
    //extract year from date      
    var year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    var age = Math.abs(year - 1970);  

    return age;
  }
  return (
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={6}>
            <Card>
              <Card.Body style={{ padding: "20px" }}>
                <h4>User Details From</h4>
                <hr />
                <Form onSubmit={SubmitForm}>
                  <Form.Group className="mb-3" controlId="ex1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="your name" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="ex2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="ex3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" fromat="dd-mm-yyyy" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="ex3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="XXXXXXXXXX" required />
                  </Form.Group>
                  <Button type="submit" style={{ width: '100%', marginTop: '20px' }}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default HomePage;