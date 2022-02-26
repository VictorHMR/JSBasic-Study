const calcular = document.getElementById('calcular');

function calculadora () {
    
    const nome = document.getElementById('nome').value;
    const rendaMensal = document.getElementById('rendaM').value;
    const valorFinanciado = document.getElementById('valorF').value;
    const entrada = document.getElementById('entrada').value;
    const juros = document.getElementById('juros').value;
    const prestacoes = document.getElementById('prestacoes').value;



    const resultado = document.getElementById('result');

    //const foi usado para a variavel não se alterar dentro do codigo

    if (nome !== ''  && rendaMensal !== '' && valorFinanciado !=='' && entrada !=='' && juros !=='' && prestacoes !=='') {
               const valorRest = valorFinanciado - entrada
               const taxaJuros = (juros/100)
               const valorMensal = ((((1+taxaJuros)**prestacoes)*(taxaJuros)/(((1+taxaJuros)**prestacoes)-1))*valorRest)
               const valorMensalF = valorMensal.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
               if(rendaMensal - (rendaMensal/100)*30 < valorMensal){
                resultado.textContent = `Infelizmente ${nome}, a parcela ultrapassa o valor de 30% da sua renda.`;
               }else{
                resultado.textContent = `O financiamento será possivel ${nome}! Voce pagará ${valorMensalF} durante ${prestacoes} Meses ` 
               }      
             
               

    }else {
        resultado.textContent = 'Preencha todos os campos.';
    }
}
calcular.addEventListener('click', calculadora);
//adicionando evento de clique, é equivalente ao OnClick do html
