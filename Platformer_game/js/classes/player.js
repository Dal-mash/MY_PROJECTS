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

        this.cameraBox = {
            position :{
                x:this.hitbox.position.x-150, 
                y:this.hitbox.position.y-50,
            },
            width:300,
            height: 100
        }
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
            this.frameRate =0;
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
            this.cameraPanLeft(camera, this.cameraBox)
        }
        if (this.keys['a']) {
            this.velocity.x = -2;
            this.switchAnimaions('left')
            this.cameraPanRight(camera, this.cameraBox)
 ;
        }
        if (this.keys['w'] && this.velocity.y===0) {
            this.velocity.y = -6;
            this.switchAnimaions('jump');
            this.cameraPanUp(camera, this.cameraBox)

        }
    }

    updateCameraBox(){
        this.cameraBox = {
            position :{
                x:this.hitbox.position.x-125, 
                y:this.hitbox.position.y-60,
            },
            width:250,
            height: 120
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
    
    cameraPanLeft(camera, cameraBox){
        const cameraRight =cameraBox.position.x +cameraBox.width;
        if(cameraRight >= scaledCanvas.width + Math.abs(camera.position.x)){
            camera.position.x-=this.velocity.x
        }
    }

    cameraPanRight(camera, cameraBox){
        const cameraLeft =cameraBox.position.x;

        if(cameraLeft <= 0) return 

        if(cameraLeft < 0 + Math.abs(camera.position.x)){
            camera.position.x-=this.velocity.x
        }
    }

    cameraPanUp(camera, cameraBox) {
        const cameraTop = cameraBox.position.y;
        if (cameraTop < Math.abs(camera.position.y)) {
            camera.position.y -= cameraTop - Math.abs(camera.position.y); // Smooth transition
        }
    }
    
    cameraPanDown(camera, cameraBox) {
        const cameraBottom = cameraBox.position.y + cameraBox.height;
        if (cameraBottom > scaledCanvas.height - Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y
        }
    }
    
    
    
    
        
    

    applyGravity(){
        this.velocity.y+=gravity;
        this.position.y += this.velocity.y;
    }
    update() {
        console.log(this.cameraBox.position.y + this.cameraBox.height )
        ctx.fillStyle = 'rgba(0,0,255, 0.4)';
        ctx.fillRect(this.hitbox.position.x,this.hitbox.position.y,this.hitbox.width,this.hitbox.height);
        this.updateCameraBox();
        this.fillStyle = 'rgba(255,0,0,0.4)';
        ctx.fillRect(this.cameraBox.position.x,this.cameraBox.position.y,this.cameraBox.width,this.cameraBox.height);
        this.updateMovement()
        this.updateFrame()
        this.draw(ctx);
        this.position.x += this.velocity.x;
        if(this.velocity.x ===0 && this.velocity.y === 0){
            this.switchAnimaions('idle');
        }
        if(this.velocity.y <0 ){
            this.switchAnimaions('jump');
            
        }
        if(this.velocity.y >0 ){
            this.switchAnimaions('jump');
            this.cameraPanDown(camera, this.cameraBox)
        }
        
        this.updateHitbox()
        this.checkForHorizontalCollision();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollision();
        
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
