

const mid = {
    width: 576 / 2,
    height: 576 / 2
};
const screen = {
    width: 576, height: 576
};

// Calculate the angle between two points
function getAngle(originX, originY, targetX, targetY) {
    let x = targetX - originX;
    let y = targetY - originY;
    return Math.atan2(y, x) * (180 / Math.PI);
}

// Place objects outside the screen
function setRandomPosition(object) {
    const margin = 200;
    const pos = Phaser.Math.Between(0, 3);
    switch (pos) {
        case 0:
            object.setPosition(Phaser.Math.Between(0, screen.width), -margin);
            break;
        case 1:
            object.setPosition(screen.width + margin, Phaser.Math.Between(0, screen.height));
            break;
        case 2:
            object.setPosition(Phaser.Math.Between(0, screen.width), screen.height + margin);
            break;
        case 3:
            object.setPosition(-margin, Phaser.Math.Between(0, screen.height));
            break;
    }
}

class GameScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {
        this.load.image('map', './assets/images/gameBackground.png');
        this.load.image('bullet', './assets/images/bullet.png');
        this.load.image('apple', './assets/images/apple.png');
        this.load.image('gun', './assets/images/gun.png');
        this.load.image('cursor', './assets/images/cursor.png');
        this.load.image('life', './assets/images/heart.png');
    }

    create() {
        // Initialize variables
        this.mouseIsDown = false;
        this.nextScore = 50;
        this.counter = 0;
        this.fireRate = 15;
        this.appleNum = 2;
        this.appleVelocity = 80;
        this.score = 0;
        this.health = 3
        this.isPiercing = false

        // Background
        const bg = this.add.image(0, 0, 'map').setOrigin(0, 0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;

        // Custom cursor
        this.input.setDefaultCursor('none');
        this.cursor = this.add.image(0, 0, 'cursor').setVisible(false).setDepth(999);
        this.input.on('pointermove', pointer => {
            this.cursor.setVisible(true).setPosition(pointer.x, pointer.y);
        });
        this.input.on('pointerout', () => {
            this.cursor.setVisible(false); 
        });

        // Player
        this.player = this.physics.add.sprite(mid.width, mid.height, 'gun')
            .setDepth(3);

        this.tween = this.tweens.add({
            targets: this.player,
            alpha: { from: 1, to: 0 },
            duration: 200,
            ease: 'Linear',
            yoyo: true,
            repeat: 3,
            paused: true,
        });

        this.tween.pause();

        // Apples
        this.apples = this.physics.add.group();
        for (let i = 0; i < this.appleNum; i++) {
            this.addApple();
        }

        // Bullets
        this.bullets = this.physics.add.group();

        // Score
        this.scoreBlock = this.add.text(10, 10, 'Score: ' + this.score, {
            fillStyle: 'green',
            fontSize: '38px',
            fontFamily: 'Tiny'
        });

        //lifes
        this.images = this.add.group();
        const imageWidth = this.textures.get('life').getSourceImage().width/2;
        for(let i=0;i<3;i++){
            let image = this.add.image(i*imageWidth+405+i*5 ,10,'life').setOrigin(0,0).setScale(0.5).setDepth(3)
            this.images.add(image);
        }
        // Colliders
        this.physics.add.collider(this.apples, this.apples);
        this.physics.add.collider(this.bullets, this.apples, this.bulletHit, null, this);

        // Mouse events
        this.input.on('pointerdown', () => this.mouseIsDown = true);
        this.input.on('pointerup', () => this.mouseIsDown = false);
    }

    //play hurt animation
    hurtplayer() {
        this.player.alpha = 1;
        if (!this.tween || this.tween.isDestroyed) {
            this.tween = this.tweens.add({
                targets: this.player,
                alpha: { from: 1, to: 0 },
                duration: 200,
                ease: 'Linear',
                yoyo: true,
                repeat: 3,
                paused: true,
            });
        }
        this.tween.restart();
    }

    update() {
        // Update player cursor angle
        const angle = getAngle(this.player.x, this.player.y, this.input.activePointer.x, this.input.activePointer.y);
        this.player.setAngle(angle + 90);

        // Bullet logic
        if (this.mouseIsDown && this.counter > this.fireRate) {
            const tempBullet = this.bullets.create(this.player.x, this.player.y, 'bullet')
                .setScale(0.5)
                .setDepth(1);
            this.physics.velocityFromRotation(
                Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.activePointer.x, this.input.activePointer.y),
                500,
                tempBullet.body.velocity
            );
            tempBullet.setAngle(this.player.angle);
            this.counter = 0;
        }

        this.bullets.children.each(bullet => {
            if (bullet && (bullet.x > this.sys.game.config.width + 100 || bullet.x < -100 || bullet.y > this.sys.game.config.height + 100 || bullet.y < -100)) {
                bullet.destroy();
            }
        });

        // Apple movement
        this.apples.children.each(apple => {
            if (apple) {
                this.physics.moveToObject(apple, this.player, this.appleVelocity);
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), apple.getBounds())) {
                    this.hurtplayer();
                    if(--this.health<1) this.endgame()
                        this.images.getChildren()[0].destroy()
                    setRandomPosition(apple);
                }

                if (Phaser.Geom.Intersects.RectangleToRectangle(this.scoreBlock.getBounds(), apple.getBounds())) {
                    setRandomPosition(apple);
                }
            }
        });

        this.counter++;

        // Increase difficulty over time
        if (this.score > this.nextScore) {
            this.addApple();
            this.appleVelocity += 2;
            this.nextScore += 100;
            if(this.score>300) this.isPiercing = true
            if (this.fireRate > 1) {
                this.fireRate--;
            }
        }
    }

    bulletHit(bullet, apple) {
        setRandomPosition(apple);
        this.score += 5;
        this.scoreBlock.setText('Score: ' + this.score);
        if(!this.isPiercing) bullet.destroy();
    }

    addApple() {
        const apple = this.apples.create(Phaser.Math.Between(600, 620), Phaser.Math.Between(600, 620), 'apple')
            .setDepth(2)
            .setOrigin(0, 0)
            .setScale(Phaser.Math.FloatBetween(0.5, 1));
        setRandomPosition(apple);
    }


    endgame(){
        this.registry.set('score', this.score);
        this.input.setDefaultCursor('default')
        this.scene.start('overScreen');
    }
}

export default GameScreen;
