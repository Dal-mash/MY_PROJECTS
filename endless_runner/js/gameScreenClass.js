class gameScreenClass extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
    }

    preload() {
        this.load.tilemapTiledJSON('map', './assets/map/map.json')
        this.load.image('collisionBlocks', './assets/map/collisionBlocks.png')
        this.load.image('tiles', './assets/map/tiles.png')
        this.load.spritesheet('player', './assets/images/playerSpriteSheet.png',{frameWidth:48, frameHeight:42});
    }

    create() {
        // Initialize map and scale
        const map = this.make.tilemap({ key: 'map' });
        const scale = 2;
        const worldHeight = map.heightInPixels * scale;
        const worldWidth = map.widthInPixels * scale;
        

        // Set world bounds
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        this.game.config.pixelArt = true;

        // Create player graphics
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xff0000, 1);
        graphics.fillRect(0, 0, 40, 40); // Corrected to match player size
        graphics.generateTexture('player', 40, 40);

        // Load tilesets and create layers
        const tileset = map.addTilesetImage('Simple Forest Tileset', 'tiles', 16, 16,);
        const collisions = map.addTilesetImage('collisionBlocks', 'collisionBlocks');

        // Create and scale layers
        const skyLayer = map.createLayer('sky', tileset, 0, 0).setScale(scale);
        const platformLayer = map.createLayer('platforms', tileset, 0, 0).setScale(scale);
        const collisionLayer = map.createLayer('collision', collisions, 0, 0).setScale(scale);


        // Load and configure player
        this.player = this.physics.add.sprite(200, 1500, 'player').setDepth(4)
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2)
        this.player.body.setSize(this.player.width, this.player.height)
        this.player.body.setOffset(-20, -10)

        // Player movement keys
        this.keys = {
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        // Configure camera
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, worldWidth, worldHeight);
        this.camera.roundPixels = true;

        // Set depth of layers
        skyLayer.setDepth(0);
        platformLayer.setDepth(1);
        collisionLayer.setDepth(2);


        //collision blocks
        collisionLayer.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, collisionLayer)

        //creating animations
        const idle = {
        }
        this.anims.create({
            key:'Idle',
            frames : this.anims.generateFrameNumbers('player',{frames:[0,1,2,3,4,5]}),
            frameRate:7,
            repeat:-1,
        });
        this.player.play('Idle', true)


        // Debug output
        console.log();
    }

    update(){

        this.player.setVelocityX(0)
        //player Movement
        if(this.keys.w.isDown || this.player.body.touching.down){
            this.player.setVelocityY(-500);
        }
        if(this.keys.d.isDown){
            this.player.setVelocityX(350)
        }
        if(this.keys.a.isDown){
            this.player.setVelocityX(-350)
        }
        
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
