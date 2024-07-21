class CollisionBlock{
    constructor(position){
        this.position = position;
        this.height = 16;
        this.width=16;
    }
    draw(ctx){
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        this.draw(ctx);
    }
}