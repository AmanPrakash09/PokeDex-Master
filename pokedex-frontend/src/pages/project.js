document.getElementById("testbutton").addEventListener("click", handleFormSubmission)

function handleFormSubmission(event) {
    event.preventDefault();
    let query = "SELECT ps1.PokemonName FROM PokemonStores1 ps1 WHERE ps1.Ability LIKE '%Pressure%'";
    console.log(JSON.stringify(query));
    fetch("http://127.0.0.1:8000/query/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    }).then((res) => {
        return res.json()
    }).then((res) => {
        alert(res.result);
    })
}