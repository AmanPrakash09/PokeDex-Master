import { useState } from 'react'
import './Pokemon.css'

function Move() {
  const [buttonQueryResults, setButtonQueryResults] = useState([]);
  const [buttonQueryFlag, setButtonQueryFlag] = useState(0);

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
          <h1>PokeDex Master - Move Search</h1>
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
      </>
      )
      }

      export default Move
