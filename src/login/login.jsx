import { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {signInWithEmailAndPassword, onAuthStateChanged, getAuth} from 'firebase/auth'
import { ref, child, get,getDatabase } from "firebase/database";
import Dots from "react-activity/dist/Dots";




export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const handleChangeEmail = (text) => {
      setEmail(text.target.value)
      // console.log(email)
    }
    const handleChangePassword = (text) => {
      setPassword(text.target.value)
    }



    function handleSignin (){
      navigate('/home')
    }



  return (
    <div>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          {/* <div className="border border-3 border-primary"></div> */}
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-5 text-uppercase ">Tokpay</h2>
                <p className=" mb-5 text-start">Please enter your login and password!</p>
                <div className="mb-3">
                  <Form onSubmit={handleSignin}>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label className="text-start">
                        Email address
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    >
                      <p className="small">
                        <a className="text-primary" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
    );
  }
  
  