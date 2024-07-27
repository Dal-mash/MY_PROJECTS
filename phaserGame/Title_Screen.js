
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
        }
}

export default titleScreen
