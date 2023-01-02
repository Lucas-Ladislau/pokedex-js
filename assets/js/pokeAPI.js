
pokeApi = {};

function convertPokeApiDetailToPokemonModel(pokemonDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.order;
    pokemon.name = pokemonDetail.name;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

    //fazendo destructuring
    const types = pokemonDetail.types.map((typesSlot)=> typesSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    //pega a 1° posição 
    pokemon.mainType = type;
    return pokemon;
}

//Pegar os detalhes individuais de cada pokemon, acessando como base
//a url correspondente ao pokemon
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then(response => response.json())
            .then(convertPokeApiDetailToPokemonModel);
}

pokeApi.getPokemons = (offset = 0, limit = 5 ) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((responde) => responde.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails => pokemonDetails))
        .catch((error) => console.log(error))
}