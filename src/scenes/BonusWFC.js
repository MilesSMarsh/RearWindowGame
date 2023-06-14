class BonusWFC extends Phaser.Scene {
    constructor() {
        super("bonuswfcScene");
    }

    create() {
        //keybinds
        keyBACKSPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    update() {
        //moving to other scene
        if (Phaser.Input.Keyboard.JustDown(keyBACKSPACE)) {
          this.scene.start('titleScene');    
        }
      }
}