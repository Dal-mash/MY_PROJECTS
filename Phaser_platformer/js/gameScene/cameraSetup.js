export function makeCamera(scene, height, width, player){
    scene.camera = scene.cameras.main;
    scene.camera.startFollow(player);
    scene.camera.setBounds(0, 0, width, height);
    scene.camera.roundPixels = true;
}