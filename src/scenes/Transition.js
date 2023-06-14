class Transition extends Phaser.Scene {
    constructor() {
        super("transitionScene");
    }

    create() {
        //adding sound efffects
        this.scream = this.sound.add('scream');

        //creating the group
        this.background = this.physics.add.group();

        //if it's day one play the scream
        if (day_name == 'night1'){
            this.scream.play();
        }

        //if its a nightscene, then play the sunrise
        if (day_name == 'night1' || day_name == 'night2' || day_name == 'night3'){
            this.sunrise = this.background.create(0, 0, 'TransitionSpriteSheet').setOrigin(0);
            this.sunrise.anims.play('day_trans');
            this.sunrise.on('animationcomplete', this.transition, this);
        }

        //if its a dayscene then play the sunset
        if (day_name == 'day1' || day_name == 'day2' || day_name == 'day3'){
            this.sunset = this.background.create(0, 0, 'TransitionSpriteSheet').setOrigin(0);
            this.sunset.anims.play('night_trans');
            this.sunset.on('animationcomplete', this.transition, this);
        }
    }

    //function to call after animation is completed
    transition(){
        this.scene.start('rearwindowScene');
    }
}