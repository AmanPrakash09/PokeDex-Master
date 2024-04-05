import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
    useNavigate
  } from "react-router-dom"

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  email: string;
}

interface AuthContextType {
  authTokens: AuthTokens | null;
  user: User | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

interface MyJwtPayload {
  username: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
    const tokenString = localStorage.getItem('authTokens');
    return tokenString ? JSON.parse(tokenString) : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const userEmail = localStorage.getItem('user');
    return userEmail ? { email: userEmail } : null;
  });

  let [loading, setLoading] = useState(true)
  
  const history = useNavigate()

  let loginUser = async (username: string, password: string) => {
    try {
      let response = await fetch('http://127.0.0.1:8000/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        })
      });
      if (!response.ok) {
        alert("Either Email or Password is incorrect!")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      console.log("data:");
      console.log(data);
      if (response.status === 200) {

        setAuthTokens({
          accessToken: data.access,
          refreshToken: data.refresh
        });
        // undefined for some reason
        console.log(authTokens?.accessToken)
        
        const decodedData = jwtDecode<MyJwtPayload>(data.access);
        console.log(decodedData);
        setUser({
          email: decodedData['username'],
        });

        localStorage.setItem('authTokens', JSON.stringify(data))
        localStorage.setItem('user', decodedData['username'])
        history('/');
      } else {
        alert("Response status is not 200!")
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  let logoutUser = async () => {
    console.log("We are logging out!")
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    localStorage.removeItem('user')
    history('/signin')
  }

  let updateToken = async () => {
    console.log("Updating Token")
    let response = await fetch('http://127.0.0.1:8000/token/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username':authTokens?.refreshToken})
      });
      if (!response.ok) {
        throw new Error(`HTTP error when updating token! status: ${response.status}`);
      }
      let data = await response.json();
      if (response.status === 200) {

        setAuthTokens({
          accessToken: data.access,
          refreshToken: data.refresh
        });
        
        const decodedData = jwtDecode<MyJwtPayload>(data.access);
        console.log(decodedData);
        setUser({
          email: decodedData['username'],
        });

        localStorage.setItem('authTokens', JSON.stringify(data))
        localStorage.setItem('user', decodedData['username'])
      } else {
        alert("Response status is not 200 and we are logging out!")
        logoutUser();
      }
  }

  let contextData: AuthContextType = {
    authTokens,
    user:user,
    loginUser:loginUser,
    logoutUser:logoutUser
  };

  useEffect(() => {
    let timer = 1000 * 60 * 5;
    let internal = setInterval(() => {
      if(authTokens) {
        updateToken();
      }
    }, timer)
    return () => clearInterval(internal)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
