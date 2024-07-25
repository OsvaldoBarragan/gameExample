import { keyTracker, world, gameLight, nightShader } from "../Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class Interior {
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
        this.affectedByGameLight = false;
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

        function checkPlayerCollision(interior) {
            if (world.playableCharacter.pos.y <= interior.pos.y && keyTracker.w.pressed) {
                interior.playerCollision = true;
                world.playableCharacter.pos.y = interior.pos.y;
                return;
            }
            else if (world.playableCharacter.pos.y + world.playableCharacter.height >= interior.pos.y + interior.height && keyTracker.s.pressed) {
                interior.playerCollision = true;
                world.playableCharacter.pos.y = interior.pos.y + interior.height - world.playableCharacter.height;
                return;
            }
            else if (world.playableCharacter.pos.x <= interior.pos.x && keyTracker.a.pressed) {
                interior.playerCollision = true;
                world.playableCharacter.pos.x = interior.pos.x;
                return;
            }
            else if (world.playableCharacter.pos.x + world.playableCharacter.width >= interior.pos.x + interior.width && keyTracker.d.pressed) {
                interior.playerCollision = true;
                world.playableCharacter.pos.x = interior.pos.x + interior.width - world.playableCharacter.width;
                return;
            }
            else {
                interior.playerCollision = false;
                return;
            }
        }

        checkPlayerCollision(this);
    }
}