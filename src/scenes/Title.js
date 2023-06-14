class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
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
        let smallConfig = {
            fontFamily: 'Courier',
            fontSize: '23px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //adding text
        this.add.text(300, 200, 'Rear Window', menuConfig);
        this.add.text(225, 250, 'Press Space to Start', menuConfig);
        this.add.text(225, 300, 'Press Enter for Tutorial', menuConfig);
        this.add.text(225, 350, 'Press E for Credits', menuConfig);
        this.add.text(0, 400, 'Press BACKSPACE for Bonus Wave Function Collapse Show Case', smallConfig);
    

        //keybinds
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyBACKSPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    update() {
        //moving to other scenes
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('rearwindowScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
            this.scene.start('creditsScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('tutorialScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyBACKSPACE)) {
            this.scene.start('bonuswfcScene');    
        }
      }
}