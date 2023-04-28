const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type1] = types
    pokemon.types = types
    pokemon.type = type1

    //pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    if(pokemon.number == 122){
        pokemon.photo = `https://projectpokemon.org/images/normal-sprite/mr.mime.gif`
    }else{
        pokemon.photo = `https://projectpokemon.org/images/normal-sprite/${pokemon.name.replace("-", "_")}.gif`
    }
    
    return pokemon  
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
           .then((response) => response.json())
           .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
                .then((response) => response.json())
                .then((jsonBody) => jsonBody.results)
                .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
                .then((detailRequests) => Promise.all(detailRequests))
                .then((pokemonsDetails) => pokemonsDetails)
                .catch((error) => console.error(error))
}