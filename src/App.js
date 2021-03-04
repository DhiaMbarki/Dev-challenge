import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { AuthProvider } from "./auth/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";


function App() {

  return (
    
      <>
        <Container>
          <div>
            <Router>
              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path="/" component={Profile} />
                  <PrivateRoute path="/update-profile"  component={UpdateProfile}/>
                  <Route path="/SignUp" component={SignUp} />
                  <Route path="/login" component={Login} />
                </Switch>
              </AuthProvider>
            </Router>
          </div>
        </Container>
      </>
  );
}

export default App;
