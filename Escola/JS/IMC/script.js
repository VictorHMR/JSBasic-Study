//Alerta com botão simples de 'OK'
//window.alert("Olá Mundo!")

//Alerta com botão de 'Cancelar' e 'OK'
//window.confirm("ByeBye Mundo")

const calcular = document.getElementById('calcular');

//getElementById puxa o elemento com o id igual ao que for escrito entre parenteses 

function imc () {
    
    const nome = document.getElementById('nome').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const resultado = document.getElementById('result');

    //const foi usado para a variavel não se alterar dentro do codigo

    if (nome !== '' && altura !== '' && peso !== '') {

        // ** significa Elevado a 
        //toFixed fixa a 1 casa decimal nesse caso

        const valorIMC = (peso/(altura**2)).toFixed(1);
        let classificacao = '';
        let Max = (25* altura**2).toFixed(1);
        let Min = (18.5* altura**2).toFixed(1);
        //let/var foi usado pois o valor da classificação pode ser mudada durante o codigo

        if (valorIMC < 18.5){
            classificacao = 'abaixo do peso.';
        }else if (valorIMC < 25) {
            classificacao = 'com o peso ideal. Parabéns!';
        }else if (valorIMC < 30){
            classificacao = 'levemente acima do peso.';
        }else if (valorIMC < 35){
            classificacao = 'com obesidade grau I.';
        }else if (valorIMC < 40){
            classificacao = 'com obesidade grau II.';
        }else {
            classificacao = 'com obesidade grau III.';
        }
        resultado.textContent = `Bem Vindo ! ${nome}! <br> Com ${peso}kg e ${altura}m, seu IMC é ${valorIMC}.<br> Atualmente, você está ${classificacao} <br> Seu peso minimo é: ${Min} <br> E seu peso maximo é: ${Max}`;
    }else {
        resultado.textContent = 'Preencha todos os campos.';
    }
}
calcular.addEventListener('click', imc);
//adicionando evento de clique, é equivalente ao OnClick do html
