
const mid = {
    width : 576/2,
    height: 576/2
}


class titleScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScreen' });
    }

    preload() {
        this.load.image('background', './assets/background.jpeg');
    }

    create() {
        var bg = this.add.image(0, 0, 'background')
        bg.setOrigin(0,0)
        bg.displayWidth = this.sys.game.config.width
        bg.displayHeight = this.sys.game.config.height
        let textX = this.sys.game.config.width/2 - 102
        let textY = this.sys.game.config.height/2 - 22
        var text = this.add.text(textX, textY, "Test Game", { font: '42px Arial', fill: 'rgb(255, 255, 255)',});
        text.setInteractive({useHandCursor : true})
        text.on('pointerdown', () => {
            this.scene.stop()
            this.scene.start('game')
        });
        console.log(text.width, text.height)
        }
}

class gameScreen extends Phaser.Scene{
    constructor(){
        super({key:'game'})
    }
    preload(){
        this.load.image('map', './assets/background.jpeg');
        this.load.image('player', './assets/ball.png');
    }
    create(){
        var bg = this.add.image(0, 0, 'map')
        bg.setOrigin(0,0)
        bg.displayWidth = this.sys.game.config.width
        bg.displayHeight = this.sys.game.config.height

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

        }
        this.player.setCollideWorldBounds(true)

        //apples
        const graphics = this.add.graphics()
        graphics.fillStyle(0xFF0000, 1.0);
        graphics.fillRect(0,0, 40,40)
        graphics.generateTexture ('apple', 20, 20);
        graphics.destroy()
        this.apple = this.physics.add.sprite(100, 100, 'apple');
        this.apple.depth = 2 
        this.apple.setOrigin(0,0)

        //Score
        this.score = 0
        this.scoreBlock = this.add.text(0,0,'Score: ' + this.score, {fillStyle: 'white', font: '32px arial'})
    }
    update(){
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

        if((Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.apple.getBounds()))){
            this.apple.x = getRandom(20, 565)
            this.apple.y = getRandom(20, 565)
            this.scoreBlock.setText('Score: '+ (++this.score))
        }
        
        if((Phaser.Geom.Intersects.RectangleToRectangle(this.scoreBlock.getBounds(), this.apple.getBounds()))){
            this.apple.x = getRandom(20, 565)
            this.apple.y = getRandom(20, 565)
        }
        

    }


    
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a new Phaser game
const config = {
    type: Phaser.AUTO,
    height: 576,
    width: 576,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y:0},
        }

    }
}

const game = new Phaser.Game(config);

var title = new titleScreen();

var Game = new gameScreen ();

game.scene.add('titleScreen', title);
game.scene.add('game', Game);

game.scene.start('titleScreen')