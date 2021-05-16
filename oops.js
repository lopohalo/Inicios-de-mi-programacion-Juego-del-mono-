document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        console.log("saltaaaa");
       

        if(nivel.muerto == false && (trex.y <= 200 && trex.y > 100 )){
            console.log(trex.y)
            saltar();
        }

        else{
            nivel.velocidad = 9;
            nube.velocidad = 1;
            cactus.x = ancho + 100;
            cactus2.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;

        }


    }
});


var ancho = 700;
var alto = 300;


var canvas,ctx;

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}


function borraCanvas(){
canvas.width = ancho;
canvas.height = alto;

}
var suelo = 200
var trex = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var nivel = { velocidad: 8, marcador:0, muerto: false }
var cactus = {x: ancho + 100, y: suelo-25}
var cactus2 = {x: ancho + 60, y: suelo-25}
var nube = {x: 400, y: 50, velocidad: 1}
var suelog = {x: 0, y: suelo + 30 };



function dibujaRex(){
    ctx.drawImage(imgRex,0,0,512,512,100,trex.y,50,50);
}


//logica trex

function saltar (){
trex.saltando = true;
trex.vy = trex.salto;
}

function gravedad(){

    if(trex.saltando == true){

        if(trex.y > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else {
        trex.vy -= trex.gravedad;
        trex.y -= trex.vy;
    }

}
}

function dibujarCactus(){
    ctx.drawImage(imgCactus,0,0,512,512,cactus.x,cactus.y,38,75)
    ctx.drawImage(imgCactus2,0,0,512,512,cactus2.x,cactus2.y,38,75)
}

//logica Cactus

function logicaCactus(){
    if(cactus.x < -100){
        cactus2.x =ancho + 50;
        cactus.x =ancho + 100;
        
        nivel.marcador++;
        nivel.velocidad++ 
    }
    else{
        cactus.x -= nivel.velocidad
        cactus2.x -= nivel.velocidad
    }
    }

    function dibujarNube(){
        ctx.drawImage(imgNube,0,0,512,512,nube.x,nube.y,82,32)
    }
    
//logica Nube

function logicaNube(){
    if(nube.x < -100){
        nube.x = ancho + 100
    }
    
    else{
        nube.x -= nube.velocidad;
    }
}


function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,700,30,0,suelog.y,700,30);
}

//logica Suelo

function logicaSuelo(){
    if(suelog.x >0 ){
        suelog.x = 0;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}











var imgRex, imgNube, imgCactus, imgSuelo;
function cargaImagenes (){

    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgCactus2 = new Image();
    imgSuelo = new Image();
     
    imgRex.src = 'img/rex.png';
    imgNube.src = 'img/nubes.png';
    imgCactus.src = 'img/cactus.png';
    imgCactus2.src = 'img/cactus2.png';
    imgSuelo.src = 'img/Suelo.png';
}



function colision(){
if(cactus.x >= 100 && cactus.x <= 150 || cactus2.x >=100 && cactus2.x <=150){
    if(trex.y >= suelo-25){
        nivel.muerto = true;
        nivel.velocidad = 0;
        nube.velocidad = 0; 
    }
}
}



function puntuacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`, 600,50);

    if(nivel.muerto == true){
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240,150);
    }
}




//Bucle principal
var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){
borraCanvas();
gravedad();
colision();
logicaSuelo();
logicaCactus();
logicaNube();
dibujaSuelo();
dibujarCactus();
dibujarNube();
dibujaRex();
puntuacion();
}