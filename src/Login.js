import React, { useRef, useState } from "react";
import { useAuth } from "./auth/authContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Form,  } from "react-bootstrap";
import firebase from "./firebase"




export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();


    
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Sign in");
    }
    setLoading(false);
  }
  // onSubmit = () => {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  // }

 
  return (
    <>
          <h2 >Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="your email"
                type="email"
                ref={emailRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="password"
                type="password"
                ref={passwordRef}
                required
                maxLength="20"
                minLength="10"
              ></Form.Control>

            
            </Form.Group>
            <Button disabled={loading} type="submit">
              Log In
            </Button>
          </Form>
        
        
      
      <div >
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>

      {/* <button onClick ={this.onSubmit}>signup with google</button> */}

    </>
  );
}
