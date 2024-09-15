const express = require('express');
const { resolve } = require('path');
const axios = require('axios')

const app = express();
const port = 3020;


const pokemons = [];
app.get('/pokemons', async(req,res)=>{
   const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10'); // revisa los primeros 10 pokemones y los guarda en response
   const pokemon = response.data.results;  // asigna la data a la variable pokemon, para luego iterar, la varianle pokemon es una lista

    for(let i = 0; i < pokemon.length ; i++){
        const pokemonData = await axios.get(pokemon[i].url); // leemos la lista y le asignamos otra variable

        const ObjetPokemon = {
            name : pokemonData.data.name,
            id : pokemonData.data.id
        }

        pokemons.push(ObjetPokemon); // lista de objetos que son pokemones
        
    }
    return res.json({
        message: 'pokemons guardados correctamente',
        data: pokemons
       
    })

})

//const pokemons = ['Pikachu', 'Ditto', 'Bulbasaur', 'Zubat'];

app.get('/ejemplo', (req, res) => {
  return res.json({
    ok: true,
    message: 'Holaaa',
  });
});

/*app.get('/pokemons/:name', (req, res) => {
  const pokemonName = req.params.name;

  const pokemon = pokemons.find(
    (pokemon) => pokemon.toLowerCase() === pokemonName.toLowerCase()
  );
  if (!pokemon) {
    return res.json({
      message: 'Pokemon not found',
      input: pokemonName,
    });
  }

  return res.json({
    pokemon: pokemon,
  });
});
*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});