class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //adding text
        this.add.text(0, 50, 'Tutorial:', menuConfig);
        this.add.text(0, 150, 'Use Arrow Keys or WASD to move', menuConfig);
        this.add.text(0, 200, 'Hold (HOLD!!!) (REALLY HOLD IT!!!) the E or', menuConfig);
        this.add.text(0, 250, 'Enter key to zoom in with your camera', menuConfig);
        this.add.text(0, 300, 'Move the camera around and look for points of', menuConfig);
        this.add.text(0, 350, 'interest', menuConfig);
        this.add.text(0, 400, 'Zoom in on the points of interest and you can', menuConfig);
        this.add.text(0, 450, 'progress', menuConfig);
        this.add.text(100, 570, 'Press Space to Return to Title', menuConfig);
    

        //keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //moving to other scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('titleScene');    
        }
      }
}