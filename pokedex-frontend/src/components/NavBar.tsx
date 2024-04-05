import {
    Link,
    useMatch,
    useResolvedPath
  } from "react-router-dom"
  
import './NavBar.css'
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

function NavBar() {
  let {user, logoutUser} = useContext(AuthContext)!
  console.log(user)
    return (
      <>
        <div className="nav">
          <Link to="/" className='site-title'>PokéDex Master</Link>
          <ul>
              <CustomLink to={"move"}>move</CustomLink>
              <CustomLink to={'/location'}>location</CustomLink>
              <CustomLink to='/game'>game</CustomLink>
            <CustomLink to='/pokemon'>pokemon</CustomLink>
            <CustomLink to='/savefiles'>my save files</CustomLink>
            <CustomLink to='/accountinfo'>my info</CustomLink>
            {user ? (
              <button onClick={logoutUser}>logout</button>
            ): (
              <CustomLink to='/signin'>sign in</CustomLink>
            )}
          </ul>
        </div>
      </>
    )
  }
  
  interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
  }
  

  function CustomLink({ to, children, ...props}: CustomLinkProps) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
  }
  
  export default NavBar