class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, 125, 750 * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        //loading all the assets
        this.load.path = "assets/";
        this.load.atlas('shortAnimAtlas', 'shortAnimAtlas.png', 'shortAnimAtlas.json')
        this.load.atlas('longAnimAtlas', 'longAnimAtlas.png', 'longAnimAtlas.json')
        this.load.image('pointer', 'pointer.png');
        this.load.image('background', 'background.png');
        this.load.image('text_bubble', 'text.png');
        this.load.image('person', 'person.png');
        this.load.image('X', 'X.png');
        this.load.image('check', 'check.png');
        this.load.audio('camera_shutter', 'camera-shutter.mp3')
        this.load.audio('city_outdoor', 'city-traffic-outdoor.mp3')

    }

    create() {
        // go to Title scene
        this.scene.start('titleScene');
    }
}