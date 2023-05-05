import * as THREE from '../three.module.js';

class TextureAnimator{
    constructor(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)	
    {
        // note: texture passed by reference, will be updated by the update function.

        this.texture = texture;
        //console.log(this.texture);
    
        this.tilesHorizontal = tilesHoriz;
        this.tilesVertical = tilesVert;
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet. 
        this.numberOfTiles = numTiles;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
        texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

        // how long should each image be displayed?
        this.tileDisplayDuration = tileDispDuration;

        // how long has the current image been displayed?
        this.currentDisplayTime = 0;

        // which image is currently being displayed?
        this.currentTile = 0;
    }
    
    update = function( milliSec )
    {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
        this.currentDisplayTime -= this.tileDisplayDuration;
        this.currentTile++;
        if (this.currentTile == this.numberOfTiles)
            this.currentTile = 0;
        var currentColumn = this.currentTile % this.tilesHorizontal;
        this.texture.offset.x = currentColumn / this.tilesHorizontal;
        var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
        this.texture.offset.y = currentRow / this.tilesVertical;
        //console.log(currentRow);
        }
    };
}

class Screen
{
    constructor(texture, frameCount, playSpeed)
    {
        this.texture = new THREE.TextureLoader().load(texture);
        this.frameCount = frameCount;
        this.playSpeed = playSpeed;
        this.material = new THREE.MeshBasicMaterial( { map: this.texture, side:THREE.DoubleSide } );
        this.animator = new TextureAnimator(this.texture, this.frameCount, 1, this.frameCount, this.playSpeed);
        //console.log(this.animator);
    }
    
}

export {Screen};