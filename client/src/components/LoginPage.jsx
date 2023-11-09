import React, { useState } from "react";
import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../Redux/authSlice/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function onInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

   async function onFormSubmit(e) {
    e.preventDefault();
    const res =  await dispatch(loginThunk(input))

    if(res?.payload?.success){
      navigate('/profile')
      setInput({
        email: "",
        password: ""
      })
    }
  }

  return (
    <Layout>
      <div className=" flex items-center justify-center min-h-[90vh] text-white">
        <form onSubmit={onFormSubmit} className=" border p-5 flex flex-col gap-4">
          <h1 className="text-center font-bold text-2xl">Login Page</h1>
          <div className="">
            <label htmlFor="email">Email:</label>
            <input className="bg-transparent border px-4 py-2 font-semibold w-full"
              type="text"
              placeholder="Enter you email"
              value={input.email}
              onChange={onInputChange}
              name="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input className="bg-transparent border px-4 py-2 font-semibold w-full"
              type="text"
              placeholder="Enter you password"
              value={input.password}
              onChange={onInputChange}
              name="password"
              id="password"
            />
          </div>

          <div>
            <button type="submit" className=" bg-green-400 px-4 py-2 w-full font-bold text-2xl text-slate-800 hover:bg-green-500 transition-all duration-300 ease-in-out">Login</button>
          </div>
          <div className=" flex items-center justify-between py-2">
            <p>Create account</p>
          <Link to={'/signup'} className="">Signup</Link>
        </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
