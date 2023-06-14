class RearWindow extends Phaser.Scene {
    constructor() {
        super("rearwindowScene");
    }

    create() {

        const map = this.add.tilemap('tilemapJSON');

        const tileset = map.addTilesetImage('RearWindowTileSheet(32x32)', 'tilesetImage');

        const Day1Layer = map.createLayer('Day1', tileset, 0, 0);
        Day1Layer.visible = false;
        const Day2Layer = map.createLayer('Day2', tileset, 0, 0);
        Day2Layer.visible = false;
        const Day3Layer = map.createLayer('Day3', tileset, 0, 0);
        Day3Layer.visible = false;
        const Night1Layer = map.createLayer('Night1', tileset, 0, 0);
        Night1Layer.visible = false;
        const Night2Layer = map.createLayer('Night2', tileset, 0, 0);
        Night2Layer.visible = false;
        const Night3Layer = map.createLayer('Night3', tileset, 0, 0);
        Night3Layer.visible = false;

        map.createLayer('Building', tileset, 0, 0);
        map.createLayer('Decoration', tileset, 0, 0);


        if (day_name == 'day1'){
            console.log('day1scene');
            Day1Layer.visible = true;
        }
        if (day_name == 'night1'){
            console.log('night1scene');

            Day1Layer.visible = false;
            Night1Layer.visible = true;
        }
        if (day_name == 'day2'){
            console.log('day2scene');
            Night1Layer.visible = false;
            Day2Layer.visible = true;
        }
        if (day_name == 'night2'){
            console.log('night2scene');
            Day2Layer.visible = false;
            Night2Layer.visible = true;
        }
        if (day_name == 'day3'){
            console.log('day3scene');
            Night2Layer.visible = false;
            Day3Layer.visible = true;
        }
        if (day_name == 'night3'){
            console.log('night3scene');
            Day3Layer.visible = false;
            Night3Layer.visible = true;
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

        //set up more variables
        if (day_name == 'day2'){
            this.dog_let_down = false;
        }
        else{
            this.dog_let_down = true;
        }
        if (day_name == 'night3'){
            this.lisa_in_house = false;
            this.murder_at_door = false;
        }
        else{
            this.lisa_in_house = true;
            this.murder_at_door = false;
        }

        //add sounds
        this.city_outdoor = this.sound.add('city_outdoor');
        this.rain = this.sound.add('rain');
        this.night = this.sound.add('night');
        this.camera_shutter = this.sound.add('camera_shutter');
        this.rocket = this.sound.add('rocket');
        this.piano = this.sound.add('piano')

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
        this.person = this.physics.add.group();
        if (day_name == 'day1'){
            //first person is killer and wife (meet)
            this.createPerson1('killerSpriteSheet', 'wifeSpriteSheet', 'man_phone', 'wife_idle', 850, 820, 995, 820)
            this.person1Short.depth = -100;
            this.person1Long.depth = -100;
            //second person is lonely heart (meet)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 850, 950, 850, 950)
            this.person2Short.depth = -100;
            this.person2Long.depth = -100;
            //third person is dancer (meet)
            this.createPerson3('ballerinaSpriteSheet', 'ballerinaSpriteSheet', 'ballerina_bounce', 'ballerina_spin', 470, 835, 470, 835)
            this.person3Short.depth = -100;
            this.person3Long.depth = -100;
        }
        if (day_name == 'night1'){
            //first person is killer leaving with suitcase
            this.createPerson1('killerSpriteSheet', 'killerSpriteSheet', 'man_suitcase_idle', 'man_suitcase', 370, 1000, 370, 1000)
            //second person is lonely heart (fake date)
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 850, 950, 850, 950)
            this.person2Short.depth = -100;
            this.person2Long.depth = -100;
            //third person is dancer (people over)
            this.new_person1 = this.person.create(445, 835, 'manSpriteSheet');
            this.new_person1.anims.play('man1');
            this.new_person1.depth = -100;
            this.new_person2 = this.person.create(460, 835, 'manSpriteSheet');
            this.new_person2.anims.play('man2');
            this.new_person2.depth = -100;
            this.createPerson3('ballerinaSpriteSheet', 'ballerinaSpriteSheet', 'ballerina_bounce', 'ballerina_spin', 430, 835, 430, 835)
            this.person3Short.depth = -100;
            this.person3Long.depth = -100;
        }
        if (day_name == 'day2'){
            //first person is dog lowered
            this.createPerson1('dogSpriteSheet', 'dogSpriteSheet', 'dog_basket', 'dog_lower', 750, 730, 750, 730)
            //second person is dog digs roses
            this.createPerson2('dogSpriteSheet', 'dogSpriteSheet', 'dog_idle', 'dog_dig', 820, 1020, 820, 1020)
            //third person is lonely heart (pills)
            this.createPerson3('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 850, 950, 850, 950)
            this.person3Short.depth = -100;
            this.person3Long.depth = -100;
        }
        if (day_name == 'night2'){
            //first person is dog dies
            this.createPerson1('dogSpriteSheet', 'dogSpriteSheet', 'dog_dead', 'dog_dead', 700, 1020, 700, 1020)
            //second person is smoking in darkness
            this.createPerson2('killerSpriteSheet', 'killerSpriteSheet', 'man_smoking', 'man_smoking', 850, 820, 850, 820)
            //third person is  piano party
            this.back = this.add.image(1300, 420, 'back_color')
            this.back.depth = -101;
            this.createPerson3('pianoSpriteSheet', 'pianoSpriteSheet', 'piano_play', 'piano_play', 1430, 420, 1430, 420)
            this.person3Short.depth = -100;
            this.person3Long.depth = -100;
        }
        if (day_name == 'day3'){
            //first person is ship box
            this.createPerson1('killerSpriteSheet', 'killerSpriteSheet', 'man_suitcase_idle', 'man_suitcase', 1005, 820, 1005, 820)
            this.person1Short.depth = -100;
            this.person1Long.depth = -100;
            //second person is 
            this.createPerson2('shortAnimAtlas', 'longAnimAtlas', 'shortAnim', 'longAnim', 600, 850, 600, 850)
            //third person is ballerina rocket
            this.createPerson3('ballerinaSpriteSheet', 'ballerinaSpriteSheet', 'ballerina_bounce', 'ballerina_spin_fast', 470, 845, 470, 845)
            this.person3Short.depth = -100;
            //this.person3Long.depth = -100;
        }
        if (day_name == 'night3'){
            //first person is dig up roses
            this.createPerson1('womanSpriteSheet', 'womanSpriteSheet', 'woman_idle', 'woman_dig', 820, 1020, 820, 1020)
            //second person is lisa in room
            this.createPerson2('womanSpriteSheet', 'womanSpriteSheet', 'woman_idle', 'woman_dig', 860, 820, 860, 820)
            this.person2Short.depth = -100;
            this.person2Long.depth = -100;
            //third person is killer look at you
            this.createPerson3('killerSpriteSheet', 'killerSpriteSheet', 'man_idle', 'man_looks', 748, 820, 830, 820)
            this.person3Short.depth = -100;
            this.person3Long.depth = -100;
        }

        //add the invisible text bubble
        this.text_bubble = this.add.image(250, 300, 'text_bubble').setOrigin(0, 0).setScale(.25);
        this.text_bubble.setScrollFactor(0); //this makes it so it stays in place on the camera
        this.text_bubble.setVisible(false);

        //create the pointer
        this.pointer = this.physics.add.sprite(600, 900, 'pointer').setScale(.5);
        this.pointer.body.setCollideWorldBounds(true);
        this.physics.world.bounds.setTo(70,30,1460,1030); //all these numbers are weird so that the pointer stays in the middle of the sceen at all times
        
        //do camera stuff
        this.cameras.main.setBounds(-500, -500, 3520, 2580); //these numbers are weird for the same reason
        this.cameras.main.setZoom(1.75);
        this.cameras.main.startFollow(this.pointer, true);

        //create the icons in the top left 
        this.firstXIcon = this.add.image(200, 150, 'X').setOrigin(0, 0.5);
        this.firstXIcon.setScrollFactor(0);     
        
        this.firstCheckIcon = this.add.image(200, 150, 'check').setOrigin(0, 0.5);
        this.firstCheckIcon.setScrollFactor(0);     
        this.firstCheckIcon.setVisible(false);

        this.secondXIcon = this.add.image(250, 150, 'X').setOrigin(0, 0.5);
        this.secondXIcon.setScrollFactor(0); 
        
        this.secondCheckIcon = this.add.image(250, 150, 'check').setOrigin(0, 0.5);
        this.secondCheckIcon.setScrollFactor(0);     
        this.secondCheckIcon.setVisible(false);

        this.thirdXIcon = this.add.image(300, 150, 'X').setOrigin(0, 0.5);
        this.thirdXIcon.setScrollFactor(0);
        
        this.thirdCheckIcon = this.add.image(300, 150, 'check').setOrigin(0, 0.5);
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
            if (day_name == 'night3'){
                this.night.stop();
                this.scene.start('victoryScene');
                day_name = 'day1';
            }
            else{
                this.text_bubble.setVisible(true);
            }
        }

        //move to next level
        //if (nextLevelCheck1 == true && nextLevelCheck2 && nextLevelCheck3 && Phaser.Input.Keyboard.JustDown(keySPACE)) {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.city_outdoor.stop();
            this.rain.stop();
            this.night.stop();
            this.piano.stop();
            if (day_name == 'day1'){
                day_name = 'night1';
                this.scene.start('transitionScene');
                return;
            }
            if (day_name == 'night1'){
                day_name = 'day2';
                this.scene.start('transitionScene');
                return;
            }
            if (day_name == 'day2'){
                day_name = 'night2';
                this.scene.start('transitionScene');
                return;
            }
            if (day_name == 'night2'){
                day_name = 'day3';
                this.scene.start('transitionScene');
                return;
            }
            if (day_name == 'day3'){
                day_name = 'night3';
                this.scene.start('transitionScene');
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
        this.pointerVelocity = 300;
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
                this.cameras.main.zoomTo(1.75, 1000, "Sine.easeInOut", false);
            }
        }
    }

    //zoom function
    zoom(){
        if (cameraZoomLock == false){
            this.cameras.main.zoomTo(3.25, 1000, "Sine.easeInOut", false);
        }
    }

    //create a person function
    createPerson1(sAtlas, lAtlas, sAnim, lAnim, XcoordS, YcoordS, XcoordL, YcoordL){
        this.person1Short = this.person.create(XcoordS, YcoordS, sAtlas);
        this.person1Short.anims.play(sAnim);

        this.person1Long = this.person.create(XcoordL, YcoordL, lAtlas);
        this.person1Long.anims.play(lAnim);
        this.person1Long.setVisible(false);
    }

    //create a person function
    createPerson2(sAtlas, lAtlas, sAnim, lAnim, XcoordS, YcoordS, XcoordL, YcoordL){
        this.person2Short = this.person.create(XcoordS, YcoordS, sAtlas);
        this.person2Short.anims.play(sAnim);
        if (day_name == 'day2' || day_name == 'night3'){
            this.person2Short.setVisible(false);
        }

        this.person2Long = this.person.create(XcoordL, YcoordL, lAtlas);
        this.person2Long.anims.play(lAnim);
        this.person2Long.setVisible(false);
    }

    //creeate a person function
    createPerson3(sAtlas, lAtlas, sAnim, lAnim, XcoordS, YcoordS, XcoordL, YcoordL){
        this.person3Short = this.person.create(XcoordS, YcoordS, sAtlas);
        this.person3Short.anims.play(sAnim);
        if (day_name == 'night3'){
            this.person3Short.setVisible(false);
        }

        this.person3Long = this.person.create(XcoordL, YcoordL, lAtlas);
        this.person3Long.anims.play(lAnim);
        this.person3Long.setVisible(false);
    }

    //functions to zoom in more and play the animations
    firstThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            if (!nextLevelCheck1){
                if (day_name == 'day1'){
                    for (let i = 0; i < 2; i++){
                        this.clock = this.time.delayedCall(850, () => {
                            this.pointer.x +=1;
                        }, null, this);
                    }
                }
                if (day_name == 'night1'){
                    for (let i = 0; i < 2; i++){
                        this.clock = this.time.delayedCall(825, () => {
                            //this.pointer.y +=2.6;
                            this.person1Long.x -=1.5;
                        }, null, this);
                    }
                }
                if (day_name == 'day2'){
                    for (let i = 0; i < 2; i++){
                        this.clock = this.time.delayedCall(825, () => {
                            this.pointer.y +=2.6;
                            this.person1Long.y +=2.5;
                        }, null, this);
                    }
                }
                if (day_name == 'day3'){
                    for (let i = 0; i < 2; i++){
                        this.clock = this.time.delayedCall(825, () => {
                            this.pointer.x -=1.2;
                            this.person1Long.x -=2;
                        }, null, this);
                    }
                }
                this.pointer.setVisible(false);
                if (day_name == 'day2'){
                    this.cameras.main.zoomTo(10, 1000, "Sine.easeInOut", false);
                }
                this.cameras.main.zoomTo(5, 1000, "Sine.easeInOut", false);
                cameraLock = true;
                cameraZoomLock = true;
                this.camera_shutter.play();
                if (day_name != 'day1'){
                    this.person1Short.setVisible(false);
                }
                this.person1Long.setVisible(true);

                this.clock = this.time.delayedCall(5000, () => {
                    cameraLock = false;
                    cameraZoomLock = false;
                    nextLevelCheck1 = true;
                    this.cameras.main.startFollow(this.pointer, true);
                    if (day_name == 'night3'){
                        this.person2Short.setVisible(true);
                    }
                    this.pointer.setVisible(true);
                    this.firstXIcon.setVisible(false);
                    this.firstCheckIcon.setVisible(true);
                    if (day_name != 'day1'){
                        if (day_name == 'day2'){
                            this.clock = this.time.delayedCall(2200, () => {
                                this.person1Long.setVisible(false);
                                this.person2Short.setVisible(true);
                            }, null, this);
                        }
                        else{
                            this.person1Long.setVisible(false);
                        }
                        if (day_name == 'night2'){
                            this.person1Long.setVisible(true);
                        }
                    }
                }, null, this);
                if (day_name == 'day2'){
                    this.dog_let_down = true;
                }
                if (day_name == 'night3'){
                    this.lisa_in_house = true;
                }
            }
        }
    }

    secondThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            if (!nextLevelCheck2){
                if (this.dog_let_down == true || this.lisa_in_house == true){
                    this.cameras.main.zoomTo(5, 1000, "Sine.easeInOut", false);
                    cameraLock = true;
                    cameraZoomLock = true;
                    this.pointer.setVisible(false);
                    this.camera_shutter.play();
                    this.person2Short.setVisible(false);
                    this.person2Long.setVisible(true);

                    this.clock = this.time.delayedCall(5000, () => {
                        cameraLock = false;
                        cameraZoomLock = false;
                        nextLevelCheck2 = true;
                        this.cameras.main.startFollow(this.pointer, true);
                        if (day_name == 'night3'){
                            this.person3Short.setVisible(true);
                        }
                        this.pointer.setVisible(true);
                        this.secondXIcon.setVisible(false);
                        this.secondCheckIcon.setVisible(true);
                        this.person2Short.setVisible(true);
                        this.person2Long.setVisible(false);
                    }, null, this);
                }
            }
        }
    }

    thirdThingViewed(){
        if (keyENTER.isDown || keyE.isDown){
            if (!nextLevelCheck3){
                if (day_name == 'night3'){
                    for (let i = 0; i < 2; i++){
                        this.clock = this.time.delayedCall(850, () => {
                            this.pointer.x +=.7;
                        }, null, this);
                    }
                }
                if (day_name == 'night2'){
                    this.piano.play();
                }
                if (day_name == 'day3'){
                    this.rocket.play();
                    for (let i = 0; i < 2; i++){
                        this.clock = this.time.delayedCall(850, () => {
                            this.pointer.y -=15;
                            this.person3Long.y -=15;
                        }, null, this);
                    }
                }
                if (day_name == 'night3'){
                    this.cameras.main.zoomTo(8, 1000, "Sine.easeInOut", false);
                }
                else{
                    this.cameras.main.zoomTo(5, 1000, "Sine.easeInOut", false);
                }
                cameraLock = true;
                cameraZoomLock = true;
                this.camera_shutter.play();
                this.pointer.setVisible(false);
                this.person3Short.setVisible(false);
                this.person3Long.setVisible(true);

                this.clock = this.time.delayedCall(5000, () => {
                    cameraLock = false;
                    cameraZoomLock = false;
                    nextLevelCheck3 = true;
                    this.cameras.main.startFollow(this.pointer, true);
                    this.pointer.setVisible(true);
                    this.thirdXIcon.setVisible(false);
                    this.thirdCheckIcon.setVisible(true);
                    if (day_name != 'day3'){
                        this.person3Short.setVisible(true);
                    }
                    this.person3Long.setVisible(false);
                }, null, this);
            }
        }
    }
}