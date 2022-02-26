

function fetchPokemon(geracao){
    const getPokemonUrl =  id =>`https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokePromises = [];
    var Ninicial;
    var NFinal;
    var regiao;
switch(geracao){
    case 1:  Ninicial = 1;
             NFinal= 151; 
             regiao= "Kanto";
               break;
    case 2:  Ninicial = 152;
             NFinal = 251;
             regiao= "Johto";
                break;
    case 3:  Ninicial = 252;
             NFinal = 386;
             regiao= "Hoenn";
                break;
    case 4:  Ninicial = 387;
             NFinal = 494;
             regiao= "Sinnoh";

                break;
    case 5:  Ninicial = 495;
             NFinal = 649;
             regiao= "Unova";
                break;
    default: Ninicial = 1;
             NFinal = 649;
             regiao= "Pokedex(1-5gn)";
                break;
}
    for(let i =Ninicial; i <= NFinal; i++){
        pokePromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }

    Promise.all(pokePromises)
    .then(pokemons =>{
        const liPoke = pokemons.reduce((accumulator, pokemon) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator += `
                <li class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" width="50%" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle ">${types.join(' | ')}</p> 
                </li>`;

            return accumulator
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]');
        $(ul).html(liPoke);
        $("#tituloP").html(regiao);
    })


}
fetchPokemon();