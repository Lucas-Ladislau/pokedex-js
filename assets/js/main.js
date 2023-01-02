const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 5;
let offset = 0; 
const maxRecord = 15;

function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((typesSlot) => `<li class="type">${typesSlot.type.name}</li>`)
}

function convertPokemonToLi(pokemon){
     return `<li class="pokemon ${pokemon.mainType}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}"/>
                </div>
            </li>`
}


function loadPokemonsItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    
            pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    
            // Outra maneira de fazer
            // const newList = pokemons.map((pokemon)=>{
            //     return convertPokemonToLi(pokemon)
            // })
    
            // const newHtml = newList.join('');
            // pokemonList.innerHTML += newHtml;
    
            // Outra forma de fazer
            // const listItemns = [];
    
            // for (let index = 0; index < pokemons.length; index++) {
            //     const element = pokemons[index];
            //     listItemns.push(convertPokemonToLi(pokemons[index]));
            // }
    
            // console.log(listItemns);
        }).catch((error) => console.log(error))

}

loadPokemonsItems(offset, limit);

loadMoreButton.addEventListener('click', () =>{
    offset += limit;
    const qtdRecordNextPage = offset+limit;
    if(qtdRecordNextPage >= maxRecord){
        const  newLimit = maxRecord - offset;
        loadPokemonsItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    loadPokemonsItems(offset,limit);
})