import { useState } from 'react'
import './Pokemon.css'

function Location() {
  const [searchAddress, setSearchAddress] = useState("");
  const [locationResults, setLocationResults] = useState([]);

  const getPokemonFromLocation = async () => {
    const query =
        "SELECT l.Address, p.PokemonName " +
        "FROM LocationFeaturesAccess1 l, PokemonStores1 p, PokemonContains pc " +
        "WHERE l.Address = pc.Address AND p.PokeID = pc.PokeID " +
        `AND l.Address LIKE '%${searchAddress.replace(/'/g, '')}%'`
    await handleSearch(query, setLocationResults);
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
    <h1>Pokedex Master - Location Search</h1>
          <div className="filter-container">
            <h2>Location Information</h2>
            <div>
              <label>
                <input
                    type="text"
                    value={searchAddress || ""}
                    placeholder="Type a partial address"
                    onChange={(e) => setSearchAddress(e.target.value)}
                />
              </label>
              <button onClick={getPokemonFromLocation}>Search</button>
              <button onClick={() => setLocationResults([])}>Clear</button>
            </div>
            <div className="spacer"></div>
            <hr/>
            <h2>Search Results</h2>
            <table>
              <thead>
              <tr>
                <td><h3>Location</h3></td>
                <td><h3>Name</h3></td>
              </tr>
              </thead>
              <tbody>
              {locationResults.map((res: any, index: number) => (
                  <tr key={index}>
                    <td>{res[0]}</td>
                    <td>{res[1]}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
      </>
      )
      }

      export default Location
