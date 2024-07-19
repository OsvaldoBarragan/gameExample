import { keyTracker, world } from "../Screens/gameplayScreen.js";
import { currentScreenWidth, currentScreenHeight } from "../Screens/pauseMenuScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class PlayableCharacter {
    constructor() {
        this.width = 32;
        this.height = 32;
        this.cameraBoundaryWidth = canvas.width / 2;
        this.cameraBoundaryHeight = canvas.height / 2;

        this.walkingSpeed = 1;
        this.runningSpeed = 2;

        this.stamina = 100;
        this.staminaGain = 0.02;
        this.staminaLoss = 0.05;

        this.health = 100;
        this.healthGain = 0.05;

        this.cameraPos = {
            x: (canvas.width / 2) - (this.cameraBoundaryWidth / 2),
            y: (canvas.height / 2) - (this.cameraBoundaryHeight / 2)
        };
        
        this.pos = {
            x: (canvas.width / 2) - (this.width / 2),
            y: (canvas.height / 2) - (this.height / 2)
        };

        this.hasLoaded = false;
        this.canMove = false;
    }
    draw() {
        this.width = 32;
        this.width = 32;
        this.hasLoaded = true;

        if (this.hasLoaded) {
            // Player Boundary Tracker
            ctx.fillStyle = "white";
            ctx.fillRect((canvas.width / 2) - (this.cameraBoundaryWidth / 2), (canvas.height / 2) - (this.cameraBoundaryHeight / 2), this.cameraBoundaryWidth, this.cameraBoundaryHeight);
            //
            ctx.fillStyle = "#2599da";
            ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
            // Player Boundary Text
            ctx.fillStyle = "black";
            ctx.fillText("Camera Movement Boundaries", (canvas.width / 2) - (ctx.measureText("Camera Movement Boundaries").width / 2), (canvas.height / 2) - (this.cameraBoundaryHeight / 4));
            //
        }
    }
    update() {
        this.draw();

        function walkingMovement(char) {
            // Allows camera boundaries to adapt with canvas scaling
            let scaleWidth = (currentScreenWidth - 480) / 4;
            let scaleHeight = (currentScreenHeight - 270) / 4;
            //
            // Allows player boundaries to adapt with canvas scaling
            let xChange = (currentScreenWidth - 480) / 2;
            let yChange = (currentScreenHeight - 270) / 2;
            //
            if (keyTracker.w.pressed) {
                if (char.pos.y <= char.cameraPos.y + scaleHeight) {
                    if (world.background.pos.y >= 0) {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            char.pos.y -= char.runningSpeed;
                            char.stamina -= char.staminaLoss;
                            return;
                        }
                        else {
                            char.pos.y -= char.walkingSpeed;
                            return;
                        }
                    }
                    if (keyTracker.k.pressed && char.stamina >= 0) {
                        char.stamina -= char.staminaLoss;
                    }
                    return;
                }
                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.y -= char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                else {
                    char.pos.y -= char.walkingSpeed;
                    return;
                }
            }
            else if (keyTracker.s.pressed) {
                if (char.pos.y + char.height - yChange >= char.cameraPos.y + char.cameraBoundaryHeight - scaleHeight) {
                    if (world.background.pos.y + world.background.height <= canvas.height) {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            char.pos.y += char.runningSpeed;
                            char.stamina -= char.staminaLoss;
                            return;
                        }
                        else {
                            char.pos.y += char.walkingSpeed;
                            return;
                        }
                    }
                    if (keyTracker.k.pressed && char.stamina >= 0) {
                        char.stamina -= char.staminaLoss;
                        return;
                    }
                    return;
                }
                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.y += char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                else {
                    char.pos.y += char.walkingSpeed;
                    return;
                }
            }
            else if (keyTracker.a.pressed) {
                if (char.pos.x <= char.cameraPos.x + scaleWidth) {
                    if (world.background.pos.x >= 0) {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            char.pos.x -= char.runningSpeed;
                            char.stamina -= char.staminaLoss;
                            return;
                        }
                        else {
                            char.pos.x -= char.walkingSpeed;
                            return;
                        }
                    }
                    if (keyTracker.k.pressed && char.stamina >= 0) {
                        char.stamina -= char.staminaLoss;
                    }
                    return;
                }
                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.x -= char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                else {
                    char.pos.x -= char.walkingSpeed;
                    return;
                }
            }
            else if (keyTracker.d.pressed) {
                if (char.pos.x + char.width - xChange >= char.cameraPos.x + char.cameraBoundaryWidth - scaleWidth) {
                    if (world.background.pos.x + world.background.width <= canvas.width) {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            char.pos.x += char.runningSpeed;
                            char.stamina -= char.staminaLoss;
                            return;
                        }
                        else {
                            char.pos.x += char.walkingSpeed;
                            return;
                        }
                    }
                    if (keyTracker.k.pressed && char.stamina >= 0) {
                        char.stamina -= char.staminaLoss;
                        return;
                    }
                    return;
                }
                if (keyTracker.k.pressed && char.stamina >= 0) {
                    char.pos.x += char.runningSpeed;
                    char.stamina -= char.staminaLoss;
                    return;
                }
                else {
                    char.pos.x += char.walkingSpeed;
                    return;
                }
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

        function cameraMovement(char) {
            // Allows camera boundaries to adapt with canvas scaling
            let scaleWidth = (currentScreenWidth - 480) / 4;
            let scaleHeight = (currentScreenHeight - 270) / 4;
            //
            // Allows player boundaries to adapt with canvas scaling
            let xChange = (currentScreenWidth - 480) / 2;
            let yChange = (currentScreenHeight - 270) / 2;
            //
            if (keyTracker.w.pressed) {
                if (char.pos.y <= char.cameraPos.y + scaleHeight) {
                    if (world.background.pos.y >= 0) {
                        return;
                    }
                    else {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            world.background.pos.y += char.runningSpeed;
                            return;
                        }
                        else {
                            world.background.pos.y += char.walkingSpeed;
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.y += 0;
                }
            }
            else if (keyTracker.s.pressed) {
                if (char.pos.y + char.height - yChange >= char.cameraPos.y + char.cameraBoundaryHeight - scaleHeight) {
                    if (world.background.pos.y + world.background.height <= canvas.height) {
                        return;
                    }
                    else {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            world.background.pos.y -= char.runningSpeed;
                            return;
                        }
                        else {
                            world.background.pos.y -= char.walkingSpeed;
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.y -= 0;
                }
            }
            else if (keyTracker.a.pressed) {
                if (char.pos.x <= char.cameraPos.x + scaleWidth) {
                    if (world.background.pos.x >= 0) {
                        return;
                    }
                    else {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            world.background.pos.x += char.runningSpeed;
                            return;
                        }
                        else {
                            world.background.pos.x += char.walkingSpeed;
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.x += 0;
                }
            }
            else if (keyTracker.d.pressed) {
                if (char.pos.x + char.width - xChange >= char.cameraPos.x + char.cameraBoundaryWidth - scaleWidth) {
                    if (world.background.pos.x + world.background.width <= canvas.width) {
                        return;
                    }
                    else {
                        if (keyTracker.k.pressed && char.stamina >= 0) {
                            world.background.pos.x -= char.runningSpeed;
                            return;
                        }
                        else {
                            world.background.pos.x -= char.walkingSpeed;
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.x -= 0;
                }
            }
        }
        
        regainStamina(this);
        regainHealth(this);

        if (this.canMove) {
            walkingMovement(this);
            cameraMovement(this);
        }
    }
}