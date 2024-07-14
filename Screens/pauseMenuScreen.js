"use strict";

import { allowKeys, STATES } from "./../index.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

window.pauseMenuKeysAllowed = false;

function scaleCanvasSize(num) {
    canvas.style.transform = `translate(-50%, -50%) scale(${num})`;
}

const pauseMenuContainerX = 16;
const pauseMenuContainerY = 16;

let primaryBackgroundColor = "#9F453D";
let secondaryBackgroundColor = "#CCA873";
let buttonColor = "#374D77";
let highlightedButtonColor = "#4B96AC";
let borderColor = "#2B2B2B";

export const PM_STATES = [
    "PauseMenu",
    "ChangeBackgroundColorMenu",
    "PlayerStatsMenu",
    "OtherOptionsMenu",
    "ViewCreditsMenu"
];

export const PM_OPTIONS = {
    PauseMenu: ["Change Menu Background", "Stats", "Other Options", "View Credits"],
    ChangeBackgroundColorMenu: [],
    PlayerStatsMenu: [],
    OtherOptionsMenu: ["Current Screen"],
    ViewCreditsMenu: [],
    OtherOptions_ChangeScreenSize: [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2],
}

let currentScreenSize = PM_OPTIONS.OtherOptions_ChangeScreenSize[3];
let PM_currentScreenSizeOptionNumber = 0;
let PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
 
let PM_currentStateNumber = 0;
let PM_currentOptionNumber = 0;
// let PM_currentHorizontalOptionNumber = 0;
export let PM_currentState = PM_STATES[PM_currentStateNumber];
export let PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];

export function resetPauseMenuStates() {
    PM_currentStateNumber = 0;
    PM_currentOptionNumber = 0;
    PM_currentState = PM_STATES[PM_currentStateNumber];
    PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
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

const keyTracker = {
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

export function pauseMenuKeys() {
    window.addEventListener("keydown", (event) => {
        if (allowKeys && pauseMenuKeysAllowed) {
            if (event.defaultPrevented) {
                return;
            }
            switch (event.code) {
                case "KeyQ":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.q.pressed = true;
                        break;
                    }
                    break;
                case "KeyE":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.e.pressed = true;
                        break;
                    }
                    break;
                case "KeyW":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.w.pressed = true;
                        if (PM_currentState === PM_STATES[0]) {
                            if (PM_currentOption === PM_OPTIONS.PauseMenu[0]) {
                                PM_currentOptionNumber = PM_OPTIONS.PauseMenu.length - 1;
                                PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber -= 1;
                                PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                            }
                        }
                        break;
                    }
                    break;
                case "KeyS":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.s.pressed = true;
                        if (PM_currentState === PM_STATES[0]) {
                            if (PM_currentOption === PM_OPTIONS.PauseMenu[PM_OPTIONS.PauseMenu.length - 1]) {
                                PM_currentOptionNumber = 0;
                                PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber += 1;
                                PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                            }
                        }
                        break;
                    }
                    break;
                case "KeyA":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.a.pressed = true;
                        if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                                if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[0]) {
                                    PM_currentScreenSizeOptionNumber = PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                    console.log(PM_currentScreenSizeOptionNumber);
                                }
                                else {
                                    PM_currentScreenSizeOptionNumber -= 1;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                    console.log(PM_currentScreenSizeOptionNumber);
                                }
                            }
                        }
                        break;
                    }
                    break;
                case "KeyD":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.d.pressed = true;
                        if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                                if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1]) {
                                    PM_currentScreenSizeOptionNumber = 0;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                    console.log(PM_currentScreenSizeOptionNumber);
                                }
                                else {
                                    PM_currentScreenSizeOptionNumber += 1;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                    console.log(PM_currentScreenSizeOptionNumber);
                                }
                            }
                        }
                        break; 
                    }
                    break;
                case "KeyI":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.i.pressed = true;
                        break;
                    }
                    break;
                case "KeyK":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.k.pressed = true;
                        break;
                    }
                    break;
                case "KeyJ":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.j.pressed = true;
                        break;
                    }
                    break;
                case "KeyL":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.l.pressed = true;
                        break;
                    }
                    break;
                case "KeyZ":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.z.pressed = true;
                        break;
                    }
                case "KeyX":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.x.pressed = true;
                        break;
                    }
            }
        }
    });
    
    window.addEventListener("keyup", (event) => {
        if (allowKeys && pauseMenuKeysAllowed) {
            if (event.defaultPrevented) {
                return;
            }
            switch (event.code) {
                case "KeyQ":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.q.pressed = false;
                        break;
                    }
                    break;
                case "KeyE":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.e.pressed = false;
                        break;
                    }
                    break;
                case "KeyW":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.w.pressed = false;
                        break;
                    }
                    break;
                case "KeyS":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.s.pressed = false;
                        break;
                    }
                    break;
                case "KeyA":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.a.pressed = false;
                        break;
                    }
                    break;
                case "KeyD":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.d.pressed = false;
                        break;
                    }
                    break;
                case "KeyI":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.i.pressed = false;
                        break; 
                    }
                    break;
                case "KeyK":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.k.pressed = false;
                        if (PM_currentState === PM_STATES[0]) {
                            if (PM_currentOption === PM_OPTIONS.PauseMenu[0]) {
                                PM_currentStateNumber = 1;
                                PM_currentOptionNumber = 0;
                                PM_currentState = PM_STATES[PM_currentStateNumber];
                                PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                            }
                            else if (PM_currentOption === PM_OPTIONS.PauseMenu[1]) {
                                PM_currentStateNumber = 2;
                                PM_currentOptionNumber = 0;
                                PM_currentState = PM_STATES[PM_currentStateNumber];
                                PM_currentOption = PM_OPTIONS.PlayerStatsMenu[PM_currentOptionNumber];
                            }
                            else if (PM_currentOption === PM_OPTIONS.PauseMenu[2]) {
                                PM_currentStateNumber = 3;
                                PM_currentOptionNumber = 0;
                                PM_currentState = PM_STATES[PM_currentStateNumber];
                                PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                            }
                            else if (PM_currentOption === PM_OPTIONS.PauseMenu[3]) {
                                PM_currentStateNumber = 4;
                                PM_currentOptionNumber = 0;
                                PM_currentState = PM_STATES[PM_currentStateNumber];
                                PM_currentOption = PM_OPTIONS.ViewCreditsMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                                if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[0]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[1]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[2]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[3]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[4]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[5]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[6]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[7]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[8]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[9]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[10]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[11]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[12]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[13]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[14]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }
                                else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[15]) {
                                    currentScreenSize = PM_currentScreenSizeOption;
                                    scaleCanvasSize(currentScreenSize);
                                }

                            }
                        }
                        break;
                    }
                    break;
                case "KeyJ":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.j.pressed = false;
                        break;
                    }
                    break;
                case "KeyL":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.l.pressed = false;
                        if (PM_currentState === PM_STATES[0]) {
                            resetPauseMenuStates();
                            window.gameCurrentState = STATES.Gameplay;
                        }
                        else if (PM_currentState === PM_STATES[1]) {
                            resetPauseMenuStates();
                        }
                        else if (PM_currentState === PM_STATES[2]) {
                            resetPauseMenuStates();
                        }
                        else if (PM_currentState === PM_STATES[3]) {
                            resetPauseMenuStates();
                        }
                        else if (PM_currentState === PM_STATES[4]) {
                            resetPauseMenuStates();
                        }
                        break;
                    }
                    break;
                case "KeyZ":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.z.pressed = false;
                        resetPauseMenuStates();
                        gameCurrentState = STATES.Gameplay;
                        break;
                    }
                case "KeyX":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.x.pressed = false;
                        break;
                    }
            }
        }
    });

    // D-Pad Button Trackers (for those on mobile, it tracks their touches)
    upButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.w.pressed = true;
            if (PM_currentState === PM_STATES[0]) {
                if (PM_currentOption === PM_OPTIONS.PauseMenu[0]) {
                    PM_currentOptionNumber = PM_OPTIONS.PauseMenu.length - 1;
                    PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber -= 1;
                    PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                }
            }
        }
    });

    upButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.w.pressed = false;
        }
    });

    downButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.s.pressed = true;
            if (PM_currentState === PM_STATES[0]) {
                if (PM_currentOption === PM_OPTIONS.PauseMenu[PM_OPTIONS.PauseMenu.length - 1]) {
                    PM_currentOptionNumber = 0;
                    PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber += 1;
                    PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
                }
            }
        }
    });

    downButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.s.pressed = false;
        }
    });

    leftButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.a.pressed = true;
            if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                    if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[0]) {
                        PM_currentScreenSizeOptionNumber = PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                        console.log(PM_currentScreenSizeOptionNumber);
                    }
                    else {
                        PM_currentScreenSizeOptionNumber -= 1;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                        console.log(PM_currentScreenSizeOptionNumber);
                    }
                }
            }
        }
    });

    leftButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.a.pressed = false;
        }
    });

    rightButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.d.pressed = true;
            if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                    if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1]) {
                        PM_currentScreenSizeOptionNumber = 0;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                        console.log(PM_currentScreenSizeOptionNumber);
                    }
                    else {
                        PM_currentScreenSizeOptionNumber += 1;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                        console.log(PM_currentScreenSizeOptionNumber);
                    }
                }
            }
        }
    });

    rightButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.d.pressed = false;
        }
    });

    // Action Button Trackers (for those on mobile, it tracks their touches)
    iButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.i.pressed = true;
        }
    });

    iButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.i.pressed = false;
        }
    });

    kButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.k.pressed = true;
        }
    });

    kButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.k.pressed = false;
            if (PM_currentState === PM_STATES[0]) {
                if (PM_currentOption === PM_OPTIONS.PauseMenu[0]) {
                    PM_currentStateNumber = 1;
                    PM_currentOptionNumber = 0;
                    PM_currentState = PM_STATES[PM_currentStateNumber];
                    PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                }
                else if (PM_currentOption === PM_OPTIONS.PauseMenu[1]) {
                    PM_currentStateNumber = 2;
                    PM_currentOptionNumber = 0;
                    PM_currentState = PM_STATES[PM_currentStateNumber];
                    PM_currentOption = PM_OPTIONS.PlayerStatsMenu[PM_currentOptionNumber];
                }
                else if (PM_currentOption === PM_OPTIONS.PauseMenu[2]) {
                    PM_currentStateNumber = 3;
                    PM_currentOptionNumber = 0;
                    PM_currentState = PM_STATES[PM_currentStateNumber];
                    PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                }
                else if (PM_currentOption === PM_OPTIONS.PauseMenu[3]) {
                    PM_currentStateNumber = 4;
                    PM_currentOptionNumber = 0;
                    PM_currentState = PM_STATES[PM_currentStateNumber];
                    PM_currentOption = PM_OPTIONS.ViewCreditsMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                    if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[0]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[1]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[2]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[3]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[4]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[5]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[6]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[7]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[8]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[9]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[10]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[11]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[12]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[13]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[14]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }
                    else if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[15]) {
                        currentScreenSize = PM_currentScreenSizeOption;
                        scaleCanvasSize(currentScreenSize);
                    }

                }
            }
        }
    });

    jButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.j.pressed = true;
        }
    });

    jButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.j.pressed = false;
        }
    });

    lButton.addEventListener("touchstart", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.l.pressed = true;
        }
    });

    lButton.addEventListener("touchend", (event) => {
        if (allowKeys && pauseMenuKeysAllowed && gameCurrentState === STATES.PauseMenu) {
            if (event.defaultPrevented) {
                return;
            }
            keyTracker.l.pressed = false;
            if (PM_currentState === PM_STATES[0]) {
                resetPauseMenuStates();
                window.gameCurrentState = STATES.Gameplay;
            }
            else if (PM_currentState === PM_STATES[1]) {
                resetPauseMenuStates();
            }
            else if (PM_currentState === PM_STATES[2]) {
                resetPauseMenuStates();
            }
            else if (PM_currentState === PM_STATES[3]) {
                resetPauseMenuStates();
            }
            else if (PM_currentState === PM_STATES[4]) {
                resetPauseMenuStates();
            }
        }
    });
}

export function runPauseMenuScreen() {
    if (window.gameCurrentState === STATES.PauseMenu) {
        pauseMenuKeysAllowed = true;
        switch(PM_currentState) {
            case PM_STATES[0]:
                const pauseMenuRects = {
                    title: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect(pauseMenuContainerX - 4, pauseMenuContainerY - 8, canvas.width - 32 + 8, 32 + 8);
                        //
                        // The Structure
                        ctx.fillStyle = secondaryBackgroundColor;
                        ctx.fillRect(pauseMenuContainerX, pauseMenuContainerY - 4, canvas.width - 32, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "bold 30px courier new, monospace";
                        ctx.fillText("PAUSED", (canvas.width / 2) - (ctx.measureText("PAUSED").width / 2), (pauseMenuContainerY - 4) + 24);
                        //
                    },
                    option1: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 48, (pauseMenuContainerY - 8) + 50, (canvas.width - 32 + 8) - 96, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.PauseMenu[0]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 48, (pauseMenuContainerY - 4) + 50, (canvas.width - 32) - 96, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.PauseMenu[0], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.PauseMenu[0]).width / 2), (pauseMenuContainerY - 4) + 50 + 24);
                        //
                    },
                    option2: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 48, (pauseMenuContainerY - 8) + 100, (canvas.width - 32 + 8) - 96, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.PauseMenu[1]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 48, (pauseMenuContainerY - 4) + 100, (canvas.width - 32) - 96, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.PauseMenu[1], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.PauseMenu[1]).width / 2), (pauseMenuContainerY - 4) + 100 + 24);
                        //
                    },
                    option3: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 48, (pauseMenuContainerY - 8) + 150, (canvas.width - 32 + 8) - 96, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.PauseMenu[2]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 48, (pauseMenuContainerY - 4) + 150, (canvas.width - 32) - 96, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.PauseMenu[2], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.PauseMenu[2]).width / 2), (pauseMenuContainerY - 4) + 150 + 24);
                        //
                    },
                    option4: function () {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 48, (pauseMenuContainerY - 8) + 200, (canvas.width - 32 + 8) - 96, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.PauseMenu[3]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 48, (pauseMenuContainerY - 4) + 200, (canvas.width - 32) - 96, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.PauseMenu[3], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.PauseMenu[3]).width / 2), (pauseMenuContainerY - 4) + 200 + 24);
                        //
                    }
                }
                // The Pause Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Pause Menu Containers
                pauseMenuRects.title();
                pauseMenuRects.option1();
                pauseMenuRects.option2();
                pauseMenuRects.option3();
                pauseMenuRects.option4();
                //
                break;
            case PM_STATES[1]:
                const changeBackgroundColorMenuRects = {
                    title: function() {

                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                changeBackgroundColorMenuRects.title();
                //
                break;
            case PM_STATES[2]:
                const playerStatsMenuRects = {
                    title: function() {

                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                playerStatsMenuRects.title();
                //
                break;
            case PM_STATES[3]:
                const otherOptionsMenuRects = {
                    title: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect(pauseMenuContainerX - 4, pauseMenuContainerY - 8, canvas.width - 32 + 8, 32 + 8);
                        //
                        // The Structure
                        ctx.fillStyle = secondaryBackgroundColor;
                        ctx.fillRect(pauseMenuContainerX, pauseMenuContainerY - 4, canvas.width - 32, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "bold 30px courier new, monospace";
                        ctx.fillText("OTHER OPTIONS", (canvas.width / 2) - (ctx.measureText("OTHER OPTIONS").width / 2), (pauseMenuContainerY - 4) + 24);
                        //
                    },
                    option1: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 50, (canvas.width - 32 + 8) - 8, (32 + 8));
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 50, (canvas.width - 32) - 8, (32));
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.OtherOptionsMenu[0]}:(${currentScreenSize}) New:(${PM_currentScreenSizeOption})`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.OtherOptionsMenu[0]}:(${currentScreenSize}) New:(${PM_currentScreenSizeOption})`).width / 2), (pauseMenuContainerY - 4) + 50 + 24);
                        //
                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                otherOptionsMenuRects.title();
                otherOptionsMenuRects.option1();
                //
                break;
            case PM_STATES[4]:
                const viewCreditsMenuRects = {
                    title: function() {

                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                viewCreditsMenuRects.title();
                //
                break;
        }
    }
}

pauseMenuKeys();