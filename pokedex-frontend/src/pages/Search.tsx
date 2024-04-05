import { useState } from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './Search.css'

function Search() {
  const [selectionResults, setSelectionResults] = useState([]);
  const [projectionResults, setProjectionResults] = useState([]);

  const [nameCheckbox, setNameCheckBox] = useState(false);
  const [typeCheckbox, setTypeCheckBox] = useState(false);
  const [eggCheckbox, setEggCheckBox] = useState(false);
  const [abilityCheckbox, setAbilityCheckBox] = useState(false);
  const [filters, setFilters] = useState<any[]>([]);

  const [titleCheckbox, setTitleCheckBox] = useState(false);
  const [releaseDateCheckbox, setReleaseDateCheckBox] = useState(false);
  const [salePriceCheckbox, setSalePriceCheckBox] = useState(false);
  const [consoleCheckbox, setConsoleCheckBox] = useState(false);
  const [generationCheckbox, setGenerationCheckBox] = useState(false);

  const [buttonQueryResults, setButtonQueryResults] = useState([]);
  const [buttonQueryFlag, setButtonQueryFlag] = useState(0);

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
      let inputText = currFilter.qualifierText.replace(/'/g, '');
      if (currFilter.eqOperator == "LIKE") inputText = `%${inputText}%`;
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

  const projectionQuery = async () => {
    setProjectionResults([]);
    if (!(titleCheckbox || generationCheckbox || releaseDateCheckbox || consoleCheckbox || salePriceCheckbox)) {
      alert("Please select some columns to project upon");
      return;
    }
    let selectClause = "SELECT ";
    if (titleCheckbox) selectClause += "p1.Title, ";
    if (generationCheckbox) selectClause += "p1.GenerationNumber, ";
    if (releaseDateCheckbox) selectClause += "p1.ReleaseDate, ";
    if (consoleCheckbox) selectClause += "g.Console, ";
    if (salePriceCheckbox) selectClause += "p2.SalePrice, ";
    if (selectClause === "SELECT ") return;
    selectClause = selectClause.slice(0, -2);
    const query =
        `${selectClause} ` +
        "FROM Generation g, PokemonGameCategorizes2 p2, PokemonGameCategorizes1 p1 " +
        "WHERE g.GenerationNumber = p1.GenerationNumber AND p2.ReleaseDate = p1.ReleaseDate";
    await handleSearch(query, setProjectionResults);
  }

  // Query for: "Aggregation with GROUP BY" requirement
  const getCountOfMoveTypes = async () => {
    setButtonQueryFlag(1);
    const query =
        "SELECT m.MoveType, COUNT(*) " +
        "FROM Move1 m GROUP BY m.MoveType";
    await handleSearch(query, setButtonQueryResults);
  }

  // Query for: "Aggregation with HAVING" requirement
  const getMoveTypesWithEnoughPower = async (power: number) => {
    setButtonQueryFlag(2);
    const query =
        "SELECT m.MoveType, MAX(m.Power) " +
        "FROM Move1 m " +
        "GROUP BY m.MoveType " +
        `HAVING MAX(m.Power) >= ${power}`;
    await handleSearch(query, setButtonQueryResults);
  }

  // Query for: "Nested aggregation with GROUP BY" requirement
  const getPokemonWithEnoughTypeCoverage = async (uniqueTypes: number) => {
    setButtonQueryFlag(3);
    const levelMoves =
        "SELECT p2.PokeType, p.PokemonName, m.MoveName, m.MoveType " +
        "FROM PokemonStores1 p, Learns l, LevelMove lm, Move1 m, PokemonStores2 p2 " +
        "WHERE p.PokeID = l.PokeID AND l.MoveName = lm.MoveName AND lm.MoveName = m.MoveName " +
        "AND p2.PokemonName = p.PokemonName";
    const tmMoves =
        "SELECT p2.PokeType, p.PokemonName, m.MoveName, m.MoveType " +
        "FROM PokemonStores1 p, Accesses a, TMHMMove t, Move1 m, PokemonStores2 p2 " +
        "WHERE p.PokeID = a.PokeID AND a.MoveName = t.MoveName AND t.MoveName = m.MoveName " +
        "AND p2.PokemonName = p.PokemonName";
    const union = levelMoves + " UNION " + tmMoves;
    const query =
        `WITH PokemonAvailableMoves AS (${union}) ` +
        "SELECT p.PokemonName " +
        "FROM PokemonStores1 p " +
        "GROUP BY p.PokemonName " +
        `HAVING ${uniqueTypes} <= (SELECT COUNT(DISTINCT pam.MoveType) ` +
        "FROM PokemonAvailableMoves pam " +
        "WHERE pam.PokemonName = p.PokemonName)";
    await handleSearch(query, setButtonQueryResults);
  }

  // Query for: "Division" requirement
  const getPokemonWhoUseAllTMHM = async () => {
    setButtonQueryFlag(4);
    const query =
        "SELECT p.PokemonName " +
        "FROM PokemonStores1 p " +
        "WHERE NOT EXISTS (" +
        "(SELECT t.MoveName FROM TMHMMove t) " +
        "EXCEPT " +
        "(SELECT a.MoveName FROM Accesses a WHERE a.PokeID = p.PokeID))";
    await handleSearch(query, setButtonQueryResults);
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
      <div className="search-container">
        <div>
          <h1>PokeDex Master - Search</h1>
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
              <button onClick={addFilter}>+</button>
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
          <div className="spacer"></div>
          <div className="filter-container">
            <h2>Game Information</h2>
            <label>
              <input
                  type="checkbox"
                  checked={titleCheckbox}
                  onChange={() => {
                    setProjectionResults([]);
                    setTitleCheckBox(!titleCheckbox)
                  }}
              />
              Title
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={generationCheckbox}
                  onChange={() => {
                    setProjectionResults([]);
                    setGenerationCheckBox(!generationCheckbox)
                  }}
              />
              Generation
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={releaseDateCheckbox}
                  onChange={() => {
                    setProjectionResults([]);
                    setReleaseDateCheckBox(!releaseDateCheckbox)
                  }}
              />
              Release
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={consoleCheckbox}
                  onChange={() => {
                    setProjectionResults([]);
                    setConsoleCheckBox(!consoleCheckbox)
                  }}
              />
              Console
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={salePriceCheckbox}
                  onChange={() => {
                    setProjectionResults([]);
                    setSalePriceCheckBox(!salePriceCheckbox)
                  }}
              />
              Price
            </label>
            <div className="spacer"></div>
            <div>
              <button onClick={projectionQuery}>Search</button>
              <button onClick={() => setProjectionResults([])}>Clear</button>
            </div>
            <div className="spacer"></div>
            <hr/>
            <h2>Search Results</h2>
            <table>
              <thead>
              <tr>
                {titleCheckbox &&
                    <th>Title</th>
                }
                {generationCheckbox &&
                    <th>Generation</th>
                }
                {releaseDateCheckbox &&
                    <th>Release</th>
                }
                {consoleCheckbox &&
                    <th>Console</th>
                }
                {salePriceCheckbox &&
                    <th>Price</th>
                }
              </tr>
              </thead>
              <tbody>
              {projectionResults.map((game: any) => (
                  <tr key={game[0]}>
                    <td>{game[0]}</td>
                    <td>{game[1]}</td>
                    <td>{game[2]}</td>
                    <td>{game[3]}</td>
                    <td>{game[4]}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="spacer"></div>
          <div className="filter-container">
            <h2>Move Information</h2>
            <button onClick={getCountOfMoveTypes}>Move Types Count</button>
            <button onClick={() => getMoveTypesWithEnoughPower(60)}>Move Types With Power >= 60</button>
            <button onClick={() => getPokemonWithEnoughTypeCoverage(9)}>Pokemon With >= 9 Type Coverage</button>
            <button onClick={getPokemonWhoUseAllTMHM}>Pokemon Who Can Access all TM/HM's</button>
            <div className="spacer"></div>
            <hr/>
            <h2>Search Results</h2>
            <table>
              <thead>
              <tr>
                {buttonQueryFlag === 1 &&
                    <>
                      <td>
                        <h3>Type</h3>
                      </td>
                      <td>
                        <h3>Count</h3>
                      </td>
                    </>}
                {buttonQueryFlag === 2 &&
                    <>
                      <td>
                        <h3>Type</h3>
                      </td>
                      <td>
                        <h3>Max-Power</h3>
                      </td>
                    </>}
                {buttonQueryFlag === 3 &&
                    <>
                      <td>
                        <h3>Name</h3>
                      </td>
                    </>}
                {buttonQueryFlag === 4 &&
                    <>
                      <td>
                        <h3>Name</h3>
                      </td>
                    </>}
              </tr>
              </thead>
              <tbody>
              {buttonQueryResults.map((res: any) => (
                  <tr key={res[0]}>
                    <td>{res[0]}</td>
                    <td>{res[1]}</td>
                    <td>{res[2]}</td>
                    <td>{res[3]}</td>
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
