const Avatar = new  Image();
Avatar.src = './midia/PSprite.png';
const Construcoes = new  Image();
Construcoes.src = './midia/CSprite.png';
const BG = new Image();
BG.src ='./midia/Background.png';


const Littleroot = new Audio();
Littleroot.src = './midia/Littleroot_Town.wav';

let music = 0;
Littleroot.volume = 0.2;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

document.addEventListener('keydown',keyPush);
document.addEventListener('keyup',resetchar);

let click= 0;
let cam=1;

//[Personagem]
const Personagem = {
    altura:50,
    largura:36,
    X: canvas.width/2,
    Y: 500,
    direction: 'up',
    velocidade:10,
    passo:0,
    Move: [
      {srcX: 13, srcY: 204,},          
      {srcX: 78, srcY: 204,},          
      {srcX: 142, srcY: 204,},
      {srcX: 206, srcY: 204,},
    ],
    desenho(){
        const {srcX, srcY} = Personagem.Move[Personagem.passo];       
        ctx.drawImage(                                      
            Avatar,                                       
            srcX, srcY,                                    
            Personagem.largura, Personagem.altura,          
            Personagem.X, Personagem.Y,                     
            30, 44,          
        )
        
    },
    atualizar(){
        
    },
    atualizaPasso(){
      if(click == 1 || click <=3){
        Personagem.passo = 1
      }else if(click == 4 || click <=6){
        Personagem.passo = 2
      }else if(click == 6 || click <=9){
        Personagem.passo = 3
      }else if(click > 3){
        click = 0;
      }
    },
    Colisao(){
      /*--------------Colisão com Cantos---------------*/
      if(Personagem.X >= canvas.width - Personagem.altura/3 || Personagem.X <= -10 || Personagem.Y <= -10 || Personagem.Y >= canvas.height - Personagem.altura + 10){
        Personagem.X = atualX;
        Personagem.Y = atualY;
      }
      /*--------------Colisão com CP---------------*/
      if(Personagem.X + Personagem.largura >= Casas.CP.X +10 && Personagem.X <= Casas.CP.LarguraC + Casas.CP.X - 10 && Personagem.Y <= Casas.CP.Y + Casas.CP.AlturaC -Personagem.altura+10){
        Personagem.X = atualX;       //posição anterior a hitbox
        Personagem.Y = atualY;
      }
       /*--------------Colisão Lab---------------*/
      else if(Personagem.X + Personagem.largura >= Casas.Lab.X +10 && Personagem.X <= Casas.Lab.LarguraC + Casas.Lab.X - 10 && Personagem.Y <= Casas.Lab.Y + Casas.Lab.AlturaC -Personagem.altura+10){
        Personagem.X = atualX;       
        Personagem.Y = atualY;
      }
      /*--------------Colisão Shopping--------*/
      else if(Personagem.X + Personagem.largura >= Casas.Shopping.X +10 && Personagem.X <= Casas.Shopping.LarguraC + Casas.Shopping.X - 10 && Personagem.Y <= Casas.Shopping.Y + Casas.Shopping.AlturaC -Personagem.altura+10){
        Personagem.X = atualX;       
        Personagem.Y = atualY;
      }
      /*--------------Colisão PokeMart--------*/
      else if(Personagem.X + Personagem.largura >= Casas.PokeMart.X +10 && Personagem.X <= Casas.PokeMart.LarguraC + Casas.PokeMart.X - 5 && Personagem.Y <= Casas.PokeMart.Y + Casas.PokeMart.AlturaC - Personagem.altura +10 && Personagem.Y >= Casas.PokeMart.Y - Personagem.altura +10 ){
        Personagem.X = atualX;       
        Personagem.Y = atualY;
      }
      /*--------------Colisão Casinha--------*/
      else if(Personagem.X + Personagem.largura >= Casas.Casinha.X +10 && Personagem.X <= Casas.Casinha.LarguraC + Casas.Casinha.X - 5 && Personagem.Y <= Casas.Casinha.Y + Casas.Casinha.AlturaC - Personagem.altura +10 && Personagem.Y >= Casas.Casinha.Y - Personagem.altura +10 ){
        Personagem.X = atualX;       
        Personagem.Y = atualY;
      }
      /*--------------Salvar Posição--------*/
      else{
         atualX = Personagem.X;
         atualY = Personagem.Y;
      }

     
    
    },
    ColisaoLink(){
      /*--------------Colisão com Porta CP---------------*/
      if(Personagem.X  >= Casas.CP.X + 80 && Personagem.X  <= Casas.CP.X + 80 +25  && Personagem.Y <= Casas.CP.Y + Casas.CP.AlturaC -Personagem.altura+10){
            AbrirModal('Sobre')        
      }
      /*--------------Colisão com Porta PokeMart---------------*/
      else if(Personagem.X  >= Casas.PokeMart.X +80 && Personagem.X <= Casas.PokeMart.X + 80 +25 && Personagem.Y <= Casas.PokeMart.Y + Casas.PokeMart.AlturaC - Personagem.altura +10 && Personagem.Y >= Casas.PokeMart.Y  ){
            AbrirModal('Skills')        
      }
      /*--------------Colisão com Porta Lab---------------*/
      if(Personagem.X  >= Casas.Lab.X + 120 && Personagem.X  <= Casas.Lab.X + 120 +20  && Personagem.Y <= Casas.Lab.Y + Casas.Lab.AlturaC -Personagem.altura+10){
          AbrirModal('Projetos')        
      }
      /*--------------Colisão com Porta Shopping01---------------*/
      if(Personagem.X  >= Casas.Shopping.X + 80 && Personagem.X  <= Casas.Shopping.X + 80 +20  && Personagem.Y <= Casas.Shopping.Y + Casas.Shopping.AlturaC -Personagem.altura+10){
        AbrirModal('Experiencia')        
      }
      /*--------------Colisão com Porta Shopping02---------------*/
      if(Personagem.X  >= Casas.Shopping.X + 230 && Personagem.X  <= Casas.Shopping.X + 230 +20  && Personagem.Y <= Casas.Shopping.Y + Casas.Shopping.AlturaC -Personagem.altura+10){
        AbrirModal('Experiencia')        
      }
    }
    
}
//[Casas]
const Casas = {

  //[Centro Pokemon]
  CP: { 
  srcX: 501,
  srcY: 234,
  altura:72,
  largura:82,
  AlturaC: 180,
  LarguraC:205,  
  X: 20,
  Y: 0,
  },

  //[Lab]
  Lab: { 
    srcX: 527,
    srcY: 341,
    altura:74,
    largura:114,
    AlturaC: 185,
    LarguraC:285,  
    X: 280,
    Y: 0,
  },

  //[Shopping]
  Shopping: { 
    srcX: 143,
    srcY: 122,
    altura:165,
    largura:142,
    AlturaC: 412,
    LarguraC:355,  
    X: 610,
    Y: 0,
  },

  //[PokeMart]
  PokeMart: { 
    srcX: 421,
    srcY: 239,
    altura:62,
    largura:64,
    AlturaC: 155,
    LarguraC:160,  
    X: 347,
    Y: 250,
  },

  //[Casinha]
  Casinha: { 
    srcX: 672,
    srcY: 25,
    altura:72,
    largura:65,
    AlturaC: 155,
    LarguraC:160,  
    X: 170,
    Y: 250,
  },


  desenho(){
    //Desenho CP
    ctx.drawImage(                                      
        Construcoes,                                       
        Casas.CP.srcX, Casas.CP.srcY,                                    
        Casas.CP.largura, Casas.CP.altura,          
        Casas.CP.X, Casas.CP.Y,                     
        Casas.CP.LarguraC, Casas.CP.AlturaC,          
    )


    //Desenho Laboratorio
    ctx.drawImage(                                      
      Construcoes,                                       
      Casas.Lab.srcX, Casas.Lab.srcY,                                    
      Casas.Lab.largura, Casas.Lab.altura,          
      Casas.Lab.X, Casas.Lab.Y,                     
      Casas.Lab.LarguraC, Casas.Lab.AlturaC,          
  )
    //Desenho Laboratorio
    ctx.drawImage(                                      
    Construcoes,                                       
    Casas.Shopping.srcX, Casas.Shopping.srcY,                                    
    Casas.Shopping.largura, Casas.Shopping.altura,          
    Casas.Shopping.X, Casas.Shopping.Y,                     
    Casas.Shopping.LarguraC, Casas.Shopping.AlturaC,          
  )

   //Desenho PokeMart
   ctx.drawImage(                                      
    Construcoes,                                       
    Casas.PokeMart.srcX, Casas.PokeMart.srcY,                                    
    Casas.PokeMart.largura, Casas.PokeMart.altura,          
    Casas.PokeMart.X, Casas.PokeMart.Y,                     
    Casas.PokeMart.LarguraC, Casas.PokeMart.AlturaC,          
 )

  //Desenho Casinha
  ctx.drawImage(                                      
    Construcoes,                                       
    Casas.Casinha.srcX, Casas.Casinha.srcY,                                    
    Casas.Casinha.largura, Casas.Casinha.altura,          
    Casas.Casinha.X, Casas.Casinha.Y,                     
    Casas.Casinha.LarguraC, Casas.Casinha.AlturaC,          
 )
  }
}
//[Piso]
const Chao = {
  desenho(){
    ctx.drawImage(                                      
      BG,                                       
      0, 0,                                    
      1000, 600,          
      0, 0,                     
      1000, 600,          
  )
  }
}

  function camera(){
  
  if(Personagem.Y >= 600 - Personagem.altura){
    window.scroll(0, 500);
  }else{
    window.scroll(0, 0);
  }
  }

  function loop(){
  Chao.desenho();  
  Casas.desenho();
  Personagem.desenho();
  Personagem.ColisaoLink();

  Personagem.Colisao();
  camera();
  sound();
   
  requestAnimationFrame(loop);
  }
    loop();


  function keyPush(event){
  Personagem.atualizaPasso();
    switch(event.keyCode){

      case 37:       //left
          loop();
          Personagem.X = Personagem.X - Personagem.velocidade;  
          Personagem.direction = 'left';
            Personagem.Move =[ 
                {srcX: 13, srcY: 76,},          
                {srcX: 78, srcY: 76,},          
                {srcX: 142, srcY: 76,},
                {srcX: 206, srcY: 76,},
            ]
            click++;
        break;
      case 38:       //up
          loop();
          Personagem.Y = Personagem.Y - Personagem.velocidade;
          Personagem.direction = 'up';
            Personagem.Move =[ 
              {srcX: 13, srcY: 204,},          
              {srcX: 78, srcY: 204,},          
              {srcX: 142, srcY: 204,},
              {srcX: 206, srcY: 204,},
            ]
          click++;
        break;
      case 39:       //right  
         loop();
          Personagem.X = Personagem.X + Personagem.velocidade;
          Personagem.direction = 'right';
          Personagem.Move =[ 
            {srcX: 13, srcY: 140,},          
            {srcX: 78, srcY: 140,},          
            {srcX: 142, srcY: 140,},
            {srcX: 206, srcY: 140,},
          ]
          click++;
        break;
      case 40:       //down
          loop();
          Personagem.Y = Personagem.Y + Personagem.velocidade;
          Personagem.direction = 'down';
          Personagem.Move =[ 
            {srcX: 13, srcY: 9,},          
            {srcX: 78, srcY: 9,},          
            {srcX: 142, srcY: 9,},
            {srcX: 206, srcY: 9,},
          ]
          click++;
        break;
      case 107:
        Personagem.velocidade+=5;
        break;
      case 109:
        Personagem.velocidade=10;
        break;
      

    }
  }

  function resetchar(event){
    switch(event.keyCode){
  
      case 37:       //left
            Personagem.passo =2;
          loop();
        break;
      case 38:       //up
            Personagem.passo =2;
          loop();
        break;
      case 39:       //right  
            Personagem.passo =2;
          loop();
        break;
      case 40:       //down
            Personagem.passo =2;
          loop();
        break;
    }
  }
  function sound(){
    let mute = document.getElementById('mute');
    let up = document.getElementById('sound');

    if(music == 1){
      Littleroot.pause();
      mute.style.display = 'none';
      up.style.display ='block';
    }else{
      Littleroot.play();      
      mute.style.display = 'block';
      up.style.display ='none';
    }

  }
  function AbrirModal(NomeModal){
    let modal = document.getElementById(NomeModal);
    switch(modal.id){
     case "Sobre": 
        Personagem.X = Casas.CP.X + 87;
        Personagem.Y = Casas.CP.Y + Casas.CP.AlturaC - 35;
     break;
     case "Skills":
        Personagem.X = Casas.PokeMart.X + 85;
        Personagem.Y = Casas.PokeMart.Y + Casas.PokeMart.AlturaC -35 ;
     break;
     case "Projetos":
      Personagem.X = Casas.Lab.X + 129;
      Personagem.Y = Casas.Lab.Y + Casas.Lab.AlturaC -35 ;
     break;
     case "Experiencia":
      Personagem.X = Casas.Shopping.X + 240;
      Personagem.Y = Casas.Shopping.Y + Casas.Shopping.AlturaC -35 ;
     break;

    }
    if(typeof modal == 'undefined' || modal === null){
      return;
    }else{
      modal.style.display = 'block';
      Personagem.velocidade = 0;
    }
    
  
   
      

  }
  function FecharModal(NomeModal){
    let modal = document.getElementById(NomeModal);
    if(typeof modal == 'undefined' || modal === null){
      return;
    }else{
      modal.style.display = 'none';
      Personagem.velocidade = 10;

    }
  }