import { PlayableCharacter } from "../Classes/playableCharacter.js";
import { Background } from "../Classes/background.js";
import { TilePlacer } from "../Classes/tilePlacer.js";

export const background = new Background({imgSrc: "Images/gameplayScreen/floorTiles/map6.png", x: 0, y: 0});
export const playableCharacter = new PlayableCharacter();
export const tilePlacements = [
    new TilePlacer({ xInstances: 10, yInstances: 5, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: 0, y: 0, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),

];