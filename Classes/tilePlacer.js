import { keyTracker, world } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class TilePlacer {
    constructor({xInstances, yInstances, separationWidth, separationHeight, imgSrc, x, y, cols, rows, totalFrames, typeOf}) {
        this.image = new Image();
        this.imgSrc = imgSrc;
        this.cols = cols;
        this.rows = rows;
        this.totalFrames = totalFrames;
        this.currentFrame = 0;
        this.srcX = 0;
        this.srcY = 0;
        this.framesDrawn = 0;

        this.xInstances = xInstances;
        this.yInstances = yInstances;
        this.separationWidth = separationWidth;
        this.separationHeight = separationHeight;

        this.typeOf = typeOf;
        this.playerInWater = false;

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

        this.fullWidth = this.width * this.xInstances;
        this.fullHeight = this.height * this.yInstances;

        this.currentFrame = this.currentFrame % this.totalFrames;

        this.srcX = this.currentFrame * this.width;

        this.image.onload = (event) => {
            this.hasLoaded = true;
        };
        this.image.src = this.imgSrc;

        function drawTilePlacer(functionRows, functionColumns, separationWidth, separationHeight, img, imgW, imgH, x, y, srcX, srcY) {
            let posX = x;
            let posY = y;
            for (let i = 0; i < functionColumns; i++) {
                for (let j = 0; j < functionRows; j++) {
                    ctx.drawImage(
                        img,
                        srcX,
                        srcY,
                        imgW,
                        imgH,
                        posX,
                        posY,
                        imgW,
                        imgH
                    );
                    posX += (imgW + separationWidth);
                }
                posY += imgH + separationHeight;
                posX = x;
            }
        };

        if (this.hasLoaded) {
            drawTilePlacer(this.xInstances, this.yInstances, this.separationWidth, this.separationHeight, 
                this.image, this.width, this.height, this.pos.x, this.pos.y, this.srcX, this.srcY);
            // ctx.drawImage(
            //     this.image,
            //     this.srcX,
            //     this.srcY,
            //     this.width,
            //     this.height,
            //     this.pos.x,
            //     this.pos.y,
            //     this.width,
            //     this.height
            // );
        }
    }
    update() {
        this.framesDrawn++; 

        if (this.framesDrawn >= 20) {
            this.currentFrame++;
            this.framesDrawn = 0;
        }

        this.draw();

        if (this.typeOf === "Water") {
            function checkPlayerCollision(water) {
                if (world.playableCharacter.pos.y + world.playableCharacter.height <= water.pos.y + water.fullHeight &&
                    world.playableCharacter.pos.y + world.playableCharacter.height - 16 >= water.pos.y &&
                    world.playableCharacter.pos.x >= water.pos.x &&
                    world.playableCharacter.pos.x + world.playableCharacter.width <= water.pos.x + water.fullWidth
                ) {
                    water.playerInWater = true;
                    world.playableCharacter.inWater = true;
                    world.playableCharacter.height = 16;
                    world.playableCharacter.walkingSpeed = 0.5;
                    world.playableCharacter.runningSpeed = 1;
                }
                else {
                    let isTherePlayerInWater = false;
                    world.tilePlacements.forEach(tilePlacement => {
                        if (tilePlacement.typeOf === "Water") {
                            if (tilePlacement.playerInWater) {
                                isTherePlayerInWater = true;
                                return;
                            }
                        }
                    });

                    if (isTherePlayerInWater) {
                        water.playerInWater = false;
                        return;
                    }
                    else {
                        water.playerInWater = false;
                        world.playableCharacter.inWater = false;
                        world.playableCharacter.height = 32;
                        world.playableCharacter.walkingSpeed = 1;
                        world.playableCharacter.runningSpeed = 2;
                    }
                }
            }

            checkPlayerCollision(this);
        }
    }
}