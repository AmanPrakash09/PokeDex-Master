import { useState } from 'react'
import './Pokemon.css'

function Pokemon() {
  const [selectionResults, setSelectionResults] = useState([]);

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

  const addSelectionFilter = () => {
    setFilters([...filters, {logicOperator: "AND", filterType: 'PokemonName', eqOperator: 'LIKE', qualifierText: '' }]);
  };

  const removeFilter = (indexToRemove: number) => {
    const updatedFilters = filters.filter((_, index) => index !== indexToRemove);
    setFilters(updatedFilters);
  };

  const getSelectionFilters = () => {
    const combineFilters = filters.reduce((prevString: any, currFilter: any) => {
      let inputText = currFilter.qualifierText.replace(/'/g, '');
      if (currFilter.eqOperator === "LIKE") inputText = `%${inputText}%`;
      if (currFilter.eqOperator === "EQUALS") inputText = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase()
      const logic = currFilter.logicOperator;
      const column = currFilter.filterType;
      if (column === "PokeType" || column === "EggGroup") {
        return prevString + ` ${logic} ps2.${column} ${currFilter.eqOperator == "LIKE"? "LIKE" : "="} '${inputText}'`
      } else {
        return prevString + ` ${logic} ps1.${column} ${currFilter.eqOperator == "LIKE"? "LIKE" : "="} '${inputText}'`
      }
    }, "")
    if (combineFilters) {
      return `(${combineFilters.slice(5)})`;
    }
    return "";
  }

  const selectionQuery = async () => {
    setSelectionResults([]);
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
    await handleSearch(query, setSelectionResults);
  }

  const clearQueryResults = () => {
    setSelectionResults([]);
  }

  const handleSearch = async(query: string, func: any) => {
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
        func(data); // Set the search results in state
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error occurred while fetching search results:', error);
    }
  };

  return (
    <>
          <h1>PokeDex Master - Pokemon Search</h1>
          <div className="filter-container">
            <h2>Pokemon Selection</h2>
            <label>
              <input
                  type="checkbox"
                  checked={nameCheckbox}
                  onChange={() => {
                    setSelectionResults([]);
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
                    setSelectionResults([]);
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
                    setSelectionResults([]);
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
                    setSelectionResults([]);
                    setAbilityCheckBox(!abilityCheckbox)
                  }}
              />
              Ability
            </label>
            <div className="spacer"></div>
            <div>
              <button onClick={addSelectionFilter}>+</button>
              <button onClick={selectionQuery}>Search</button>
              <button onClick={clearQueryResults}>Clear</button>
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
            <div className="spacer"></div>
            <hr />
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
              {selectionResults.map((pokemon: any) => (
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
      </>
      )
      }

      export default Pokemon
