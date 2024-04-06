import { useState } from 'react'
import './Pokemon.css'
//

function Game() {
  const [projectionResults, setProjectionResults] = useState([]);

  const [titleCheckbox, setTitleCheckBox] = useState(false);
  const [releaseDateCheckbox, setReleaseDateCheckBox] = useState(false);
  const [salePriceCheckbox, setSalePriceCheckBox] = useState(false);
  const [consoleCheckbox, setConsoleCheckBox] = useState(false);
  const [generationCheckbox, setGenerationCheckBox] = useState(false);

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
        <h1>PokeDex Master - Game Search</h1>
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
      </>
  )
}

export default Game
