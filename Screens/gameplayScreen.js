"use strict";

import { allowKeys, STATES, gameCurrentState } from "./../index.js";
import * as one from "./../Worlds/world1.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export let world = one;

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

function gameKeys() {
    window.addEventListener("keydown", (event) => {
        if (allowKeys) {
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
        if (allowKeys) {
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
                        console.log("working");
                        scaleCanvasSize(1);
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
                        scaleCanvasSize(0.5);
                        break;
                    }
                    break;
                case "KeyL":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.l.pressed = false;
                        scaleCanvasSize(0.75);
                        break;
                    }
                    break;
                case "KeyZ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.z.pressed = false;
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
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.w.pressed = true;
        }
    });

    upButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.w.pressed = false;
        }
    });

    downButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.s.pressed = true;
        }
    });

    downButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.s.pressed = false;
        }
    });

    leftButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.a.pressed = true;
        }
    });

    leftButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.a.pressed = false;
        }
    });

    rightButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.d.pressed = true;
        }
    });

    rightButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.d.pressed = false;
        }
    });

    // Action Button Trackers (for those on mobile, it tracks their touches)
    iButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.i.pressed = true;
        }
    });

    iButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.i.pressed = false;
        }
    });

    kButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.k.pressed = true;
        }
    });

    kButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.k.pressed = false;
        }
    });

    jButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.j.pressed = true;
        }
    });

    jButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.j.pressed = false;
        }
    });

    lButton.addEventListener("touchstart", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.l.pressed = true;
        }
    });

    lButton.addEventListener("touchend", (event) => {
        if (allowKeys && gameCurrentState === STATES.Gameplay) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.l.pressed = false;
        }
    });
}

function loadClasses() {
    world.playableCharacter.update();
}

function displayHealthAndStamina() {
    ctx.fillStyle = "black";
    ctx.font = "bold 30px serif";
    ctx.fillText(`Health: ${Math.trunc(world.playableCharacter.health)}`, 32, 32);
    ctx.fillText(`Stamina: ${Math.trunc(world.playableCharacter.stamina)}`, canvas.width - 32 - (ctx.measureText(`Stamina: ${Math.trunc(world.playableCharacter.stamina)}`).width), 32);
}

export function runGameplayScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    loadClasses();
    displayHealthAndStamina();
}

gameKeys();