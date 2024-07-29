
class titleScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScreen' });
    }

    preload() {
        this.load.image('background', './assets/images/Title_Background.jpeg');
    }

    create() {
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var bg = this.add.image(0, 0, 'background')
        bg.setOrigin(0,0)
        bg.displayWidth = this.sys.game.config.width
        bg.displayHeight = this.sys.game.config.height
        var text = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, "START", {
        fontSize: '52px',
        fill: 'rgb(255, 255, 255)',
        fontFamily: 'Nabla'
    }).setOrigin(0.5,0.5);
        text.setInteractive({useHandCursor : true})
        text.on('pointerdown', () => {
            this.scene.stop()
            this.scene.start('game')
        });
        }
    update(){
        if(this.space.isDown) {
            this.scene.start('game')
            console.log('presses')
        }
    }
}

export default titleScreen
