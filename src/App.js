import React from "react";
import Firebase from './Firebase'
import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const handleLogin = () => {
    Firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
          case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
              case "auth/wrong-password":
              setPasswordError(err.message);
              break;

      }
    })
  }
  const handleSignup = () => {
    Firebase
    .auth()
    .CreateUserWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
          case "auth/invalid-email":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
              case "auth/weak-password":
              setPasswordError(err.message);
              break;

      }
    })
  }
  const handleLogout = () => {
    Firebase.auth(). onAuthStateChange(user => {
      if(user) {
        setUser(user)
      }else {
        setUser("");
      }
    })
  }
  useEffect(() => {
    authListenner();
  }, [])
  
  return (
    <div className="App">
      <h1>Ne9es</h1>
    </div>
  );
}

export default App;
