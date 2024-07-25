import { keyTracker, world, gameLight, nightShader } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class TheLights {
    constructor({x, y, width, height, xInstances, yInstances, separationWidth, separationHeight}) {
        this.width = width;
        this.height = height;
        this.xInstances = xInstances;
        this.yInstances = yInstances;
        this.separationWidth = separationWidth;
        this.separationHeight = separationHeight;

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

        this.hasLoaded = true;

        function drawTheLights(functionRows, functionColumns, separationWidth, separationHeight, imgW, imgH, x, y) {
            let posX = x;
            let posY = y;
            for (let i = 0; i < functionColumns; i++) {
                for (let j = 0; j < functionRows; j++) {
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = "white";
                    ctx.fillRect(posX, posY, imgW, imgH);
                    ctx.globalAlpha = 1;

                    posX += (imgW + separationWidth);
                }
                posY += imgH + separationHeight;
                posX = x;
            }
        };

        if (this.hasLoaded) {
            drawTheLights(this.xInstances, this.yInstances, this.separationWidth, this.separationHeight, 
                this.width, this.height, this.pos.x, this.pos.y);
        }
    }
    update() {
        this.draw();

        // for (let i = 0; i < this.yInstances; i++) {
        //     for (let j = 0; j < this.xInstances; j++) {
        //         if (j === 0) {
        //             if (i === 0) {
                        
        //             }
        //             else {
                        
        //             }
        //         }
        //         else {
                    
        //         }
        //     }
        // }
    }
}