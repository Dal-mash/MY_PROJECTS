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

function resizeCanvas(){
    canvas.height = window.height;
    canvas.width = window.width;    
}

window.addEventListener('resize', resizeCanvas);

class circle{
    constructor(xPos, yPos, radius, color, speed){
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
        document.addEventListener('keydown', (event)=>{
            this.input(event);
        });
        document.addEventListener('keyup',()=>{
            this.dy=0;
            this.dx=0;
        })
    }
    draw(ctx){
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius,0, Math.PI*2, false);
        ctx.stroke();
    }

    
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
                this.dy = -this.speed;
                break;
            default:
                break;
        }
    }
    
    
    update(){
        if (this.xPos + this.dx + this.radius > canvas_width || this.xPos + this.dx - this.radius < 0) {
            this.dx = 0;
        }
        if (this.yPos + this.dy + this.radius > canvas_height || this.yPos + this.dy - this.radius < 0) {
            this.dy = 0;
        }
        this.xPos += this.dx;
        this.yPos += this.dy;
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        this.draw(ctx);
    }
}

let circle1 = new circle(200, 200, 50, "red", 10);
circle1.draw(ctx);

updateCircle = function(){
    requestAnimationFrame(updateCircle);
    circle1.update();
}
updateCircle();