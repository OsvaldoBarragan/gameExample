"use strict";

import { allowKeys, STATES, gameCurrentState } from "./../index.js";
import * as one from "./../Worlds/world1.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export let world = one;

function scaleCanvasSize(num) {
    canvas.style.transform = `translate(-50%, -50%) scale(${num})`;
}

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
                        scaleCanvasSize(0.5);
                        break; 
                    }
                    break;
                case "KeyK":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.k.pressed = false;
                        scaleCanvasSize(1);
                        break;
                    }
                    break;
                case "KeyJ":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.j.pressed = false;
                        scaleCanvasSize(1.5);
                        break;
                    }
                    break;
                case "KeyL":
                    if (gameCurrentState === STATES.Gameplay) {
                        keyTracker.l.pressed = false;
                        scaleCanvasSize(2);
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