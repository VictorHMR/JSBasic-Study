function ConsultarCep(){
    var cep = document.getElementById("cep").value
    var url ="https://viacep.com.br/ws/"+ cep +"/json/"
    $.ajax({
        url: url,
        type:"GET",
        success: function(response){
            console.log(response)
            $("#uf").html(response.uf);
            $("#cidade").html(response.localidade);
            $("#bairro").html(response.bairro);
            $("#logradouro").html(response.logradouro);
            $("#cepm").html("CEP: " + response.cep);
            $(".cep").show();
            $('#erro').html('');
        },
        error : function(response) {
            $("#erro").html("Digite um cep valido !")
            $('#uf').html('');
            $('#cidade').html('');
            $('#bairro').html('');
            $('#logradouro').html('');
            $('#cepm').html('CEP');
            $("#erro").show();
        },
    })
}

$(function(){
    $("#erro").hide();
})