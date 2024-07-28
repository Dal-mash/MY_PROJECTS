
class titleScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScreen' });
    }

    preload() {
        this.load.image('background', './assets/images/background.jpeg');
    }

    create() {
        var bg = this.add.image(0, 0, 'background')
        bg.setOrigin(0,0)
        bg.displayWidth = this.sys.game.config.width
        bg.displayHeight = this.sys.game.config.height
        var text = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, "Start", { font: '52px gameFont', fill: 'rgb(255, 255, 255)',}).setOrigin(0.5,0.5);
        text.setInteractive({useHandCursor : true})
        text.on('pointerdown', () => {
            this.scene.stop()
            this.scene.start('game')
        });
        }
}

export default titleScreen
