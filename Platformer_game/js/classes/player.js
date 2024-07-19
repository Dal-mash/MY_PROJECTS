class Player {
    constructor(position) {
        this.position=position;
        this.height = 30;
        this.width = 30;
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
                this.velocity.x = 10;
                break;
            case 'a':
                this.velocity.x = -10;
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
        
    }
}
