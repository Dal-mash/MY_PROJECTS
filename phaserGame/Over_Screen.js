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

        if(this.score>this.highScore){
            this.highScore= this.score
        }
        this.gameOverBlock = this.add.text(180, 200, 'Game Over', {font : '40px arial'});
        this.scoreBlock  = this.add.text(180, 280, 'Score : '+ this.score, {font : '28px arial'});
        this.highScoreBlock  = this.add.text(180, 320, 'High Score : '+ this.highScore, {font : '28px arial'});
        this.registry.set('highScore', this.highScore);
        this.input.on('pointerdown', ()=>{this.scene.start('titleScreen')});
    }

    update(){

    }
}

export default overScreen
