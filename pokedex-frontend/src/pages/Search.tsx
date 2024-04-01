import { useState, useEffect } from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './Search.css'

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Make an API call to fetch the matching Pokemon data based on the search query
      const response = await fetch(`http://127.0.0.1:8000/pokemon/search?name=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data); // Set the search results in state
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error occurred while fetching search results:', error);
    }
  };

  return (
    <>
      <div className="search-container">
        <div className="logo-container">
          <a href="http://localhost:3000">
            <img src={appLogo} className="logo" alt="Project logo" />
          </a>
        </div>

        <div> 
          <h1>PokeDex Master - Search Pokemon</h1>
          <h4>Search Pokemon By Name or By Using Filters</h4>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search Pokemon" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            
            <div className="filter-container">
              <div className="dropdown">
                <label htmlFor="type">Type:</label>
                <select id="type">
                  <option value="">Any</option>
                  <option value="grass">Grass</option>
                  <option value="fire">Fire</option>
                  <option value="water">Water</option>
                  <option value="poison">Poison</option>
                  <option value="flying">Flying</option>
                  <option value="bug">Bug</option>
                  <option value="normal">Normal</option>
                  <option value="electric">Electric</option>
                  <option value="ground">Ground</option>
                  <option value="dark">Dark</option>
                  <option value="steel">Steel</option>
                  <option value="fighting">Fighting</option>
                  <option value="psychic">Psychic</option>
                  <option value="ice">Ice</option>
                  <option value="water">Water</option>
                  <option value="ghost">Ghost</option>
                  <option value="fairy">Fairy</option>
                  <option value="rock">Rock</option>
                </select>
              </div>
              <div className="dropdown">
                <label htmlFor="generation">Generation:</label>
                <select id="generation">
                  <option value="">Any</option>
                  <option value="1">Generation 1</option>
                  <option value="3">Generation 3</option>
                </select>
              </div>
              <div className="checkbox">
                <input type="checkbox" id="caught" />
                <label htmlFor="caught">Caught</label>
              </div>
              <button className="search-button">Search</button>
            </div>
          </div>

          <div className="search-results">
          <h2>Search Results</h2>
          <table>
            <thead>
              <tr>
                <th>Pokemon Name</th>
                <th>Type</th>
                <th>Egg Group</th>
              </tr>
            </thead>
            <tbody>
              {/* {searchResults.map((pokemon) => (
                <tr key={pokemon.PokemonName}>
                  <td>{pokemon.PokemonName}</td>
                  <td>{pokemon.Type}</td>
                  <td>{pokemon.EggGroup}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  )
}

export default Search
