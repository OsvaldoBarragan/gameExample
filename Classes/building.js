import { keyTracker, world, gameLight, nightShader } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class Building {
    constructor({imgSrc, x, y, xInstances, yInstances, separationWidth, separationHeight, cols, rows, shadowMultiplier}) {
        this.image = new Image();
        this.imgSrc = imgSrc;

        this.cols = cols;
        this.rows = rows;

        this.xInstances = xInstances;
        this.yInstances = yInstances;
        this.separationWidth = separationWidth;
        this.separationHeight = separationHeight;

        this.shadowMultiplier = shadowMultiplier;

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

        this.srcX = 0;
        this.srcY = 0;

        this.image.onload = (event) => {
            this.hasLoaded = true;
        };
        this.image.src = this.imgSrc;

        function drawBuilding(functionRows, functionColumns, separationWidth, separationHeight, img, imgW, imgH, x, y, srcX, srcY, shadowMulti) {
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
            drawBuilding(this.xInstances, this.yInstances, this.separationWidth, this.separationHeight, 
                this.image, this.width, this.height, this.pos.x, this.pos.y, this.srcX, this.srcY, this.shadowMultiplier);
            // ctx.drawImage(this.image, this.pos.x, this.pos.y);
        }
    }
    update() {
        this.draw();

        function checkPlayerCollision(building, buildingWidth, buildingHeight, buildingSeparationWidth, buildingSeparationHeight, buildingNumX, buildingNumY) {
            if (keyTracker.w.pressed) {
                if (world.playableCharacter.pos.y <= building.pos.y + building.height - world.playableCharacter.height + ((buildingHeight + buildingSeparationHeight) * buildingNumY) &&
                    world.playableCharacter.pos.y + world.playableCharacter.height >= building.pos.y + building.height - world.playableCharacter.height + ((buildingHeight + buildingSeparationHeight) * buildingNumY) &&
                    world.playableCharacter.pos.x < building.pos.x + building.width + ((buildingWidth + buildingSeparationWidth) * buildingNumX) &&
                    world.playableCharacter.pos.x + world.playableCharacter.width > building.pos.x + ((buildingWidth + buildingSeparationWidth) * buildingNumX)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.y = building.pos.y + building.height - world.playableCharacter.height + ((buildingHeight + buildingSeparationHeight) * buildingNumY);
                    return;
                }
            }
            else if (keyTracker.s.pressed) {
                if (world.playableCharacter.pos.y + world.playableCharacter.height >= building.pos.y + ((buildingHeight + buildingSeparationHeight) * buildingNumY) &&
                    world.playableCharacter.pos.y <= building.pos.y + ((buildingHeight + buildingSeparationHeight) * buildingNumY) &&
                    world.playableCharacter.pos.x < building.pos.x + building.width + ((buildingWidth + buildingSeparationWidth) * buildingNumX) &&
                    world.playableCharacter.pos.x + world.playableCharacter.width > building.pos.x + ((buildingWidth + buildingSeparationWidth) * buildingNumX)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.y = building.pos.y - world.playableCharacter.height + ((buildingHeight + buildingSeparationHeight) * buildingNumY);
                    return;
                }
            }
            else if (keyTracker.a.pressed) {
                if (world.playableCharacter.pos.x <= building.pos.x + building.width + ((buildingWidth + buildingSeparationWidth) * buildingNumX) &&
                    world.playableCharacter.pos.x + world.playableCharacter.width >= building.pos.x + building.width + ((buildingWidth + buildingSeparationWidth) * buildingNumX) &&
                    world.playableCharacter.pos.y + world.playableCharacter.height > building.pos.y + ((buildingHeight + buildingSeparationHeight) * buildingNumY) &&
                    world.playableCharacter.pos.y < building.pos.y + building.height - world.playableCharacter.height + ((buildingHeight + buildingSeparationHeight) * buildingNumY)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.x = building.pos.x + building.width + ((buildingWidth + buildingSeparationWidth) * buildingNumX);
                    return;
                }
            }
            else if (keyTracker.d.pressed) {
                if (world.playableCharacter.pos.x + world.playableCharacter.width >= building.pos.x + ((buildingWidth + buildingSeparationWidth) * buildingNumX) &&
                    world.playableCharacter.pos.x < building.pos.x + ((buildingWidth + buildingSeparationWidth) * buildingNumX) &&
                    world.playableCharacter.pos.y + world.playableCharacter.height > building.pos.y + ((buildingHeight + buildingSeparationHeight) * buildingNumY) &&
                    world.playableCharacter.pos.y < building.pos.y + building.height - world.playableCharacter.height + ((buildingHeight + buildingSeparationHeight) * buildingNumY)
                ) {
                    world.playableCharacter.canMove = false;
                    world.playableCharacter.pos.x = building.pos.x - world.playableCharacter.width + ((buildingWidth + buildingSeparationWidth) * buildingNumX);
                    return;
                }
            }
            else {
                world.playableCharacter.canMove = true;
                return;
            }
        }

        for (let i = 0; i < this.yInstances; i++) {
            for (let j = 0; j < this.xInstances; j++) {
                if (j === 0) {
                    if (i === 0) {
                        checkPlayerCollision(this, 0, 0, 0, i * this.separationHeight, 0, i);
                    }
                    else {
                        checkPlayerCollision(this, 0, this.height, 0, i * this.separationHeight, 0, i);
                    }
                }
                else {
                    checkPlayerCollision(this, this.width, this.height, this.separationWidth, this.separationHeight, j, i);
                }
            }
        }
    }
}