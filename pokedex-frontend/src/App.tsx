import {
  Route,
  Routes
} from "react-router-dom"

import './App.css'
import NavBar from './components/NavBar'
import Header from './pages/Header'
import Search from './pages/Search'
import SaveFiles from './pages/SaveFiles'
import AccountInfo from './pages/AccountInfo'
import SignIn from './pages/SignIn'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
    <div className="App">
      <NavBar/>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/search" element={<Search />} />
          <Route path="/savefiles" element={<PrivateRoute />}>
            <Route path="/savefiles" element={<SaveFiles />} />
          </Route>
          <Route path="/accountinfo" element={<PrivateRoute />}>
            <Route path="/accountinfo" element={<AccountInfo />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </div>
    </>
  )
}

export default App
