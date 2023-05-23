class Day3 extends Phaser.Scene {
    constructor() {
        super("day3Scene");
    }


    create() {

        console.log('day3scene');

        this.dudeVelocity = 500;
        cameraLock = false;
        cameraZoomLock = false;
        nextLevelCheck = false;

        // set up input
        cursors = this.input.keyboard.createCursorKeys();

        //this.add.image(0, 0, 'testMap').setOrigin(0, 0);
        this.add.image(0, 0, 'gradientBG').setOrigin(0);
        this.dude = this.physics.add.sprite(500, 500, 'dude');

        this.dude.body.setCollideWorldBounds(true);

        this.dummy = this.physics.add.staticGroup();
        this.dummy.create(150, 300, 'dude');

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.nextText = this.add.text(200, 200, 'Press E', menuConfig);
        this.nextText.setVisible(false);

        this.physics.add.overlap(this.dude, this.dummy, this.whatup2, null, this);

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.physics.world.bounds.setTo(0,0,3000,3000);
        this.cameras.main.setBounds(0, 0, 3000, 3000);
        this.cameras.main.setZoom(0.75);

        //this.cameras.main.startFollow(this.dude, true, 0.1, 0.1);
        this.cameras.main.startFollow(this.dude, true);
        //this.cameras.main.setDeadzone(200, 200);


    }

    update(){

        if (nextLevelCheck == true && Phaser.Input.Keyboard.JustDown(keyE)) {

            this.scene.start('night3Scene');    
          }

        // player input
        let dudeDirection = new Phaser.Math.Vector2();
        if(cursors.up.isDown && cameraLock == false) {
            dudeDirection.y = - 1;
        } else if (cursors.down.isDown && cameraLock == false) {
            dudeDirection.y = 1;
        }
        if(cursors.left.isDown && cameraLock == false) {
            dudeDirection.x = -1;
        } else if (cursors.right.isDown && cameraLock == false) {
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
            if (cameraZoomLock == false){
                this.cameras.main.zoomTo(.75, 1000, "Sine.easeInOut", false);
            }
        }
    }

    whatup(){
        if (cameraZoomLock == false){
            this.cameras.main.zoomTo(1.25, 1000, "Sine.easeInOut", false);
            //this.cameras.main.zoomTo(1.25, 1000);
        }
    }
    whatup2(){
        if (keyENTER.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            //this.cameras.main.zoomTo(1.25, 1000);
            cameraLock = true;
            cameraZoomLock = true;

            this.clock = this.time.delayedCall(5000, () => {
                cameraLock = false;
                cameraZoomLock = false;
                nextLevelCheck = true;
                this.nextText.setVisible(true);
            }, null, this);
        }
    }
}