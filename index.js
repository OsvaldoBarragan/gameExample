"use strict";

import { runGameplayScreen } from "./Screens/gameplayScreen.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

console.log(screen.width);
console.log(screen.height);

export let allowKeys = true;

export const STATES = {
    MainMenu: 0,
    PauseMenu: 1,
    Gameplay: 2,
    TitleScreen: 3
};

export let gameCurrentState = STATES.Gameplay;

function resetCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Checks if screen is landscape or portrait mode
if (screen.width >= screen.height) {
    console.log("Landscape");
    document.getElementById("gameBackground").style.display = "block";
    document.getElementById("game").style.display = "block";
    document.getElementById("warningToUser").style.display = "none";
}
else {
    console.log("Portrait");
    document.getElementById("gameBackground").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("warningToUser").style.display = "block";
}
//

// Keeps track of whether screen orientation is changing
screen.orientation.addEventListener("change", () => {
    if (screen.width >= screen.height) {
        console.log("Landscape");
        document.getElementById("gameBackground").style.display = "block";
        document.getElementById("game").style.display = "block";
        document.getElementById("warningToUser").style.display = "none";
    }
    else {
        console.log("Portrait");
        document.getElementById("gameBackground").style.display = "none";
        document.getElementById("game").style.display = "none";
        document.getElementById("warningToUser").style.display = "block";
    }
})
//

export function animate() {
    switch(gameCurrentState) {
        case STATES.MainMenu:
            allowKeys = true;
            requestAnimationFrame(animate);
            resetCanvas();
            runMainMenuScreen();
            break;
        case STATES.PauseMenu:
            allowKeys = true;
            requestAnimationFrame(animate);
            resetCanvas();
            runPauseMenuScreen();
            break;
        case STATES.Gameplay:
            allowKeys = true;
            requestAnimationFrame(animate);
            resetCanvas();
            runGameplayScreen();
            break;
        case STATES.TitleScreen:
            allowKeys = true;
            requestAnimationFrame(animate);
            resetCanvas();
            runTitleScreen();
            break;
    }
}

window.onload = (event) => {
    animate();
}