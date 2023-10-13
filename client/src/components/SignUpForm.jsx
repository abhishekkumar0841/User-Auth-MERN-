import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate()
  const [inputText, setInputText] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const changeHandler = (e) => {
    // const {name, value} = e.target;
    setInputText((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Printing form data-->", inputText);

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputText),
      });
      const signUpData = await response.json();
      console.log("PRINTING SINGUP DATA-->", signUpData);

      setInputText({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        bio: "",
      });

     if(response.status === 200){
      navigate('/login')
     }
    } catch (error) {
      console.log("ERROR AT SIGNUPFORM.JSX--", error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          value={inputText.firstName}
          onChange={changeHandler}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="John"
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          value={inputText.lastName}
          onChange={changeHandler}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="John"
        />
      </div>

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
        <label htmlFor="email">Email</label>
        <input
          value={inputText.email}
          onChange={changeHandler}
          type="email"
          name="email"
          id="email"
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={inputText.confirmPassword}
          onChange={changeHandler}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
        />
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <input
          value={inputText.bio}
          onChange={changeHandler}
          type="text"
          name="bio"
          id="bio"
          placeholder="Enter Your Bio"
        />
      </div>

      <div>
        <Button type={"submit"} text={"Sign Up"} />
      </div>
    </form>
  );
};

export default SignUpForm;
