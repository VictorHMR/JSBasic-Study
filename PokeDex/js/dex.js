
 var Ninicial;
 var NFinal;
 var regiao;
 var GNumber;
 var url= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

function fetchPokemon(geracao){
    const getPokemonUrl =  id =>`https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokePromises = [];
switch(geracao){
    case 1:  Ninicial = 1;
             NFinal= 151; 
             regiao= "Kanto";
             GNumber=1;
    break;
    case 2:  Ninicial = 152;
             NFinal = 251;
             regiao= "Johto";
             GNumber= 2;
    break;
    case 3:  Ninicial = 252;
             NFinal = 386;
             regiao= "Hoenn";
             GNumber=3;
    break;
    case 4:  Ninicial = 387;
             NFinal = 494;
             regiao= "Sinnoh";
             GNumber=4;
    break;
    case 5:  Ninicial = 495;
             NFinal = 649;
             regiao= "Unova";
             GNumber=5;

    break;
    case 6: Ninicial = 650;
            NFinal = 721;
            regiao= "Kalos";
            GNumber=6;
    break;
    case 7: Ninicial = 722;
            NFinal = 809;
            regiao= "Alola";
            GNumber=7;
    break;
    default: Ninicial = 1;
             NFinal = 809;
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
                <img class="card-image" alt="${pokemon.name}" width="50%" src="${url}/${pokemon.id}.png" />
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

function ShinyChange(){
    if( $("#ShinyC").is(':checked') == true ){
        url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny"

    }else if( $("#ShinyC").is(':checked') == false){
        url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
    }
    fetchPokemon(GNumber)
}
fetchPokemon();


