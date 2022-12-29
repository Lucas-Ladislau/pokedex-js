const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

fetch(url)
    .then(function (responde){
        return responde.json()
}).then( function (jsonBody){
    console.log(jsonBody)
}).catch(function(error){
    console.log(error);
})

console.log(20)