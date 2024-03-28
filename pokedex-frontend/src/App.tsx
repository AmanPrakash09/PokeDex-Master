import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"

import './App.css'
import Header from './components/Header'

function App() {

  return (
    <>
    <Router>
      <div className="App">
        <Header/>
        {/* <Route path="/" element={<SomePage />}/> */}
        {/* <Route path="something/id" element={<SomePage />}/> */}
      </div>
    </Router>
    </>
  )
}

export default App
