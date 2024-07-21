// Access the canvas element
const canvas = document.getElementById('mainCanvas');

canvas.height = 576;
canvas.width = 1024;
const gravity = 0.5;

//positioning of Screen
const scaledCanvas = {
    width: canvas.width/3,
    height: canvas.height/1.7
}

//canvas context
let ctx = canvas.getContext('2d');
ctx.fillStyle = "red";


var collisionBlocks2D = [];
//Turning collisions array into a 2d array
for(let i=0;i<floorCollisions.length;i+=64){
    collisionBlocks2D.push(floorCollisions.slice(i, i+64))
}
var collisionBlocks=[];
collisionBlocks2D.forEach((row, y) => {
    row.forEach((entity, x) => {
        if(entity === 17 ){
            collisionBlocks.push(new CollisionBlock({
                x:x*16,
                y:y*16
            }))
        }        
    });    
});

// Loading map sprite
var backGround = new Sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc : './images/background.png'
})

let player = new Player({
    position:{
        x:200,
        y:200,
    },
    collistionBlocks:collisionBlocks,
    imgSrc:'./images/player/playerIdle.png',
    frameRate:6,
    animations:{
        idle:{
            imgSrc : './images/player/playerIdle.png',
            frameRate : 6,
            frameBuffer : 7,
        },
        jump:{
            imgSrc : './images/player/playerJump.png',
            frameRate : 2,
            frameBuffer : 3,
        },
        right:{
            imgSrc : './images/player/playerRunRight.png',
            frameRate : 6,
            frameBuffer : 7,
        },
        left:{
            imgSrc : './images/player/playerRunLeft.png',
            frameRate : 6,
            frameBuffer : 7,
        },
        fall:{
            imgSrc : './images/player/playerFall.png',
            frameRate : 2,
            frameBuffer : 3,
        }
    }
})


function updateSquare() {
    requestAnimationFrame(updateSquare);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    // ctx.scale(3,3);
    // ctx.translate(-40,-backGround.image.height+scaledCanvas.height)
    backGround.update();
    collisionBlocks.forEach(block => {
        block.update()        
    });
    player.update();
    ctx.restore();

    
}
updateSquare();