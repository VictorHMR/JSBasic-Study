window.onload = function(){
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown",keyPush);
  
    
    setInterval(game, 100);   
      const vel = 1;          
      var vx = vy = 0;         
      var px =10, py = 15;   
      var tp = 20;           
      var qp = 20;           
      var ax = ay = Math.floor(Math.random()*qp);;      
      var trail = [];        
      tail = 5;       
      var score =5;  
      var cont =0;
      var ultimo = "";
      function game(){
  
        document.getElementById('score').textContent = score;
        px += vx;          
        py += vy;             
        
        if(px < 0){           
          px = qp -1;
        }
        if(px > qp - 1 ){
          px = 0;
        }
        if(py < 0){
          py = qp -1;
        }
        if(py > qp -1){
          py = 0;
        }
        
  
  
        ctx.fillStyle = "green";
        ctx.fillRect(0,0, stage.width, stage.height);
  
        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp,tp);
  
        ctx.fillStyle = "blueviolet";
        for(var i = 0;i < trail.length; i++){
          ctx.fillRect(trail[i].x*tp, trail[i].y*tp  , tp-1,tp-1);
  
          if(cont > 1){
            if( trail[i].x == px && trail[i].y == py){
  
            document.getElementById('score').textContent = "Game Over";
            ultimo = "";
            vx = vy = 0;
            tail = 5;
            score = 5;
            }
          }else{

          if( trail[i].x == px && trail[i].y == py){
  
            vx = vy = 0;
            tail = 5;
            score = 5;
            ultimo = ""
          }
        }
        }
        
  
        trail.push({x:px, y:py})
        while(trail.length > tail){
          trail.shift();
        }
        if(ax==px && ay == py){
          tail++;
          score++;
          ax = Math.floor(Math.random()*qp);
          ay = Math.floor(Math.random()*qp);
        }
  
        
      }
  
    
      function keyPush(event){
          
        cont++
         
        switch(event.keyCode){
  
          case 37:       //left
            if(ultimo != "right"){
              vx = -vel;
              vy = 0;
              ultimo = "left"
              document.getElementById('leftS').style.color = "blueviolet";
              setTimeout(function(){
              document.getElementById('leftS').style.color = "white"}, 300);
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