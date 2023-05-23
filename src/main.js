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
        arcade: {
            //debug: true
        }
    },
    scene: [Load, Title, Day1, Night1 ,Day2, Night2, Day3, Night3]
}

let game = new Phaser.Game(config);

const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;
let keyENTER = null;
let keyE = null;
let cameraLock = null;
let cameraZoomLock = null;
let nextLevelCheck = null;