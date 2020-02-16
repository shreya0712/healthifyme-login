import React from "react";
import "./index.scss";
import logo from "../hm_logo.png";

export const LoginComponent = props => {
  const { title } = props;
  return (
    <section className="header-container">
      <img src={logo} alt="healthify-me-header" />
      <span> | {title}</span>
    </section>
  );
};
export default LoginComponent;
