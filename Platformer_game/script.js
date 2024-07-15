// Access the canvas element
const canvas = document.getElementById('mainCanvas');

const canvas_height = window.innerHeight;
const canvas_width = window.innerWidth;
canvas.style.background = 'yellow';

canvas.height = canvas_height;
canvas.width = canvas_width;

let ctx = canvas.getContext('2d');
ctx.fillStyle = "red";
ctx.lineWidth = 5;

// function resizeCanvas(){
//     canvas.height = window.height;
//     canvas.width = window.width;    
// }

// window.addEventListener('resize', resizeCanvas);

class square{
    constructor(xPos, yPos, width, height,  color, speed){
        this.xPos = xPos;
        this.yPos = yPos;
        this.height = height;
        this.width = width;
        this.color = color;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
        this.jumpTime = 10;
        this.pressed = false;
        this.isJumping = false;
        document.addEventListener('keydown', (event)=>{
            this.pressed = true;
            this.input(event);
        });
        document.addEventListener('keyup',()=>{
            this.dx=0;
            this.pressed = false;
        })
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);        
    }

    // playerJump(){
    //     let jumpInterval = setInterval(this.jump, 1);
    //     this.pressed = true;
    //     console.log('playerjump checked')
    //     setTimeout(()=>{
    //         clearInterval(jumpInterval);
    //         this.isJumping = false;
    //         this.pressed = false;
    //         console.log('jump finished');
    //     }, 5000);
    // }

    // jump(){
    //     console.log('jumping')
    //     this.dy = -5;
    // }
    
    input(event) {
        switch (event.key) {
            case 'd':
                this.dx = this.speed;
                break;
            case 's':
                this.dy = this.speed;
                break;
            case 'a':
                this.dx = -this.speed;
                break;
            case 'w':
                this.isJumping=true;
                break;
            default:
                break;
        }
    }
    
    jump(){
        this.dy--;
        this.jumpTime--;
    }
    
    update(){
        if(this.yPos < canvas_height && !this.pressed ){
            this.dy=5;
        }
        if (this.xPos + this.dx +this.width  > canvas_width || this.xPos + this.dx< 0) {
            this.dx = 0;
        }
        if(this.isJumping){
            console.log('if passed');
            this.pressed=true;
            this.jump();
            if(this.jumpTime < 1 ){
                this.isJumping = false;
                this.jumpTime=10;
                this.pressed=false;
            }
        }
        if (this.yPos + this.dy +this.height > canvas_height || this.yPos + this.dy< 0) {
            this.dy = 0;
        }
        this.xPos += this.dx;
        this.yPos += this.dy;
        this.draw(ctx);
    }
}

let square1 = new square(200, 200, 50, 50, "red", 10);
square1.draw(ctx);

updateSquare = function(){
    requestAnimationFrame(updateSquare);
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    square1.update();
}
updateSquare();