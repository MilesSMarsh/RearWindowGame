class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScene");
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //add image
        this.add.image(0, 0, 'fall').setOrigin(0, 0).setScale(.5);

        //adding text
        this.add.text(300, 200, 'Congratulations!!', menuConfig);
        this.add.text(225, 250, 'Press Space to return to Title', menuConfig)
    

        //keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        //moving to other scenes
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('titleScene');    
        }
      }
}