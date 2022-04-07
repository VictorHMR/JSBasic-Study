const calcular = document.getElementById('calcular');

function calculadora () {
    
    const nome = document.getElementById('nome').value;
    const p = document.getElementById('ValorMensal').value;
    const juros = document.getElementById('Juros').value;
    const n = document.getElementById('Parcelas').value;

    const resultado = document.getElementById('result');

    //const foi usado para a variavel não se alterar dentro do codigo

    if (p !== ''  && juros !== '' && n !=='' && nome !=='') {
            const i = (juros/100)
            const VF = p*(((1+i)**n-1)/i)

            //Resultados em reais
            const VFR = VF.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})
            const PR = p.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})

            resultado.textContent = `${nome}, se você aplicar ${PR}, a taxa de juros de ${juros}% ao mês duante ${n} meses, acumulará uma poupança de ${VFR}` 


                   
             
               

    }else {
        resultado.textContent = 'Preencha todos os campos.';
    }
}
calcular.addEventListener('click', calculadora);
//adicionando evento de clique, é equivalente ao OnClick do html
