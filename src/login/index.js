import React, { useState, useCallback, useReducer } from "react";
import { withRouter } from "react-router-dom";

import "./index.scss";
import Header from "../header";
import logo from "../hm_logo.png";
import {
  URL,
  PWD_FORMAT,
  PWD_TOO_SHORT,
  EMAIL_FORMAT_ERROR,
  REQUIRED_ERROR
} from "../config";

const initialState = { pending: false, success: false, failure: false };

function reducer(state, action) {
  switch (action.type) {
    case "pending":
      return { ...state, pending: true, success: false, failure: false };
    case "failure":
      return { ...state, pending: false, success: false, failure: true };
    case "success":
      return { ...state, pending: false, success: true, failure: false };
    default:
      throw new Error();
  }
}

export const LoginComponent = props => {
  const [email, setEmail] = useState(""); //state to be connected to email field
  const [password, setPassword] = useState(""); //state to be connected to password field
  const [errors, setErrors] = useState({ email: "", password: "" }); // error message, if any
  const [state, dispatch] = useReducer(reducer, initialState); // used to update state of AJAX request

  /**
   * function validates input text, and sets sets corresponding
   * error message in case of invalid input
   */
  const validateInput = useCallback(
    (inputName, value) => {
      switch (inputName) {
        case "password": {
          let regex = /^(?=.*[A-Z]).{6,}$/;
          if (value.length === 0) {
            setErrors({ ...errors, password: REQUIRED_ERROR });
          } else if (value.length < 6) {
            setErrors({ ...errors, password: PWD_TOO_SHORT });
          } else if (!value.match(regex)) {
            setErrors({
              ...errors,
              password: PWD_FORMAT
            });
          } else {
            setErrors({ ...errors, password: true });
          }
          break;
        }
        case "email": {
          let regex = /[^@]+@[^\.]+\..+/;
          if (value.length === 0) {
            setErrors({ ...errors, email: REQUIRED_ERROR });
          } else if (!value.match(regex)) {
            setErrors({ ...errors, email: EMAIL_FORMAT_ERROR });
          } else {
            setErrors({ ...errors, email: true });
          }
          break;
        }
        default:
          break;
      }
    },
    [errors]
  );

  /**
   * updates state on change of connected input fields
   * also validates input value on each change
   */
  const handleChange = useCallback(
    e => {
      if (!e) return;
      const { name, value } = e.target;
      switch (name) {
        case "password":
          validateInput(name, value);
          setPassword(value);
          break;
        case "email":
          validateInput(name, value);
          setEmail(value);
          break;
        default:
          break;
      }
    },
    [validateInput]
  );

  /**
   * function to handle click of Login button
   * Makes POST call, sending user credentials in request body
   * redirects to /home route on successful login
   */
  const handleSubmit = useCallback(() => {
    dispatch({ type: "pending" });
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(response => {
        if (response.result === "success") {
          dispatch({ type: "success" });
          props.history.push("/home");
        } else dispatch({ type: "failure" });
      })
      .catch(error => {
        dispatch({ type: "failure" });
      });
  }, [email, password, props.history]);

  return (
    <>
      <Header title={"Accounts"} />
      <section className="login-container">
        <div className="login-box">
          <img src={logo} alt="healthify-me" />
          <h3>Sign In</h3>
          <h5>Use your Healthifyme Account</h5>
          <form>
            <input
              type="text"
              name={"email"}
              value={email}
              placeholder="Enter your Email"
              onChange={handleChange}
              data-testid="email"
              className={
                errors.email !== true && errors.email !== "" ? "error" : ""
              }
            />
            <p data-testid="email-error">{errors.email}</p>
            <input
              data-testid="password"
              type="password"
              name={"password"}
              value={password}
              placeholder="Enter your Password"
              onChange={handleChange}
              className={
                errors.password !== true && errors.password !== ""
                  ? "error"
                  : ""
              }
            />
            <p data-testid="pwd-error">{errors.password}</p>
            {state.pending && (
              <i className="fa fa-spinner fa-spin" data-testid="loader"></i>
            )}
            {state.failure && <p>Login Failed!</p>}
            <input
              type="button"
              value="Login"
              onClick={handleSubmit}
              disabled={!(errors.password === true && errors.email === true)}
            />
          </form>
        </div>
      </section>
    </>
  );
};
export default withRouter(LoginComponent);
