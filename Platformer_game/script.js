// Access the canvas element
const canvas = document.getElementById('mainCanvas');
canvas.style.background = 'yellow';

canvas.height = 576;
canvas.width = 1024;
const gravity = 0.5;

let ctx = canvas.getContext('2d');
ctx.fillStyle = "red";

class Player {
    constructor(position) {
        this.position=position;
        this.height = 50;
        this.width = 50;
        this.color = 'blue';
        this.velocity = {
            x:0,
            y:0
        }        
        document.addEventListener('keydown', (event) => {
            this.input(event);
        });

        document.addEventListener('keyup', (event) => {
            this.stopInput(event);
        });
    }
    
    draw(ctx) {
        ctx.lineWidth=5;
        ctx.fillStyle=this.color;
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height,)       
    }

    input(event) {
        switch (event.key) {
            case 'd':
                this.velocity.x = 1;
                break;
            case 'a':
                this.velocity.x = -1;
                break;
            case 'w':
                this.velocity.y=-15;
                break;
            default:
                break;
        }
    }
    
    stopInput(event) {
        switch (event.key) {
            case 'd':
            case 'a':
                this.velocity.x = 0;
                break;
            default:
                break;
        }
    }
    
    update() {
        this.draw(ctx);
        if(this.position.y+this.height+this.velocity.y<canvas.height){
            this.velocity.y+=gravity;
        }
        else{
            this.velocity.y=0;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        console.log(this.velocity.y)
        
    }
}

class Sprite{
    constructor({position, imgSrc}){
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc;
    }
    draw(ctx){
        if(!this.image) return
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    update(){
        this.draw(ctx);
    }
}

var backGround = new Sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc : './images/background.png'
})

let player = new Player({
    x:200,
    y:200
})

function updateSquare() {
    requestAnimationFrame(updateSquare);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(1.5,1.5);
    backGround.update();
    ctx.restore();
    player.update();
    
}
