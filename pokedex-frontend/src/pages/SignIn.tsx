import { useState, useEffect, useContext } from 'react'
import './SignIn.css'
import AuthContext from '../context/AuthContext'

function SignIn() {
  const context = useContext(AuthContext);

  if (!context) {
      throw new Error("useContext must be inside a Provider with a value");
  }

  let {loginUser} = context

  return (
    <>
      <div className="signin-container">
        <div className="form-container login-container">
            <p>Login</p>
            <form onSubmit={loginUser} className='login-form'>
                <input type='text' name='email' placeholder='Email' />
                <input type='password' name='password' placeholder='Password' />
                <input type='submit' value='Login' />
            </form>
        </div>
        <div className="form-container signup-container">
            <p>Sign up</p>
            <form className='signup-form'>
                <input type='email' name='email' placeholder='Email' />
                <input type='text' name='first name' placeholder='First Name' />
                <input type='text' name='last name' placeholder='Last Name' />
                <input type='password' name='password' placeholder='Password' />
                <input type='password' name='confirm password' placeholder='Confirm Password' />
                <input type='submit' value='Sign Up' />
            </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
