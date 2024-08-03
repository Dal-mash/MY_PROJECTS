export function makeMap(scene){
    const map = scene.make.tilemap({ key: 'map' });
    const scale = 2;
    const worldHeight = map.heightInPixels * scale;
    const worldWidth = map.widthInPixels * scale;

    scene.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    scene.game.config.pixelArt = true;

    const tileset = map.addTilesetImage('Simple Forest Tileset', 'tiles', 16, 16,);
    const collisions = map.addTilesetImage('collisionBlocks', 'collisionBlocks');

    const skyLayer = map.createLayer('sky', tileset, 0, 0).setScale(scale);
    const platformLayer = map.createLayer('platforms', tileset, 0, 0).setScale(scale);
    const collisionLayer = map.createLayer('collision', collisions, 0, 0).setScale(scale);

    skyLayer.setDepth(0);
    platformLayer.setDepth(1);
    collisionLayer.setDepth(2);
     
    collisionLayer.setCollisionByExclusion([-1])
    
    return{worldHeight, worldWidth, collisionLayer}
}