import { useState, useEffect } from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './Search.css'

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [orElements, setOrElements] = useState<string[]>([]);

  const [nameCheckbox, setNameCheckBox] = useState(false);
  const [typeCheckbox, setTypeCheckBox] = useState(false);
  const [eggCheckbox, setEggCheckBox] = useState(false);
  const [abilityCheckbox, setAbilityCheckBox] = useState(false);

  const handleSearch = async () => {
    try {
      // Make an API call to fetch the matching Pokemon data based on the search query
      const query = "SELECT ps1.PokemonName, ps1.Ability, ps2.PokeType "+
          "FROM PokemonStores1 ps1, PokemonStores2 ps2 "+
          "WHERE ps1.PokemonName = ps2.PokemonName AND "+
          "(ps1.Ability LIKE '%Pressure%' OR ps2.PokeType LIKE '%Grass%' AND ps1.PokemonName LIKE '%a%')";
      const response = await fetch("http://127.0.0.1:8000/query/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });
      if (response.ok) {
        const data = await response.json();
        let newData = data.map((result: any) => {
          return {PokemonName: result[0], Ability: result[1], Type: result[2]}
        })
        console.log(newData);
        setSearchResults(newData); // Set the search results in state
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error occurred while fetching search results:', error);
    }
  };

  const removeFilterElement = () => {
    const newList = orElements.slice(0, -1);
    setOrElements(newList);
  }

  const addFilterElement = () => {
    const newList = [...orElements, "3"];
    setOrElements(newList);
  }

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
          <div style={{display: 'flex', alignItems: 'center'}}>
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
                <input type="checkbox" id="caught"/>
                <label htmlFor="caught">Caught</label>
              </div>
              <button className="search-button">Search</button>
            </div>
          </div>

          <div className="filter-container">
            <label>
              <input
                  type="checkbox"
                  checked={nameCheckbox}
                  onChange={() => {
                    setNameCheckBox(!nameCheckbox)}}
              />
              Name
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={typeCheckbox}
                  onChange={() => {setTypeCheckBox(!typeCheckbox)}}
              />
              Type
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={eggCheckbox}
                  onChange={() => {setEggCheckBox(!eggCheckbox)}}
              />
              Egg Group
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={abilityCheckbox}
                  onChange={() => {setAbilityCheckBox(!abilityCheckbox)}}
              />
              Ability
            </label>
          </div>

          <div className="filter-container">
            <button onClick={addFilterElement}>+</button>
            <button onClick={removeFilterElement}>-</button>
            <ul>
              {orElements.map((orElement: any) => (
                  <div>
                    <label>
                      <select id="filter-type">
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </label>
                    <label>
                      <select id="filter-type">
                        <option>Name</option>
                        <option>Type</option>
                        <option>Egg Group</option>
                        <option>Ability</option>
                      </select>
                    </label>
                    <label>
                      <select id="filter-type">
                        <option value="LIKE">LIKE</option>
                        <option value="EQUALS">EQUALS</option>
                      </select>
                    </label>
                    <label>
                      <input id="qualifier-text" type="text"/>
                    </label>
                  </div>
              ))}
            </ul>
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
              {searchResults.map((pokemon: any) => (
                  <tr key={pokemon["PokemonName"]}>
                    <td>{pokemon["PokemonName"]}</td>
                    <td>{pokemon["Ability"]}</td>
                    <td>{pokemon["Type"]}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
