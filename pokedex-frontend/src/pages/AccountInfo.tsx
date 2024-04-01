import { useState, useEffect, useContext } from 'react'
import './AccountInfo.css'
import AuthContext from '../context/AuthContext'

interface UserInfo {
  email: string;
  username: string;
  date_joined: string;
  loyalty: BigInteger;
}
function AccountInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const context = useContext(AuthContext);
  
  if (!context) {
      throw new Error("useContext must be inside a Provider with a value");
  }

  let {user} = context  

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user && user.email) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/user-info?email=${user.email}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          setUserInfo(data);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
    };

    fetchUserInfo();
  }, [user]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="accountinfo-container">
      <p>Email: {userInfo.email}</p>
      <p>Username: {userInfo.username}</p>
      <p>Date: {userInfo.date_joined}</p>
      <p>Loyalty: {userInfo.loyalty}</p>
      </div>
    </>
  )
}

export default AccountInfo
