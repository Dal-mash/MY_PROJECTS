class Sprite{
    constructor(position, imgSrc){
        this.position = position;
        this.image = new Image();
        this.imgSrc.src = imgSrc;
    }
    draw(ctx){
        if(!this.image) return
        ctx.drawImage(this.image, this.position,x, this.position.y);
    }
    update(){
        this.draw(ctx);
    }
}