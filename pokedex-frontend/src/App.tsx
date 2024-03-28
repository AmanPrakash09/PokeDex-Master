import {
  Route,
  Routes
} from "react-router-dom"

import './App.css'
import NavBar from './components/NavBar'
import Header from './pages/Header'
import Search from './pages/Search'
import SignIn from './pages/SignIn'

function App() {

  return (
    <>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
    </>
  )
}

export default App
