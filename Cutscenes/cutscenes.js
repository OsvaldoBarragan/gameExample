"use strict";

import {world, pathSteps} from "Screens/gameplayScreen.js";

export function cutscene1() {
    if (pathSteps <= 120) {
        pathSteps += 1;
        world.playableCharacter.pos.x -= 1;
        console.log(window.gameplayCutscene);
    }
    // else {
    //     console.log()
    // }
}

window.cutsceneFunctionContainer = ["hello"];
