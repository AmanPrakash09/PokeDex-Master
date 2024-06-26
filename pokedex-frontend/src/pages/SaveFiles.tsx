import {useState, useEffect, useContext} from 'react'
import appLogo from '../assets/PokedexLogo.png'
import './SaveFiles.css'
import AuthContext from "../context/AuthContext.tsx";
import {s} from "vite/dist/node/types.d-FdqQ54oU";

function SaveFiles() {
    const [saveFiles, setSaveFiles] = useState<any[][]>([]);

    const context = useContext(AuthContext);
    if (!context) throw new Error("useContext must be inside a Provider with a value");
    const validContext = context;
    const {user} = validContext;
    if (!user) throw new Error("Genuinely don't know how this is possible");
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

    const updateSaveFileState = async() => {
        const query =
            "SELECT * " +
            "FROM SaveFileManages s " +
            `WHERE s.Email = '${email}'`;
        await handleSearch(query, setSaveFiles);
    }

    const addSaveFile = async () => {
        console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠶⠟⠛⠛⠉⠉⠉⠁⠀⠀⠈⠉⠉⠙⠛⠿⢶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⠀⠀⠀⣠⠖⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⠀⢠⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⣠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⠀⠀⠀⠹⣧⡀⠀⠀⠀⡏⠉⠙⠋⢹⡆\n" +
            "⠀⠀⢠⡿⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠚⠉⠉⠛⠿⣦⡀⠀⠸⣷⡀⠀⠀⠹⣄⠀⠠⡹⠃\n" +
            "⠀⢀⣿⠃⠀⠀⠀⠀⣠⣶⠾⠟⠛⠉⠉⠛⠿⣶⣄⠀⠀⠀⠀⣰⠃⢀⣠⣤⣄⠀⠈⢻⣦⠀⢻⣧⠀⠀⠀⠈⠓⠋⠀⠀\n" +
            "⠀⢸⣿⠀⠀⠀⣠⣾⠋⠁⠀⠀⢀⣠⣤⣤⣤⣈⠙⣷⣄⠀⢠⣏⣶⣿⣿⣿⣿⣿⣦⠀⢻⣧⠘⣿⢀⢸⡛⠛⢲⠀⠀⠀\n" +
            "⠀⣾⡇⠀⠀⢠⡿⠁⠀⠀⣠⣾⡿⢿⣿⣿⣿⣿⣷⣌⢿⣆⢸⣿⡋⠉⢉⣿⣿⣿⣿⣧⠈⣿⠀⣿⣿⠀⠹⠶⠋⠀⠀⠀\n" +
            "⠈⡟⣿⠀⠀⢸⠇⠀⢀⣼⣄⠈⠀⣸⣿⣿⣿⣿⣿⣿⡎⣿⣿⣿⣿⣶⣿⣻⣿⣿⣿⣿⣤⣿⢀⣿⣿⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⢷⢹⡆⠀⢸⡄⠀⣾⣿⣿⣿⣿⣿⣩⣿⣿⣿⣿⣿⣇⣿⢹⣿⣿⣿⣿⣿⣿⣿⣟⣿⣿⠏⣸⢧⠏⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠈⣇⢳⡀⠈⢧⠐⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⠏⢠⢁⡞⠀⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠈⢎⠃⠀⠈⠳⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⠟⠁⠀⠀⠈⠻⣿⣿⣿⣿⡿⠟⠁⠀⣠⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⠈⠳⣄⠀⠀⠈⠙⡻⠿⢿⣿⡿⠿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠈⠉⠃⣀⡀⣰⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⣀⡤⠬⣷⣄⡲⣤⣈⠀⠈⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡴⢛⡵⠚⠁⠀⢀⣠⣤⣀⡀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠸⣇⠀⠀⠀⢻⣿⠒⠭⣟⣷⢶⣤⣤⣤⣤⣤⣤⣤⣤⣶⢾⣟⠯⠗⠊⠁⠀⠀⠀⣾⠟⠁⠀⢘⣿⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⢹⣧⠀⠀⠈⣿⡄⠀⠀⠈⠉⠛⠛⠛⠛⠛⠒⠋⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⢸⡿⠀⠀⢠⣿⠏⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⣠⣿⠇⠀⠀⠙⠛⠛⠒⠒⠛⠛⠛⠻⠿⢷⡢⣤⣔⡶⠿⠟⠛⠛⠛⠻⠿⠽⠟⠁⠀⠀⢺⡿⡄⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⢰⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣾⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⡀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠻⢿⣿⠒⠲⠛⠙⠲⠦⢼⣿⡿⠟⠛⠃⠀⠀⠀⠀⠀⠀⠀⢸⣇⡇⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠹⠿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠇⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡾⡻⠃⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⠀⠈⠻⢦⣀⠀⠀⠀⠀⠀⠀⢀⡾⡿⠀⠀⠀⠀⠀⠀⠘⣿⣆⠀⠀⠀⠀⠀⠀⢀⣠⣴⢯⠞⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⠀⠀⠀⠀⠉⠛⠳⠶⠶⠶⣖⡿⠚⠁⠀⠀⠀⠀⠀⠀⠀⠘⠮⣷⣶⡤⡤⠴⠾⠟⠋⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀\n" +
            "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀")
        const date = getDate();
        let newFileID = 0;
        if (saveFiles.length === 0) {
            const insertQuery =
                `INSERT INTO SaveFileManages(FileID, CreationDate, Email) VALUES (0, '${date}', '${email}')`
            await handleSearch(insertQuery, () => {});
        } else {
            newFileID = saveFiles[saveFiles.length - 1][0] + 1;
            const insertQuery =
                "INSERT INTO SaveFileManages(FileID, CreationDate, Email) " +
                `VALUES (${newFileID}, '${date}', '${email}')`;
            await handleSearch(insertQuery, () => {});
        }
        // await updateSaveFileState();
        setSaveFiles([...saveFiles, [newFileID, date, email]])
        alert("Save file added successfully")
    }

  return (
      <>
          <h2>{email}'s Save Files</h2>
          <button onClick={addSaveFile}>Add Save File +</button>
          <div className="savefiles-container">
              <table>
                  <tbody>
                  {saveFiles.map((res: any) => (
                      <tr key={res[0]}>
                          <td>File Number: {res[0] + 1}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </>
  )
}

export default SaveFiles
