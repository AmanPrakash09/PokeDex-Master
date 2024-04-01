import { useContext } from 'react'
import './SignIn.css'
import AuthContext from '../context/AuthContext'

function SignIn() {
  const context = useContext(AuthContext);

  if (!context) {
      throw new Error("useContext must be inside a Provider with a value");
  }

  let {loginUser} = context
  
  let signUpUser = async (e: any) => {
    e.preventDefault();
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
                'first_name': e.target.first_name.value,
                'last_name': e.target.last_name.value,
            })
        });
        let data = await response.json();
        if (response.status === 201) {
            alert("User created successfully!");
        } else {
            alert(data.error || "An error occurred!");
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  };

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
            <form onSubmit={signUpUser} className='signup-form'>
                <input type='email' name='email' placeholder='Email' />
                <input type='text' name='first_name' placeholder='First Name' />
                <input type='text' name='last_name' placeholder='Last Name' />
                <input type='password' name='password' placeholder='Password' />
                <input type='password' name='confirm_password' placeholder='Confirm Password' />
                <input type='submit' value='Sign Up' />
            </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
