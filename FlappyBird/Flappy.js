const SHit = new Audio();
SHit.src = './Sons/hit.wav';
const sprites = new  Image();
sprites.src = './sprites.png';

let frames =0;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let maiorPont = 0;

/*---------------------------------------Definição de Objetos-------------------------------------------*/


//Objeto [Player]
function CriaFlappyBird(){                       //Atalho para criação de flappy birds
    
const flappybird = {        
    largura: 33,                 //largura , Tamanho do recorte da imagem 
    altura: 24,                  //altura , Tamanho do recorte da imagem 
    x: 10,                       //Posição X da imagem no canvas
    y: 50,                       //Posição Y da imagem no canvas
    gravidade: 0.25,             //Gravidade do passarinho
    velocidade: 0,               //Velocidade de queda do passarinho 
    TPulo: 4.6,                  //Tamanho do pulo do passarinho
    movimentos:[                 //Posições das imagens para efeito de movimento
        {srcX: 0, srcY: 0 ,},          //Asa para cima
        {srcX: 0, srcY: 26,},          //Asa no meio
        {srcX: 0, srcY: 52,},          //Asa para baixo
    ],
    frameA:0,                    //Frame Atual do jogo
    atualizaFrameA(){                   
        const IDF = 10;                             //Intervalo de frames     
        const PI = frames % IDF === 0;              //Sempre que o PI for 0, vai retornar true
        if(PI){
        const baseIncremento =1;
        const incremento = baseIncremento + flappybird.frameA;
        const Brepet = flappybird.movimentos.length;
        flappybird.frameA = incremento % Brepet;
        }
    },
    desenho(){
        flappybird.atualizaFrameA();
        const {srcX, srcY} = flappybird.movimentos[flappybird.frameA]
        ctx.drawImage(                                      //Desenhar algo no canvas, abaixo, exemplo de como usar o drawImage()
            sprites,                                        //Imagem base a ser utilizada
            srcX, srcY,                                     //Posição X e Y do começo do desenho na imagem 
            flappybird.largura, flappybird.altura,          //Tamanho do recorte da imagem
            flappybird.x, flappybird.y,                     //Posição da imagem no canvas
            flappybird.largura, flappybird.altura,          //Tamanho do desenho no Canvas
        );
    },
    atualizar(){                 //Atualizar passarinho de acordo com seu estado

        if(ColisaoChao(flappybird, globais.piso)){     //Verificando se o passarinho colidiu
                SHit.play();                   //Reproduzir audio

                EscolherTela(Tela.GAME_OVER)
            return;
        }
        flappybird.velocidade = flappybird.velocidade + flappybird.gravidade ;   //aumentar a velocidade de queda de acordo com a gravidade;
        flappybird.y = flappybird.y + flappybird.velocidade;

    },
    pulo(){
        flappybird.velocidade = -flappybird.TPulo;          //Atualizando velocidade baseado no pulo
    }

};
return flappybird;
};

//Objeto [Piso]
function CriaPiso(){                             //Atalho para o piso
const piso={
    srcX: 0,
    srcY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenho(){
        ctx.drawImage(                                     
            sprites,                                       
            piso.srcX, piso.srcY,               
            piso.largura, piso.altura,          
            piso.x, piso.y,                     
            piso.largura, piso.altura,       
        );
        ctx.drawImage(                                     
            sprites,                                       
            piso.srcX, piso.srcY,               
            piso.largura, piso.altura,          
            (piso.x + piso.largura), piso.y,                     
            piso.largura, piso.altura,       
        );
    },
    atualizar(){
        const MPiso = 1;                     //Frequencia de movimentação do piso
        const PRepet = piso.largura/2
        const mov = piso.x - MPiso;             //Movimentação do piso pelo canvas
        piso.x = mov % PRepet;                  //Formula de repetição fluida 
        
    }
}
return piso;
};

//Objeto [Cano]
function CriaCanos(){                           //Atalho para os canos
    const canos={
        largura: 52,
        altura: 400,
        piso:{
            srcX: 0,
            srcY: 169,
        },
        ceu:{
            srcX: 52,
            srcY: 169,
        },
        espaco: 80,
        desenho(){
            
        canos.pares.forEach(function(par){
            const YRandom = par.y;              //Valor aleatorio vindo do Y do objeto Par
            const EspacoEntreCanos = 90;        // Espaçamento entre um cano e outro
            const CCeuX = par.x;                  //Definindo localização X do cano
            const CCeuY = YRandom;                    //Definindo localização Y do cano

           // [Cano do Ceu]
            ctx.drawImage(
            sprites,
            canos.ceu.srcX, canos.ceu.srcY,
            canos.largura, canos.altura,
            CCeuX, CCeuY,
            canos.largura, canos.altura,
        )

            // [Cano do Piso]
            const CPisoX = par.x;
            const CPisoY = canos.altura + EspacoEntreCanos + YRandom;      //Soma para os canos sempre estarem a uma certa distancia um do outro 
            ctx.drawImage(
            sprites,
            canos.piso.srcX, canos.piso.srcY,
            canos.largura, canos.altura,
            CPisoX, CPisoY,
            canos.largura, canos.altura,
        )
        par.CCeu ={                      //Guardando posição do cano do céu
            x: CCeuX,
            y: canos.altura + CCeuY
        } 
        par.CPiso ={                    //Guardando posição do cano do Piso
            x: CPisoX,
            y: CPisoY
        }
        })

            
        },
         ColisaoCano(par){                                 //Verificação se o flappy colidiu ou não com um cano

            const Cflappy = globais.flappybird.y;          //Posição da cabeça do flappy
            const Pflappy = globais.flappybird.y + globais.flappybird.altura;        //posição do pé do flappý
            if(globais.flappybird.x + globais.flappybird.largura >= par.x){                //Identificar se houve colisão
                if(Cflappy <= par.CCeu.y){                    //verificar se foi na cabeça
                    return true;
                }
                if(Pflappy >= par.CPiso.y){                   //verificar se foi no pé
                    return true;
                }
                
            }
            return false;
        },
        pares: [],
        atualizar(){
            const P100 = frames % 100 ===0 ;         //a Cada x frames vai ser introduzido um cano novo
            if(P100){
                canos.pares.push({
                    x: canvas.width,                  //Posição do final do canvas
                    y: -150 * (Math.random() + 1),    //Formula para mudar a altura desses canos
                },)
            }

            canos.pares.forEach(function(par){        //Função para mover os canos de lugar a cada loop do atualizar()
                par.x = par.x -2;                     //Remover 2 da localização do cano para ele se mover

                if(canos.ColisaoCano(par)){
                    SHit.play();                   
                    EscolherTela(Tela.GAME_OVER);
                }


                if(par.x + canos.largura<= 0){        //remover cano do array caso ele saia do canvas
                    canos.pares.shift();
                }
            })
        }
    }
    return canos;
};

function criaPlacar(){
    const placar= {
        
        pontos: 0,
        MaiorPontos(){
            if(globais.placar.pontos > maiorPont){
                maiorPont = globais.placar.pontos;
            }
            
        },
        VerificarMedalha(){
            if(globais.placar.pontos < 5){
                return 'vazio';
            }else if(globais.placar.pontos < 10){
                return 'bronze';
            }else if(globais.placar.pontos < 15){
                return 'prata'
            }else{
                return 'ouro'
            }
        },

        desenho(){
            ctx.font = '35px VT323';
            ctx.textAlign = 'right';
            ctx.fillStyle = 'white';
            ctx.fillText(`${placar.pontos}`, canvas.width - 10, 35);
        },
        
        atualizar(){
            const IDF = 30;                             //Intervalo de frames     
            const PI = frames % IDF === 0;              //Sempre que o PI for 0, vai retornar true
            if(PI){
                placar.pontos += 1;
            }
        }
    }


    return placar;
}

//Objeto [Plano de Fundo]
const BackGround={
    srcX: 390,
    srcY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenho(){
        ctx.fillStyle = '#70c5ce';                          //Pintar o canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);    //Posições pintadas fillRect(Xinicial, Yinicial, Xfinal, Yfinal)

        ctx.drawImage(                                     
            sprites,                                       
            BackGround.srcX, BackGround.srcY,               
            BackGround.largura, BackGround.altura,          
            BackGround.x, BackGround.y,                     
            BackGround.largura, BackGround.altura,       
        );
        ctx.drawImage(                                     
            sprites,                                       
            BackGround.srcX, BackGround.srcY,               
            BackGround.largura, BackGround.altura,          
            (BackGround.x + BackGround.largura), BackGround.y,                     
            BackGround.largura, BackGround.altura,       
        );
       
    }
};

//Objeto [Tela Inicial]
const GetReady={
    srcX: 134,
    srcY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width/2)- 174/2,
    y: 50,
    desenho(){
        ctx.drawImage(                                     
            sprites,                                       
            GetReady.srcX, GetReady.srcY,               
            GetReady.largura, GetReady.altura,          
            GetReady.x, GetReady.y,                     
            GetReady.largura, GetReady.altura,       
        );
    
}
};

//Objeto [Tela Game Over]
const MGame_Over={
    srcX: 134,
    srcY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width/2)- 226/2,
    y: 50,
    Mlargura: 44,
    Maltura: 44,
    MX:74,
    MY: 138, 

    desenho(){
        ctx.drawImage(                                     
            sprites,                                       
            MGame_Over.srcX, MGame_Over.srcY,               
            MGame_Over.largura, MGame_Over.altura,          
            MGame_Over.x, MGame_Over.y,                     
            MGame_Over.largura, MGame_Over.altura,       
        ),

        ctx.font = '35px VT323';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'black';
        ctx.fillText(`${globais.placar.pontos}`, 240, 148);

        ctx.font = '35px VT323';
        ctx.textAlign = 'right';
        ctx.fillStyle = 'black';
        globais.placar.MaiorPontos();
        ctx.fillText(`${maiorPont}`, 240, 188);

        const medalha = globais.placar.VerificarMedalha();

        if(medalha == 'vazio'){
            MGame_Over.MsrcX= 0,
            MGame_Over.MsrcY= 78;
        }else if(medalha == 'bronze'){
            MGame_Over.MsrcX= 48,
            MGame_Over.MsrcY= 124;
        }
        else if(medalha == 'prata'){
            MGame_Over.MsrcX= 48,
            MGame_Over.MsrcY= 78;
        }else if(medalha == 'ouro'){
            MGame_Over.MsrcX= 0,
            MGame_Over.MsrcY= 124;
        }
        ctx.drawImage(                                     
            sprites,                                       
            MGame_Over.MsrcX, MGame_Over.MsrcY,               
            MGame_Over.Mlargura, MGame_Over.Maltura,          
            MGame_Over.MX, MGame_Over.MY,                     
            MGame_Over.Mlargura, MGame_Over.Maltura,       
        )
    
}
};

/*---------------------------------------Definição de Telas--------------------------------------------*/
const globais = {};                    //Objeto para armazenar objetos globais
let TelaAtiva = {};                    //Criar um objeto vazio para receber um Objeto da tela ativa
const Tela={
    INICIAL: {                          //Criação do objeto Tela Inicial dentro do objeto 
        inicializa(){                               //Inicia um flappy bird
         globais.flappybird = CriaFlappyBird();     //Armazena o novo flappy bird no globais      
         globais.piso = CriaPiso();                 //Armazena o piso no globais  
         globais.canos = CriaCanos();
        },
        desenho(){
            BackGround.desenho();
            globais.piso.desenho();
            globais.flappybird.desenho();
            GetReady.desenho();        //Definição das funções do objeto
        },
        click(){
            EscolherTela(Tela.JOGO)    //Definição da função para mudar de tela ao clicar nela
        },
        atualizar(){
            globais.piso.atualizar();
        }
    },

    JOGO: { 
        inicializa(){ 
              globais.placar = criaPlacar();       //criação do objeto placar
        },                                               
        desenho(){
            BackGround.desenho();
            globais.canos.desenho();
            globais.piso.desenho();
            globais.flappybird.desenho();
            globais.placar.desenho();

        },
        click(){
            globais.flappybird.pulo();  
        },
        atualizar(){
            globais.flappybird.atualizar();
            globais.piso.atualizar();
            globais.canos.atualizar();
            globais.placar.atualizar();

        }
    },

    GAME_OVER: {
        desenho(){
            MGame_Over.desenho();
        },
        atualizar(){

        },
        click(){
            EscolherTela(Tela.INICIAL);
        }
    }
    
};


/*---------------------------------------Definição de Mecanicas-------------------------------------------*/


function ColisaoChao(flappybird, piso){                 //Verifica se há alguma colisão sendo feita
    const flappybirdY = flappybird.y + flappybird.altura;
    const pisoY = piso.y;
    if(flappybirdY >= pisoY){
        return true;
    }
        return false
    };
    

function EscolherTela(NovaTela){                    //Função para mudar as telas
        TelaAtiva = NovaTela;              //Define a tela ativa como a tela passada de parametro
        if(TelaAtiva.inicializa){          //Verifica se a tela ativa possui o metodo inicializa
            TelaAtiva.inicializa();        //Chama a função de inicialização do novo flappy bird
        }
}
/*---------------------------------------------Outros--------------------------------------------------*/

function loop(){

    TelaAtiva.desenho();
    TelaAtiva.atualizar();
    frames = frames +1
    requestAnimationFrame(loop);

}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    botao = document.getElementById('botao');

    botao.addEventListener('click', function(){  //Adição do evento de clique
        if(TelaAtiva.click){
            TelaAtiva.click();
        }
        });
     

}else{
    window.addEventListener('click', function(){  //Adição do evento de clique
        if(TelaAtiva.click){
            TelaAtiva.click();
        }
        });
        
}





EscolherTela(Tela.INICIAL)
loop();