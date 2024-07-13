import { keyTracker } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class NPC {
    constructor() {
        this.width = 32;
        this.height = 32;
        this.walkingSpeed = 1;
        this.runningSpeed = 1.5;
        
        this.pos = {
            x: 0,
            y: 0
        };

        this.hasLoaded = false;
        this.canMove = false;
    }
    draw() {
        this.width = 32;
        this.width = 32;
        this.hasLoaded = true;

        if (this.hasLoaded) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        }
    }
    update() {
        this.draw();

        function walkingMovement(char) {
            if (keyTracker.w.pressed) {
                if (keyTracker.k.pressed) {
                    char.pos.y -= char.runningSpeed;
                    return;
                }
                char.pos.y -= char.walkingSpeed;
                return;
            }
            else if (keyTracker.s.pressed) {
                if (keyTracker.k.pressed) {
                    char.pos.y += char.runningSpeed;
                    return;
                }
                char.pos.y += char.walkingSpeed;
                return;
            }
            else if (keyTracker.a.pressed) {
                if (keyTracker.k.pressed) {
                    char.pos.x -= char.runningSpeed;
                    return;
                }
                char.pos.x -= char.walkingSpeed;
                return;
            }
            else if (keyTracker.d.pressed) {
                if (keyTracker.k.pressed) {
                    char.pos.x += char.runningSpeed;
                    return;
                }
                char.pos.x += char.walkingSpeed;
                return;
            }
        }

        if (this.canMove) {
            walkingMovement(this);
        }
    }
}