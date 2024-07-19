import { keyTracker, world } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class TilePlacer {
    constructor({imgSrc, x, y, cols, rows, totalFrames, typeOf}) {
        this.image = new Image();
        this.imgSrc = imgSrc;
        this.cols = cols;
        this.rows = rows;
        this.totalFrames = totalFrames;
        this.currentFrame = 0;
        this.srcX = 0;
        this.srcY = 0;
        this.framesDrawn = 0;

        this.typeOf = typeOf;

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
        this.width = this.image.width / this.cols;
        this.height = this.image.height / this.rows;

        this.currentFrame = this.currentFrame % this.totalFrames;

        this.srcX = this.currentFrame * this.width;

        this.image.onload = (event) => {
            this.hasLoaded = true;
        };
        this.image.src = this.imgSrc;
        if (this.hasLoaded) {
            ctx.drawImage(
                this.image,
                this.srcX,
                this.srcY,
                this.width,
                this.height,
                this.pos.x,
                this.pos.y,
                this.width,
                this.height
            );
        }
    }
    update() {
        this.framesDrawn++;

        if (this.framesDrawn >= 15) {
            this.currentFrame++;
            this.framesDrawn = 0;
        }

        this.draw();
    }
}