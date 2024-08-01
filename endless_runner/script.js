import titleScreenClass from './js/titleScreenClass.js';
import gameScreenClass from './js/gameScreenClass.js';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
};
const game = new Phaser.Game(config);

var titleScreen = new titleScreenClass();
var gameScreen = new gameScreenClass()

game.scene.add('titleScene', titleScreen);
game.scene.add('gameScene', gameScreen);


game.scene.start('gameScene');