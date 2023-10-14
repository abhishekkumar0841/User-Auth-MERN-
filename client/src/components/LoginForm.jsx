import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();


  const [inputText, setInputText] = useState({
    userName: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputText((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const userLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputText),
      });
      const loginData = await response.json();
      console.log("PRINTING LOGIN DATA-->", loginData);
      console.log("PRINTING USER TOKEN-->", loginData.userToken);
      
      const userToken = loginData.userToken;
      localStorage.setItem("token", userToken);

      if(response.status === 200){
        navigate('/')
      }
      
    } catch (error) {
      console.log("Error while Login", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Printing login data-->", inputText);
    userLogin();
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          value={inputText.userName}
          onChange={changeHandler}
          type="text"
          name="userName"
          id="userName"
          placeholder="john@333"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={inputText.password}
          onChange={changeHandler}
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
      </div>
      <div>
        <Button text={"Log In"} />
      </div>
    </form>
  );
};

export default LoginForm;
