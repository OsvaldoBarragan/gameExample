"use strict";

import { runGameplayScreen, gameplayKeys } from "./Screens/gameplayScreen.js";
import { runPauseMenuScreen, pauseMenuKeys } from "./Screens/pauseMenuScreen.js";

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

window.gameCurrentState = STATES.PauseMenu;

function resetCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Keeps track of whether screen orientation is changing
screen.orientation.addEventListener("change", () => {
    if (screen.width >= screen.height) {
        console.log("Landscape");
        document.getElementById("gameBackground").style.display = "block";
        document.getElementById("game").style.display = "block";
    }
    else {
        console.log("Portrait");
        document.getElementById("gameBackground").style.display = "block";
        document.getElementById("game").style.display = "block";
    }
})
//

export function animate() {
    pauseMenuKeysAllowed = false;
    gameplayKeysAllowed = false;
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