class Player extends Sprite {
    constructor({position, collistionBlocks, imgSrc}) {
        super({imgSrc})
        this.position=position;
        this.height = 16;
        this.width = 16;
        this.color = 'blue';
        this.collistionBlocks = collistionBlocks
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
    
    applyGravity(){
        this.position.y += this.velocity.y;
        this.velocity.y+=gravity;
    }
    update() {
        this.draw(ctx);
        this.position.x += this.velocity.x;
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.checkForVerticalCollision();
        
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collistionBlocks.length; i++) {
            const collisionBlock = this.collistionBlocks[i]; // Use 'i' instead of '1'
            if (Collision({
                object1: this,
                object2: collisionBlock
            })) {
                if (this.velocity.y > 0) { // Assuming 'this' refers to the player object
                    this.velocity.y = 0;
                    this.position.y=collisionBlock.position.y-this.height -0.01;
                    break
                }
                if(this.velocity.y < 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                }
            }
        }
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collistionBlocks.length; i++) {
            const collisionBlock = this.collistionBlocks[i]; 
            if (Collision({
                object1: this,
                object2: collisionBlock
            })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x=collisionBlock.position.x-this.width -0.01;
                    break
                }
                if(this.velocity.x < 0){
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                }
            }
        }
    }
}
