class WFCTutorial extends Phaser.Scene {
    constructor() {
        super("wfctutorialScene");
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
        this.add.text(200, 200, 'Wave Function Collapse', menuConfig);
        this.add.text(100, 250, 'Press BackSpace to Start the Show Case', menuConfig);
        this.add.text(225, 300, 'When in the Show Case:', menuConfig);
        this.add.text(100, 350, 'Press ENTER to generate completely', menuConfig);
        this.add.text(100, 400, 'Press SPACE to generate tile by tile', smallConfig);
        this.add.text(100, 450, 'Press R to restart', menuConfig);
        this.add.text(100, 500, 'Press BACKSPACE to return to Title', menuConfig);
    

        //keybinds
        keyBACKSPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    update() {
        //moving to other scene
        if (Phaser.Input.Keyboard.JustDown(keyBACKSPACE)) {
          this.scene.start('bonuswfcScene');    
        }
      }
}