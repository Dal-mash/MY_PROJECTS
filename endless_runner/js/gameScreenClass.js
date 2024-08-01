class gameScreenClass extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
    }

    preload() {}

    create() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xff0000, 1); // Corrected to use 0xff0000 as a number
        graphics.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height); // Corrected fillRect (case sensitivity)
        graphics.generateTexture('player', 40, 40);
        graphics.generateTexture('ground', 500, 50)

        this.player = this.physics.add.sprite(30, 30, 'player')
        this.player.setCollideWorldBounds(true)
        this.isFalling = false;

        this.keys = {
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        }

        this.platforms = this.physics.add.staticGroup();
        this.ground = this.platforms.create(300, 500, 'ground').setOrigin(0.5, 0.5 );

        // Collide the player with the platforms
        this.physics.add.collider(this.player, this.ground);


        console.log(this.player)
    }

    update(){
        //player Movement

        if(this.keys.w.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-500);
        }
        if(this.keys.d.isDown){
            this.player.setVelocityX(200)
        }
        else if(this.keys.a.isDown){
            this.player.setVelocityX(-200)
        }
        else {
            this.player.setVelocityX(0)
        }
    }
}

export default gameScreenClass;
