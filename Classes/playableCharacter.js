import { keyTracker } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class PlayableCharacter {
    constructor() {
        this.width = 32;
        this.height = 32;

        this.walkingSpeed = 1;
        this.runningSpeed = 2;

        this.stamina = 100;
        this.staminaGain = 0.02;
        this.staminaLoss = 0.05;

        this.health = 100;
        this.healthGain = 0.05;
        
        this.pos = {
            x: 300,
            y: 128
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
        // console.log("Stamina:", this.stamina);
        // console.log(`Health: ${Math.trunc(this.health)}, Stamina: ${Math.trunc(this.stamina)}`);

        function characterCanvasBoundaries(char) {
            if (char.pos.y <= 0 && keyTracker.w.pressed) {
                char.pos.y = 0;
                char.canMove = false;
            }
            else if (char.pos.y + char.height >= canvas.height && keyTracker.s.pressed) {
                char.pos.y = canvas.height - char.height;
                char.canMove = false;
            }
            else if (char.pos.x <= 0 && keyTracker.a.pressed) {
                char.pos.x = 0;
                char.canMove = false;
            }
            else if (char.pos.x + char.width >= canvas.width && keyTracker.d.pressed) {
                char.pos.x = canvas.width - char.width;
                char.canMove = false;
            }
            else {
                char.canMove = true;
            }
        }

        function walkingMovement(char) {
            if (keyTracker.w.pressed) {

                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.y -= char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                char.pos.y -= char.walkingSpeed;
                return;
            }
            else if (keyTracker.s.pressed) {

                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.y += char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                char.pos.y += char.walkingSpeed;
                return;
            }
            else if (keyTracker.a.pressed) {

                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.x -= char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                char.pos.x -= char.walkingSpeed;
                return;
            }
            else if (keyTracker.d.pressed) {

                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.x += char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                char.pos.x += char.walkingSpeed;
                return;
            }
        }

        function regainStamina(char) {
            if (!keyTracker.k.pressed) {
                if (char.stamina === 100) {
                    return;
                }

                if (char.stamina <= 100) {
                    char.stamina += char.staminaGain;
                    return;
                }
                else {
                    char.stamina = 100;
                    return;
                }
            }
            
            else if (keyTracker.k.pressed && char.stamina <= 0) {
                char.stamina += char.staminaGain;
                return;
            }
        }

        function regainHealth(char) {
            if (char.health === 100) {
                return;
            }

            if (char.health < 100) {
                char.health += char.healthGain;
                return;
            }
            else if (char.health >= 100) {
                char.health = 100;
                return;
            }
        }

        characterCanvasBoundaries(this);
        regainStamina(this);
        regainHealth(this);

        if (this.canMove) {
            walkingMovement(this);
        }
    }
}