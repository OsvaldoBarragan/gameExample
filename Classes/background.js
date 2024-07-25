import { keyTracker, world, gameLight, nightShader } from "../Screens/gameplayScreen.js";

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
        this.playerCollision = false;
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

        function checkPlayerCollision(background) {
            if (world.playableCharacter.pos.y <= background.pos.y && keyTracker.w.pressed) {
                background.playerCollision = true;
                world.playableCharacter.pos.y = background.pos.y;
                return;
            }
            else if (world.playableCharacter.pos.y + world.playableCharacter.height >= background.pos.y + background.height && keyTracker.s.pressed) {
                background.playerCollision = true;
                world.playableCharacter.pos.y = background.pos.y + background.height - world.playableCharacter.height;
                return;
            }
            else if (world.playableCharacter.pos.x <= background.pos.x && keyTracker.a.pressed) {
                background.playerCollision = true;
                world.playableCharacter.pos.x = background.pos.x;
                return;
            }
            else if (world.playableCharacter.pos.x + world.playableCharacter.width >= background.pos.x + background.width && keyTracker.d.pressed) {
                background.playerCollision = true;
                world.playableCharacter.pos.x = background.pos.x + background.width - world.playableCharacter.width;
                return;
            }
            else {
                background.playerCollision = false;
                return;
            }
        }

        checkPlayerCollision(this);
    }
}