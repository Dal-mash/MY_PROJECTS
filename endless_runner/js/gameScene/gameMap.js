export function makeMap(scene, player){
    const map = scene.make.tilemap({ key: 'map' });
    const scale = 2;
    const worldHeight = map.heightInPixels * scale;
    const worldWidth = map.widthInPixels * scale;

    scene.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    scene.game.config.pixelArt = true;

    const tileset = map.addTilesetImage('Simple Forest Tileset', 'tiles', 16, 16,);
    const collisions = map.addTilesetImage('collisionBlocks', 'collisionBlocks');
    const propsTiles = map.addTilesetImage('Props','propsImage',16,16);

    scene.skyLayer = scene.add.tileSprite(0,0,800*2, 1200, 'sky').setScale(1).setScrollFactor(0);
    scene.backMountain = scene.add.tileSprite(0,0,800*2, 1200, 'backMountain').setScale(1).setScrollFactor(0);
    scene.frontMountain = scene.add.tileSprite(0,0,800*2, 1200, 'frontMountain').setScale(1).setScrollFactor(0);
    scene.backBushes = scene.add.tileSprite(0,0,800*2, 1200, 'backBushes').setScale(1).setScrollFactor(0);
    scene.frontBushes = scene.add.tileSprite(0,0,800*2, 1200, 'frontBushes').setScale(1).setScrollFactor(0);
    const back_platformLayer = map.createLayer('platforms_background', tileset, 0,0).setScale(scale).setDepth(5)
    const platformLayer = map.createLayer('platforms', tileset, 0, 0).setScale(scale).setDepth(6);
    const propLayer = map.createLayer('props', propsTiles, 0,0).setScale(scale).setDepth(7);
    const grassLayer = map.createLayer('grass', propsTiles,0,0).setScale(scale).setDepth(8);
    const collisionLayer = map.createLayer('collision', collisions, 0, 0).setScale(scale).setDepth(9);

    //

    back_platformLayer.setTint(0xd1d1d1)

    propLayer.setCollisionBetween(42,44);

    propLayer.forEachTile(tile => {
        if (tile.index === 42 || tile.index===43 || tile.index===44) {
            tile.setCollisionCallback((tile, body) => {
             //   tile.setOffset(0,2)
                body.setSize(1, 1)
                body.setOffset(0,3)
            });
        }
    });

    scene.physics.add.collider(player, propLayer)



    
     
    
    return{worldHeight, worldWidth, collisionLayer, propLayer}
}
