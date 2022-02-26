//Alerta com botão simples de 'OK'
//window.alert("Olá Mundo!")

//Alerta com botão de 'Cancelar' e 'OK'
//window.confirm("ByeBye Mundo")

const calcular = document.getElementById('calcular');

//getElementById puxa o elemento com o id igual ao que for escrito entre parenteses 

function imc () {
    
    const nome = document.getElementById('nome').value;
    const peso = document.getElementById('peso').value;
    const distancia = document.getElementById('distancia').value;
    const tempo = document.getElementById('tempo').value;

    const resultado = document.getElementById('result');

    //const foi usado para a variavel não se alterar dentro do codigo

    if (nome !== ''  && peso !== '' && distancia !=='' && tempo !=='') {
               const tempo_corte = tempo.split(':');
               const horas = parseInt(tempo_corte[0]);
               const minutos = parseInt(tempo_corte[1]);
               const segundos = parseInt(tempo_corte[2]);

               const tempo_horas = horas + minutos/60 + segundos/3600;

               const tempo_minutos = tempo_horas*60;

               const velocidade = (distancia/(tempo_horas)).toFixed(2);
               const pace = ((60/velocidade)).toFixed(2);
               const calorias = (velocidade*peso*0.0175*(tempo_minutos)).toFixed(2);
               resultado.textContent = `Olá, ${nome}! Voce percorreu ${distancia}km em ${horas}h${minutos}min${segundos}s,uma média de ${velocidade}Km/h ou pace de ${pace}km/min. Estima-se que voce tenha consumido ${calorias} calorias.` 

    }else {
        resultado.textContent = 'Preencha todos os campos.';
    }
}
calcular.addEventListener('click', imc);
//adicionando evento de clique, é equivalente ao OnClick do html
