class overScreen extends Phaser.Scene{
    constructor(){
        super({key : 'overScreen'})
        this.highScore = 0 
    }

    init(){
        this.score = this.registry.get('score') || 0;
        this.highScore = this.registry.get('highScore') || 0;
    }
    preload(){

    }

    create(){
        const center = this.cameras.main.width/2
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if(this.score>this.highScore){
            this.highScore= this.score
        }
        this.gameOverBlock = this.add.text(center, 200, 'GAME OVER', {font : '40px Honk'}).setOrigin(0.5);
        this.scoreBlock  = this.add.text(center, 280, 'Score : '+ this.score, {font : '28px Tiny'}).setOrigin(0.5);
        this.highScoreBlock  = this.add.text(center, 320, 'High Score : '+ this.highScore, {font : '28px Tiny'}).setOrigin(0.5);
        this.registry.set('highScore', this.highScore);
        this.spaceButton  = this.add.text(center, 420, 'Press Space to Restart', {font : '28px Tiny'}).setOrigin(0.5);

        this.tweens.add({
            targets: this.spaceButton,
            alpha: 0,
            ease:'linear',
            repeat: -1,
            duration:1000,
            yoyo : true
        })

    }

    update(){
        if(this.space.isDown) {
            this.scene.start('titleScreen')
            console.log('presses')
        }
    }
}    

export default overScreen
