var champsURL = "https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json";
var List = document.querySelector('#champList')
var Clist;

function NameGenerate(){
    var ChampNames = [];
    fetch(champsURL)
    .then((response) => {
      return response.json();
    })
    .then((champJson) => {
      var ArrChamp = champJson.data;
      for(var i in ArrChamp){
          ChampNames.push(ArrChamp[i].id)
          List.innerHTML += `<li><img src='http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${ArrChamp[i].id}.png'> ${ArrChamp[i].id}</li>`
      }


    })

    return ChampNames
}

NameGenerate();




