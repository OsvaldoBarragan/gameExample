import { PlayableCharacter } from "../Classes/playableCharacter.js";
import { Background } from "../Classes/background.js";
import { TilePlacer } from "../Classes/tilePlacer.js";

export const background = new Background({imgSrc: "Images/gameplayScreen/floorTiles/map6.png", x: 0, y: 0});
export const playableCharacter = new PlayableCharacter();
export const tilePlacements = [];

function drawTilePlacer(arr, functionRows, functionColumns, separationWidth, separationHeight, img, imgW, imgH, x, y, cols, rows, totalFrames, typeOf) {
    let posX = x;
    let posY = y;
    for (let i = 0; i < functionColumns; i++) {
        for (let j = 0; j < functionRows; j++) {
            if (arr === tilePlacements) {
                arr.push(new TilePlacer({ imgSrc: img, x: posX, y: posY, cols: cols, rows: rows, totalFrames: totalFrames, typeOf: typeOf }));
            }
            posX += (imgW + separationWidth);
        }
        posY += imgH + separationHeight;
        posX = x;
    }
};

drawTilePlacer(tilePlacements, 5, 4, 0, 0, "Images/gameplayScreen/tileSets/water2.png", 32, 32, 64, 32, 8, 1, 8, "Water");