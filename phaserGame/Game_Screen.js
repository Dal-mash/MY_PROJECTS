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
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('apple', './assets/apple.png');
        this.load.image('gun', './assets/gun.png');
        this.load.image('cursor', './assets/cursor.png');
    }

    updateCursor(){
        if(this.cursor){
            this.cursor.x = this.input.activePointer.x
            this.cursor.y = this.input.activePointer.y
        }
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
        this.mouseIsDown = false;
        this.nextScore = 30
        var bg = this.add.image(0, 0, 'map')
        bg.setOrigin(0,0)
        bg.displayWidth = this.sys.game.config.width
        bg.displayHeight = this.sys.game.config.height
        this.pointer = this.input.activePointer;
            this.mouseX = this.pointer.x;
            this.mouseY = this.pointer.y
        this.appleNum = 2
        this.appleVelocity = 100

        this.input.on('pointerdown', ()=> this.mouseIsDown = true)
        this.input.on('pointerup', ()=> this.mouseIsDown = false)


        //custom cursor
        this.input.setDefaultCursor('none');
        this.cursor = this.add.image(0,0,'cursor')
        this.cursor.setVisible(false)
        this.input.on('pointermove', (pointer) =>{ 
            this.cursor.setVisible(true)
            this.cursor.x=pointer.x
            this.cursor.y = pointer.y
        } )
        this.input.on('pointerout', () =>{ 
            this.cursor.setVisible(false)
        } )



        //player
        this.player = this.physics.add.sprite(mid.width, mid.height, 'gun');
        this.player.setInteractive({useHandCursor:true});
        this.player.on('pointerdown', ()=>{
            this.scene.switch('titleScreen')
        })  
        this.player.depth = 3 
        //player speed
        this.speed = 160


        //apples
        this.apples = this.physics.add.group()
        for(let i=0;i<2;i++){
            let tempEnemy = this.apples.create(Phaser.Math.Between(600, 620), Phaser.Math.Between(600, 620), 'apple');
            setRandomPosition(tempEnemy)
            tempEnemy.depth = 2 
            tempEnemy.setOrigin(0,0)
        }


        //bullet
        this.bullets = this.physics.add.group();
        this.counter = 0
        this.threshold = 10;
        
        
        //Score
        this.score = 0
        this.scoreBlock = this.add.text(0,0,'Score: ' + this.score, {fillStyle: 'white', fontSize:'32px', fontFamily:'gameFont'})

        //coliders
        this.physics.add.collider(this.apples, this.apples)
        this.physics.add.collider(this.bullets, this.apples, this.bulletHit,null, this) 
    }
    update(){
        //player cursor angle
        this.updateCursor()
        this.updatePointer()
        let angle = getAngle(this.player.x, this.player.y,this.mouseX,this.mouseY)
        this.player.angle = angle + 90

        //bullet logic
        if(this.mouseIsDown){
            if (this.counter > this.threshold) {
                    let tempBullet = this.bullets.create(this.player.x, this.player.y, 'bullet');
                    tempBullet.setScale(1/2,1/2)
                    tempBullet.depth = 1;
                    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.mouseX, this.mouseY);
                    this.physics.velocityFromRotation(angle, 500, tempBullet.body.velocity); 
                    tempBullet.angle = this.player.angle
                    this.counter=0
            }};
        this.bullets.children.iterate(bullet => {
            if (bullet){
                if (bullet.x > this.sys.game.config.width + 100 || bullet.x < -100 ||
                    bullet.y > this.sys.game.config.height + 100 || bullet.y < -100) {
                    bullet.destroy();
                }
            }
        });


        //apple movement
        // this.apples.children.iterate(apple =>{
        //     if(apple){
        //         this.physics.moveToObject(apple, this.player,this.appleVelocity);
        //         if((Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), apple.getBounds()))){
        //             this.registry.set('score', this.score);
        //             this.scene.start('overScreen');
        //             setRandomPosition(apple)
        //         }
                
        //         if((Phaser.Geom.Intersects.RectangleToRectangle(this.scoreBlock.getBounds(), apple.getBounds()))){
        //             setRandomPosition(apple)
        //         }
        //     }
        // })
  
            this.counter++

            //difficulty overtime
            if(this.score > this.nextScore){

                this.addApple()
                this.appleVelocity+=5
                this.nextScore+=80
                this.threshold--
                console.log(this.threshold);
            }
    } 
}
export default gameScreen