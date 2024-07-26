
import gameScreen from "./Game_Screen.js";
import titleScreen from "./Title_Screen.js";


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