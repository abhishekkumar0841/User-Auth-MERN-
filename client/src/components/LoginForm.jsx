import React from 'react'
import Button from './Button'

const LoginForm = () => {
  return (
    <form>
        <div>
            <label htmlFor="userName">Username</label>
            <input type="text" name='userName' id='userName' placeholder='john@333' />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" placeholder='Enter Password'/>
        </div>
        <div>
            <Button text={'Log In'} />
        </div>
    </form>
  )
}

export default LoginForm
