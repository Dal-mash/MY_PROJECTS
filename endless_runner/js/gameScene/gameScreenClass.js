import {createPlayerAnimations} from './playAnimations.js';
import { createPlayer } from './playerSetup.js';
import { makeMap } from './gameMap.js';
import { makeCamera } from './cameraSetup.js';
import { updatePlayer } from './playerSetup.js';
class gameScreenClass extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
    }


    preload() {
        this.load.tilemapTiledJSON('map', './assets/map/map.json')
        this.load.image('collisionBlocks', './assets/map/collisionBlocks.png')
        this.load.image('tiles', './assets/map/tiles.png')
        this.load.spritesheet('player', './assets/images/playerSpriteSheet.png',{frameWidth:48, frameHeight:48});
        this.load.image('propsImage', './assets/map/props.png')
        this.load.image('sky', './assets/map/sky.png')
        this.load.image('backMountain', './assets/map/back_mountains.png')
        this.load.image('frontMountain', './assets/map/front_mountains.png')
        this.load.image('backBushes', './assets/map/back_bushes.png')
        this.load.image('frontBushes', './assets/map/front_bushes.png')
    }

    create() {
        // Initialize map and scale
        this.facingRight = true
        this.isOnGround = true;    
        //player Setup
        this.player = createPlayer(this);
        this.keys = {
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        //adding map
        const {worldHeight, worldWidth, collisionLayer, propLayer} = makeMap(this, this.player);
        collisionLayer.setCollisionBetween(25, 26);
        collisionLayer.setTileIndexCallback(26, this.oneWayCollision, this)
        this.physics.add.collider(this.player, collisionLayer);

        
        console.log(this.skyLayer)
        

        // Configure camera
        this.camera = makeCamera(this, worldHeight,worldWidth,this.player)

        //creating animations
        createPlayerAnimations(this);
        this.player.play('idle');

    }

    oneWayCollision(player, tile) {
        if (player.body.velocity.y > 0 && player.body.y + player.body.height <= (tile.pixelY + 16)*2) {
            return false; // Collide
        } else {
            return true; // No collision
        }
    }

    update(time, delta){
        updatePlayer(this.player,delta,this)

        this.skyLayer.tilePositionX = this.cameras.main.scrollX * 0.001;
        this.backMountain.tilePositionX = this.cameras.main.scrollX * 0.01;
        this.frontMountain.tilePositionX = this.cameras.main.scrollX * 0.05;
        this.backBushes.tilePositionX = this.cameras.main.scrollX * 0.08;
        this.frontBushes.tilePositionX = this.cameras.main.scrollX * 0.2;
        
        if(this.player.y>1500) {this.player.setPosition(200, 1000)}

        // if (this.player.y + this.player.height < this.platform.y) {
        //     if (!this.platformCollider) { 
        //         this.platformCollider = this.physics.add.collider(this.player, this.platform);
        //     }
        // } else if (this.player.y > this.platform.y) {
        //     if (this.platformCollider) { 
        //         this.physics.world.removeCollider(this.platformCollider);
        //         this.platformCollider = null; 
        //     }
        // }
    }
}

export default gameScreenClass;
