import { useContext, useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button as Btn } from "@mui/material";
import {signInWithEmailAndPassword, onAuthStateChanged, getAuth} from 'firebase/auth'
import { ref, child, get,getDatabase } from "firebase/database";
import Dots from "react-activity/dist/Dots";
import Bounce from "react-activity/dist/Bounce";
import app from '../firebaseConfig'
import { CssBaseline, ThemeProvider } from "@mui/material";
import axios from "axios";
import AuthContext from "../components/shared/authContext";
import { LoadingContext } from "../components/shared/authContext";
import { keys } from "../components/shared/variables";

const auth = getAuth(app)
export default function Login() {
    const [loading, setLoading] = useContext(LoadingContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const { login } = useContext(AuthContext)
    const { user } = useContext(AuthContext);

    useEffect(()=>{
      console.log('user')
      if(user){
        navigate('/home')
        // console.log(user.email)
      }

  },[user])


    const handleChangeEmail = (text) => {
      setEmail(text.target.value)
      // console.log(email)
    }
    const handleChangePassword = (text) => {
      setPassword(text.target.value)
    }



  async  function handleSignin (){

      if(!email){
        alert('Email is Required')
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        alert('Enter a Valid email address')
      }else{

        setLoading(true)
        let payload = {
          email: email,
          password: password
        }

        await login(payload)
        }
      }





  return (
    <div style={{backgroundColor:'#001133'}}>
      
    <Container>
    
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
          {/* <CssBaseline /> */}
              <div className="mb-3 mt-md-4">
              <img
                  className="rounded mx-auto d-block"
                  alt="logo"
                  width="80px"
                  height="80px"
                  src={require('../assets/images/icon.png')}
                  style={{ cursor: "pointer", borderRadius: "50%", }}
                />
                <h2 className="fw-bold mb-5 text-uppercase text-center">Tokpay</h2>
                <p className=" mb-5 text-center">Please enter email and password</p>
                <div className="mb-3">
                  <Form onSubmit={handleSignin}>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label className="text-start">
                        Email
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
                    </Form.Group>
                    <Form.Group
                      // className="mb-2"
                      // controlId="formBasicCheckbox"
                    >
                      <p className="small">
                        <Btn onClick={()=> navigate('/forgot')}>

                          <a className="text-primary" >
                            Forgot password?
                          </a>
                        </Btn>
                      </p>
                    </Form.Group>
                     {!loading ? (

                        <Button disabled={loading} variant="primary" onClick={handleSignin} style={{padding:5, width:'100%'}}>
                          Login
                        </Button>
                        ) : (
                        <Button disabled={loading} variant="primary"style={{padding:5, width:'100%'}}>
                          <Bounce />
                        </Button>
                        )}
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
  
  