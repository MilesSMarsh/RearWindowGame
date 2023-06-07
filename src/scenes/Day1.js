class Day1 extends Phaser.Scene {
    constructor() {
        super("day1Scene");
    }

    create() {

        console.log('day1scene');

        //set up variables
        cameraLock = false;
        cameraZoomLock = false;
        nextLevelCheck1 = false;
        nextLevelCheck2 = false;
        nextLevelCheck3 = false;

        //set up all the keybinds
        cursors = this.input.keyboard.createCursorKeys();
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //add background
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        //create the people in the group
        this.person1 = this.physics.add.staticGroup();
        this.person1.create(1050, 550, 'person');

        //add the invisible text bubble
        this.text_bubble = this.add.image(50, 100, 'text_bubble').setOrigin(0, 0);
        this.text_bubble.setScrollFactor(0); //this makes it so it stays in place on the camera
        this.text_bubble.setVisible(false);

        //create the pointer
        this.pointer = this.physics.add.sprite(500, 500, 'pointer');
        this.pointer.body.setCollideWorldBounds(true);
        this.physics.world.bounds.setTo(70,30,1760,1030); //all these numbers are weird so that the pointer stays in the middle of the sceen at all times
        
        //do camera stuff
        this.cameras.main.setBounds(-500, -500, 3520, 2580); //down here too
        this.cameras.main.setZoom(0.75);
        this.cameras.main.startFollow(this.pointer, true);

        //create the icons in the top left 
        this.firstXIcon = this.add.image(0, 0, 'X').setOrigin(0, 0.5);
        this.firstXIcon.setScrollFactor(0);     
        
        this.firstCheckIcon = this.add.image(0, 0, 'check').setOrigin(0, 0.5);
        this.firstCheckIcon.setScrollFactor(0);     
        this.firstCheckIcon.setVisible(false);

        this.secondXIcon = this.add.image(50, 0, 'X').setOrigin(0, 0.5);
        this.secondXIcon.setScrollFactor(0); 
        
        this.secondCheckIcon = this.add.image(50, 0, 'check').setOrigin(0, 0.5);
        this.secondCheckIcon.setScrollFactor(0);     
        this.secondCheckIcon.setVisible(false);

        this.thirdXIcon = this.add.image(100, 0, 'X').setOrigin(0, 0.5);
        this.thirdXIcon.setScrollFactor(0);
        
        this.thirdCheckIcon = this.add.image(100, 0, 'check').setOrigin(0, 0.5);
        this.thirdCheckIcon.setScrollFactor(0);     
        this.thirdCheckIcon.setVisible(false);

        //where overlap is called
        this.physics.add.overlap(this.pointer, this.person1, this.firstThingViewed, null, this);
    }

    update(){

        //move to next level
        if (nextLevelCheck1 == true && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('titleScene'); //just for playtest, in the real game it'll go to night1
        }

        //movement
        let pointerDirection = new Phaser.Math.Vector2();
        if((cursors.up.isDown && cameraLock == false) || (keyW.isDown && cameraLock == false)) {
            pointerDirection.y = - 1;
        } else if ((cursors.down.isDown && cameraLock == false) || (keyS.isDown && cameraLock == false)) {
            pointerDirection.y = 1;
        }
        if((cursors.left.isDown && cameraLock == false) || (keyA.isDown && cameraLock == false)) {
            pointerDirection.x = -1;
        } else if ((cursors.right.isDown && cameraLock == false) || (keyD.isDown && cameraLock == false)) {
            pointerDirection.x = 1;
        }

        //movement math stuff
        this.pointerVelocity = 500;
        pointerDirection.normalize();
        this.pointer.setVelocity(this.pointerVelocity * pointerDirection.x, this.pointerVelocity * pointerDirection.y);

        //zoom
        if (keyENTER.isDown || keyE.isDown)
        {
            this.zoom();
        }
        //making sure the player zooms out after the zoom has commenced
        else{
            if (cameraZoomLock == false){
                this.cameras.main.zoomTo(.75, 1000, "Sine.easeInOut", false);
            }
        }
    }

    //zoom function
    zoom(){
        if (cameraZoomLock == false){
            this.cameras.main.zoomTo(1.25, 1000, "Sine.easeInOut", false);
        }
    }

    //functions to zoom in more and play the animations
    firstThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            cameraLock = true;
            cameraZoomLock = true;

            this.clock = this.time.delayedCall(5000, () => {
                cameraLock = false;
                cameraZoomLock = false;
                nextLevelCheck1 = true;
                this.firstXIcon.setVisible(false);
                this.firstCheckIcon.setVisible(true);
                this.text_bubble.setVisible(true);
            }, null, this);
        }
    }

    secondThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            cameraLock = true;
            cameraZoomLock = true;

            this.clock = this.time.delayedCall(5000, () => {
                cameraLock = false;
                cameraZoomLock = false;
                nextLevelCheck2 = true;
                this.secondXIcon.setVisible(false);
                this.secondCheckIcon.setVisible(true);
                this.text_bubble.setVisible(true);
            }, null, this);
        }
    }

    thirdThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            cameraLock = true;
            cameraZoomLock = true;

            this.clock = this.time.delayedCall(5000, () => {
                cameraLock = false;
                cameraZoomLock = false;
                nextLevelCheck3 = true;
                this.thirdXIcon.setVisible(false);
                this.thirdCheckIcon.setVisible(true);
                this.text_bubble.setVisible(true);
            }, null, this);
        }
    }
}