// fetch.js

// These are the API links I’m using: one for Ditto, and one that returns a list of Pokémon
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";

// These are the HTML elements where I want the data to show up on the page
const outputEl = document.querySelector("#output"); // shows one Pokémon
const outputListEl = document.querySelector("#outputList"); // shows the list

let results = null; // I use this to store the Pokémon data so I can check it in the console

// This function fetches ONE Pokémon and then sends the data to doStuff()
async function getPokemon(url) {
  try {
    const response = await fetch(url); // I request the data from the API
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json(); // I convert the response to JSON
    doStuff(data); // I display the Pokémon data
  } catch (error) {
    outputEl.innerHTML = "<p>Could not load Pokemon data.</p>";
    console.error(error);
  }
}

// This creates the HTML I want to show for a single Pokémon (name + image)
function pokemonTemplate(pokemon) {
  const img = pokemon?.sprites?.other?.home?.front_default ?? "";
  return `
    <h2>${pokemon.name}</h2>
    ${
      img
        ? `<img src="${img}" alt="Image of ${pokemon.name}">`
        : "<p>No image available.</p>"
    }
  `;
}

// This saves the Pokémon data, puts it into the page, and logs it so I can see it
function doStuff(data) {
  results = data;
  outputEl.innerHTML = pokemonTemplate(data);
  console.log("first:", results);
}

// This function fetches a LIST of Pokémon and then sends the data to doStuffList()
async function getPokemonList(url) {
  try {
    const response = await fetch(url); // I request the list from the API
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json(); // I convert the response to JSON
    doStuffList(data); // I display the list of Pokémon
  } catch (error) {
    outputListEl.innerHTML = "<li>Could not load list.</li>";
    console.error(error);
  }
}

// This takes the list from data.results, sorts it, and outputs it as <li> items
function doStuffList(data) {
  const pokeList = data.results ?? []; // the Pokémon list is inside results
  const sorted = sortPokemon(pokeList); // I alphabetize the list

  outputListEl.innerHTML = sorted.map((p) => `<li>${p.name}</li>`).join("");
}

// This returns a NEW sorted array so I don’t change the original list
function sortPokemon(list) {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
}

// I run both fetch calls: one for Ditto, and one for the Pokémon list
getPokemon(url);
console.log("second:", results); // this usually logs null because fetch hasn’t finished yet
getPokemonList(urlList);
