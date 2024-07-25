
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
        var text = this.add.text(textX, textY, "Test Game", { font: '42px Arial', fill: 'rgb(102, 99, 255)',});
        text.setInteractive({useHandCursor : true})
        text.on('pointerdown', () => {
            this.scene.switch('game')
        });
        console.log(text.width, text.height)
        }
}

class gameScreen extends Phaser.Scene{
    constructor(){
        super({key:'game'})
    }
    preload(){
        this.load.image('map', './assets/map.png');
        this.load.image('player', './assets/ball.png');
    }
    create(){
        var bg = this.add.image(0, 0, 'map')
        bg.setOrigin(0,0)
        bg.displayWidth = this.sys.game.config.width
        bg.displayHeight = this.sys.game.config.height
        bg.setScale(0.5,0.5)
        this.player = this.physics.add.sprite(200, 200, 'player');
        this.player.setScale(1/64)
        this.player.setInteractive({useHandCursor:true});
        this.player.on('pointerdown', ()=>{
            this.scene.switch('titleScreen')
        })
        bg.setInteractive({useHandCursor:false})
        this.speed = 120
        this.keys = {
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),

        }
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(1)
    }
    update(){
        if(this.keys.w.isDown){
            this.player.setVelocityY(-this.speed);
        }
        else if(this.keys.s.isDown){
            this.player.setVelocityY(this.speed)
        }
        else{
            this.player.setVelocityY(this.sys.game.config.physics.arcade.gravity.y)
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

    }
}

// Create a new Phaser game
const config = {
    type: Phaser.AUTO,
    height: 576,
    width: 1024,
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