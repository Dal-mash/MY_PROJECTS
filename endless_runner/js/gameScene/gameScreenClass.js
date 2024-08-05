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
        const {worldHeight, worldWidth, collisionLayer} = makeMap(this, this.player);
        collisionLayer.setCollisionBetween(25, 26);

        collisionLayer.setTileIndexCallback(26, this.oneWayCollision, this);

        this.physics.add.collider(this.player, collisionLayer);

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
        // this.player.setVelocityX(0)
        // if(this.player.body.velocity.y != 0){
        //     this.isOnGround =false
        // }
        // else{
        //     this.isOnGround = true
        // }

        // if(this.keys.d.isDown){
        //     this.player.setVelocityX(300)
        //     this.facingRight = true;
        //     if(this.isOnGround){
        //         this.player.setFlipX(false)
        //         this.player.play('sprint', true);
        //     }
        // }
        // if(this.keys.a.isDown){
        //     this.player.setVelocityX(-300)
        //     this.facingRight = false;
        //     if(this.isOnGround){
        //         this.player.setFlipX(true)
        //         this.player.play('sprint',true);
        //     }
        // }
    
        // if(this.player.body.velocity.y>0){
        //     if(this.facingRight){
        //         this.player.setFlipX(false)
        //         this.player.play('fall',true)
        //     }
        //     else{
        //         this.player.setFlipX(true)   
        //         this.player.play('fall',true)
        //     }
        //     this.player.setGravityY(1200);
        // }

        // if(this.player.body.velocity.y==0 && this.player.body.velocity.x ==0){
        //     if(this.facingRight){
        //         this.player.setFlipX(false);
        //     }
        //     else{this.player.setFlipX(true)}
        //     this.player.play('idle', true)
        // }

        // if(this.keys.w.isDown && this.isOnGround){
        //     this.player.setVelocityY(-510);
        //     this.player.setGravityY(300);
        //     if(this.facingRight){
        //         this.player.setFlipX(false);
        //         this.player.play('jump', true);
        //     }
        //     else{
        //         this.player.setFlipX(true)
        //         this.player.play('jump', true);
        //     }
        // }
        // if(this.player.body.touching.down){
        //     this.player.body.setGravityY(1000);
        // }

        // if(this.player.body.velocity.y<0){
        //     if(this.facingRight){
        //         this.player.setFlipX(false);
        //         this.player.play('jump', true);
        //     }
        //     else{
        //         this.player.setFlipX(true)
        //         this.player.play('jump', true);
        //     }
        // }
        
        if(this.player.y>2000) {this.player.setPosition(200, 1500)}

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
