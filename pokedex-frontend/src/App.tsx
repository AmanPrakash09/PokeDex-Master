import { useState } from 'react'
import appLogo from './assets/PokedexLogo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <a href="http://localhost:3000" target="_blank">
            <img src={appLogo} className="logo" alt="Project logo" />
          </a>
        </div>

        <div>
          <h1>PokeDex Master - Your Pokemon Navigator</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Sending dummy data to back-end
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
