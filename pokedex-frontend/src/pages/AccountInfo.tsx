import { useState, useEffect, useContext } from 'react'
import './AccountInfo.css'
import AuthContext from '../context/AuthContext'

interface UserInfo {
  email: string;
  username: string;
  membership_level: BigInteger;
  loyalty: BigInteger;
}
function AccountInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const context = useContext(AuthContext);
  const [editUsernameMode, setUsernameEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [editMembershipLevelMode, setMembershipLevelEditMode] = useState(false);
  const [newMembershipLevel, setNewMembershipLevel] = useState(1);
  
  if (!context) {
      throw new Error("useContext must be inside a Provider with a value");
  }

  let {user} = context
  let {logoutUser} = context

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

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/delete-account?email=${user?.email}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        logoutUser();
        alert('Your account has been successfully deleted.');
      } catch (error) {
        console.error("There was a problem with the delete operation:", error);
        alert('There was an issue deleting your account.');
      }
    }
  };
  
  const handleUsernameChange = (e: any) => {
    setNewUsername(e.target.value);
  };

  const handleUpdateUsername = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/update-account/?email=${user?.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // update user info on front-end
      setUserInfo(data);
      // change button
      setUsernameEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
    }
  };
  
  const handleMembershipLevelChange = (e: any) => {
    const value = e.target.value;
    if (value < 1 || value > 5) {
      alert("Please enter a Membership Level between 1 and 5.")
      return;
    }
    setNewMembershipLevel(e.target.value);
  };

  const handleUpdateMembershipLevel = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/update-account/?email=${user?.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ membership_level: newMembershipLevel }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // update user info on front-end
      setUserInfo(data);
      // change button
      setMembershipLevelEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
      <>
        <div className="accountinfo-container">
          <p>Email: {userInfo.email}</p>
          <p>Username: {userInfo.username}</p>
          {editUsernameMode ? (
            <>
              <input
                type="text"
                value={newUsername}
                onChange={handleUsernameChange}
              />
              <button onClick={handleUpdateUsername}>Update Username</button>
            </>
          ) : (
            <>
              <button onClick={() => setUsernameEditMode(true)}>Edit Username</button>
            </>
          )}
          <p>Membership Level: {userInfo.membership_level}</p>
          {
            editMembershipLevelMode ? (
              <>
                <input
                  type="number"
                  value={newMembershipLevel}
                  onChange={handleMembershipLevelChange}
                  min={1}
                  max={5}
                />
                <button onClick={handleUpdateMembershipLevel}>Update Membership Level</button>
              </>
            ) : (
              <>
                <button onClick={() => setMembershipLevelEditMode(true)}>Edit Membership Level</button>
              </>
            )
          }
          <p>Loyalty: {userInfo.loyalty}</p>
          <button onClick={handleDeleteAccount}>Delete My Account</button>
        </div>
      </>
  )
}

export default AccountInfo
