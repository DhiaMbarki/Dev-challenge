import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./auth/authContext";
import { Button, Form } from "react-bootstrap";

export default function Singup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }


 

  return (
    <>
      
        
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                maxLength="15"
                minLength="10"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm your account</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                maxLength="15"
                minLength="10"
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} type="submit">
              {" "}
              Sign Up
            </Button>
          </Form>

      
      <div >
        Already Have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
