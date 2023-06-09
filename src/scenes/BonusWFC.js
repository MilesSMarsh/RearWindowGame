class BonusWFC extends Phaser.Scene {
    constructor() {
        super("bonuswfcScene");
    }

    create() {
        //keybinds
        keyBACKSPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

        const mapTest = this.add.tilemap('tilemapJSON2');
        this.map2 = this.add.tilemap('tilemapJSON2');

        const tileset2 = this.map2.addTilesetImage('RearWindowTileSheet(32x32)', 'tilesetImage');
        const tileset = mapTest.addTilesetImage('RearWindowTileSheet(32x32)', 'tilesetImage');
      
        const firstLayer = mapTest.createLayer('firstLayer', tileset, 0, 0);
        this.firstLayer2 = this.map2.createLayer('firstLayer', tileset2, 320, 0);

        this.weightArr = new Array();
        this.complete = false;


        this.map2.fill(-1, 0 , 0 , 10 , 10, true, this.firstLayer2);


        this.counter = 0;

        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);



        // const secondLayer = map.createLayer('testLayer', tileset, 0, 0);


        // useful functions for tilemap manipulation https://photonstorm.github.io/phaser3-docs/Phaser.Tilemaps.Tilemap.html

        // fill(index [, tileX] [, tileY] [, width] [, height] [, recalculateFaces] [, layer])
        // map.fill(0, 5, 0, 4, 1, true, firstLayer);

        // putTileAt(tile, tileX, tileY [, recalculateFaces] [, layer])
        // map.putTileAt(258, 5, 5, true, firstLayer);

        // putTilesAt(tile, tileX, tileY [, recalculateFaces] [, layer])
        // map.putTilesAt([[159, 159, 158],[159, 159, 158]], 0, 0, true, firstLayer);

        // getTileAt(tileX, tileY [, nonNull] [, layer])
        // map.getTileAt(0, 0, false, firstLayer).index;

        // getTilesWithin( [tileX] [, tileY] [, width] [, height] [, filteringOptions] [, layer])
        // map.getTilesWithin(0, 0, 3, 3, firstLayer);

        // hasTileAt(tileX, tileY [, layer])
        // map.hasTileAt(0, 0, firstLayer);

        // removeTileAt(tileX, tileY [, replaceWithNull] [, recalculateFaces] [, layer])
        // map.removeTileAt(0, 0, true, true, firstLayer);

        // removeLayer( [layer])
        // map.removeLayer(secondLayer);

        // destroyLayer( [layer])
        // map.destroyLayer(firstLayer);

        



        //              Wave Function Collapse Agorithm by: mxgmn https://github.com/mxgmn/WaveFunctionCollapse

        // step 1: Read the input bitmap and count NxN patterns.

        // step 2: Create an array with the dimensions of the output.
        //      Each element of this array represents a state of an NxN region in the output. 
        //      A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients 
        //      (so a state of a pixel in the output is a superposition of input colors with real coefficients).
        //      False coefficient means that the corresponding pattern is forbidden,
        //      true coefficient means that the corresponding pattern is not yet forbidden.

        //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

        //step 4: Repeat the following steps:
        //  i.  Observation:
        //      A: Find a wave element with the minimal nonzero entropy. 
        //      If there is no such elements (if all elements have zero or undefined entropy) 
        //      then break the cycle (4) and go to step (5).
        //
        //      B: Collapse this element into a definite state according to its coefficients 
        //      and the distribution of NxN patterns in the input.
        //
        //  ii. Propogation:
        //      A: Propagation: propagate information gained on the previous observation step.
        
        //step 5: By now all the wave elements are either in a completely observed state 
        //      (all the coefficients except one being zero) or in the contradictory state 
        //      (all the coefficients being zero). In the first case return the output. 
        //      In the second case finish the work without returning anything.




        // custom implementation for phaser

        // step 1: Read the input bitmap and count NxN patterns.

        this.rules = this.iterateOverMap(mapTest, firstLayer);
        console.log(this.rules)



        // step 2: Create an array with the dimensions of the output.
        //      Each element of this array represents a state of an NxN region in the output. 
        //      A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients 
        //      (so a state of a pixel in the output is a superposition of input colors with real coefficients).
        //      False coefficient means that the corresponding pattern is forbidden,
        //      true coefficient means that the corresponding pattern is not yet forbidden.

        
        // while(!this.complete){
            var tileCounter = 0;

            this.weightMap = new Array(mapTest.height);
            for (var i = 0; i < mapTest.height; i++) {
                this.weightMap[i] = new Array(mapTest.width); 
                for(var j = 0; j < mapTest.width; j++){

                    //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

                    this.weightMap[i][j] = {weights: new Array(...this.weightArr), collapsed: false, x: j, y: i, tileIndex: null};
                }
            }


            // this.weightMap = new Array(3);
            // for (var i = 0; i < 3; i++) {
            //     this.weightMap[i] = new Array(3); 
            //     for(var j = 0; j < 3; j++){

            //         //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

            //         this.weightMap[i][j] = {weights: new Array(...this.weightArr), collapsed: false, x: j, y: i, tileIndex: null};
            //     }
            // }

            console.log(this.weightMap);

            // this.weightMap[5][5].weights = [{index: 247, frequency: 1}];
            // this.collapse(this.weightMap[5][5]);

            // this.weightMap[5][9].weights = [{index: 249, frequency: 1}];
            // this.collapse(this.weightMap[5][9]);
        
            //step 4: Repeat the following steps:New
            //  i.  Observation:
            //      A: Find a wave element with the minimal nonzero entropy. 
            //      If there is no such elements (if all elements have zero or undefined entropy) 
            //      then break the cycle (4) and go to step (5).
            //
            //      B: Collapse this element into a definite state according to its coefficients 
            //      and the distribution of NxN patterns in the input.
            //
            //  ii. Propogation:
            //      A: Propagation: propagate information gained on the previous observation step.






            // for(let x = 0; x < 100; x++){
            //     var lowEntrop = this.findLowestEntropy(this.weightMap);
            //     if(lowEntrop.collapsed == true || !lowEntrop.hasOwnProperty("tileIndex")){
            //         console.error('broken');
            //         break;
            //     }
            //     tileCounter++;
            //     this.collapse(lowEntrop);
                
            //     if(lowEntrop.tileIndex){
            //         this.map2.putTileAt(lowEntrop.tileIndex, lowEntrop.x, lowEntrop.y, true, this.firstLayer2);
            //     }
            //     else {
            //         console.error('placing invalid index', lowEntrop.tileIndex, lowEntrop.x, lowEntrop.y);
            //     }
            // }

            // if(tileCounter == map.width * map.height){
            //     this.complete = true;
            //     console.log('complete');
            // }




        //}
        
        //step 5: By now all the wave elements are either in a completely observed state 
        //      (all the coefficients except one being zero) or in the contradictory state 
        //      (all the coefficients being zero). In the first case return the output. 
        //      In the second case finish the work without returning anything.



    }


    progress(){
      var lowEntrop = this.findLowestEntropy(this.weightMap);
      if(lowEntrop.collapsed == true || !lowEntrop.hasOwnProperty("tileIndex")){
          console.error('broken');
          return;
      }
      this.collapse(lowEntrop);
      
  }

  progressFull(map){


      this.map2.fill(-1, 0 , 0 , 10 , 10, true, this.firstLayer2);

      var tileCounter = 0;

      this.weightMap = new Array(map.height);
      for (var i = 0; i < map.height; i++) {
          this.weightMap[i] = new Array(map.width); 
          for(var j = 0; j < map.width; j++){

              //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

              this.weightMap[i][j] = {weights: new Array(...this.weightArr), collapsed: false, x: j, y: i, tileIndex: null};
          }
      }

      for(let x = 0; x < 100; x++){
          var lowEntrop = this.findLowestEntropy(this.weightMap);
          if(lowEntrop.collapsed == true || !lowEntrop.hasOwnProperty("tileIndex")){
              console.error('broken');
              break;
          }
          tileCounter++;
          this.collapse(lowEntrop);
          
          if(lowEntrop.tileIndex){
              this.map2.putTileAt(lowEntrop.tileIndex, lowEntrop.x, lowEntrop.y, true, this.firstLayer2);
          }
          else {
              console.error('placing invalid index', lowEntrop.tileIndex, lowEntrop.x, lowEntrop.y);
          }
      }

      if(tileCounter == map.width * map.height){
          this.complete = true;
          console.log('complete');
      }
  }

  reset(map){


      this.map2.fill(-1, 0 , 0 , 10 , 10, true, this.firstLayer2);

      this.weightMap = new Array(map.height);
      for (var i = 0; i < map.height; i++) {
          this.weightMap[i] = new Array(map.width); 
          for(var j = 0; j < map.width; j++){

              //step 3: Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.

              this.weightMap[i][j] = {weights: new Array(...this.weightArr), collapsed: false, x: j, y: i, tileIndex: null};
          }
      }

  }




  findLowestEntropy(newMap){
      var lowestEntropy = {weights: new Array(9000)};
      for(let row = 0; row < newMap.length; row++){
          for(let col = 0; col < newMap[row].length; col++){
              if(!(newMap[row][col].collapsed) && (newMap[row][col].weights.length > 0) && (newMap[row][col].weights.length <= lowestEntropy.weights.length)){
                  
                  //console.log('row:', row, 'col:', col, 'newTile.len:', newMap[row][col].weights.length, 'lowEnt.len:', lowestEntropy.weights.length, 'is collapsed:', newMap[row][col].collapsed);

                  lowestEntropy = newMap[row][col];
              }
          }
      }

      this.counter++;
      // console.log(this.counter);
      // console.log("Lowest Entropy", lowestEntropy);
      return lowestEntropy;
  }

  
  collapse(tile){
      var selectedIndex = this.getRandomIndex(tile.weights);
      // console.log('tile: ')
      // console.log(tile);
      
      tile.collapsed = true;
      tile.tileIndex = selectedIndex;
      this.propagate(tile, this.weightMap);
      this.weights = [];
      //console.log(tile);

      if(tile.tileIndex){
          this.map2.putTileAt(tile.tileIndex, tile.x, tile.y, true, this.firstLayer2);
      }
      else {
          console.error('placing invalid index', tile.tileIndex, tile.x, tile.y);
      }
  }

  // propagateMap(currTile, map){
  //     //go left
  //     for(let i = currTile.x; i > 0; i-- ){
  //         //go up 
  //         for(let j = currTile.y; j > 0; j--){
  //             this.propagate(map[j][i], map);
  //             console.log('left up!!!!!!!!!!!!!');
  //         }
  //         //go down
  //         for(let k = currTile.y; k < map.length; k++){
  //             this.propagate(map[k][i], map);

  //             console.log('left down*******************');
  //         }

  //     }


  //     //go right

  //     for(let i = currTile.x; i < map[0].length; i++ ){
  //         //go up 
  //         for(let j = currTile.y; j > 0; j--){
  //            this.propagate(map[j][i], map);

  //             console.log('right up>>>>>>>>>>>>>>>>>>>>>>>>>>');
  //         }
  //         //go down
  //         for(let k = currTile.y; k < map.length; k++){
  //             this.propagate(map[k][i], map);

  //             console.log('right down}}}}}}}}}}}}}}}}}}}}}}}}');
  //         }
  //     }
  // }



  propagate(currTile, map){

      var tempArray = [];
      // console.log('up')
      if(map[currTile.y - 1] && !map[currTile.y - 1][currTile.x].collapsed){
          tempArray = map[currTile.y - 1][currTile.x].weights;
          map[currTile.y - 1][currTile.x].weights = this.updateWeights(currTile, map[currTile.y - 1][currTile.x], 'up', this.rules);

          // if(map[currTile.y - 1][currTile.x].weights.length != tempArray.length){
          //     this.propagate(map[currTile.y - 1][currTile.x], map);
          // }


          // console.log('x:', currTile.x, 'y:', currTile.y - 1)
          
      }
      // console.log('down')
      if(map[currTile.y + 1] && !map[currTile.y + 1][currTile.x].collapsed){
          
          tempArray = map[currTile.y + 1][currTile.x].weights;
          map[currTile.y + 1][currTile.x].weights = this.updateWeights(currTile, map[currTile.y + 1][currTile.x], 'down', this.rules);

          // if(map[currTile.y + 1][currTile.x].weights.length != tempArray.length){
          //     this.propagate(map[currTile.y + 1][currTile.x], map);
          // }
          // console.log('x:', currTile.x, 'y:', currTile.y + 1)
      }

      // console.log('left')
      if(map[currTile.y][currTile.x - 1] && !map[currTile.y][currTile.x - 1].collapsed){
          tempArray = map[currTile.y][currTile.x - 1].weights;
          map[currTile.y][currTile.x - 1].weights = this.updateWeights(currTile, map[currTile.y][currTile.x - 1], 'left', this.rules);

          // if(map[currTile.y][currTile.x - 1].weights.length != tempArray.length){
          //     this.propagate(map[currTile.y][currTile.x - 1], map);
          // }
          // console.log('x:', currTile.y, 'y:', currTile.y)
      }

      // console.log('right')

      if(map[currTile.y][currTile.x + 1] && !map[currTile.y][currTile.x + 1].collapsed){

          tempArray = map[currTile.y][currTile.x + 1].weights;
          map[currTile.y][currTile.x + 1].weights = this.updateWeights(currTile, map[currTile.y][currTile.x], 'right', this.rules);

          // if(map[currTile.y][currTile.x + 1].weights.length != tempArray.length){
          //     this.propagate(map[currTile.y][currTile.x + 1], map);
          // }
          // console.log('x:', currTile.x + 1, 'y:', currTile.y)
      }

          

  }



  //{index: 286, adjacentTileIndex: 288, direction: 'down'}
  updateWeights(tile, otherTile, ruleDirection, rules){
      var arrayOfCorrect = [];
      if(tile.collapsed){
          //loop through rules
          for(var i = 0; i < rules.length; i++){

              //loop through adjacent tile weights
              for(var t = 0; t < otherTile.weights.length; t++ ){
                  if(rules[i].adjacentTileIndex == otherTile.weights[t].index && rules[i].index == tile.tileIndex && rules[i].direction == ruleDirection){
                      arrayOfCorrect.push(otherTile.weights[t]);
                      // console.log(otherTile.weights[t])

                  }
              }
          }
      }else{
          //loop through rules
          for(var i = 0; i < rules.length; i++){

              //loop through curr tile weights
              for(var j = 0; j < tile.weights.length; j++){

                  //loop through adjacent tile weights
                  for(var t = 0; t < otherTile.weights.length; t++ ){
                      if(rules[i].adjacentTileIndex == otherTile.weights[t].index && rules[i].index == tile.weights[j].index && rules[i].direction == ruleDirection){
                          arrayOfCorrect.push(otherTile.weights[t]);
                      }
                  }
              }
          }
      }
      


      const unique = [...new Map(arrayOfCorrect.map((m) => [m.index, m])).values()];
      //arrayOfCorrect.filter((thing, index, self) => index === self.findIndex((t) => t.index == thing.index && t.frequency == thing.frequency));
      if(unique.length > this.weightArr.length){

          //console.log('this.weightArr')
          return(this.weightArr);
      }
      //console.log('unique length: ', unique)
      return(unique);

  }
  





  iterateOverMap(tileMap, layer){
      var adjacencyRulesArray = [];
      var currTile;
      var results;
      var isIn = false;

      for(let y = 0; y < tileMap.height; y++){
          for(let x = 0; x < tileMap.width; x++){

              currTile = tileMap.getTileAt(x, y, true, layer);

              if(this.weightArr.length == 0){
                  this.weightArr.push({index: currTile.index, frequency: 0});
              } 

              isIn = false;
              for(let elem of this.weightArr){
                  if(elem.index == currTile.index){
                      elem.frequency += 1;
                      isIn = true;
                      break;
                  }
              }
              if(!isIn){
                  this.weightArr.push({index: currTile.index, frequency: 1});
              }

              var upTile = null;
              var downTile = null;
              var leftTile = null;
              var rightTile = null;

              if(currTile.y > 0){

                  upTile = tileMap.getTileAt(x, y - 1, true, layer);
                  adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: upTile.index, direction: 'up'});
              }

              if(currTile.y < tileMap.height - 1){

                  downTile = tileMap.getTileAt(x, y + 1, true, layer);
                  adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: downTile.index, direction: 'down'});
              }

              if(currTile.x > 0){

                  leftTile = tileMap.getTileAt(x - 1, y, true, layer);
                  adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: leftTile.index, direction: 'left'});
              }

              if(currTile.x < tileMap.width - 1){
                  
                  rightTile = tileMap.getTileAt(x + 1, y, true, layer);
                  adjacencyRulesArray.push({index: currTile.index, adjacentTileIndex: rightTile.index, direction: 'right'});
              }

          }
      }




      //get rid of duplicate rules
      results = adjacencyRulesArray.filter(
          (thing, index, self) => index === self.findIndex((t) => t.index === thing.index && t.adjacentTileIndex === thing.adjacentTileIndex && t.direction === thing.direction));
      

      return(results);
  }




  getRandomIndex(arrOfWeight){
      //gets an index from an array of objects that have properties index and frequency
      //the chance the object is returned is based on the frequency given
      var rand = (Math.floor(Math.random()*99))/100;
      var counter = 0;
      var totalFreq = 0;
      var foundIndex;
      if(arrOfWeight.length <= 0){
          console.error('Array length is 0, cannot get index');
          return undefined;
      }

      for(let x of arrOfWeight){
          if(x.frequency){
              totalFreq += x.frequency;
          }
      }

      for(let y of arrOfWeight){
          if(y.frequency){
              counter += y.frequency/totalFreq
              if(rand <= counter){
                  foundIndex = y.index;
                  break;
              }
          }
      }

      return foundIndex;
  }







    update() {
        //moving to other scene
        if (Phaser.Input.Keyboard.JustDown(keyBACKSPACE)) {
          this.scene.start('titleScene');    
        }

        if(Phaser.Input.Keyboard.JustDown(this.keySPACE)){
          this.progress();
      }


      if(Phaser.Input.Keyboard.JustDown(this.keyENTER)){
          this.progressFull(this.map2);
      }


      if(Phaser.Input.Keyboard.JustDown(this.keyR)){
          this.reset(this.map2);
      }
      }
}