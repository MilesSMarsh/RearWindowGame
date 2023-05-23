'use strict';

// game config
let config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    scene: [Play]
}

let game = new Phaser.Game(config);

const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;
let keyENTER = null;