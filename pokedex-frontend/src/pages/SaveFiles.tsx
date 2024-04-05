import {useState, useEffect, useContext} from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './SaveFiles.css'
import AuthContext from "../context/AuthContext.tsx";
import {s} from "vite/dist/node/types.d-FdqQ54oU";

function SaveFiles() {
    const [saveFiles, setSaveFiles] = useState([]);

    const context = useContext(AuthContext);
    if (!context) throw new Error("useContext must be inside a Provider with a value");
    const validContext = context;
    const {user} = validContext;
    if (!user) throw new Error("Aman made a bad object");
    const validUser = user;
    const email = validUser.email;

    useEffect(() => {
        updateSaveFileState();
    }, []);

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
        console.log(data);
        func(data); // Set the search results in state
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error occurred while fetching search results:', error);
    }
  };

    const getDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    }

    const getSaveFileManages = async () => {
        const query = "SELECT * FROM SaveFileManages"
        await handleSearch(query, () => {});
    }

    const updateSaveFileState = async() => {
        const query =
            "SELECT * " +
            "FROM SaveFileManages s " +
            `WHERE s.Email = '${email}'`;
        await handleSearch(query, setSaveFiles);
    }

    const addSaveFile = async () => {
        await updateSaveFileState();
        const date = getDate();
        if (saveFiles.length === 0) {
            const insertQuery =
                `INSERT INTO SaveFileManages(FileID, CreationDate, Email) VALUES (0, '${date}', '${email}')`
            await handleSearch(insertQuery, () => {});
            return;
        }
        const insertQuery =
            "INSERT INTO SaveFileManages(FileID, CreationDate, Email) " +
            `VALUES (${saveFiles[saveFiles.length - 1][0] + 1}, '${date}', '${email}')`;
        await handleSearch(insertQuery, () => {});
        await updateSaveFileState();
    }

  return (
      <>
          <button onClick={addSaveFile}>Add Save File +</button>
          <button onClick={getSaveFileManages}>get tuples</button>
          <div className="savefiles-container">
              <table>
                  <tbody>
                  {saveFiles.map((res: any) => (
                      <tr key={res[0]}>
                          <td>{res[0]}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </>
  )
}

export default SaveFiles
