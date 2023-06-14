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

        this.load.image('tilesetImage', 'RearWindowTileSheet(32x32).png');
        this.load.tilemapTiledJSON('tilemapJSON', '/CitySkyline.json');

        this.load.image('testMan', 'Sprite-0001.png');

        this.load.spritesheet('killerSpriteSheet', 'KillerSpriteSheet.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('dogSpriteSheet', 'DogSpriteSheet.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('wifeSpriteSheet', 'WifeSpriteSheet.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('womanSpriteSheet', 'WomanSpriteSheet.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('TransitionSpriteSheet', 'transitionSpriteSheet.png', {frameWidth: 800, frameHeight: 600});
        this.load.spritesheet('ballerinaSpriteSheet', 'ballerinaSpriteSheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('menSpriteSheet', 'Men.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('pianoSpriteSheet', 'pianoSprite_sheet.png', {frameWidth: 64, frameHeight: 64});
        this.load.atlas('shortAnimAtlas', 'shortAnimAtlas.png', 'shortAnimAtlas.json')
        this.load.atlas('longAnimAtlas', 'longAnimAtlas.png', 'longAnimAtlas.json')
        this.load.image('pointer', 'pointer.png');
        this.load.image('back_color', 'back_color.png');
        this.load.image('fall', 'rearwindowfall.png');
        this.load.image('text_bubble', 'text.png');
        this.load.image('X', 'X.png');
        this.load.image('check', 'check.png');
        this.load.audio('camera_shutter', 'camera-shutter.mp3')
        this.load.audio('city_outdoor', 'city-traffic-outdoor.mp3')
        this.load.audio('rain', 'rain.mp3');
        this.load.audio('night', 'night.mp3')
        this.load.audio('scream', 'girl_scream.mp3');
        this.load.audio('rocket', 'large-rocket-engine.mp3')
        this.load.audio('piano', 'piano.mp3')

    }

    create() {
        //animations
        this.anims.create({
            key: 'day_trans',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('TransitionSpriteSheet', {start: 0, end: 4}),
        });
        this.anims.create({
            key: 'night_trans',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('TransitionSpriteSheet', {start: 5, end: 9}),
        });
        this.anims.create({
            key: 'man_looks',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('killerSpriteSheet', {start: 13, end: 20}),
            repeat: -1
        });
        this.anims.create({
            key: 'man_idle',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('killerSpriteSheet', {start: 0, end: 0}),
            repeat: -1
        });
        this.anims.create({
            key: 'man_phone',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('killerSpriteSheet', {start: 1, end: 2}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'man_suitcase',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('killerSpriteSheet', {start: 3, end: 6}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'man_suitcase_idle',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('killerSpriteSheet', {start: 6, end: 6}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'man_smoking',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('killerSpriteSheet', {start: 7, end: 9}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'dog_basket',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('dogSpriteSheet', {start: 33, end: 34}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'dog_lower',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('dogSpriteSheet', {start: 28, end: 44}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'dog_dig',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('dogSpriteSheet', {start: 5, end: 22}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'dog_idle',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('dogSpriteSheet', {start: 0, end: 3}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'dog_dead',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('dogSpriteSheet', {start: 45, end: 45}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'wife_idle',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('wifeSpriteSheet', {start: 0, end: 3}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'woman_idle',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('womanSpriteSheet', {start: 0, end: 2}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'woman_dig',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('womanSpriteSheet', {start: 3, end: 4}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'ballerina_bounce',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('ballerinaSpriteSheet', {start: 0, end: 5}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'ballerina_spin',
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('ballerinaSpriteSheet', {start: 6, end: 13}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'ballerina_spin_fast',
            frameRate: 400,
            frames: this.anims.generateFrameNumbers('ballerinaSpriteSheet', {start: 6, end: 13}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'man3',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('menSpriteSheet', {start: 2, end: 2}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'man1',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('menSpriteSheet', {start: 0, end: 0}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'man2',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('menSpriteSheet', {start: 1, end: 1}),
            
            repeat: -1
        });
        this.anims.create({
            key: 'piano_play',
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('pianoSpriteSheet', {start: 0, end: 1}),
            
            repeat: -1
        });

        this.anims.create({
            key: 'shortAnim',
            frameRate: 2,
            frames: this.anims.generateFrameNames('shortAnimAtlas', {
                prefix: "person",
                suffix: ".png",
                start: 1,
                end: 2,
            }),
            repeat: -1
        });

        this.anims.create({
            key: 'longAnim',
            frameRate: 4,
            frames: this.anims.generateFrameNames('longAnimAtlas', {
                prefix: "person",
                suffix: ".png",
                start: 1,
                end: 4,
            }),
            repeat: -1
        });

        // go to Title scene
        this.scene.start('titleScene');
    }
}