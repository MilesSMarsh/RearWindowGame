class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('gradientBG', 'gradientBG.png');
        this.load.image('dude', 'dude.png');
    }

    create() {

        this.dudeVelocity = 500;

        // set up input
        cursors = this.input.keyboard.createCursorKeys();

        this.add.image(0, 0, 'gradientBG').setOrigin(0);
        this.dude = this.physics.add.sprite(100, 100, 'dude').setRandomPosition(200, 200, 2800, 2800);

        this.dude.body.setCollideWorldBounds(true);

        this.dummy = this.physics.add.staticGroup();
        this.dummy.create(150, 300, 'dude');

        this.physics.add.overlap(this.dude, this.dummy, this.whatup2, null, this);


        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.cameras.main.setBounds(0, 0, 3000, 3000);
        this.cameras.main.setZoom(0.75);

        this.cameras.main.startFollow(this.dude, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(200, 200);


    }

    update(){

        // player input
        let dudeDirection = new Phaser.Math.Vector2();
        if(cursors.up.isDown) {
            dudeDirection.y = - 1;
        } else if (cursors.down.isDown) {
            dudeDirection.y = 1;
        }
        if(cursors.left.isDown) {
            dudeDirection.x = -1;
        } else if (cursors.right.isDown) {
            dudeDirection.x = 1;
        } 
        dudeDirection.normalize();
        this.dude.setVelocity(this.dudeVelocity * dudeDirection.x, this.dudeVelocity * dudeDirection.y);

        if (keyENTER.isDown)
        {
            //console.log("howdy");
            this.whatup();
        }
        else{
            this.cameras.main.zoomTo(.75, 1000, "Sine.easeInOut", false);
        }
    }

    whatup(){
        this.cameras.main.zoomTo(1.25, 1000, "Sine.easeInOut", false);
        //this.cameras.main.zoomTo(1.25, 1000);
    }
    whatup2(){
        if (keyENTER.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            //this.cameras.main.zoomTo(1.25, 1000);
        }
    }
}