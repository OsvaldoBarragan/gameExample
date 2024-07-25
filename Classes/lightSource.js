import { keyTracker, world, gameLight, nightShader } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class LightSource {
    constructor({imgSrc, x, y, xInstances, yInstances, xBoundary, yBoundary, separationWidth, separationHeight, cols, rows, shadowMultiplier}) {
        this.image = new Image();
        this.imgSrc = imgSrc;

        this.cols = cols;
        this.rows = rows;

        this.srcX = 0;
        this.srcY = 0;

        this.xInstances = xInstances;
        this.yInstances = yInstances;
        this.xBoundary = xBoundary;
        this.yBoundary = yBoundary;
        this.separationWidth = separationWidth;
        this.separationHeight = separationHeight;

        this.shadowMultiplier = shadowMultiplier;
        this.inFrontOfPlayer = false;

        this.origPos = {
            x: x,
            y: y
        };
        this.pos = {
            x: x,
            y: y
        };
        this.playerCollision = false;
        this.hasLoaded = false;
    }
    draw() {
        this.width = this.image.width / this.cols;
        this.height = this.image.height / this.rows;

        this.image.onload = (event) => {
            this.hasLoaded = true;
        };
        this.image.src = this.imgSrc;

        function drawLightSource(functionRows, functionColumns, separationWidth, separationHeight, img, imgW, imgH, x, y, srcX, srcY, shadowMulti) {
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

                    // ctx.globalAlpha = 0.3;
                    // ctx.drawImage(
                    //     img,
                    //     srcX,
                    //     (srcY + (imgH * 1)) * shadowMulti,
                    //     imgW,
                    //     imgH,
                    //     posX,
                    //     posY + (imgH * 1),
                    //     imgW,
                    //     imgH
                    // );
                    // ctx.globalAlpha = 1;

                    posX += (imgW + separationWidth);
                }
                posY += imgH + separationHeight;
                posX = x;
            }
        };

        if (this.hasLoaded) {
            drawLightSource(this.xInstances, this.yInstances, this.separationWidth, this.separationHeight, 
                this.image, this.width, this.height, this.pos.x, this.pos.y, this.srcX, this.srcY, this.shadowMultiplier);
            // ctx.drawImage(this.image, this.pos.x, this.pos.y);
        }
    }
    update() {
        this.draw();

        function checkPlayerCollision(lightSource, lightSourceWidth, lightSourceHeight, lightSourceSeparationWidth, lightSourceSeparationHeight, lightSourceNumX, lightSourceNumY, lightSourceXBoundary, lightSourceYBoundary) {
            if (keyTracker.w.pressed) {
                if (world.playableCharacter.pos.y <= lightSource.pos.y + lightSourceYBoundary + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY) &&
                    world.playableCharacter.pos.y + world.playableCharacter.height >= lightSource.pos.y + lightSourceYBoundary + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY) &&
                    world.playableCharacter.pos.x < lightSource.pos.x + lightSource.width + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX) &&
                    world.playableCharacter.pos.x + world.playableCharacter.width > lightSource.pos.x + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.y = lightSource.pos.y + lightSourceYBoundary + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY);
                    return;
                }
            }
            else if (keyTracker.s.pressed) {
                if (world.playableCharacter.pos.y + world.playableCharacter.height >= lightSource.pos.y + world.playableCharacter.height - 1 + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY) &&
                    world.playableCharacter.pos.y <= lightSource.pos.y + world.playableCharacter.height - 1 + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY) &&
                    world.playableCharacter.pos.x < lightSource.pos.x + lightSource.width + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX) &&
                    world.playableCharacter.pos.x + world.playableCharacter.width > lightSource.pos.x + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.y = lightSource.pos.y + world.playableCharacter.height - world.playableCharacter.height - 1 + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY);
                    return;
                }
            }
            else if (keyTracker.a.pressed) {
                if (world.playableCharacter.pos.x <= lightSource.pos.x + lightSource.width + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX) &&
                    world.playableCharacter.pos.x + world.playableCharacter.width >= lightSource.pos.x + lightSource.width + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX) &&
                    world.playableCharacter.pos.y + world.playableCharacter.height > lightSource.pos.y + world.playableCharacter.height - 1 + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY) &&
                    world.playableCharacter.pos.y < lightSource.pos.y + lightSource.height - world.playableCharacter.height + lightSourceXBoundary + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.x = lightSource.pos.x + lightSource.width + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX);
                    return;
                }
            }
            else if (keyTracker.d.pressed) {
                if (world.playableCharacter.pos.x + world.playableCharacter.width >= lightSource.pos.x + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX) &&
                    world.playableCharacter.pos.x < lightSource.pos.x + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX) &&
                    world.playableCharacter.pos.y + world.playableCharacter.height > lightSource.pos.y + world.playableCharacter.height - 1 + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY) &&
                    world.playableCharacter.pos.y < lightSource.pos.y + lightSource.height - world.playableCharacter.height + lightSourceXBoundary + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.x = lightSource.pos.x - world.playableCharacter.width + ((lightSourceWidth + lightSourceSeparationWidth) * lightSourceNumX);
                    return;
                }
            }
            else {
                world.playableCharacter.canMove = true;
                return;
            }
        }
        function frontOrBack(lightSource, lightSourceWidth, lightSourceHeight, lightSourceSeparationWidth, lightSourceSeparationHeight, lightSourceNumX, lightSourceNumY, lightSourceXBoundary, lightSourceYBoundary) {
            if (world.playableCharacter.pos.y >= lightSource.pos.y + lightSourceYBoundary + ((lightSourceHeight + lightSourceSeparationHeight) * lightSourceNumY)) {
                lightSource.inFrontOfPlayer = false;
            }
            else {
                lightSource.inFrontOfPlayer = true;
            }
        }
        function radiateThisLight(lightSource, multiplierNum) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "yellow";
            ctx.fillRect(lightSource.pos.x + ((lightSource.width + lightSource.separationWidth) * multiplierNum), lightSource.pos.y, lightSource.width, lightSource.height);
            ctx.globalAlpha = 1;
        }

        for (let i = 0; i < this.yInstances; i++) {
            for (let j = 0; j < this.xInstances; j++) {
                if (j === 0) {
                    if (i === 0) {
                        checkPlayerCollision(this, 0, 0, 0, i * this.separationHeight, 0, i, this.xBoundary, this.yBoundary);
                        frontOrBack(this, 0, 0, 0, i * this.separationHeight, 0, i, this.xBoundary, this.yBoundary);
                        // radiateThisLight(this, 0);
                    }
                    else {
                        checkPlayerCollision(this, 0, this.height, 0, i * this.separationHeight, 0, i, this.xBoundary, this.yBoundary);
                        frontOrBack(this, 0, this.height, 0, i * this.separationHeight, 0, i, this.xBoundary, this.yBoundary);
                        // radiateThisLight(this, 0);
                    }
                }
                else {
                    checkPlayerCollision(this, this.width, this.height, this.separationWidth, this.separationHeight, j, i, this.xBoundary, this.yBoundary);
                    frontOrBack(this, this.width, this.height, this.separationWidth, this.separationHeight, j, i, this.xBoundary, this.yBoundary);
                    // radiateThisLight(this, j);
                }
            }
        }
    }
}