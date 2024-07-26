const mid = {
    width : 576/2,
    height: 576/2
}
const screen ={
    width:576,height:576
}


//angle bw two points
function getAngle(orginX, originY, targetX, targetY){
    let x = targetX - orginX
    let y = targetY - originY

    let angle = Math.atan2(y,x)
    angle = angle *(180/Math.PI);
    return angle
}

//placing objects outside the screen
function setRandomPosition(object){
    let margin = 200
    let pos = Phaser.Math.Between(0,3)
    switch (pos) {
        case 0:
            object.x = Phaser.Math.Between(0, screen.width)
            object.y = -margin
            break;
        case 1:
            object.x = screen.width+margin
            object.y = Phaser.Math.Between(0,screen.height)
            break;
        case 2:
            object.x = Phaser.Math.Between(0, screen.width)
            object.y = screen.height + margin
            break;
        case 3:
            object.x = -margin
            object.y = Phaser.Math.Between(0, screen.height)
            break;
        default:
            break;
    }
}


class gameScreen extends Phaser.Scene{
    constructor(){
        super({key:'game'})
        this.pointer
    }
    preload(){
        this.load.image('map', './assets/background.jpeg');
        this.load.image('player', './assets/ball.png');
    }

    //pointer updating
    updatePointer(){
        this.pointer = this.input.activePointer;
            this.mouseX = this.pointer.x;
            this.mouseY = this.pointer.y
    }

    //bullet apple collision
    bulletHit(bullet, apple){
        setRandomPosition(apple);
        this.score+=5
        this.scoreBlock.setText('Score: '+ (this.score))
        bullet.destroy();
    }

    addApple(){
        let tempEnemy = this.apples.create(Phaser.Math.Between(600, 620), Phaser.Math.Between(600, 620), 'apple');
            setRandomPosition(tempEnemy)
            tempEnemy.depth = 2 
            tempEnemy.setOrigin(0,0)
    }

    create(){
        this.nextScore = 30
        var bg = this.add.image(0, 0, 'map')
        bg.setOrigin(0,0)
        bg.displayWidth = this.sys.game.config.width
        bg.displayHeight = this.sys.game.config.height
        this.pointer = this.input.activePointer;
            this.mouseX = this.pointer.x;
            this.mouseY = this.pointer.y
        this.appleNum = 2
        this.appleVelocity = 30
        //player
        this.player = this.physics.add.sprite(mid.width, mid.height, 'player');
        this.player.setScale(1/40)
        this.player.setInteractive({useHandCursor:true});
        this.player.on('pointerdown', ()=>{
            this.scene.switch('titleScreen')
        })
        this.player.depth = 2
        bg.setInteractive({useHandCursor:false})
        //player speed
        this.speed = 160
        this.keys = {
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),

        }
        this.player.setCollideWorldBounds(true)

        //apples
        const graphics = this.add.graphics()
        graphics.fillStyle(0xFF0000, 1.0);
        graphics.fillRect(0,0, 40,40)
        graphics.generateTexture ('apple', 20, 20);
        this.apples = this.physics.add.group()
        for(let i=0;i<2;i++){
            let tempEnemy = this.apples.create(Phaser.Math.Between(600, 620), Phaser.Math.Between(600, 620), 'apple');
            setRandomPosition(tempEnemy)
            tempEnemy.depth = 2 
            tempEnemy.setOrigin(0,0)
        }


        //bullet
        graphics.fillStyle(0xFF1200, 1.0);
        graphics.fillRect(0,0,40,40);
        graphics.generateTexture('bullet', 10, 10);
        graphics.destroy();
        this.bullets = this.physics.add.group();
        this.counter = 0
        this.threshold = 10;
        
        
        //Score
        this.score = 0
        this.scoreBlock = this.add.text(0,0,'Score: ' + this.score, {fillStyle: 'white', font: '32px arial'})

        //coliders
        this.physics.add.collider(this.apples, this.apples)
        this.physics.add.collider(this.bullets, this.apples, this.bulletHit,null, this) 
    }
    update(){
        //player cursor angle
        this.updatePointer()
        let angle = getAngle(this.player.x, this.player.y,this.mouseX,this.mouseY)
        this.player.angle = angle

        //bullet logic
        if (this.keys.z.isDown && this.counter>this.threshold) {
                let tempBullet = this.bullets.create(this.player.x, this.player.y, 'bullet');
                tempBullet.depth = 1;
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.mouseX, this.mouseY);
                this.physics.velocityFromRotation(angle, 500, tempBullet.body.velocity); 
                this.counter=0
        }       
        this.bullets.children.iterate(bullet => {
            if (bullet){
                if (bullet.x > this.sys.game.config.width + 100 || bullet.x < -100 ||
                    bullet.y > this.sys.game.config.height + 100 || bullet.y < -100) {
                    bullet.destroy();
                }
            }
        });

        this.score = this.score


        //apple movement
        this.apples.children.iterate(apple =>{
            if(apple){
                this.physics.moveToObject(apple, this.player,this.appleVelocity);
                if((Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), apple.getBounds()))){
                    setRandomPosition(apple)
                }
                
                if((Phaser.Geom.Intersects.RectangleToRectangle(this.scoreBlock.getBounds(), apple.getBounds()))){
                    setRandomPosition(apple)
                }
            }
        })

            if(this.keys.w.isDown){
                this.player.setVelocityY(-this.speed);
            }
            else if(this.keys.s.isDown){
                this.player.setVelocityY(this.speed)
            }
            else{
                this.player.setVelocityY(0)
            }
            if(this.keys.a.isDown){
                this.player.setVelocityX(-this.speed);
            }
            else if(this.keys.d.isDown){
                this.player.setVelocityX(this.speed)
            }
            else{
                this.player.setVelocityX(0)
            }  
            this.counter++

            //difficulty overtime
            if(this.score > this.nextScore){
                this.addApple()
                this.appleVelocity+=10
                this.nextScore+=50
            }
    } 
}
export default gameScreen