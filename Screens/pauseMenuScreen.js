"use strict";

import { allowKeys, STATES } from "./../index.js";
import { world } from "./gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

window.pauseMenuKeysAllowed = false;

const pauseMenuContainerX = 16;
const pauseMenuContainerY = 16;

let colorCreationOption = "Primary";
let colorCreationCurrentColor = "#000000";

export const PM_STATES = [
    "PauseMenu",
    "ChangeBackgroundColorMenu",
    "PlayerStatsMenu",
    "OtherOptionsMenu",
    "ViewCreditsMenu",
    "ColorCreationMenu",
    "ButtonOptionsMenu",
    "ScreenOptionsMenu",
];

export const PM_OPTIONS = {
    PauseMenu: ["Change Menu Background", "Stats", "Other Options", "View Credits"], // 0
    ChangeBackgroundColorMenu: ["Primary", "Secondary", "Button", "HighlightButton", "Border"], // 1
    PlayerStatsMenu: [], // 2
    OtherOptionsMenu: ["Current Screen", "Button Options", "Screen Options"], // 3
    ViewCreditsMenu: [], // 4
    ColorCreationMenu: ["Char1:", "Char2:", "Char3:", "Char4:", "Char5:", "Char6:", "Change Color"], // 5
    ButtonOptionsMenu: ["D-Pad", "Action Buttons"], // 6
    ScreenOptionsMenu: ["X Position", "Y Position", "Width", "Height"], // 7
    OtherOptions_ChangeScreenSize: [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2],
    ScreenOptions_XPosition: [30, 40, 50, 60, 70],
    ScreenOptions_YPosition: [30, 40, 50, 60, 70],
    ScreenOptions_Width: [480, 480 + (16 * 1), 480 + (16 * 2), 480 + (16 * 3), 480 + (16 * 4)],
    ScreenOptions_Height: [270, 270 + (16 * 1), 270 + (16 * 2), 270 + (16 * 3), 270 + (16 * 4)],
    ChangeBackgroundColor_PrimaryBackground: ["#101E6C", "#6B81C0", "#374D77", "#4B96AC", "#2B2B2B", "Random", "Create"],
    ChangeBackgroundColor_SecondaryBackground: ["#101E6C", "#6B81C0", "#374D77", "#4B96AC", "#2B2B2B", "Random", "Create"],
    ChangeBackgroundColor_Button: ["#101E6C", "#6B81C0", "#374D77", "#4B96AC", "#2B2B2B", "Random", "Create"],
    ChangeBackgroundColor_HighlightedButton: ["#101E6C", "#6B81C0", "#374D77", "#4B96AC", "#2B2B2B", "Random", "Create"],
    ChangeBackgroundColor_Border: ["#101E6C", "#6B81C0", "#374D77", "#4B96AC", "#2B2B2B", "Random", "Create"],
    ColorCreation_Char: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "E", "A", "D", "F", "C", "B"],
}

// In ChangeBackgroundColorMenu (Use A and D to navigate through options)
let primaryBackgroundColor = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[0];
let PM_currentPrimaryBackgroundColorOptionNumber = 0;
let PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];

let secondaryBackgroundColor = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[1];
let PM_currentSecondaryBackgroundColorOptionNumber = 0;
let PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];

let buttonColor = PM_OPTIONS.ChangeBackgroundColor_Button[2];
let PM_currentButtonColorOptionNumber = 0;
let PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];

let highlightedButtonColor = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[3];
let PM_currentHighlightedButtonColorOptionNumber = 0;
let PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];

let borderColor = PM_OPTIONS.ChangeBackgroundColor_Border[4];
let PM_currentBorderColorOptionNumber = 0;
let PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
//

// In ColorCreationMenu (Use A and D to navigate through options)
let currentColorKey1 = primaryBackgroundColor[1];
let PM_currentColorKey1OptionNumber = 0;
let PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];

let currentColorKey2 = primaryBackgroundColor[2];
let PM_currentColorKey2OptionNumber = 0;
let PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];

let currentColorKey3 = primaryBackgroundColor[3];
let PM_currentColorKey3OptionNumber = 0;
let PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];

let currentColorKey4 = primaryBackgroundColor[4];
let PM_currentColorKey4OptionNumber = 0;
let PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];

let currentColorKey5 = primaryBackgroundColor[5];
let PM_currentColorKey5OptionNumber = 0;
let PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];

let currentColorKey6 = primaryBackgroundColor[6];
let PM_currentColorKey6OptionNumber = 0;
let PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
//

// In OtherOptionsMenu (Use A and D to navigate through options)
let currentScreenSize = PM_OPTIONS.OtherOptions_ChangeScreenSize[3];
let PM_currentScreenSizeOptionNumber = 0;
let PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
//

// In ScreenOptionsMenu (Use A and D to navigate through options)
let currentScreenX = PM_OPTIONS.ScreenOptions_XPosition[2];
let PM_currentScreenXOptionNumber = 0;
let PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];

let currentScreenY = PM_OPTIONS.ScreenOptions_YPosition[2];
let PM_currentScreenYOptionNumber = 0;
let PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];

export let currentScreenWidth = PM_OPTIONS.ScreenOptions_Width[0];
let PM_currentScreenWidthOptionNumber = 0;
let PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];

export let currentScreenHeight = PM_OPTIONS.ScreenOptions_Height[0];
let PM_currentScreenHeightOptionNumber = 0;
let PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
//
 
let PM_currentStateNumber = 0;
let PM_currentOptionNumber = 0;
export let PM_currentState = PM_STATES[PM_currentStateNumber];
export let PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];

export function resetColorKeyOptions() {
    PM_currentColorKey1OptionNumber = 0;
    PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];

    PM_currentColorKey2OptionNumber = 0;
    PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];

    PM_currentColorKey3OptionNumber = 0;
    PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];

    PM_currentColorKey4OptionNumber = 0;
    PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];

    PM_currentColorKey5OptionNumber = 0;
    PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];

    PM_currentColorKey6OptionNumber = 0;
    PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
}

export function resetPauseMenuStates() {
    PM_currentStateNumber = 0;
    PM_currentOptionNumber = 0;
    PM_currentState = PM_STATES[PM_currentStateNumber];
    PM_currentOption = PM_OPTIONS.PauseMenu[PM_currentOptionNumber];
}

export function resetChangeBackgroundColorMenu() {
    PM_currentStateNumber = 1;
    PM_currentOptionNumber = 0;
    PM_currentState = PM_STATES[PM_currentStateNumber];
    PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
}

export function resetOtherOptionsMenuStates() {
    PM_currentStateNumber = 3;
    PM_currentOptionNumber = 0;
    PM_currentState = PM_STATES[PM_currentStateNumber];
    PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
}

function scaleCanvasSize(num) {
    canvas.style.transform = `translate(-50%, -50%) scale(${num})`;
}

function randomizeColor(element) {
    const charsForHexCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "E", "A", "D", "F", "C", "B"];
    let newHexCode = "#";
    for (let i = 0; i < 6; i++) {
        let colorChar = Math.floor((Math.random() * charsForHexCode.length));
        newHexCode += charsForHexCode[colorChar];
    }

    if (element === "primaryBackgroundColor") {primaryBackgroundColor = newHexCode;}
    else if (element === "secondaryBackgroundColor") {secondaryBackgroundColor = newHexCode;}
    else if (element === "buttonColor") {buttonColor = newHexCode;}
    else if (element === "highlightedButtonColor") {highlightedButtonColor = newHexCode;}
    else if (element === "borderColor") {borderColor = newHexCode;}
}

function realTimeColorBoxChange() {
    colorCreationCurrentColor = "#" + PM_currentColorKey1Option + PM_currentColorKey2Option + PM_currentColorKey3Option + PM_currentColorKey4Option + PM_currentColorKey5Option + PM_currentColorKey6Option;
    if (colorCreationOption === "Primary") {primaryBackgroundColor = colorCreationCurrentColor;}
    else if (colorCreationOption === "Secondary") {secondaryBackgroundColor = colorCreationCurrentColor;}
    else if (colorCreationOption === "Button") {buttonColor = colorCreationCurrentColor;}
    else if (colorCreationOption === "HighlightButton") {highlightedButtonColor = colorCreationCurrentColor;}
    else if (colorCreationOption === "Border") {borderColor = colorCreationCurrentColor;}
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
                        else if (PM_currentState === PM_STATES[1]) {
                            if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                                PM_currentOptionNumber = PM_OPTIONS.ChangeBackgroundColorMenu.length - 1;
                                PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber -= 1;
                                PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[2]) {
                            
                        }
                        else if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                                PM_currentOptionNumber = PM_OPTIONS.OtherOptionsMenu.length - 1;
                                PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber -= 1;
                                PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[4]) {
                            
                        }
                        else if (PM_currentState === PM_STATES[5]) {
                            if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[0]) {
                                PM_currentOptionNumber = PM_OPTIONS.ColorCreationMenu.length - 1;
                                PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber -= 1;
                                PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[6]) {
                            if (PM_currentOption === PM_OPTIONS.ButtonOptionsMenu[0]) {
                                PM_currentOptionNumber = PM_OPTIONS.ButtonOptionsMenu.length - 1;
                                PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber -= 1;
                                PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[7]) {
                            if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                                PM_currentOptionNumber = PM_OPTIONS.ScreenOptionsMenu.length - 1;
                                PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber -= 1;
                                PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
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
                        else if (PM_currentState === PM_STATES[1]) {
                            if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[PM_OPTIONS.ChangeBackgroundColorMenu.length - 1]) {
                                PM_currentOptionNumber = 0;
                                PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber += 1;
                                PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[2]) {
                            
                        }
                        else if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[PM_OPTIONS.OtherOptionsMenu.length - 1]) {
                                PM_currentOptionNumber = 0;
                                PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber += 1;
                                PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[4]) {
                            
                        }
                        else if (PM_currentState === PM_STATES[5]) {
                            if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[PM_OPTIONS.ColorCreationMenu.length - 1]) {
                                PM_currentOptionNumber = 0;
                                PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber += 1;
                                PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[6]) {
                            if (PM_currentOption === PM_OPTIONS.ButtonOptionsMenu[PM_OPTIONS.ButtonOptionsMenu.length - 1]) {
                                PM_currentOptionNumber = 0;
                                PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber += 1;
                                PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[7]) {
                            if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[PM_OPTIONS.ScreenOptionsMenu.length - 1]) {
                                PM_currentOptionNumber = 0;
                                PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
                            }
                            else {
                                PM_currentOptionNumber += 1;
                                PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
                            }
                        }
                        break;
                    }
                    break;
                case "KeyA":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.a.pressed = true;
                        if (PM_currentState === PM_STATES[1]) {
                            if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                                if (PM_currentPrimaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[0]) {
                                    PM_currentPrimaryBackgroundColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground.length - 1;
                                    PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                                }
                                else {
                                    PM_currentPrimaryBackgroundColorOptionNumber -= 1;
                                    PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[1]) {
                                if (PM_currentSecondaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[0]) {
                                    PM_currentSecondaryBackgroundColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground.length - 1;
                                    PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                                }
                                else {
                                    PM_currentSecondaryBackgroundColorOptionNumber -= 1;
                                    PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[2]) {
                                if (PM_currentButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_Button[0]) {
                                    PM_currentButtonColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_Button.length - 1;
                                    PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                                }
                                else {
                                    PM_currentButtonColorOptionNumber -= 1;
                                    PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[3]) {
                                if (PM_currentHighlightedButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[0]) {
                                    PM_currentHighlightedButtonColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton.length - 1;
                                    PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                                }
                                else {
                                    PM_currentHighlightedButtonColorOptionNumber -= 1;
                                    PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[4]) {
                                if (PM_currentBorderColorOption === PM_OPTIONS.ChangeBackgroundColor_Border[0]) {
                                    PM_currentBorderColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_Border.length - 1;
                                    PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                                }
                                else {
                                    PM_currentBorderColorOptionNumber -= 1;
                                    PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                                }
                            }
                        }
                        else if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                                if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[0]) {
                                    PM_currentScreenSizeOptionNumber = PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                }
                                else {
                                    PM_currentScreenSizeOptionNumber -= 1;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                }
                            }
                        }
                        else if (PM_currentState === PM_STATES[5]) {
                            if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[0]) {
                                if (PM_currentColorKey1Option === PM_OPTIONS.ColorCreation_Char[0]) {
                                    PM_currentColorKey1OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                                    PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                                }
                                else {
                                    PM_currentColorKey1OptionNumber -= 1;
                                    PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[1]) {
                                if (PM_currentColorKey2Option === PM_OPTIONS.ColorCreation_Char[0]) {
                                    PM_currentColorKey2OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                                    PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                                    console.log(PM_currentColorKey2Option);
                                }
                                else {
                                    PM_currentColorKey2OptionNumber -= 1;
                                    PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                                    console.log(PM_currentColorKey2Option);
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[2]) {
                                if (PM_currentColorKey3Option === PM_OPTIONS.ColorCreation_Char[0]) {
                                    PM_currentColorKey3OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                                    PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                                }
                                else {
                                    PM_currentColorKey3OptionNumber -= 1;
                                    PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[3]) {
                                if (PM_currentColorKey4Option === PM_OPTIONS.ColorCreation_Char[0]) {
                                    PM_currentColorKey4OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                                    PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                                }
                                else {
                                    PM_currentColorKey4OptionNumber -= 1;
                                    PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[4]) {
                                if (PM_currentColorKey5Option === PM_OPTIONS.ColorCreation_Char[0]) {
                                    PM_currentColorKey5OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                                    PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                                }
                                else {
                                    PM_currentColorKey5OptionNumber -= 1;
                                    PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[5]) {
                                if (PM_currentColorKey6Option === PM_OPTIONS.ColorCreation_Char[0]) {
                                    PM_currentColorKey6OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                                    PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                                }
                                else {
                                    PM_currentColorKey6OptionNumber -= 1;
                                    PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                                }
                            }
                        }
                        else if (PM_currentState === PM_STATES[7]) {
                            if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                                if (PM_currentScreenXOption === PM_OPTIONS.ScreenOptions_XPosition[0]) {
                                    PM_currentScreenXOptionNumber = PM_OPTIONS.ScreenOptions_XPosition.length - 1;
                                    PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                                }
                                else {
                                    PM_currentScreenXOptionNumber -= 1;
                                    PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[1]) {
                                if (PM_currentScreenYOption === PM_OPTIONS.ScreenOptions_YPosition[0]) {
                                    PM_currentScreenYOptionNumber = PM_OPTIONS.ScreenOptions_YPosition.length - 1;
                                    PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                                }
                                else {
                                    PM_currentScreenYOptionNumber -= 1;
                                    PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[2]) {
                                if (PM_currentScreenWidthOption === PM_OPTIONS.ScreenOptions_Width[0]) {
                                    PM_currentScreenWidthOptionNumber = PM_OPTIONS.ScreenOptions_Width.length - 1;
                                    PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                                }
                                else {
                                    PM_currentScreenWidthOptionNumber -= 1;
                                    PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[3]) {
                                if (PM_currentScreenHeightOption === PM_OPTIONS.ScreenOptions_Height[0]) {
                                    PM_currentScreenHeightOptionNumber = PM_OPTIONS.ScreenOptions_Height.length - 1;
                                    PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
                                }
                                else {
                                    PM_currentScreenHeightOptionNumber -= 1;
                                    PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
                                }
                            }
                        }
                        break;
                    }
                    break;
                case "KeyD":
                    if (gameCurrentState === STATES.PauseMenu) {
                        keyTracker.d.pressed = true;
                        if (PM_currentState === PM_STATES[1]) {
                            if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                                if (PM_currentPrimaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground.length - 1]) {
                                    PM_currentPrimaryBackgroundColorOptionNumber = 0;
                                    PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                                }
                                else {
                                    PM_currentPrimaryBackgroundColorOptionNumber += 1;
                                    PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[1]) {
                                if (PM_currentSecondaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground.length - 1]) {
                                    PM_currentSecondaryBackgroundColorOptionNumber = 0;
                                    PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                                }
                                else {
                                    PM_currentSecondaryBackgroundColorOptionNumber += 1;
                                    PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[2]) {
                                if (PM_currentButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_Button[PM_OPTIONS.ChangeBackgroundColor_Button.length - 1]) {
                                    PM_currentButtonColorOptionNumber = 0;
                                    PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                                }
                                else {
                                    PM_currentButtonColorOptionNumber += 1;
                                    PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[3]) {
                                if (PM_currentHighlightedButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_OPTIONS.ChangeBackgroundColor_HighlightedButton.length - 1]) {
                                    PM_currentHighlightedButtonColorOptionNumber = 0;
                                    PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                                }
                                else {
                                    PM_currentHighlightedButtonColorOptionNumber += 1;
                                    PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[4]) {
                                if (PM_currentBorderColorOption === PM_OPTIONS.ChangeBackgroundColor_Border[PM_OPTIONS.ChangeBackgroundColor_Border.length - 1]) {
                                    PM_currentBorderColorOptionNumber = 0;
                                    PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                                }
                                else {
                                    PM_currentBorderColorOptionNumber += 1;
                                    PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                                }
                            }
                        }
                        else if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                                if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1]) {
                                    PM_currentScreenSizeOptionNumber = 0;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                }
                                else {
                                    PM_currentScreenSizeOptionNumber += 1;
                                    PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                                }
                            }
                        }
                        else if (PM_currentState === PM_STATES[5]) {
                            if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[0]) {
                                if (PM_currentColorKey1Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                                    PM_currentColorKey1OptionNumber = 0;
                                    PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                                }
                                else {
                                    PM_currentColorKey1OptionNumber += 1;
                                    PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[1]) {
                                if (PM_currentColorKey2Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                                    PM_currentColorKey2OptionNumber = 0;
                                    PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                                }
                                else {
                                    PM_currentColorKey2OptionNumber += 1;
                                    PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[2]) {
                                if (PM_currentColorKey3Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                                    PM_currentColorKey3OptionNumber = 0;
                                    PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                                }
                                else {
                                    PM_currentColorKey3OptionNumber += 1;
                                    PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[3]) {
                                if (PM_currentColorKey4Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                                    PM_currentColorKey4OptionNumber = 0;
                                    PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                                }
                                else {
                                    PM_currentColorKey4OptionNumber += 1;
                                    PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[4]) {
                                if (PM_currentColorKey5Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                                    PM_currentColorKey5OptionNumber = 0;
                                    PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                                }
                                else {
                                    PM_currentColorKey5OptionNumber += 1;
                                    PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[5]) {
                                if (PM_currentColorKey6Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                                    PM_currentColorKey6OptionNumber = 0;
                                    PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                                }
                                else {
                                    PM_currentColorKey6OptionNumber += 1;
                                    PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                                }
                            }
                        }
                        else if (PM_currentState === PM_STATES[7]) {
                            if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                                if (PM_currentScreenXOption === PM_OPTIONS.ScreenOptions_XPosition[PM_OPTIONS.ScreenOptions_XPosition.length - 1]) {
                                    PM_currentScreenXOptionNumber = 0;
                                    PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                                }
                                else {
                                    PM_currentScreenXOptionNumber += 1;
                                    PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[1]) {
                                if (PM_currentScreenYOption === PM_OPTIONS.ScreenOptions_YPosition[PM_OPTIONS.ScreenOptions_YPosition.length - 1]) {
                                    PM_currentScreenYOptionNumber = 0;
                                    PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                                }
                                else {
                                    PM_currentScreenYOptionNumber += 1;
                                    PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[2]) {
                                if (PM_currentScreenWidthOption === PM_OPTIONS.ScreenOptions_Width[PM_OPTIONS.ScreenOptions_Width.length - 1]) {
                                    PM_currentScreenWidthOptionNumber = 0;
                                    PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                                }
                                else {
                                    PM_currentScreenWidthOptionNumber += 1;
                                    PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[3]) {
                                if (PM_currentScreenHeightOption === PM_OPTIONS.ScreenOptions_Height[PM_OPTIONS.ScreenOptions_Height.length - 1]) {
                                    PM_currentScreenHeightOptionNumber = 0;
                                    PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
                                }
                                else {
                                    PM_currentScreenHeightOptionNumber += 1;
                                    PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
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
                        else if (PM_currentState === PM_STATES[1]) {
                            if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                                if (PM_currentPrimaryBackgroundColorOption === "Random") {
                                    randomizeColor("primaryBackgroundColor");
                                }
                                else if (PM_currentPrimaryBackgroundColorOption === "Create") {
                                    colorCreationOption = "Primary";
                                    colorCreationCurrentColor = "#000000";
                                    resetColorKeyOptions();
                                    currentColorKey1 = primaryBackgroundColor[1];
                                    currentColorKey2 = primaryBackgroundColor[2];
                                    currentColorKey3 = primaryBackgroundColor[3];
                                    currentColorKey4 = primaryBackgroundColor[4];
                                    currentColorKey5 = primaryBackgroundColor[5];
                                    currentColorKey6 = primaryBackgroundColor[6];
                                    PM_currentStateNumber = 5;
                                    PM_currentOptionNumber = 0;
                                    PM_currentState = PM_STATES[PM_currentStateNumber];
                                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                                }
                                else {
                                    primaryBackgroundColor = PM_currentPrimaryBackgroundColorOption;
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[1]) {
                                if (PM_currentSecondaryBackgroundColorOption === "Random") {
                                    randomizeColor("secondaryBackgroundColor");
                                }
                                else if (PM_currentSecondaryBackgroundColorOption === "Create") {
                                    colorCreationOption = "Secondary";
                                    colorCreationCurrentColor = "#000000";
                                    resetColorKeyOptions();
                                    currentColorKey1 = secondaryBackgroundColor[1];
                                    currentColorKey2 = secondaryBackgroundColor[2];
                                    currentColorKey3 = secondaryBackgroundColor[3];
                                    currentColorKey4 = secondaryBackgroundColor[4];
                                    currentColorKey5 = secondaryBackgroundColor[5];
                                    currentColorKey6 = secondaryBackgroundColor[6];
                                    PM_currentStateNumber = 5;
                                    PM_currentOptionNumber = 0;
                                    PM_currentState = PM_STATES[PM_currentStateNumber];
                                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                                }
                                else {
                                    secondaryBackgroundColor = PM_currentSecondaryBackgroundColorOption;
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[2]) {
                                if (PM_currentButtonColorOption === "Random") {
                                    randomizeColor("buttonColor");
                                }
                                else if (PM_currentButtonColorOption === "Create") {
                                    colorCreationOption = "Button";
                                    colorCreationCurrentColor = "#000000";
                                    resetColorKeyOptions();
                                    currentColorKey1 = buttonColor[1];
                                    currentColorKey2 = buttonColor[2];
                                    currentColorKey3 = buttonColor[3];
                                    currentColorKey4 = buttonColor[4];
                                    currentColorKey5 = buttonColor[5];
                                    currentColorKey6 = buttonColor[6];
                                    PM_currentStateNumber = 5;
                                    PM_currentOptionNumber = 0;
                                    PM_currentState = PM_STATES[PM_currentStateNumber];
                                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                                }
                                else {
                                    buttonColor = PM_currentButtonColorOption;
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[3]) {
                                if (PM_currentHighlightedButtonColorOption === "Random") {
                                    randomizeColor("highlightedButtonColor");
                                }
                                else if (PM_currentHighlightedButtonColorOption === "Create") {
                                    colorCreationOption = "HighlightButton";
                                    colorCreationCurrentColor = "#000000";
                                    resetColorKeyOptions();
                                    currentColorKey1 = highlightedButtonColor[1];
                                    currentColorKey2 = highlightedButtonColor[2];
                                    currentColorKey3 = highlightedButtonColor[3];
                                    currentColorKey4 = highlightedButtonColor[4];
                                    currentColorKey5 = highlightedButtonColor[5];
                                    currentColorKey6 = highlightedButtonColor[6];
                                    PM_currentStateNumber = 5;
                                    PM_currentOptionNumber = 0;
                                    PM_currentState = PM_STATES[PM_currentStateNumber];
                                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                                }
                                else {
                                    highlightedButtonColor = PM_currentHighlightedButtonColorOption;
                                }
                            }
                            else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[4]) {
                                if (PM_currentBorderColorOption === "Random") {
                                    randomizeColor("borderColor");
                                }
                                else if (PM_currentBorderColorOption === "Create") {
                                    colorCreationOption = "Border";
                                    colorCreationCurrentColor = "#000000";
                                    resetColorKeyOptions();
                                    currentColorKey1 = borderColor[1];
                                    currentColorKey2 = borderColor[2];
                                    currentColorKey3 = borderColor[3];
                                    currentColorKey4 = borderColor[4];
                                    currentColorKey5 = borderColor[5];
                                    currentColorKey6 = borderColor[6];
                                    PM_currentStateNumber = 5;
                                    PM_currentOptionNumber = 0;
                                    PM_currentState = PM_STATES[PM_currentStateNumber];
                                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                                }
                                else {
                                    borderColor = PM_currentBorderColorOption;
                                }
                            }
                        }
                        else if (PM_currentState === PM_STATES[3]) {
                            if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                                currentScreenSize = PM_currentScreenSizeOption;
                                scaleCanvasSize(currentScreenSize);
                            }
                            else if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[1]) {
                                PM_currentStateNumber = 6;
                                PM_currentOptionNumber = 0;
                                PM_currentState = PM_STATES[PM_currentStateNumber];
                                PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                            }
                            else if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[2]) {
                                PM_currentStateNumber = 7;
                                PM_currentOptionNumber = 0;
                                PM_currentState = PM_STATES[PM_currentStateNumber];
                                PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
                            }
                        }
                        else if (PM_currentState === PM_STATES[5]) {
                            if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[6]) {
                                realTimeColorBoxChange();
                            }
                        }
                        else if (PM_currentState === PM_STATES[7]) {
                            if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                                currentScreenX = PM_currentScreenXOption;
                                canvas.style.left = `${currentScreenX}%`;
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[1]) {
                                currentScreenY = PM_currentScreenYOption;
                                canvas.style.top = `${currentScreenY}%`;
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[2]) {
                                currentScreenWidth = PM_currentScreenWidthOption;
                                canvas.width = currentScreenWidth;
                                world.playableCharacter.cameraBoundaryWidth = canvas.width / 2;
                                world.playableCharacter.pos.x += (currentScreenWidth - 480) - world.playableCharacter.width;
                            }
                            else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[3]) {
                                currentScreenHeight = PM_currentScreenHeightOption;
                                canvas.height = currentScreenHeight;
                                world.playableCharacter.cameraBoundaryHeight = canvas.height / 2;
                                world.playableCharacter.pos.y += (currentScreenHeight - 270) - world.playableCharacter.height;
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
                        else if (PM_currentState === PM_STATES[5]) {
                            resetChangeBackgroundColorMenu();
                        }
                        else if (PM_currentState === PM_STATES[6]) {
                            resetOtherOptionsMenuStates();
                        }
                        else if (PM_currentState === PM_STATES[7]) {
                            resetOtherOptionsMenuStates();
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
            else if (PM_currentState === PM_STATES[1]) {
                if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                    PM_currentOptionNumber = PM_OPTIONS.ChangeBackgroundColorMenu.length - 1;
                    PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber -= 1;
                    PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[2]) {
                
            }
            else if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                    PM_currentOptionNumber = PM_OPTIONS.OtherOptionsMenu.length - 1;
                    PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber -= 1;
                    PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[4]) {
                
            }
            else if (PM_currentState === PM_STATES[5]) {
                if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[0]) {
                    PM_currentOptionNumber = PM_OPTIONS.ColorCreationMenu.length - 1;
                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber -= 1;
                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[6]) {
                if (PM_currentOption === PM_OPTIONS.ButtonOptionsMenu[0]) {
                    PM_currentOptionNumber = PM_OPTIONS.ButtonOptionsMenu.length - 1;
                    PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber -= 1;
                    PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[7]) {
                if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                    PM_currentOptionNumber = PM_OPTIONS.ScreenOptionsMenu.length - 1;
                    PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber -= 1;
                    PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
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
            else if (PM_currentState === PM_STATES[1]) {
                if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[PM_OPTIONS.ChangeBackgroundColorMenu.length - 1]) {
                    PM_currentOptionNumber = 0;
                    PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber += 1;
                    PM_currentOption = PM_OPTIONS.ChangeBackgroundColorMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[2]) {
                
            }
            else if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[PM_OPTIONS.OtherOptionsMenu.length - 1]) {
                    PM_currentOptionNumber = 0;
                    PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber += 1;
                    PM_currentOption = PM_OPTIONS.OtherOptionsMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[4]) {
                
            }
            else if (PM_currentState === PM_STATES[5]) {
                if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[PM_OPTIONS.ColorCreationMenu.length - 1]) {
                    PM_currentOptionNumber = 0;
                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber += 1;
                    PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[6]) {
                if (PM_currentOption === PM_OPTIONS.ButtonOptionsMenu[PM_OPTIONS.ButtonOptionsMenu.length - 1]) {
                    PM_currentOptionNumber = 0;
                    PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber += 1;
                    PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[7]) {
                if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[PM_OPTIONS.ScreenOptionsMenu.length - 1]) {
                    PM_currentOptionNumber = 0;
                    PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
                }
                else {
                    PM_currentOptionNumber += 1;
                    PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
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
            if (PM_currentState === PM_STATES[1]) {
                if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                    if (PM_currentPrimaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[0]) {
                        PM_currentPrimaryBackgroundColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground.length - 1;
                        PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                    }
                    else {
                        PM_currentPrimaryBackgroundColorOptionNumber -= 1;
                        PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[1]) {
                    if (PM_currentSecondaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[0]) {
                        PM_currentSecondaryBackgroundColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground.length - 1;
                        PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                    }
                    else {
                        PM_currentSecondaryBackgroundColorOptionNumber -= 1;
                        PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[2]) {
                    if (PM_currentButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_Button[0]) {
                        PM_currentButtonColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_Button.length - 1;
                        PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                    }
                    else {
                        PM_currentButtonColorOptionNumber -= 1;
                        PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[3]) {
                    if (PM_currentHighlightedButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[0]) {
                        PM_currentHighlightedButtonColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton.length - 1;
                        PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                    }
                    else {
                        PM_currentHighlightedButtonColorOptionNumber -= 1;
                        PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[4]) {
                    if (PM_currentBorderColorOption === PM_OPTIONS.ChangeBackgroundColor_Border[0]) {
                        PM_currentBorderColorOptionNumber = PM_OPTIONS.ChangeBackgroundColor_Border.length - 1;
                        PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                    }
                    else {
                        PM_currentBorderColorOptionNumber -= 1;
                        PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                    }
                }
            }
            else if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                    if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[0]) {
                        PM_currentScreenSizeOptionNumber = PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                    }
                    else {
                        PM_currentScreenSizeOptionNumber -= 1;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                    }
                }
            }
            else if (PM_currentState === PM_STATES[5]) {
                if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[0]) {
                    if (PM_currentColorKey1Option === PM_OPTIONS.ColorCreation_Char[0]) {
                        PM_currentColorKey1OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                        PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                    }
                    else {
                        PM_currentColorKey1OptionNumber -= 1;
                        PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[1]) {
                    if (PM_currentColorKey2Option === PM_OPTIONS.ColorCreation_Char[0]) {
                        PM_currentColorKey2OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                        PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                        console.log(PM_currentColorKey2Option);
                    }
                    else {
                        PM_currentColorKey2OptionNumber -= 1;
                        PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                        console.log(PM_currentColorKey2Option);
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[2]) {
                    if (PM_currentColorKey3Option === PM_OPTIONS.ColorCreation_Char[0]) {
                        PM_currentColorKey3OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                        PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                    }
                    else {
                        PM_currentColorKey3OptionNumber -= 1;
                        PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[3]) {
                    if (PM_currentColorKey4Option === PM_OPTIONS.ColorCreation_Char[0]) {
                        PM_currentColorKey4OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                        PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                    }
                    else {
                        PM_currentColorKey4OptionNumber -= 1;
                        PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[4]) {
                    if (PM_currentColorKey5Option === PM_OPTIONS.ColorCreation_Char[0]) {
                        PM_currentColorKey5OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                        PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                    }
                    else {
                        PM_currentColorKey5OptionNumber -= 1;
                        PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[5]) {
                    if (PM_currentColorKey6Option === PM_OPTIONS.ColorCreation_Char[0]) {
                        PM_currentColorKey6OptionNumber = PM_OPTIONS.ColorCreation_Char.length - 1;
                        PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                    }
                    else {
                        PM_currentColorKey6OptionNumber -= 1;
                        PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                    }
                }
            }
            else if (PM_currentState === PM_STATES[7]) {
                if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                    if (PM_currentScreenXOption === PM_OPTIONS.ScreenOptions_XPosition[0]) {
                        PM_currentScreenXOptionNumber = PM_OPTIONS.ScreenOptions_XPosition.length - 1;
                        PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                    }
                    else {
                        PM_currentScreenXOptionNumber -= 1;
                        PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[1]) {
                    if (PM_currentScreenYOption === PM_OPTIONS.ScreenOptions_YPosition[0]) {
                        PM_currentScreenYOptionNumber = PM_OPTIONS.ScreenOptions_YPosition.length - 1;
                        PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                    }
                    else {
                        PM_currentScreenYOptionNumber -= 1;
                        PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[2]) {
                    if (PM_currentScreenWidthOption === PM_OPTIONS.ScreenOptions_Width[0]) {
                        PM_currentScreenWidthOptionNumber = PM_OPTIONS.ScreenOptions_Width.length - 1;
                        PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                    }
                    else {
                        PM_currentScreenWidthOptionNumber -= 1;
                        PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[3]) {
                    if (PM_currentScreenHeightOption === PM_OPTIONS.ScreenOptions_Height[0]) {
                        PM_currentScreenHeightOptionNumber = PM_OPTIONS.ScreenOptions_Height.length - 1;
                        PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
                    }
                    else {
                        PM_currentScreenHeightOptionNumber -= 1;
                        PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
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
            if (PM_currentState === PM_STATES[1]) {
                if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                    if (PM_currentPrimaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground.length - 1]) {
                        PM_currentPrimaryBackgroundColorOptionNumber = 0;
                        PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                    }
                    else {
                        PM_currentPrimaryBackgroundColorOptionNumber += 1;
                        PM_currentPrimaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_PrimaryBackground[PM_currentPrimaryBackgroundColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[1]) {
                    if (PM_currentSecondaryBackgroundColorOption === PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground.length - 1]) {
                        PM_currentSecondaryBackgroundColorOptionNumber = 0;
                        PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                    }
                    else {
                        PM_currentSecondaryBackgroundColorOptionNumber += 1;
                        PM_currentSecondaryBackgroundColorOption = PM_OPTIONS.ChangeBackgroundColor_SecondaryBackground[PM_currentSecondaryBackgroundColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[2]) {
                    if (PM_currentButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_Button[PM_OPTIONS.ChangeBackgroundColor_Button.length - 1]) {
                        PM_currentButtonColorOptionNumber = 0;
                        PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                    }
                    else {
                        PM_currentButtonColorOptionNumber += 1;
                        PM_currentButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_Button[PM_currentButtonColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[3]) {
                    if (PM_currentHighlightedButtonColorOption === PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_OPTIONS.ChangeBackgroundColor_HighlightedButton.length - 1]) {
                        PM_currentHighlightedButtonColorOptionNumber = 0;
                        PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                    }
                    else {
                        PM_currentHighlightedButtonColorOptionNumber += 1;
                        PM_currentHighlightedButtonColorOption = PM_OPTIONS.ChangeBackgroundColor_HighlightedButton[PM_currentHighlightedButtonColorOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[4]) {
                    if (PM_currentBorderColorOption === PM_OPTIONS.ChangeBackgroundColor_Border[PM_OPTIONS.ChangeBackgroundColor_Border.length - 1]) {
                        PM_currentBorderColorOptionNumber = 0;
                        PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                    }
                    else {
                        PM_currentBorderColorOptionNumber += 1;
                        PM_currentBorderColorOption = PM_OPTIONS.ChangeBackgroundColor_Border[PM_currentBorderColorOptionNumber];
                    }
                }
            }
            else if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                    if (PM_currentScreenSizeOption === PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_OPTIONS.OtherOptions_ChangeScreenSize.length - 1]) {
                        PM_currentScreenSizeOptionNumber = 0;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                    }
                    else {
                        PM_currentScreenSizeOptionNumber += 1;
                        PM_currentScreenSizeOption = PM_OPTIONS.OtherOptions_ChangeScreenSize[PM_currentScreenSizeOptionNumber];
                    }
                }
            }
            else if (PM_currentState === PM_STATES[5]) {
                if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[0]) {
                    if (PM_currentColorKey1Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                        PM_currentColorKey1OptionNumber = 0;
                        PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                    }
                    else {
                        PM_currentColorKey1OptionNumber += 1;
                        PM_currentColorKey1Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey1OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[1]) {
                    if (PM_currentColorKey2Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                        PM_currentColorKey2OptionNumber = 0;
                        PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                    }
                    else {
                        PM_currentColorKey2OptionNumber += 1;
                        PM_currentColorKey2Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey2OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[2]) {
                    if (PM_currentColorKey3Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                        PM_currentColorKey3OptionNumber = 0;
                        PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                    }
                    else {
                        PM_currentColorKey3OptionNumber += 1;
                        PM_currentColorKey3Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey3OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[3]) {
                    if (PM_currentColorKey4Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                        PM_currentColorKey4OptionNumber = 0;
                        PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                    }
                    else {
                        PM_currentColorKey4OptionNumber += 1;
                        PM_currentColorKey4Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey4OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[4]) {
                    if (PM_currentColorKey5Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                        PM_currentColorKey5OptionNumber = 0;
                        PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                    }
                    else {
                        PM_currentColorKey5OptionNumber += 1;
                        PM_currentColorKey5Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey5OptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[5]) {
                    if (PM_currentColorKey6Option === PM_OPTIONS.ColorCreation_Char[PM_OPTIONS.ColorCreation_Char.length - 1]) {
                        PM_currentColorKey6OptionNumber = 0;
                        PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                    }
                    else {
                        PM_currentColorKey6OptionNumber += 1;
                        PM_currentColorKey6Option = PM_OPTIONS.ColorCreation_Char[PM_currentColorKey6OptionNumber];
                    }
                }
            }
            else if (PM_currentState === PM_STATES[7]) {
                if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                    if (PM_currentScreenXOption === PM_OPTIONS.ScreenOptions_XPosition[PM_OPTIONS.ScreenOptions_XPosition.length - 1]) {
                        PM_currentScreenXOptionNumber = 0;
                        PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                    }
                    else {
                        PM_currentScreenXOptionNumber += 1;
                        PM_currentScreenXOption = PM_OPTIONS.ScreenOptions_XPosition[PM_currentScreenXOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[1]) {
                    if (PM_currentScreenYOption === PM_OPTIONS.ScreenOptions_YPosition[PM_OPTIONS.ScreenOptions_YPosition.length - 1]) {
                        PM_currentScreenYOptionNumber = 0;
                        PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                    }
                    else {
                        PM_currentScreenYOptionNumber += 1;
                        PM_currentScreenYOption = PM_OPTIONS.ScreenOptions_YPosition[PM_currentScreenYOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[2]) {
                    if (PM_currentScreenWidthOption === PM_OPTIONS.ScreenOptions_Width[PM_OPTIONS.ScreenOptions_Width.length - 1]) {
                        PM_currentScreenWidthOptionNumber = 0;
                        PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                    }
                    else {
                        PM_currentScreenWidthOptionNumber += 1;
                        PM_currentScreenWidthOption = PM_OPTIONS.ScreenOptions_Width[PM_currentScreenWidthOptionNumber];
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[3]) {
                    if (PM_currentScreenHeightOption === PM_OPTIONS.ScreenOptions_Height[PM_OPTIONS.ScreenOptions_Height.length - 1]) {
                        PM_currentScreenHeightOptionNumber = 0;
                        PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
                    }
                    else {
                        PM_currentScreenHeightOptionNumber += 1;
                        PM_currentScreenHeightOption = PM_OPTIONS.ScreenOptions_Height[PM_currentScreenHeightOptionNumber];
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
            else if (PM_currentState === PM_STATES[1]) {
                if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                    if (PM_currentPrimaryBackgroundColorOption === "Random") {
                        randomizeColor("primaryBackgroundColor");
                    }
                    else if (PM_currentPrimaryBackgroundColorOption === "Create") {
                        colorCreationOption = "Primary";
                        colorCreationCurrentColor = "#000000";
                        resetColorKeyOptions();
                        currentColorKey1 = primaryBackgroundColor[1];
                        currentColorKey2 = primaryBackgroundColor[2];
                        currentColorKey3 = primaryBackgroundColor[3];
                        currentColorKey4 = primaryBackgroundColor[4];
                        currentColorKey5 = primaryBackgroundColor[5];
                        currentColorKey6 = primaryBackgroundColor[6];
                        PM_currentStateNumber = 5;
                        PM_currentOptionNumber = 0;
                        PM_currentState = PM_STATES[PM_currentStateNumber];
                        PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                    }
                    else {
                        primaryBackgroundColor = PM_currentPrimaryBackgroundColorOption;
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[1]) {
                    if (PM_currentSecondaryBackgroundColorOption === "Random") {
                        randomizeColor("secondaryBackgroundColor");
                    }
                    else if (PM_currentSecondaryBackgroundColorOption === "Create") {
                        colorCreationOption = "Secondary";
                        colorCreationCurrentColor = "#000000";
                        resetColorKeyOptions();
                        currentColorKey1 = secondaryBackgroundColor[1];
                        currentColorKey2 = secondaryBackgroundColor[2];
                        currentColorKey3 = secondaryBackgroundColor[3];
                        currentColorKey4 = secondaryBackgroundColor[4];
                        currentColorKey5 = secondaryBackgroundColor[5];
                        currentColorKey6 = secondaryBackgroundColor[6];
                        PM_currentStateNumber = 5;
                        PM_currentOptionNumber = 0;
                        PM_currentState = PM_STATES[PM_currentStateNumber];
                        PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                    }
                    else {
                        secondaryBackgroundColor = PM_currentSecondaryBackgroundColorOption;
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[2]) {
                    if (PM_currentButtonColorOption === "Random") {
                        randomizeColor("buttonColor");
                    }
                    else if (PM_currentButtonColorOption === "Create") {
                        colorCreationOption = "Button";
                        colorCreationCurrentColor = "#000000";
                        resetColorKeyOptions();
                        currentColorKey1 = buttonColor[1];
                        currentColorKey2 = buttonColor[2];
                        currentColorKey3 = buttonColor[3];
                        currentColorKey4 = buttonColor[4];
                        currentColorKey5 = buttonColor[5];
                        currentColorKey6 = buttonColor[6];
                        PM_currentStateNumber = 5;
                        PM_currentOptionNumber = 0;
                        PM_currentState = PM_STATES[PM_currentStateNumber];
                        PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                    }
                    else {
                        buttonColor = PM_currentButtonColorOption;
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[3]) {
                    if (PM_currentHighlightedButtonColorOption === "Random") {
                        randomizeColor("highlightedButtonColor");
                    }
                    else if (PM_currentHighlightedButtonColorOption === "Create") {
                        colorCreationOption = "HighlightButton";
                        colorCreationCurrentColor = "#000000";
                        resetColorKeyOptions();
                        currentColorKey1 = highlightedButtonColor[1];
                        currentColorKey2 = highlightedButtonColor[2];
                        currentColorKey3 = highlightedButtonColor[3];
                        currentColorKey4 = highlightedButtonColor[4];
                        currentColorKey5 = highlightedButtonColor[5];
                        currentColorKey6 = highlightedButtonColor[6];
                        PM_currentStateNumber = 5;
                        PM_currentOptionNumber = 0;
                        PM_currentState = PM_STATES[PM_currentStateNumber];
                        PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                    }
                    else {
                        highlightedButtonColor = PM_currentHighlightedButtonColorOption;
                    }
                }
                else if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[4]) {
                    if (PM_currentBorderColorOption === "Random") {
                        randomizeColor("borderColor");
                    }
                    else if (PM_currentBorderColorOption === "Create") {
                        colorCreationOption = "Border";
                        colorCreationCurrentColor = "#000000";
                        resetColorKeyOptions();
                        currentColorKey1 = borderColor[1];
                        currentColorKey2 = borderColor[2];
                        currentColorKey3 = borderColor[3];
                        currentColorKey4 = borderColor[4];
                        currentColorKey5 = borderColor[5];
                        currentColorKey6 = borderColor[6];
                        PM_currentStateNumber = 5;
                        PM_currentOptionNumber = 0;
                        PM_currentState = PM_STATES[PM_currentStateNumber];
                        PM_currentOption = PM_OPTIONS.ColorCreationMenu[PM_currentOptionNumber];
                    }
                    else {
                        borderColor = PM_currentBorderColorOption;
                    }
                }
            }
            else if (PM_currentState === PM_STATES[3]) {
                if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[0]) {
                    currentScreenSize = PM_currentScreenSizeOption;
                    scaleCanvasSize(currentScreenSize);
                }
                else if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[1]) {
                    PM_currentStateNumber = 6;
                    PM_currentOptionNumber = 0;
                    PM_currentState = PM_STATES[PM_currentStateNumber];
                    PM_currentOption = PM_OPTIONS.ButtonOptionsMenu[PM_currentOptionNumber];
                }
                else if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[2]) {
                    PM_currentStateNumber = 7;
                    PM_currentOptionNumber = 0;
                    PM_currentState = PM_STATES[PM_currentStateNumber];
                    PM_currentOption = PM_OPTIONS.ScreenOptionsMenu[PM_currentOptionNumber];
                }
            }
            else if (PM_currentState === PM_STATES[5]) {
                if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[6]) {
                    realTimeColorBoxChange();
                }
            }
            else if (PM_currentState === PM_STATES[7]) {
                if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                    currentScreenX = PM_currentScreenXOption;
                    canvas.style.left = `${currentScreenX}%`;
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[1]) {
                    currentScreenY = PM_currentScreenYOption;
                    canvas.style.top = `${currentScreenY}%`;
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[2]) {
                    currentScreenWidth = PM_currentScreenWidthOption;
                    canvas.width = currentScreenWidth;
                    world.playableCharacter.cameraBoundaryWidth = canvas.width / 2;
                    world.playableCharacter.pos.x += (currentScreenWidth - 480) - world.playableCharacter.width;
                }
                else if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[3]) {
                    currentScreenHeight = PM_currentScreenHeightOption;
                    canvas.height = currentScreenHeight;
                    world.playableCharacter.cameraBoundaryHeight = canvas.height / 2;
                    world.playableCharacter.pos.y += (currentScreenHeight - 270) - world.playableCharacter.height;
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
            else if (PM_currentState === PM_STATES[5]) {
                resetChangeBackgroundColorMenu();
            }
            else if (PM_currentState === PM_STATES[6]) {
                resetOtherOptionsMenuStates();
            }
            else if (PM_currentState === PM_STATES[7]) {
                resetOtherOptionsMenuStates();
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
                        ctx.fillText("CHANGE BACKGROUND COLORS", (canvas.width / 2) - (ctx.measureText("CHANGE BACKGROUND COLORS").width / 2), (pauseMenuContainerY - 4) + 24);
                        //
                    },
                    option1: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 50, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[0]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 50, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "20px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ChangeBackgroundColorMenu[0]}:${primaryBackgroundColor} New:${PM_currentPrimaryBackgroundColorOption}`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ChangeBackgroundColorMenu[0]}:${primaryBackgroundColor} New:${PM_currentPrimaryBackgroundColorOption}`).width / 2), (pauseMenuContainerY - 4) + 24 + 50);
                        //
                    },
                    option2: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 92, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[1]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 92, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "20px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ChangeBackgroundColorMenu[1]}:${secondaryBackgroundColor} New:${PM_currentSecondaryBackgroundColorOption}`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ChangeBackgroundColorMenu[1]}:${secondaryBackgroundColor} New:${PM_currentSecondaryBackgroundColorOption}`).width / 2), (pauseMenuContainerY - 4) + 24 + 92);
                        //
                    },
                    option3: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 134, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[2]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 134, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "20px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ChangeBackgroundColorMenu[2]}:${buttonColor} New:${PM_currentButtonColorOption}`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ChangeBackgroundColorMenu[2]}:${buttonColor} New:${PM_currentButtonColorOption}`).width / 2), (pauseMenuContainerY - 4) + 24 + 134);
                        //
                    },
                    option4: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 176, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[3]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 176, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "20px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ChangeBackgroundColorMenu[3]}:${highlightedButtonColor} New:${PM_currentHighlightedButtonColorOption}`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ChangeBackgroundColorMenu[3]}:${highlightedButtonColor} New:${PM_currentHighlightedButtonColorOption}`).width / 2), (pauseMenuContainerY - 4) + 24 + 176);
                        //
                    },
                    option5: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 218, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ChangeBackgroundColorMenu[4]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 218, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "20px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ChangeBackgroundColorMenu[4]}:${borderColor} New:${PM_currentBorderColorOption}`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ChangeBackgroundColorMenu[4]}:${borderColor} New:${PM_currentBorderColorOption}`).width / 2), (pauseMenuContainerY - 4) + 24 + 218);
                        //
                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                changeBackgroundColorMenuRects.title();
                changeBackgroundColorMenuRects.option1();
                changeBackgroundColorMenuRects.option2();
                changeBackgroundColorMenuRects.option3();
                changeBackgroundColorMenuRects.option4();
                changeBackgroundColorMenuRects.option5();
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
                    },
                    option2: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 100, (canvas.width - 32 + 8) - 8, (32 + 8));
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[1]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 100, (canvas.width - 32) - 8, (32));
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.OtherOptionsMenu[1], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.OtherOptionsMenu[1]).width / 2), (pauseMenuContainerY - 4) + 100 + 24);
                        //
                    },
                    option3: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 150, (canvas.width - 32 + 8) - 8, (32 + 8));
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.OtherOptionsMenu[2]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 150, (canvas.width - 32) - 8, (32));
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.OtherOptionsMenu[2], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.OtherOptionsMenu[2]).width / 2), (pauseMenuContainerY - 4) + 150 + 24);
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
                otherOptionsMenuRects.option2();
                otherOptionsMenuRects.option3();
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
            case PM_STATES[5]:
                const colorCreationMenuRects = {
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
                        ctx.fillText(colorCreationOption, (canvas.width / 2) - (ctx.measureText(colorCreationOption).width / 2), (pauseMenuContainerY - 4) + 24);
                        //
                    },
                    option1: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 50, (canvas.width / 2) - 32 + 8 - 8, 24 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[0]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 50, (canvas.width / 2) - 32 - 8, 24);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ColorCreationMenu[0]} ${PM_currentColorKey1Option}`, (canvas.width / 4) - (ctx.measureText(`${PM_OPTIONS.ColorCreationMenu[0]} ${PM_currentColorKey1Option}`).width / 2), (pauseMenuContainerY - 4) + 20 + 50);
                        //
                    },
                    option2: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 85, (canvas.width / 2) - 32 + 8 - 8, 24 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[1]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 85, (canvas.width / 2) - 32 - 8, 24);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ColorCreationMenu[1]} ${PM_currentColorKey2Option}`, (canvas.width / 4) - (ctx.measureText(`${PM_OPTIONS.ColorCreationMenu[1]} ${PM_currentColorKey2Option}`).width / 2), (pauseMenuContainerY - 4) + 20 + 85);
                        //
                    },
                    option3: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 120, (canvas.width / 2) - 32 + 8 - 8, 24 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[2]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 120, (canvas.width / 2) - 32 - 8, 24);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ColorCreationMenu[2]} ${PM_currentColorKey3Option}`, (canvas.width / 4) - (ctx.measureText(`${PM_OPTIONS.ColorCreationMenu[2]} ${PM_currentColorKey3Option}`).width / 2), (pauseMenuContainerY - 4) + 20 + 120);
                        //
                    },
                    option4: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 155, (canvas.width / 2) - 32 + 8 - 8, 24 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[3]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 155, (canvas.width / 2) - 32 - 8, 24);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ColorCreationMenu[3]} ${PM_currentColorKey4Option}`, (canvas.width / 4) - (ctx.measureText(`${PM_OPTIONS.ColorCreationMenu[3]} ${PM_currentColorKey4Option}`).width / 2), (pauseMenuContainerY - 4) + 20 + 155);
                        //
                    },
                    option5: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 190, (canvas.width / 2) - 32 + 8 - 8, 24 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[4]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 190, (canvas.width / 2) - 32 - 8, 24);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ColorCreationMenu[4]} ${PM_currentColorKey5Option}`, (canvas.width / 4) - (ctx.measureText(`${PM_OPTIONS.ColorCreationMenu[4]} ${PM_currentColorKey5Option}`).width / 2), (pauseMenuContainerY - 4) + 20 + 190);
                        //
                    },
                    option6: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 225, (canvas.width / 2) - 32 + 8 - 8, 24 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[5]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 225, (canvas.width / 2) - 32 - 8, 24);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ColorCreationMenu[5]} ${PM_currentColorKey6Option}`, (canvas.width / 4) - (ctx.measureText(`${PM_OPTIONS.ColorCreationMenu[5]} ${PM_currentColorKey6Option}`).width / 2), (pauseMenuContainerY - 4) + 20 + 225);
                        //
                    },
                    container: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((canvas.width / 2) + (pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 50, (canvas.width / 2) - 32 + 8 - 8, 164 + 8);
                        //
                        // The Structure
                        ctx.fillStyle = "white";
                        ctx.fillRect((canvas.width / 2) + (pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 50, (canvas.width / 2) - 32 - 8, 164);
                        //
                        // Text
                        ctx.fillStyle = "black";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(colorCreationCurrentColor, (canvas.width / 4) - (ctx.measureText(colorCreationCurrentColor).width / 2) + (canvas.width / 2), (pauseMenuContainerY - 4) + 20 + 85);
                        //
                    },
                    colorBox: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((canvas.width / 2) + (pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 12) + 120, (canvas.width / 2) - 32 + 8 - 8, 48 + 16);
                        //
                        // The Structure
                        ctx.fillStyle = colorCreationCurrentColor;
                        ctx.fillRect((canvas.width / 2) + (pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 120, (canvas.width / 2) - 32 - 8, 48);
                        //
                    },
                    submitBox: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((canvas.width / 2) + (pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 225, (canvas.width / 2) - 32 + 8 - 8, 24 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ColorCreationMenu[6]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((canvas.width / 2) + (pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 225, (canvas.width / 2) - 32 - 8, 24);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.ColorCreationMenu[6], (canvas.width / 4) - (ctx.measureText(PM_OPTIONS.ColorCreationMenu[6]).width / 2) + (canvas.width / 2), (pauseMenuContainerY - 4) + 20 + 225);
                        //
                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                colorCreationMenuRects.title();
                colorCreationMenuRects.option1();
                colorCreationMenuRects.option2();
                colorCreationMenuRects.option3();
                colorCreationMenuRects.option4();
                colorCreationMenuRects.option5();
                colorCreationMenuRects.option6();
                colorCreationMenuRects.container();
                colorCreationMenuRects.colorBox();
                colorCreationMenuRects.submitBox();
                //
                break;
            case PM_STATES[6]:
                const buttonOptionsMenuRects = {
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
                        ctx.fillText("BUTTON OPTIONS", (canvas.width / 2) - (ctx.measureText("BUTTON OPTIONS").width / 2), (pauseMenuContainerY - 4) + 24);
                        //
                    },
                    option1: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 50, canvas.width - 32 + 8 - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ButtonOptionsMenu[0]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 50, canvas.width - 32 - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.ButtonOptionsMenu[0], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.ButtonOptionsMenu[0]).width / 2), (pauseMenuContainerY - 4) + 24 + 50);
                        //
                    },
                    option2: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 100, canvas.width - 32 + 8 - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ButtonOptionsMenu[1]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 100, canvas.width - 32 - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(PM_OPTIONS.ButtonOptionsMenu[1], (canvas.width / 2) - (ctx.measureText(PM_OPTIONS.ButtonOptionsMenu[1]).width / 2), (pauseMenuContainerY - 4) + 24 + 100);
                        //
                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                buttonOptionsMenuRects.title();
                buttonOptionsMenuRects.option1();
                buttonOptionsMenuRects.option2();
                //
                break;
            case PM_STATES[7]:
                const screenOptionsMenuRects = {
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
                        ctx.fillText("SCREEN OPTIONS", (canvas.width / 2) - (ctx.measureText("SCREEN OPTIONS").width / 2), (pauseMenuContainerY - 4) + 24);
                        //
                    },
                    option1: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 50, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[0]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 50, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ScreenOptionsMenu[0]}:(${currentScreenX}) New:(${PM_currentScreenXOption})`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ScreenOptionsMenu[0]}:(${currentScreenX}) New:(${PM_currentScreenXOption})`).width / 2), (pauseMenuContainerY - 4) + 24 + 50);
                        //
                    },
                    option2: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 100, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[1]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 100, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ScreenOptionsMenu[1]}:(${currentScreenY}) New:(${PM_currentScreenYOption})`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ScreenOptionsMenu[1]}:(${currentScreenY}) New:(${PM_currentScreenYOption})`).width / 2), (pauseMenuContainerY - 4) + 24 + 100);
                        //
                    },
                    option3: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 150, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[2]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 150, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ScreenOptionsMenu[2]}:(${currentScreenWidth}) New:(${PM_currentScreenWidthOption})`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ScreenOptionsMenu[2]}:(${currentScreenWidth}) New:(${PM_currentScreenWidthOption})`).width / 2), (pauseMenuContainerY - 4) + 24 + 150);
                        //
                    },
                    option4: function() {
                        // Borders
                        ctx.fillStyle = borderColor;
                        ctx.fillRect((pauseMenuContainerX - 4) + 4, (pauseMenuContainerY - 8) + 200, (canvas.width - 32 + 8) - 8, 32 + 8);
                        //
                        // The Structure
                        if (PM_currentOption === PM_OPTIONS.ScreenOptionsMenu[3]) {
                            ctx.fillStyle = highlightedButtonColor;
                        }
                        else {
                            ctx.fillStyle = buttonColor;
                        }
                        ctx.fillRect((pauseMenuContainerX) + 4, (pauseMenuContainerY - 4) + 200, (canvas.width - 32) - 8, 32);
                        //
                        // Text
                        ctx.fillStyle = "white";
                        ctx.font = "24px courier new, monospace";
                        ctx.fillText(`${PM_OPTIONS.ScreenOptionsMenu[3]}:(${currentScreenHeight}) New:(${PM_currentScreenHeightOption})`, (canvas.width / 2) - (ctx.measureText(`${PM_OPTIONS.ScreenOptionsMenu[3]}:(${currentScreenHeight}) New:(${PM_currentScreenHeightOption})`).width / 2), (pauseMenuContainerY - 4) + 24 + 200);
                        //
                    }
                }
                // The Change Background Color Menu Background
                ctx.fillStyle = primaryBackgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                // The Change BackgroundColor Menu Containers
                screenOptionsMenuRects.title();
                screenOptionsMenuRects.option1();
                screenOptionsMenuRects.option2();
                screenOptionsMenuRects.option3();
                screenOptionsMenuRects.option4();
                //
                break;
        }
    }
}

pauseMenuKeys();