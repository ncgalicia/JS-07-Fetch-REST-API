// Fetch
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';

// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Obtener pokemon
document.getElementById('get-btn').addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', JSON.stringify(pokemon));
        PokemonCard(pokemon);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    if (storedId) {
        const pokemon = JSON.parse(storedId);
        PokemonCard(pokemon.name);
    }
});
   


// obtener el siguiente

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const storedId = localStorage.getItem('currentPokeId');
        if (storedId) {
            const pokemon = JSON.parse(storedId); 
            const newId = Math.max(1, pokemon -1);
            const previousPokemon = await fetchPokemon(newId);
            localStorage.setItem('currentPokeId', JSON.stringify(previousPokemon.id));
            PokemonCard(previousPokemon);
        }
    });

// obtener el siguiente

    document.getElementById('next-btn').addEventListener('click', async () => {
        const storedId= localStorage.getItem('currentPokeId');
        if (storedId) {
            const pokemon = JSON.parse(storedId);
            const nextPokemon = await fetchPokemon(pokemon.id + 1);
            localStorage.setItem('currentPokeId', JSON.stringify(nextPokemon));
            PokemonCard(nextPokemon);
        }
    });
    
        

function PokemonCard(pokemon) {
            const pokemonContainer = document.getElementById('pokemon-container');
            pokemonContainer.innerHTML = `
                <div class="pokemon-card">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <h3>${pokemon.name}</h3>
                    <p>Tipo: ${pokemon.types[0].type.name}</p>  
                    <p>Altura: ${pokemon.height}  Peso: ${pokemon.weight}</p
                    <p>Experiencia: ${pokemon.base_experience} </p>  
                                                                                            
                </div>
            `;
        }
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch
