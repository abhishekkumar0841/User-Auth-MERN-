import React from 'react'
import SignUpForm from '../components/SignUpForm'
import Footer from '../components/Footer'

const SignUpPage = () => {
  return (
    <div>
      <h1>Instagram SignUp</h1>
      <SignUpForm/>
      <Footer link={'/'} textToggler={'Log In'} />
    </div>
  )
}

export default SignUpPage
