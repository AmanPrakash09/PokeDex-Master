import {
  Route,
  Routes
} from "react-router-dom"

import './App.css'
import NavBar from './components/NavBar'
import Header from './pages/Header'

import Pokemon from './pages/Pokemon.tsx'
import Game from "./pages/Game.tsx";
import Location from './pages/Location.tsx'
import Move from "./pages/Move.tsx";

import SaveFiles from './pages/SaveFiles'
import AccountInfo from './pages/AccountInfo'
import SignIn from './pages/SignIn'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
    <div className="App">
      <AuthProvider>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/game" element={<Game />} />
          <Route path={'/move'} element={<Move/>}/>
          <Route path="/location" element={<Location />}/>
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
