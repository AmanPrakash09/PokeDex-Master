import { useState, useEffect } from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './Search.css'

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [nameCheckbox, setNameCheckBox] = useState(false);
  const [typeCheckbox, setTypeCheckBox] = useState(false);
  const [eggCheckbox, setEggCheckBox] = useState(false);
  const [abilityCheckbox, setAbilityCheckBox] = useState(false);
  const [filters, setFilters] = useState<any[]>([]);

  const handleFilterChange = (index: any, key: any, value: any) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      [key]: value
    };
    setFilters(updatedFilters);
  };

  const addFilter = () => {
    setFilters([...filters, {logicOperator: "AND", filterType: 'PokemonName', eqOperator: 'LIKE', qualifierText: '' }]);
  };

  const removeFilter = (indexToRemove: number) => {
    const updatedFilters = filters.filter((_, index) => index !== indexToRemove);
    setFilters(updatedFilters);
  };

  const getSelectionFilters = () => {
    const combineFilters = filters.reduce((prevString: any, currFilter: any) => {
      if (currFilter.filterType === "PokeType" || currFilter.filterType === "EggGroup") {
        return prevString + ` ${currFilter.logicOperator} ps2.${currFilter.filterType} ${currFilter.eqOperator == "LIKE"? "LIKE" : "="} '${currFilter.qualifierText}'`
      } else {
        return prevString + ` ${currFilter.logicOperator} ps1.${currFilter.filterType} ${currFilter.eqOperator == "LIKE"? "LIKE" : "="} '${currFilter.qualifierText}'`
      }
    }, "")
    if (combineFilters) {
      return `(${combineFilters.slice(5)})`;
    }
    return "";
  }

  const searchDatabase = async () => {
    if (!(nameCheckbox || typeCheckbox || abilityCheckbox || eggCheckbox)) {
      alert("Please select some columns to project upon");
      return;
    }
    const selectionFilters = getSelectionFilters();
    let selectClause = "SELECT ";
    const fromClause = `FROM PokemonStores1 ps1, PokemonStores2 ps2`
    let whereClause = `WHERE ps1.PokemonName = ps2.PokemonName`
    if (selectionFilters) whereClause += ` AND ${selectionFilters}`;
    if (nameCheckbox) selectClause += "ps1.PokemonName, ";
    if (typeCheckbox) selectClause += "ps2.PokeType, ";
    if (eggCheckbox) selectClause += "ps2.EggGroup, ";
    if (abilityCheckbox) selectClause += "ps1.Ability, ";
    if (selectClause === "SELECT ") return;
    selectClause = selectClause.slice(0, -2);
    const query = `${selectClause} ${fromClause} ${whereClause}`;
    await handleSearch(query);
  }

  const handleSearch = async(query: string) => {
    try {
      // Make an API call to fetch the matching Pokemon data based on the search query
      const response = await fetch("http://127.0.0.1:8000/query/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });
      if (response.ok) {
        const data = await response.json();
        // let newData = data.map((result: any) => {
        //   return {PokemonName: result[0], Type: result[1], EggGroup: result[2], Ability: result[3]}
        // })
        // console.log(newData);
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
          {/*<h4>Search Pokemon By Name or By Using Filters</h4>*/}
          {/*<div style={{display: 'flex', alignItems: 'center'}}>*/}
            {/*<div className="search-bar">*/}
            {/*  <input*/}
            {/*      type="text"*/}
            {/*      placeholder="Search Pokemon"*/}
            {/*      value={searchQuery}*/}
            {/*      onChange={(e) => setSearchQuery(e.target.value)}*/}
            {/*  />*/}
            {/*  <button>Search</button>*/}
            {/*</div>*/}

          {/*  <div className="filter-container">*/}
          {/*    <div className="dropdown">*/}
          {/*      <label htmlFor="type">Type:</label>*/}
          {/*      <select id="type">*/}
          {/*        <option value="">Any</option>*/}
          {/*        <option value="grass">Grass</option>*/}
          {/*        <option value="fire">Fire</option>*/}
          {/*        <option value="water">Water</option>*/}
          {/*        <option value="poison">Poison</option>*/}
          {/*        <option value="flying">Flying</option>*/}
          {/*        <option value="bug">Bug</option>*/}
          {/*        <option value="normal">Normal</option>*/}
          {/*        <option value="electric">Electric</option>*/}
          {/*        <option value="ground">Ground</option>*/}
          {/*        <option value="dark">Dark</option>*/}
          {/*        <option value="steel">Steel</option>*/}
          {/*        <option value="fighting">Fighting</option>*/}
          {/*        <option value="psychic">Psychic</option>*/}
          {/*        <option value="ice">Ice</option>*/}
          {/*        <option value="water">Water</option>*/}
          {/*        <option value="ghost">Ghost</option>*/}
          {/*        <option value="fairy">Fairy</option>*/}
          {/*        <option value="rock">Rock</option>*/}
          {/*      </select>*/}
          {/*    </div>*/}
          {/*    <div className="dropdown">*/}
          {/*      <label htmlFor="generation">Generation:</label>*/}
          {/*      <select id="generation">*/}
          {/*        <option value="">Any</option>*/}
          {/*        <option value="1">Generation 1</option>*/}
          {/*        <option value="3">Generation 3</option>*/}
          {/*      </select>*/}
          {/*    </div>*/}
          {/*    <div className="checkbox">*/}
          {/*      <input type="checkbox" id="caught"/>*/}
          {/*      <label htmlFor="caught">Caught</label>*/}
          {/*    </div>*/}
          {/*    <button className="search-button">Search</button>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="filter-container">
            <label>
              <input
                  type="checkbox"
                  checked={nameCheckbox}
                  onChange={() => {
                    setNameCheckBox(!nameCheckbox)
                  }}
              />
              Name
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={typeCheckbox}
                  onChange={() => {
                    setTypeCheckBox(!typeCheckbox)
                  }}
              />
              Type
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={eggCheckbox}
                  onChange={() => {
                    setEggCheckBox(!eggCheckbox)
                  }}
              />
              Egg Group
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={abilityCheckbox}
                  onChange={() => {
                    setAbilityCheckBox(!abilityCheckbox)
                  }}
              />
              Ability
            </label>
          </div>

          <div className="filter-container">
            <div>
              <button onClick={addFilter}>+</button>
              <button onClick={searchDatabase}>Search</button>
            </div>
            <ul>
              {filters.map((filter, index) => (
        <div key={index}>
          {index !== 0 && (
            <label>
              <select
                value={filter.logicOperator || ''}
                onChange={(e) => handleFilterChange(index, 'logicOperator', e.target.value)}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </label>
          )}
          <label>
            <select
              value={filter.filterType || ''}
              onChange={(e) => handleFilterChange(index, 'filterType', e.target.value)}
            >
              <option value="PokemonName">Name</option>
              <option value="PokeType">Type</option>
              <option value="EggGroup">Egg Group</option>
              <option value="Ability">Ability</option>
            </select>
          </label>
          <label>
            <select
              value={filter.eqOperator || ''}
              onChange={(e) => handleFilterChange(index, 'eqOperator', e.target.value)}
            >
              <option value="LIKE">LIKE</option>
              <option value="EQUALS">EQUALS</option>
            </select>
          </label>
          <label>
            <input
                type="text"
                value={filter.qualifierText || ''}
                onChange={(e) => handleFilterChange(index, 'qualifierText', e.target.value)}
            />
            <button onClick={() => removeFilter(index)}>-</button>
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
                  {nameCheckbox &&
                    <th>Name</th>
                  }
                  {typeCheckbox &&
                      <th>Type</th>
                  }
                  {eggCheckbox &&
                      <th>Egg-Group</th>
                  }
                  {abilityCheckbox &&
                      <th>Ability</th>
                  }
                </tr>
              </thead>
              <tbody>
              {searchResults.map((pokemon: any) => (
                  <tr key={pokemon[0]}>
                    <td>{pokemon[0]}</td>
                    <td>{pokemon[1]}</td>
                    <td>{pokemon[2]}</td>
                    <td>{pokemon[3]}</td>
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
