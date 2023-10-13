import React, { useState } from 'react'
import Button from './Button'

const LoginForm = () => {

  const [inputText, setInputText] = useState({
    userName: '',
    password: '',
  })
  
const changeHandler = (e)=>{
  const {name, value} = e.target;
  setInputText((prevState)=>{
    return {
      ...prevState,
      [name]: value
    }
  })
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    console.log("Printing login data-->", inputText)
  }

  return (
    <form onSubmit={submitHandler}>
        <div>
            <label htmlFor="userName">Username</label>
            <input value={inputText.userName} onChange={changeHandler} type="text" name='userName' id='userName' placeholder='john@333' />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input value={inputText.password} onChange={changeHandler} type="password" name="password" id="password" placeholder='Enter Password'/>
        </div>
        <div>
            <Button text={'Log In'} />
        </div>
    </form>
  )
}

export default LoginForm
