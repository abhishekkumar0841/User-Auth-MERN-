import React from "react";
import Button from "./Button";

const SignUpForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" placeholder="John" />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" placeholder="John" />
      </div>

      <div>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="john@333"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="john@333"
        />
      </div>

      
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <input type="text" name="bio" id="bio" placeholder="Enter Your Bio" />
      </div>

      <div>
        <Button type={'submit'} text={"Sign Up"} />
      </div>
    </form>
  );
};

export default SignUpForm;
