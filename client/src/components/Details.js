import React from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap';
import axios from 'axios'


const Details = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get("/api/get-details")
            .then((res) => setData(res.data));
    }, []);

    return (
        <Container>
             <h4>All Submissions</h4>
             <hr/>
            <Row>
                {data?.length > 0 ?
                    data.map((item) => (
                        <Col sm={12} md={6} key={item._id} className="p-3">
                            <Card>
                                <Card.Body style={{ padding: "20px" }}>
                                    <p><b>Name: </b> {item.name}</p>
                                    <p><b>Date of Birth: </b>{item.dob}</p>
                                    <p><b>Email: </b>{item.email}</p>
                                    <p><b>Phone Number: </b>{item.phone_number}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                    : <p>No Submissions</p>
                }
            </Row>
        </Container>
    )
}

export default Details