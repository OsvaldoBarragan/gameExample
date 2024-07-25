import { PlayableCharacter } from "../Classes/playableCharacter.js";
import { Background } from "../Classes/background.js";
import { TilePlacer } from "../Classes/tilePlacer.js";
import { Building } from "../Classes/building.js";
import { LightSource } from "../Classes/lightSource.js";

export const background = new Background({imgSrc: "Images/gameplayScreen/floorTiles/map9.png", x: 0, y: 0});
export const playableCharacter = new PlayableCharacter({x: 256, y: 128});
export const tilePlacements = [
    new TilePlacer({ xInstances: 12.5, yInstances: 3, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: 0, y: 0, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
    new TilePlacer({ xInstances: 2, yInstances: 8, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: -32, y: 0, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
    new TilePlacer({ xInstances: 3, yInstances: 8, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: 672, y: 0, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
    new TilePlacer({ xInstances: 2, yInstances: 8, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: -32, y: 384, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
    new TilePlacer({ xInstances: 2, yInstances: 8, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: 672, y: 384, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
    new TilePlacer({ xInstances: 13, yInstances: 3, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: -32, y: 544, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
];
export const buildings = [
];
export const lightSources = [
];