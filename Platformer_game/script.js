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

class Square {
    constructor(xPos, yPos, width, height, color, speed, line) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.height = height;
        this.width = width;
        this.color = color;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
        this.isJumping = false;
        this.line = line;
        
        document.addEventListener('keydown', (event) => {
            this.input(event);
        });

        document.addEventListener('keyup', (event) => {
            this.stopInput(event);
        });
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);        
    }

    input(event) {
        switch (event.key) {
            case 'd':
                this.dx = this.speed;
                break;
            case 'a':
                this.dx = -this.speed;
                break;
            case 'w':
                if (!this.isJumping && this.yPos + this.height >= this.line.endY) {
                    this.dy = -30;  // Jump strength
                    this.isJumping = true;
                }
                break;
            default:
                break;
        }
    }
    
    stopInput(event) {
        switch (event.key) {
            case 'd':
            case 'a':
                this.dx = 0;
                break;
            default:
                break;
        }
    }
    
    update() {
        // Gravity

        if (this.yPos + this.height < this.line.endY || this.isJumping) {
            this.dy+=2;
        } else {
            this.dy = 0;  
            this.yPos = this.line.endY - this.height;  
            this.isJumping = false;
        }
        if(this.yPos+this.height>=this.line.endY){
            this.isJumping=false;
        }

        if (this.xPos + this.dx + this.width > canvas_width || this.xPos + this.dx < 0) {
            this.dx = 0;
        }
        this.yPos += this.dy;
        this.xPos += this.dx;
        this.draw(ctx);
    }
}

class line{
    constructor(startX, startY, endX, endY, color){
        this.startX=startX;
        this.startY=startY;
        this.endX=endX;
        this.endY=endY;
        this.color=color;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.startX,this.startY);
        ctx.lineTo(this.endX,this.endY);
        ctx.strokestyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
}
let line1 = new line(0, 600,canvas.width,600,'black');
let square1 = new Square(200, 200, 50, 50, "red", 10, line1);

function updateSquare() {
    requestAnimationFrame(updateSquare);
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    square1.update(line1);
    line1.draw(ctx);
}
updateSquare();