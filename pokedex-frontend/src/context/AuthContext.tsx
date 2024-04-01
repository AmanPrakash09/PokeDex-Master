import React, { createContext, useState, useContext } from "react";

interface AuthTokens {
  // Define your expected auth tokens structure here
  accessToken: string;
  refreshToken: string;
}

interface User {
  // Define your expected user structure here
  name: string;
  email: string;
}

interface AuthContextType {
  authTokens: AuthTokens | null;
  user: User | null;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  let [user, setUser] = useState<User | null>(null);

  let loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        console.log("data");
      let response = await fetch('http://127.0.0.1:8000/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': e.currentTarget.email.value, // Using currentTarget for type safety
          'password': e.currentTarget.password.value
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      console.log(data);
      // Here you should update authTokens and user with setAuthTokens and setUser
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  let contextData: AuthContextType = {
    authTokens,
    user,
    loginUser
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
