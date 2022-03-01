
 var Ninicial;
 var NFinal;
 var regiao;
 var GNumber;
 const url= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
var urlM = url;
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
             regiao= "Pokedex(1-7gn)";
             GNumber=0;
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
                <li class="card ${types[0]}" onclick="//changePoke('${pokemon.name}')">
                <img class="card-image" alt="${pokemon.name}" width="50%" src="${urlM}/${pokemon.id}.png" />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle"> ${types.join(' | ')}</p>
                <p class="card-subtitle">`  
                for(i=0; i < types.length;i++){
                    accumulator += `<img class="iconT" src="img/elements/${types[i]}.ico">`
                } 
            accumulator += `</p></li>`
               

            return accumulator
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]');
        $(ul).html(liPoke);
        $("#tituloP").html(regiao);
    })


}

function ShinyChange(){
    if( $("#ShinyC").is(':checked') == true ){
        urlM = url + "/shiny"

    }else if( $("#ShinyC").is(':checked') == false){
        urlM = url;
    }
    if($("#search").val() == ""){
        fetchPokemon(GNumber)
    }else{
        searchPoke();
    }
}

function searchPoke(){
    let value = $("#search").val().toLowerCase();
    if(value == ""){
        fetchPokemon(GNumber);
    }
    else{
    const getPokemonUrl =  id =>`https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokePromises = [];
    pokePromises.push(fetch(getPokemonUrl(value)).then(response => response.json()));
    Promise.all(pokePromises)
    .then(pokemons =>{
        const liPoke = pokemons.reduce((accumulator, pokemon) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            pokeP = pokemon.id+"."+ pokemon.name
            accumulator += `
                <li class="card ${types[0]} solo" onclick="//changePoke('${pokemon.name}')">
                <img class="card-image" alt="${pokemon.name}" width="50%" src="${url}/${pokemon.id}.png" />
                <p class="card-subtitle"> ${types.join(' | ')}</p>
                <p class="card-subtitle">`  
                for(i=0; i < types.length;i++){
                    accumulator += `<img class="iconT" src="img/elements/${types[i]}.ico">`
                } 
            accumulator += `</p></li>`

            return accumulator
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]');
        $(ul).html(liPoke);
        $("#tituloP").html(pokeP);

    })
    }
}

function changePoke(poke){
    $("#search").val(poke);
    searchPoke();
}

$("#search").on('keyup', function (event) {
    if (event.keyCode !== 13) return;
    searchPoke();
});

$(".btnG").on('click', function(){
    $('html, body').animate({scrollTop:0}, 'fast');
});

fetchPokemon();


