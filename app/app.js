document.addEventListener("DOMContentLoaded", async()=>{
    const getCharacters = await fetch("http://localhost:3000/characters/");
    const characters = await getCharacters.json();
    console.log(characters);
})