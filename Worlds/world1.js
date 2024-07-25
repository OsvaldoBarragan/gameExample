import { PlayableCharacter } from "../Classes/playableCharacter.js";
import { Background } from "../Classes/background.js";
import { TilePlacer } from "../Classes/tilePlacer.js";
import { Building } from "../Classes/building.js";
import { LightSource } from "../Classes/lightSource.js";
import { TheLights } from "../Classes/theLight.js";

export const background = new Background({imgSrc: "Images/gameplayScreen/floorTiles/map8.png", x: 0, y: 0});
export const playableCharacter = new PlayableCharacter({x: 256, y: 200});
export const tilePlacements = [
    new TilePlacer({ xInstances: 14, yInstances: 3, separationWidth: 0, separationHeight: 0, 
        imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: 0, y: 0, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
    new TilePlacer({ xInstances: 4, yInstances: 15, separationWidth: 0, separationHeight: 0, 
            imgSrc: "Images/gameplayScreen/tileSets/water2.png", x: 0, y: 0, cols: 11, rows: 1, totalFrames: 11, typeOf: "Water"}),
];
export const buildings = [
    // new Building({imgSrc: "Images/gameplayScreen/buildings/house2.png", x: 320, y: 160, xInstances: 1, yInstances: 2, separationWidth: 64, separationHeight: 128, cols: 1, rows: 2, shadowMultiplier: 1.75}),
];
export const lightSources = [
    new LightSource({imgSrc: "Images/gameplayScreen/lightSources/lightpost1.png", x: 320, y: 160, xInstances: 4, yInstances: 1, xBoundary: 0, yBoundary: 32, separationWidth: 64, separationHeight: 64, cols: 2, rows: 2, shadowMultiplier: 1.5}),
    // new LightSource({imgSrc: "Images/gameplayScreen/lightSources/lightpost1.png", x: 320, y: 272, xInstances: 2, yInstances: 1, xBoundary: 0, yBoundary: 32, separationWidth: 64, separationHeight: 64, cols: 2, rows: 2, shadowMultiplier: 1.5}),
];

export const theLights = [
    new TheLights({x: 288, y: 224, width: 96, height: 64, xInstances: 1, yInstances: 1, separationWidth: 0, separationHeight: 0}),
];