const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class Background {
    constructor({imgSrc, x, y}) {
        this.image = new Image();
        this.imgSrc = imgSrc;
        this.origPos = {
            x: x,
            y: y
        };
        this.pos = {
            x: x,
            y: y
        };
        this.hasLoaded = false;
    }
    draw() {
        this.width = this.image.width;
        this.height = this.image.height;
        this.image.onload = (event) => {
            this.hasLoaded = true;
        };
        this.image.src = this.imgSrc;
        if (this.hasLoaded) {
            ctx.drawImage(this.image, this.pos.x, this.pos.y);
        }
    }
    update() {
        this.draw();
    }
}