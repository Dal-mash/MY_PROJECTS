export function createPlayer(scene){
    scene.player = scene.physics.add.sprite(200, 1500, 'player').setDepth(4)
    scene.player.setCollideWorldBounds(true);
    scene.player.setScale(2)
    scene.player.body.setSize(15, 18)
    scene.player.body.setOffset(16,14)
            //this.player.body.debugBodyColor = 0xff0000

    return scene.player;
}