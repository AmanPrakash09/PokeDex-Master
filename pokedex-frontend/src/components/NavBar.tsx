import {
    Link,
    useMatch,
    useResolvedPath
  } from "react-router-dom"
  
import { useState, useEffect } from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './NavBar.css'

function NavBar() {
    return (
      <>
        <div className="nav">
          <Link to="/" className='site-title'>PokéDex Master</Link>
          <ul>
            <CustomLink to='/search'>search</CustomLink>
            <CustomLink to='/signin'>sign in</CustomLink>
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