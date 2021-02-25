import React from "react";
import "./Login.css";
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
        <label>Email</label>
        <input
          type="text "
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsj">{emailError}</p>
        <label>password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsj">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                I dont have account ?
                <span onClick={() => setHasAccount(!hasAccount)}>sign Up</span>{" "}
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>sign up</button>
              <p>
                I already have account ?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>{" "}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
