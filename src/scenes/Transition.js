class Transition extends Phaser.Scene {
    constructor() {
        super("transitionScene");
    }

    create() {
        this.background = this.physics.add.group();

        if (day_name == 'night1' || day_name == 'night2' || day_name == 'night3'){
            this.sunrise = this.background.create(0, 0, 'TransitionSpriteSheet').setOrigin(0);
            this.sunrise.anims.play('day_trans');
            this.sunrise.on('animationcomplete', this.transition, this);
        }
        if (day_name == 'day1' || day_name == 'day2' || day_name == 'day3'){
            this.sunset = this.background.create(0, 0, 'TransitionSpriteSheet').setOrigin(0);
            this.sunset.anims.play('night_trans');
            this.sunset.on('animationcomplete', this.transition, this);
        }
    }

    update() {
      }

      transition(){
        this.scene.start('rearwindowScene');
      }
}