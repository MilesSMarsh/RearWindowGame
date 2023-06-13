//Rear Window Game
//Made by Miles Marsh and Sean Rowley

'use strict';

// game config
let config = {
    type: Phaser.AUTO,
    parent: "game",
    pixelArt: true,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
    },
    scale : {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Title, Credits, Tutorial, RearWindow, Victory]
}

let game = new Phaser.Game(config);

//variable defenitions
let cursors = null;
let keyENTER = null;
let keySPACE = null;
let keyE = null;
let keyW = null;
let keyA = null;
let keyS = null;
let keyD = null;
let cameraLock = null;
let cameraZoomLock = null;
let nextLevelCheck1 = null;
let nextLevelCheck2 = null;
let nextLevelCheck3 = null;
let day_name = 'day1';