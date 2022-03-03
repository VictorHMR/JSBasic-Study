
 var Ninicial;
 var NFinal = 100;
 var regiao;
 var GNumber;
 let pokeP;
 var contador = 0;
 const MP = 809;
const url= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
var urlM = url;
function fetchPokemon(geracao){
    const getPokemonUrl =  id =>`https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokePromises = [];
    $("#mais").hide();
switch(geracao){
    case 0:  Ninicial = 1;
             regiao= "Pokedex(1-7gn)";
             GNumber=0;
             $("#mais").show();
    break;
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
             NFinal = 100;
             regiao= "Pokedex(1-7gn)";
             GNumber=0;
             $("#mais").show();
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
        $("#aviso").html((NFinal - Ninicial +1) + " Resultados Exibidos");
        
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
    $("#mais").hide();
    let value = $("#search").val().toLowerCase();
    if(value == ""){
        fetchPokemon(GNumber);
    }
    else{
    const getPokemonUrl =  id =>`https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokePromises = [];

    if(isNaN(value)){
        for(let i = 1 ; i <= MP; i++){
            pokePromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
        }
    }else{
        pokePromises.push(fetch(getPokemonUrl(value)).then(response => response.json()));
    }
    Promise.all(pokePromises)
    .then(pokemons =>{
        const liPoke = pokemons.reduce((accumulator, pokemon) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            if(isNaN(value)){
                if(pokemon.name.startsWith(value)){
                    contador++;
                    pokeP = value;
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
                    $("#aviso").html(contador + " Resultados");
                }else{
                    pokeP = value
                    if(accumulator.length <= 0){
                        $("#aviso").html("Sem Resultados");
                    } 
                }
            }else{
                pokeP = value;
                contador = 1;
                accumulator += `
                    <li class="card ${types[0]} solo" onclick="//changePoke('${pokemon.name}')">
                    <img class="card-image" alt="${pokemon.name}" width="50%" src="${urlM}/${pokemon.id}.png" />
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="card-subtitle"> ${types.join(' | ')}</p>
                    <p class="card-subtitle">`  
                    for(i=0; i < types.length;i++){
                        accumulator += `<img class="iconT" src="img/elements/${types[i]}.ico">`
                    } 
                accumulator += `</p></li>`
                $("#aviso").html(contador + " Resultados");

            }
           

            return accumulator
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]');
        $(ul).html(liPoke);
        $("#tituloP").html(pokeP);
        contador= 0;

    })
    }
}

function changePoke(poke){
    $("#search").val(poke);
    searchPoke();
}

function MorePoke(){
    NFinal += 50;
    fetchPokemon(0);
}

$("#search").on('keyup', function (event) {
    if (event.keyCode !== 13) return;
    searchPoke()
    $("#aviso").val("")
    $("#tituloP").val("")
    contador = 0;
});

$(".btnG").on('click', function(){
    $('html, body').animate({scrollTop:0}, 'fast');
    $("#search").val('');
});

fetchPokemon();


