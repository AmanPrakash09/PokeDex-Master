import { useState, useEffect } from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './Header.css'

const backend = 'http://127.0.0.1:8000/'

function Header() {
  const [count, setCount] = useState(0)
  const [countText, setCountText] = useState(0)

  useEffect(() => {
    getCount()
  }, [])

  let getCount = async () => {
    let response = await fetch(backend + 'counter/')
    if (response.ok) {
        let data = await response.json();
        console.log('COUNTER_DATA: ', data);
        if (data.length > 0 && data[0].count !== undefined) {
            console.log('countText becomes: ', data[0].count);
            setCountText(data[0].count);
        } else {
            console.log('Invalid count received', data);
        }
      } else {
            console.log('Failed to fetch count from backend');
      }
  }

  let updateCount = async () => {
    const newCount = count + countText;
    await fetch(`http://127.0.0.1:8000/counter/1/update/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ count: newCount })
    })
  }

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <a href="http://localhost:3000">
            <img src={appLogo} className="logo" alt="Project logo" />
          </a>
        </div>

        <div>
          <h1>PokeDex Master - Your Pokemon Navigator</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <button onClick={() => updateCount()}>
              update
            </button>
            <p>
              Count from back-end is {countText}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
