console.log("game ");

document.addEventListener("DOMContentLoaded", () =>{

let table = document.getElementById("ping-pong-table");
let ball = document.getElementById("ball");
let paddle = document.getElementById("paddle");

let ballx = 50;
let bally = 50;


// displacement of ball in x and y direction 
let dx = 2;
let dy = 2;
// 

ball.style.left = `${ballx}px`;
ball.style.top = `${bally}px`;


setInterval(function exec() {
   console.log("inside");
    ballx += dx;
    bally += dy;


    ball.style.left = `${ballx}px`;
    ball.style.top = ` ${bally}px`;


   //  collision of paddle and ball check
   if(ballx < paddle.offsetLeft + paddle.offsetWidth &&
      bally > paddle.offsetTop && 
      bally + ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight){
         dx *= -1;
      }
// 

    // if(ballx >= 700-20  || ballx <=0 ) dx *= -1;
    // if(bally >= 400-20  || bally <=0 ) dy *= -1;

    if(ballx >= table.offsetWidth - ball.offsetWidth  || ballx <=0 ) dx *= -1;
    if(bally >= table.offsetHeight - ball.offsetHeight || bally <=0 ) dy *= -1;
 


}, 1);


 // paddle logic
     
 let paddley = 0;
 let pdy = 10;//displacemnent of padle
 document.addEventListener("keydown", (event) =>{
     if(event.keyCode == 38 && paddley > 0){
        paddley += (-1)*pdy;

     }
     else if(event.keyCode == 40 && paddley < table.offsetHeight - paddle.offsetHeight ){
        paddley += pdy;
     }
     paddle.style.top = `${paddley}px`;
 });
 // 

//  movement of paddle controlling by mouse

document.addEventListener("mousemove" , (event) => {

   // if(event.clientX > table.offsetLeft + (table.offsetWidth/2)) return ;
   let mousedistfromtop = event.clientY;
   let tabledistfromtop = table.offsetTop;
   let mousecontrol = mousedistfromtop - tabledistfromtop -paddle.offsetHeight/2;

   paddley = mousecontrol;
   if(paddley <=0 || paddley > table.offsetHeight - paddle.offsetHeight) return ;
   paddle.style.top = `${paddley}px`;


});

 






});