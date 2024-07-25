import { keyTracker, world, gameLight, nightShader } from "../Screens/gameplayScreen.js";
import { currentScreenWidth, currentScreenHeight } from "../Screens/pauseMenuScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export class PlayableCharacter {
    constructor({x, y}) {
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

        this.inWater = false;
        this.viewDirection = "Down";

        this.origCameraPos = {
            x: (canvas.width / 2) - (this.cameraBoundaryWidth / 2),
            y: (canvas.height / 2) - (this.cameraBoundaryHeight / 2)
        };

        this.origPos = {
            x: x,
            y: y
        };

        this.cameraPos = {
            x: (canvas.width / 2) - (this.cameraBoundaryWidth / 2),
            y: (canvas.height / 2) - (this.cameraBoundaryHeight / 2)
        };
        
        this.pos = {
            x: x,
            y: y
        };

        this.hasLoaded = false;
        this.canMove = false;
    }
    draw() {
        this.hasLoaded = true;

        if (this.hasLoaded) {
            // Player Boundary Tracker
            // ctx.fillStyle = "white";
            // ctx.fillRect((canvas.width / 2) - (this.cameraBoundaryWidth / 2), (canvas.height / 2) - (this.cameraBoundaryHeight / 2), this.cameraBoundaryWidth, this.cameraBoundaryHeight);
            //
            ctx.fillStyle = "#A82517";
            ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
            // Player Boundary Text
            // ctx.fillStyle = "black";
            // ctx.fillText("Camera Movement Boundaries", (canvas.width / 2) - (ctx.measureText("Camera Movement Boundaries").width / 2), (canvas.height / 2) - (this.cameraBoundaryHeight / 4));
            //
        }
    }
    update() {
        this.draw();

        function changeViewDirection(char) {
            if (keyTracker.w.pressed) {
                char.viewDirection = "Up";
            }
            else if (keyTracker.s.pressed) {
                char.viewDirection = "Down";
            }
            else if (keyTracker.a.pressed) {
                char.viewDirection = "Left";
            }
            else if (keyTracker.d.pressed) {
                char.viewDirection = "Right";
            }
        }

        function playerShadow(char) {
            if (char.viewDirection === "Up") {
                if (!char.inWater) {
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = "#343234";
                    ctx.fillRect(char.pos.x, char.pos.y - 16, char.width, char.height / 2);
                    ctx.globalAlpha = 1;
                }
            }
            else if (char.viewDirection === "Down") {
                if (!char.inWater) {
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = "#343234";
                    ctx.fillRect(char.pos.x, char.pos.y + 32, char.width, char.height / 2);
                    ctx.globalAlpha = 1;
                }
            }
            else if (char.viewDirection === "Left") {
                if (!char.inWater) {
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = "#343234";
                    ctx.fillRect(char.pos.x - 16, char.pos.y, char.width / 2, char.height);
                    ctx.globalAlpha = 1;
                }
            }
            else if (char.viewDirection === "Right") {
                if (!char.inWater) {
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = "#343234";
                    ctx.fillRect(char.pos.x + 32, char.pos.y, char.width / 2, char.height);
                    ctx.globalAlpha = 1;
                }
            }
        }

        function walkingMovement(char) {
            // Allows camera boundaries to adapt with canvas scaling
            let scaleWidth = (currentScreenWidth - 480) / 4;
            let scaleHeight = (currentScreenHeight - 270) / 4;
            //
            // Allows player boundaries to adapt with canvas scaling
            let xChange = (currentScreenWidth - 480) / 2;
            let yChange = (currentScreenHeight - 270) / 2;
            //

            if (world.background.playerCollision) {
                return;
            }

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
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.y += char.runningSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.y += char.runningSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.y += char.runningSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.y += char.runningSpeed;
                            });
                            return;
                        }
                        else {
                            world.background.pos.y += char.walkingSpeed;
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.y += char.walkingSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.y += char.walkingSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.y += char.walkingSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.y += char.walkingSpeed;
                            });
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.y += 0;
                    world.tilePlacements.forEach(tilePlacement => {
                        tilePlacement.pos.y += 0;
                    });
                    world.buildings.forEach(building => {
                        building.pos.y += 0;
                    });
                    world.lightSources.forEach(lightSource => {
                        lightSource.pos.y += 0;
                    });
                    world.theLights.forEach(light => {
                        light.pos.y += 0;
                    });
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
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.y -= char.runningSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.y -= char.runningSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.y -= char.runningSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.y -= char.runningSpeed;
                            });
                            return;
                        }
                        else {
                            world.background.pos.y -= char.walkingSpeed;
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.y -= char.walkingSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.y -= char.walkingSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.y -= char.walkingSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.y -= char.walkingSpeed;
                            });
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.y -= 0;
                    world.tilePlacements.forEach(tilePlacement => {
                        tilePlacement.pos.y -= 0;
                    });
                    world.buildings.forEach(building => {
                        building.pos.y -= 0;
                    });
                    world.lightSources.forEach(lightSource => {
                        lightSource.pos.y -= 0;
                    });
                    world.theLights.forEach(light => {
                        light.pos.y -= 0;
                    });
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
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.x += char.runningSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.x += char.runningSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.x += char.runningSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.x += char.runningSpeed;
                            });
                            return;
                        }
                        else {
                            world.background.pos.x += char.walkingSpeed;
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.x += char.walkingSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.x += char.walkingSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.x += char.walkingSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.x += char.walkingSpeed;
                            });
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.x += 0;
                    world.tilePlacements.forEach(tilePlacement => {
                        tilePlacement.pos.x += 0;
                    });
                    world.buildings.forEach(building => {
                        building.pos.x += 0;
                    });
                    world.lightSources.forEach(lightSource => {
                        lightSource.pos.x += 0;
                    });
                    world.theLights.forEach(light => {
                        light.pos.x += 0;
                    });
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
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.x -= char.runningSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.x -= char.runningSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.x -= char.runningSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.x -= char.runningSpeed;
                            });
                            return;
                        }
                        else {
                            world.background.pos.x -= char.walkingSpeed;
                            world.tilePlacements.forEach(tilePlacement => {
                                tilePlacement.pos.x -= char.walkingSpeed;
                            });
                            world.buildings.forEach(building => {
                                building.pos.x -= char.walkingSpeed;
                            });
                            world.lightSources.forEach(lightSource => {
                                lightSource.pos.x -= char.walkingSpeed;
                            });
                            world.theLights.forEach(light => {
                                light.pos.x -= char.walkingSpeed;
                            });
                            return;
                        }
                    }
                }
                else {
                    world.background.pos.x -= 0;
                    world.tilePlacements.forEach(tilePlacement => {
                        tilePlacement.pos.x -= 0;
                    });
                    world.buildings.forEach(building => {
                        building.pos.x -= 0;
                    });
                    world.lightSources.forEach(lightSource => {
                        lightSource.pos.x -= 0;
                    });
                    world.theLights.forEach(light => {
                        light.pos.x -= 0;
                    });
                }
            }
        }
        
        // playerShadow(this);
        regainStamina(this);
        regainHealth(this);

        if (this.canMove) {
            changeViewDirection(this);
            walkingMovement(this);
            cameraMovement(this);
        }
    }
}