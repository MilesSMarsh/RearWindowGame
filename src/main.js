//Rear Window
//Made by Miles Marsh and Sean Rowley
//The five major components of phaser that we used were 
//1. The physics systems, to work on moving around and doing collions
//2. Text Objects, to Show the Credits, Tutorial, and text bubbles in game
//3. The Animation Manager, which we used to show all the animations throughout the game
//4. Tilemaps, which we used to create the backdrop of the entire game
//5. Cameras, which we used to follow the pointer around and lock onto and move to view important events

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
    scene: [Load, Title, Credits, Tutorial, WFCTutorial, BonusWFC, RearWindow, Transition, Victory]
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
let keyBACKSPACE = null;
let cameraLock = null;
let cameraZoomLock = null;
let nextLevelCheck1 = null;
let nextLevelCheck2 = null;
let nextLevelCheck3 = null;
let day_name = 'day1';