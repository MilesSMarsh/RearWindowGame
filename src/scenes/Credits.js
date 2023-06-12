class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //adding text
        this.add.text(100, 100, 'By Miles Marsh and Sean Rowley', menuConfig);
        this.add.text(0, 200, 'Sound Effects from Pixabay:', menuConfig);
        this.add.text(0, 225, 'City Traffic (Outdoor) by Pixabay', menuConfig);
        this.add.text(0, 250, 'https://pixabay.com/sound-effects/city-traffic-outdoor-6414/', menuConfig);
        this.add.text(0, 300, 'Camera Shutter by 25347980', menuConfig);
        this.add.text(0, 325, 'https://pixabay.com/sound-effects/camera-shutter-18399/', menuConfig);
        this.add.text(0, 375, 'Night Ambience by Pixabay', menuConfig);
        this.add.text(0, 400, 'https://pixabay.com/sound-effects/night-ambience-17064/', menuConfig);
        this.add.text(0, 450, 'Soft Rain Ambient by SoundsForYou', menuConfig);
        this.add.text(0, 475, 'https://pixabay.com/sound-effects/soft-rain-ambient-111154/', menuConfig);
        this.add.text(100, 570, 'Press Space to Return to Title', menuConfig);

        //keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //move to next scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('titleScene');    
        }
      }
}