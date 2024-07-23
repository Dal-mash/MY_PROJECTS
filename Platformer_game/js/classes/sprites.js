class Sprite{
    constructor({position, imgSrc, frameRate = 1, frameBuffer}){
        this.frameRate = frameRate;
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc;
        this.image.onload = ()=>{
            this.width = this.image.width/this.frameRate
            this.height=this.image.height;               
        }
        this.frameBuffer = frameBuffer;
        this.elapses=0;
        this.currentFrame = 0;
    }
    draw(ctx){
        if(!this.image) return
        const cropBox={
            position:{
                x: this.currentFrame*this.width,
                y:0,
            },
            width:this.width,
            height : this.height
        }
        ctx.drawImage(
            this.image,
            Math.floor(cropBox.position.x),
            Math.floor(cropBox.position.y),
            Math.floor(cropBox.width),
            Math.floor(cropBox.height),
            Math.floor(this.position.x),
            Math.floor(this.position.y),
            Math.floor(this.width),
            Math.floor(this.height)
            );
    }

    updateFrame(){
        this.elapses++
        if(this.elapses%this.frameBuffer ==0){
            if(this.currentFrame<this.frameRate-1){
                this.currentFrame++
            }
            else this.currentFrame=0;
        }
    }

    update(){
        this.draw(ctx);
        this.updateFrame();
    }
}