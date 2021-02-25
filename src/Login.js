import React from "react";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <section className="login">
      <div className="loginContainer">
      <label>UserName</label>
      <input
        type="text "
        autoFocus
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className = "errorMsj">{emailError}</p>
      <label>password</label>
      <input type ="password" required value ={password} onChange ={e => setPassword(e.target.value) }/>
      </div>
    </section>
  );
};

export default Login;
