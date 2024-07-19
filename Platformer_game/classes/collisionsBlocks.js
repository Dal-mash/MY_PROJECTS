console.log(floorCollisions);
var collisionBlocks2D = [];


//Turning collisions array into a 2d array
for(let i=0;i<floorCollisions.length;i+=36){
    collisionBlocks2D.push(floorCollisions.slice(i, i+36))
}

collisionBlocks2D.forEach(row => {
    row.forEach(entity => {
        if(entity === 17 ){
            console.log('block');
        }        
    });    
});