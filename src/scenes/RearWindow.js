class RearWindow extends Phaser.Scene {
    constructor() {
        super("rearwindowScene");
    }

    create() {

        //printing out to make sure the player is in the right place
        if (day_name == 'day1'){
            console.log('day1scene');
        }
        if (day_name == 'night1'){
            console.log('night1scene');
        }
        if (day_name == 'day2'){
            console.log('day2scene');
        }
        if (day_name == 'night2'){
            console.log('night2scene');
        }
        if (day_name == 'day3'){
            console.log('day3scene');
        }
        if (day_name == 'night3'){
            console.log('night3scene');
        }

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

        //add sounds
        this.city_outdoor = this.sound.add('city_outdoor');
        this.rain = this.sound.add('rain');
        this.night = this.sound.add('night');
        this.camera_shutter = this.sound.add('camera_shutter');

        //play music
        this.city_outdoor.loop = true;
        this.rain.loop = true;
        this.night.loop = true;
        if (day_name == 'day1' || day_name == 'day2' || day_name == 'day3'){
            this.city_outdoor.play();
        }
        if (day_name == 'night1'){
            this.rain.play();
        }
        if (day_name == 'night2' || day_name == 'night3'){
            this.night.play();
        }

        //create the people
        this.person = this.physics.add.staticGroup();
        if (day_name == 'day1'){
            this.createPerson1('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1050, 550)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 550, 1000)
            this.createPerson3('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1700, 150)
        }
        if (day_name == 'night1'){
            this.createPerson1('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 700, 200)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 550, 400)
            this.createPerson3('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1700, 150)
        }
        if (day_name == 'day2'){
            this.createPerson1('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1050, 550)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 550, 1000)
            this.createPerson3('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1700, 150)
        }
        if (day_name == 'night2'){
            this.createPerson1('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 700, 200)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 550, 400)
            this.createPerson3('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1700, 150)
        }
        if (day_name == 'day3'){
            this.createPerson1('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1050, 550)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 550, 1000)
            this.createPerson3('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1700, 150)
        }
        if (day_name == 'night3'){
            this.createPerson1('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 700, 200)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 550, 400)
            this.createPerson3('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 1700, 150)
        }

        //add the invisible text bubble
        this.text_bubble = this.add.image(50, 100, 'text_bubble').setOrigin(0, 0);
        this.text_bubble.setScrollFactor(0); //this makes it so it stays in place on the camera
        this.text_bubble.setVisible(false);

        //create the pointer
        this.pointer = this.physics.add.sprite(500, 500, 'pointer');
        this.pointer.body.setCollideWorldBounds(true);
        this.physics.world.bounds.setTo(70,30,1760,1030); //all these numbers are weird so that the pointer stays in the middle of the sceen at all times
        
        //do camera stuff
        this.cameras.main.setBounds(-500, -500, 3520, 2580); //these numbers are weird for the same reason
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
        this.physics.add.overlap(this.pointer, this.person1Short, this.firstThingViewed, null, this);
        this.physics.add.overlap(this.pointer, this.person2Short, this.secondThingViewed, null, this);
        this.physics.add.overlap(this.pointer, this.person3Short, this.thirdThingViewed, null, this);
    }

    update(){

        //show the text bubble
        if (nextLevelCheck1 == true && nextLevelCheck2 && nextLevelCheck3){
            this.text_bubble.setVisible(true);
        }

        //move to next level
        if (nextLevelCheck1 == true && nextLevelCheck2 && nextLevelCheck3 && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.city_outdoor.stop();
            this.rain.stop();
            this.night.stop();
            if (day_name == 'day1'){
                day_name = 'night1';
                this.scene.start('rearwindowScene');
                return;
            }
            if (day_name == 'night1'){
                day_name = 'day2';
                this.scene.start('rearwindowScene');
                return;
            }
            if (day_name == 'day2'){
                day_name = 'night2';
                this.scene.start('rearwindowScene');
                return;
            }
            if (day_name == 'night2'){
                day_name = 'day3';
                this.scene.start('rearwindowScene');
                return;
            }
            if (day_name == 'day3'){
                day_name = 'night3';
                this.scene.start('rearwindowScene');
                return;
            }
            if (day_name == 'night3'){
                day_name = 'day1';
                this.scene.start('victoryScene');
                return;
            } 
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

    //create a person function
    createPerson1(sAtlas, lAtlas, sAnim, lAnim, Xcoord, Ycoord){
        this.person1Short = this.person.create(Xcoord, Ycoord, sAtlas);
        this.person1Short.anims.play(sAnim);

        this.person1Long = this.person.create(Xcoord, Ycoord, lAtlas);
        this.person1Long.anims.play(lAnim);
        this.person1Long.setVisible(false);
    }

    //create a person function
    createPerson2(sAtlas, lAtlas, sAnim, lAnim, Xcoord, Ycoord){
        this.person2Short = this.person.create(Xcoord, Ycoord, sAtlas);
        this.person2Short.anims.play(sAnim);

        this.person2Long = this.person.create(Xcoord, Ycoord, lAtlas);
        this.person2Long.anims.play(lAnim);
        this.person2Long.setVisible(false);
    }

    //creeate a person function
    createPerson3(sAtlas, lAtlas, sAnim, lAnim, Xcoord, Ycoord){
        this.person3Short = this.person.create(Xcoord, Ycoord, sAtlas);
        this.person3Short.anims.play(sAnim);

        this.person3Long = this.person.create(Xcoord, Ycoord, lAtlas);
        this.person3Long.anims.play(lAnim);
        this.person3Long.setVisible(false);
    }

    //functions to zoom in more and play the animations (i'm trying to these three functions into one function that passes in objects and animations but i haven't gotten it yet)
    firstThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            cameraLock = true;
            cameraZoomLock = true;
            this.camera_shutter.play();
            this.person1Short.setVisible(false);
            this.person1Long.setVisible(true);

            this.clock = this.time.delayedCall(5000, () => {
                cameraLock = false;
                cameraZoomLock = false;
                nextLevelCheck1 = true;
                this.firstXIcon.setVisible(false);
                this.firstCheckIcon.setVisible(true);
                this.person1Short.setVisible(true);
                this.person1Long.setVisible(false);
            }, null, this);
        }
    }

    secondThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            cameraLock = true;
            cameraZoomLock = true;
            this.camera_shutter.play();
            this.person2Short.setVisible(false);
            this.person2Long.setVisible(true);

            this.clock = this.time.delayedCall(5000, () => {
                cameraLock = false;
                cameraZoomLock = false;
                nextLevelCheck2 = true;
                this.secondXIcon.setVisible(false);
                this.secondCheckIcon.setVisible(true);
                this.person2Short.setVisible(true);
                this.person2Long.setVisible(false);
            }, null, this);
        }
    }

    thirdThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            this.cameras.main.zoomTo(2, 1000, "Sine.easeInOut", false);
            cameraLock = true;
            cameraZoomLock = true;
            this.camera_shutter.play();
            this.person3Short.setVisible(false);
            this.person3Long.setVisible(true);

            this.clock = this.time.delayedCall(5000, () => {
                cameraLock = false;
                cameraZoomLock = false;
                nextLevelCheck3 = true;
                this.thirdXIcon.setVisible(false);
                this.thirdCheckIcon.setVisible(true);
                this.person3Short.setVisible(true);
                this.person3Long.setVisible(false);
            }, null, this);
        }
    }
}