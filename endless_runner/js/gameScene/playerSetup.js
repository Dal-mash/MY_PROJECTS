export function createPlayer(scene){
    scene.player = scene.physics.add.sprite(200, 1000, 'player').setDepth(10)
    scene.player.setCollideWorldBounds(true);
    scene.player.setScale(2)
    scene.player.body.setSize(15, 19)
    scene.player.body.setOffset(16,13)
            //player.body.debugBodyColor = 0xff0000
    return scene.player;
}


let state = {
    idle:false,
    moving:false,
    falling:false,
    jumping:false,
}

let right = true;
let coyoteTime = 300;
let coyoteCount = 0;

//jumping
let jumpPress = false;
let canJump = false;
const Buffer_Time = 200;
let jumpBuffer = 0;

export function updatePlayer(player, delta, scene ) {

    //setting player states
    if (player.body.velocity.y === 0) {
        state.falling = false;
        state.jumping = false;
        canJump = false;
        
        if (player.body.velocity.x === 0) {
            state.moving = false;
            state.idle = true;
        } else {
            state.moving = true;
            state.idle = false;
        }
    } else if (player.body.velocity.y > 0) {
        state.falling = true;
        state.jumping = false;
        state.idle = false;
        state.moving = false;  
    } else if (player.body.velocity.y < 0) {
        state.jumping = true;
        state.idle = false;
        state.falling = false;
        state.moving = false;
        jumpBuffer = 0;  
    }



    //coyote jump timer
    if (state.falling || !state.idle || !state.jumping) {
        coyoteCount -= delta;
    }
    if (state.idle || state.moving) {
        coyoteCount = coyoteTime;
    }

    //Tweaking  player Gravity
    if(state.idle || state.moving){
        player.body.setGravityY(1000);
    }
    if(state.jumping){
        player.body.setGravityY(300);
    }

    ////////////////////////////////////////////////
    
   //console.log({coyoteCount}, state.falling)


    ////////////////////////////////////////
    //player Movement
    //

    //movingRight
    player.setVelocityX(0)
    if(scene.keys.d.isDown){
        player.setVelocityX(300)
        right = true;
        if(state.moving || state.idle && !state.jumping){
            player.setFlipX(false)
            player.play('sprint', true);
        }
    }

    //Moving Left
    if(scene.keys.a.isDown){
        player.setVelocityX(-300)
        right = false;
        if(state.idle || state.moving && !state.jumping){
            player.setFlipX(true)
            player.play('sprint',true);
        }
    }


    // falling down
    if(state.falling){
        if(scene.keys.w.isDown && !jumpPress ){
            jumpPress = true
            canJump = true;
            jumpBuffer = Buffer_Time;
            if(coyoteCount>0){
                playerJump(player);
                coyoteCount=0;
            }
        }
        else{
            jumpBuffer-=delta
        }
        if(right){
            player.setFlipX(false)
        }
        else{
            player.setFlipX(true)   
        }
        player.body.setGravityY(1200);
        player.play('fall',true)
    }

    //toggle jumping
    if(!scene.keys.w.isDown){
        jumpPress = false
    }

    //jump buffering
    if(player.body.onFloor()){canJump = true
        if(canJump && jumpBuffer>0){
            playerJump(player);
        }
        jumpBuffer = 0;
    }
    else{
        canJump = false
    }


    //Idle
    if(state.idle){
        if(right){
            player.setFlipX(false);
        }
        else{player.setFlipX(true)}
        player.play('idle', true)
    }

    if(state.jumping || state.falling){
        if(right){
            player.setFlipX(false);
        }
        else{
            player.setFlipX(true)
        }
    }


    //jumping up
    if(scene.keys.w.isDown && !jumpPress ){
        jumpPress = true
        jumpBuffer = Buffer_Time
        if((!state.jumping && !state.falling) || (state.falling && coyoteCount>0)){
            playerJump(player)}
    }

}

function playerJump(player){
    player.setVelocityY(-540);
        if(right){
            player.setFlipX(false);
        }
        else{
            player.setFlipX(true)
        }
        player.play('jump', true);
}