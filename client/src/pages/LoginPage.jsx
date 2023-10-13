import React from "react";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <div>
      <h1>Instagram Login</h1>
      <LoginForm/>
      <Footer link={'/signup'} textToggler={'Sign Up'} />
    </div>
  );
};

export default LoginPage;
