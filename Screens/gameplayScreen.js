"use strict";

import { allowKeys, STATES } from "./../index.js";
import * as one from "./../Worlds/world1.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export let world = one;

window.gameplayKeysAllowed = false;

function scaleCanvasSize(num) {
    canvas.style.transform = `translate(-50%, -50%) scale(${num})`;
}

// Buttons on the page
const upButton = document.getElementById("dPadTop");
const leftButton = document.getElementById("dPadLeft");
const rightButton = document.getElementById("dPadRight");
const downButton = document.getElementById("dPadBottom");

const iButton = document.getElementById("actionButtonsTop");
const jButton = document.getElementById("actionButtonsLeft");
const lButton = document.getElementById("actionButtonsRight");
const kButton = document.getElementById("actionButtonsBottom");
//

export const keyTracker = {
    q: {
        pressed: false
    },
    e: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    i: {
        pressed: false
    },
    k: {
        pressed: false
    },
    j: {
        pressed: false
    },
    l: {
        pressed: false
    },
    z: {
        pressed: false
    },
    x: {
        pressed: false
    }
};

export function gameplayKeys() {
    window.addEventListener("keydown", (event) => {
        if (allowKeys && gameplayKeysAllowed) {
            if (event.defaultPrevented) {
                return;
            }
            switch (event.code) {
                case "KeyQ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.q.pressed = true;
                        break;
                    }
                    break;
                case "KeyE":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.e.pressed = true;
                        break;
                    }
                    break;
                case "KeyW":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.w.pressed = true;
                        world.playableCharacter.canMove = true;
                        break;
                    }
                    break;
                case "KeyS":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.s.pressed = true;
                        world.playableCharacter.canMove = true;
                        break;
                    }
                    break;
                case "KeyA":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.a.pressed = true;
                        world.playableCharacter.canMove = true;
                        break;
                    }
                    break;
                case "KeyD":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.d.pressed = true;
                        world.playableCharacter.canMove = true;
                        break; 
                    }
                    break;
                case "KeyI":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.i.pressed = true;
                        break;
                    }
                    break;
                case "KeyK":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.k.pressed = true;
                        break;
                    }
                    break;
                case "KeyJ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.j.pressed = true;
                        break;
                    }
                    break;
                case "KeyL":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.l.pressed = true;
                        break;
                    }
                    break;
                case "KeyZ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.z.pressed = true;
                        break;
                    }
                case "KeyX":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.x.pressed = true;
                        break;
                    }
            }
        }
    });
    
    window.addEventListener("keyup", (event) => {
        if (allowKeys && gameplayKeysAllowed) {
            if (event.defaultPrevented) {
                return;
            }
            switch (event.code) {
                case "KeyQ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.q.pressed = false;
                        break;
                    }
                    break;
                case "KeyE":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.e.pressed = false;
                        break;
                    }
                    break;
                case "KeyW":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.w.pressed = false;
                        break;
                    }
                    break;
                case "KeyS":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.s.pressed = false;
                        break;
                    }
                    break;
                case "KeyA":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.a.pressed = false;
                        break;
                    }
                    break;
                case "KeyD":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.d.pressed = false;
                        break;
                    }
                    break;
                case "KeyI":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.i.pressed = false;
                        break; 
                    }
                    break;
                case "KeyK":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.k.pressed = false;
                        break;
                    }
                    break;
                case "KeyJ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.j.pressed = false;
                        break;
                    }
                    break;
                case "KeyL":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.l.pressed = false;
                        break;
                    }
                    break;
                case "KeyZ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.z.pressed = false;
                        gameCurrentState = STATES.PauseMenu;
                        break;
                    }
                case "KeyX":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.x.pressed = false;
                        break;
                    }
            }
        }
    });

    // D-Pad Button Trackers (for those on mobile, it tracks their touches)
    upButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.w.pressed = true;
            world.playableCharacter.canMove = true;
        }
    });

    upButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.w.pressed = false;
        }
    });

    downButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.s.pressed = true;
            world.playableCharacter.canMove = true;
        }
    });

    downButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.s.pressed = false;
        }
    });

    leftButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.a.pressed = true;
            world.playableCharacter.canMove = true;
        }
    });

    leftButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.a.pressed = false;
        }
    });

    rightButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.d.pressed = true;
            world.playableCharacter.canMove = true;
        }
    });

    rightButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.d.pressed = false;
        }
    });

    // Action Button Trackers (for those on mobile, it tracks their touches)
    iButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.i.pressed = true;
        }
    });

    iButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.i.pressed = false;
        }
    });

    kButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.k.pressed = true;
        }
    });

    kButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.k.pressed = false;
        }
    });

    jButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.j.pressed = true;
        }
    });

    jButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.j.pressed = false;
        }
    });

    lButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.l.pressed = true;
        }
    });

    lButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameplayKeysAllowed && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.l.pressed = false;
        }
    });
}

function loadClasses() {
    world.background.update();
    world.playableCharacter.update();
}

function infoBox() {
    const borderWidth = canvas.width - 64;
    const borderHeight = 64;
    const boxWidth = canvas.width - 68;
    const boxHeight = 60;
    ctx.globalAlpha = 0.5;
    // Border
    ctx.fillStyle = "black";
    ctx.fillRect((canvas.width / 2) - (borderWidth / 2), canvas.height - (borderHeight + 16), borderWidth, borderHeight);
    //
    // The Box
    ctx.fillStyle = "white";
    ctx.fillRect((canvas.width / 2) - (boxWidth / 2), canvas.height - (boxHeight + 16) - 2, boxWidth, boxHeight);
    //
    ctx.globalAlpha = 1;
}

function displayHealthAndStamina() {
    ctx.fillStyle = "black";
    ctx.fillRect(4, 4, 108, 44);
    ctx.fillStyle = "#16E972";
    ctx.fillRect(8, 8, Math.trunc(world.playableCharacter.health), 16 );
    ctx.fillStyle = "#1624E9";
    ctx.fillRect(8, 28, Math.trunc(world.playableCharacter.stamina), 16 );
    ctx.font = "bold 16px serif";
    ctx.fillStyle = "#E9168D";
    ctx.fillText(`Health: ${Math.trunc(world.playableCharacter.health)}`, (112 / 2) - (ctx.measureText(`Health: ${Math.trunc(world.playableCharacter.health)}`).width / 2), 22);
    ctx.fillStyle = "#E9DB16";
    ctx.fillText(`Stamina: ${Math.trunc(world.playableCharacter.stamina)}`, (112 / 2) - (ctx.measureText(`Stamina: ${Math.trunc(world.playableCharacter.stamina)}`).width / 2), 42);
}

export function runGameplayScreen() {
    if (window.gameCurrentState === STATES.Gameplay) {
        gameplayKeysAllowed = true;
        loadClasses();
        displayHealthAndStamina();
        // infoBox();
    }
}

gameplayKeys();