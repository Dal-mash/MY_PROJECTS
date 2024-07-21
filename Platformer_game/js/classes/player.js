class Player extends Sprite {
    constructor({position, collistionBlocks, imgSrc, frameRate, animations}) {
        super({imgSrc, frameRate})
        this.position=position;
        this.color = 'blue';
        this.collistionBlocks = collistionBlocks
        this.velocity = {
            x:0,
            y:0
        }        

        this.hitbox ={
            position :{
                x:this.position.x,
                y:this.position.y+ 10
            },
            width : 15,
            height: 18
        }
        this.isOnGround = true
        this.keys = {}

        this.animations = animations

        for(let key in this.animations){
            const image = new Image()
            image.src = this.animations[key].imgSrc
            this.animations[key].image = image
        }

        //old input

        // document.addEventListener('keydown', (event) => {
        //     this.input(event);
        // });

        // document.addEventListener('keyup', (event) => {
        //     this.stopInput(event);
        // });

        //new input
        window.addEventListener('keydown', (event) => this.keyDown(event));
        window.addEventListener('keyup', (event) => this.keyUp(event));
    }

    keyDown(event) {
        this.keys[event.key] = true;
    }

    keyUp(event) {
        this.keys[event.key] = false;
    } 
    
    updateHitbox(){
        this.hitbox.position.x = this.position.x
        this.hitbox.position.y = this.position.y +13
    }

    switchAnimaions(key){
        if(this.image === this.animations[key].image) return
        else{
            this.image = this.animations[key].image
            this.frameBuffer = this.animations[key].frameBuffer
            this.frameRate = this.animations[key].frameRate
        }
    }


    stopInput(event){
        switch (event.key) {
            case 'a':
            case 'd':
                this.switchAnimaions('idle');
                this.velocity.x=0;
            default:
                break;
        }
    }

    updateMovement() {
        this.velocity.x = 0; 
        if (this.keys['d']) {
            this.velocity.x = 2;
            this.switchAnimaions('right')
        }
        if (this.keys['a']) {
            this.velocity.x = -2;
            this.switchAnimaions('left');
        }
        if (this.keys['w'] && this.velocity.y===0) {
            this.velocity.y = -6;
            this.switchAnimaions('jump');
        }
    }

    // input(event) {
    //     switch (event.key) {
    //         case 'd':
    //             this.velocity.x = 1.5;
    //             this.switchAnimaions('right');
    //             break;
    //         case 'a':
    //             this.velocity.x = -1.5;
    //             this.switchAnimaions('left')
    //             break;
    //         case 'w':
    //             this.velocity.y=-6;
    //             break;
    //         default:
    //             break;
    //     }
    // }
    
    
    
    applyGravity(){
        this.velocity.y+=gravity;
        this.position.y += this.velocity.y;
    }
    update() {
        ctx.fillStyle = 'rgba(0,0,255, 0.4)';
        ctx.fillRect(this.hitbox.position.x,this.hitbox.position.y,this.hitbox.width,this.hitbox.height);
        this.updateMovement()
        this.updateFrame()
        this.draw(ctx);
        this.position.x += this.velocity.x;
        if(this.velocity.x ===0){
            this.switchAnimaions('idle');
        }
        else if(this.velocity.y <0 ){
            this.switchAnimaions('jump');
        }
        
        this.updateHitbox()
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();
        
    }

    isOnGround(){
        if(this.velocity.y === 0) return true
        else{
            return false
        }
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collistionBlocks.length; i++) {
            const collisionBlock = this.collistionBlocks[i];
            if (Collision({
                object1: this.hitbox,
                object2: collisionBlock
            })) {
                if (this.velocity.y > 0) { 
                    this.velocity.y = 0;
                    const offset =
                        this.position.y-this.hitbox.position.y;
                    this.position.y=collisionBlock.position.y-this.hitbox.height +offset -0.01;
                    break
                }
                if(this.velocity.y < 0){
                    this.velocity.y = 0;
                    const offset=
                        this.hitbox.position.y-this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height -offset + 0.01
                }
            }
        }
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collistionBlocks.length; i++) {
            const collisionBlock = this.collistionBlocks[i]; 
            if (Collision({
                object1: this.hitbox,
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
