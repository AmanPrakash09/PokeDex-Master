import { useContext, useState } from 'react'
import './SignIn.css'
import AuthContext from '../context/AuthContext'

function SignIn() {
  const context = useContext(AuthContext);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  if (!context) {
      throw new Error("useContext must be inside a Provider with a value");
  }

  let {loginUser} = context
  
  let signUpUser = async (e: any) => {
    e.preventDefault();
    
    if (e.target.user_name.value.length > 50) {
      alert("User name cannot exceed 50 characters. Please enter a valid user name.");
      e.target.user_name.value = "";
      return;
    }
    
    try {
        let response = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.email.value,
                'email': e.target.email.value,
                'password': e.target.password.value,
                'user_name': e.target.user_name.value,
            })
        });
        let data = await response.json();
        if (response.status === 201) {
            alert("User created successfully!");
            loginUser(signinEmail, signinPassword);
        } else {
            alert(data.error || "An error occurred!");
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  };
  
  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    await loginUser(loginEmail, loginPassword);
  };

  return (
    <>
      <div className="signin-container">
        <div className="form-container login-container">
            <p>Login</p>
            <form onSubmit={handleLoginSubmit} className='login-form'>
                <input type='text' name='email' placeholder='Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                <input type='password' name='password' placeholder='Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                <input type='submit' value='Login' />
            </form>
        </div>
        <div className="form-container signup-container">
            <p>Sign up</p>
            <form onSubmit={signUpUser} className='signup-form'>
                <input type='email' name='email' placeholder='Email' value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)}/>
                <input type='text' name='user_name' placeholder='User Name' />
                <input type='password' name='password' placeholder='Password' value={signinPassword} onChange={(e) => setSigninPassword(e.target.value)}/>
                <input type='password' name='confirm_password' placeholder='Confirm Password' />
                <input type='submit' value='Sign Up' />
            </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
