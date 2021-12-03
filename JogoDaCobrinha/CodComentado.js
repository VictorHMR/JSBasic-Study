window.onload = function(){
  var stage = document.getElementById('stage');
  var ctx = stage.getContext("2d");

  //Adicionar Evento "KeyPush" toda vez que uma tecla for pressionada
  document.addEventListener("keydown",keyPush);

  
  setInterval(game, 100);    // Define a frequencia que a função é executada, logo, controla a velocidade do jogo

  /*---------------------Variaveis-------------------------*/
    const vel = 1;          //Quantidade de quadrados andados
    var vx = vy = 0;        //Velocidade X e Y  
    var px =10, py = 15;    //Posição X e Y
    var tp = 20;            //Tamanho dos Quadrados
    var qp = 20;            //Quantidade de Quadrados
    var ax = ay = Math.floor(Math.random()*qp);       //Posição da Maçã aleatoriamente
    var trail = [];         //Array do Tamanho da Cobra
    tail = 5;               //Tamanho inicial da Cobra
    score = 5;              //Contador
    cont = 0;
    var ultimo = "";        //Ultima tecla pressionada


  /*-----------------------------------Função Controladora----------------------------------------*/

    function game(){
      document.getElementById('score').textContent = Score;        //contador de pontos
      px += vx;             //Modifica a posição X baseado no comando dado
      py += vy;             //Modifica a posição Y baseado no comando dado
      

// If para impedir que a cobra saia do Tamanho limite do cenário\\
      if(px < 0){           
        px = qp;
      }
      if(px > qp ){
        px = 0;
      }
      if(py < 0){
        py = qp;
      }
      if(py > qp){
        py = 0;
      }
      


      ctx.fillStyle = "black";                                     //Propiedade do <canvas> para pintar uma determinada area
      ctx.fillRect(0,0, stage.width, stage.height);                //Comando para executar a pintura na aréa completa

      ctx.fillStyle = "red";                                          
      ctx.fillRect(ax*tp, ay*tp, tp,tp);                           //Comando para executar a pintura no local em que está a maçã

      ctx.fillStyle = "blueviolet";
      for(var i = 0;i < trail.length; i++){                        //Repetição para pintar a cobra, enquanto ela se move
        ctx.fillRect(trail[i].x*tp, trail[i].y*tp  , tp-1,tp-1);       //Comando para executar a pintura da cobra, verificando as posições X e Y dela

        if( trail[i].x == px && trail[i].y == py){                       

          document.getElementById('score').textContent = "Game Over!";      //inserir o texto "Game Over!"
          vx = vy = 0;                                          //caso ela toque, irá deixar a velocidade zerada                        
          tail = 5;                                             //Voltar tamanho inicial                            
          score = 5;                                            //Voltar pontos iniciais
        }

        if(cont > 1){
          if( trail[i].x == px && trail[i].y == py){              // IF para verificar se a cobra não tocou nela mesma 

            document.getElementById('score').textContent = "Game Over";
            vx = vy = 0;
            tail = 5;
            score = 5;
            ultimo = "";                                          

          }
        }else{

        if( trail[i].x == px && trail[i].y == py){               // IF para manter ela parada no inicio 

          vx = vy = 0;                                          //caso ela toque, irá deixar a velocidade zerada
          tail = 5;                                             //Voltar tamanho inicial
          score = 5;                                            //Voltar pontos iniciais
          ultimo = "";                                          //Resetando ultima tecla tocada
        }
      }

      }

      trail.push({x:px, y:py})                          //Comando para adicionar no Array o valor de X e Y, como a posição da cabeça da cobra
      while(trail.length > tail){                       //Repetição para "Descolorir" o final da cobra por onde ela passa dando impressão de movimento
        trail.shift();                                  //comando para realizar o corte
      }

      if(ax==px && ay == py){                        //IF para verificar se a maçã foi pega
        tail++;                                      //Adicionando 1 Ao tamanho da cobra
        ax = Math.floor(Math.random()*qp);           //Gerando uma posição X aleatoria para a proxima maçã
        ay = Math.floor(Math.random()*qp);           //Gerando uma posição Y aleatoria para a proxima maçã
      }

    }

 
  /*-----------------------------------Função Botões----------------------------------------*/


    function keyPush(event){              //Função para detectar os cliques do usuario

      cont++                              //Demonstrar q não é a primeira vez
      switch(event.keyCode){

        case 37:                                                               //Numero da seta left
        if(ultimo != "right"){                                                 //Verifica ultima tecla pressionada para impedir de clicar a oposta
          vx = -vel;                                                           //Transformando a direção de X em uma posição a esquerda
          vy = 0;                                                              //Transformando a direção de Y em 0
          ultimo = "left"
          document.getElementById('leftS').style.color = "blueviolet";              //Comando para deixar a tecla verde
          setTimeout(function(){                                               
            document.getElementById('leftS').style.color = "white"}, 300)      //Comando para voltar ela ao branco após um tempo
          }
          break;
          case 38:       //up
          if(ultimo != "down"){
            vx = 0;
            vy = -vel;
            ultimo = "up"
            document.getElementById('upS').style.color = "blueviolet";
            setTimeout(function(){
            document.getElementById('upS').style.color = "white"}, 300)
          }
            break;
           
          case 39:       //right  
          if(ultimo != "left"){
            vx = vel;
            vy = 0;
            ultimo = "right"
            document.getElementById('rightS').style.color = "blueviolet";
            setTimeout(function(){
            document.getElementById('rightS').style.color = "white"}, 300)
          }
            break;
          case 40:       //down
          if(ultimo != "up"){
            ultimo = "down"
            vx = 0;
            vy = vel;
            document.getElementById('downS').style.color = "blueviolet";
            setTimeout(function(){
            document.getElementById('downS').style.color = "white"}, 300)
          }
            break;

      }
    }

    

}