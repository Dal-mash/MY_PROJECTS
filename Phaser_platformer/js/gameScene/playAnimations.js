
export function createPlayerAnimations(scene){
    const idle = {
        key:'idle',
        frames:scene.anims.generateFrameNumbers('player', {frames:[0,1,2,3,4,5]}),
        frameRate:7,
        repeat : -1,
    }

    const walk = {
        key:'walk',
        frames:scene.anims.generateFrameNumbers('player', {frames:[8,9,10,11,12,13]}),
        frameRate:4,
        repeat : -1,
    }

    const run = {
        key:'run',
        frames:scene.anims.generateFrameNumbers('player', {frames:[16,17,18,19,20,21]}),
        frameRate:8,
        repeat : -1,
    }

    const runFast = {
        key:'sprint',
        frames:scene.anims.generateFrameNumbers('player', {start:24, end: 27}),
        frameRate:10,
        repeat : -1,
    }

    const jump = {
        key:'jump',
        frames:scene.anims.generateFrameNumbers('player', {start:32, end: 33}),
        frameRate:2,
        repeat : -1,
    }

    const fall = {
        key:'fall',
        frames:scene.anims.generateFrameNumbers('player', {start:35, end: 36}),
        frameRate:2,
        repeat : -1,
    }

    scene.anims.create(idle);
    scene.anims.create(walk);
    scene.anims.create(run);
    scene.anims.create(runFast);
    scene.anims.create(jump);
    scene.anims.create(fall);
}