//TODO: get a list of required upgrades
//Decide which buildings plots to lay down
//Get the terrain and based on the terrain place the buildings

//Idea for extentions:
//Get a spawn, and do a checkerpattern around it with the conditions
//A non-walled line from spawn to extention
//Not with distance == 1

var utils = require('code.utils');
var spawnManager = require('manager.spawns');

module.exports = {
    //TODO: this variable only works for one room which isn't attacked
    extentions: 0,
    checkSurroundingsForClear: function(x, y, radius, room){
        for(var xTile of utils.range(x-radius, x+radius)){
            for(var yTile of utils.range(y-radius, y+radius)){
                var tileDetails = room.lookAt(xTile, yTile)
                if(tileDetails.length > 1){
                    return 0
                }
            }
        }
        return 1
    },
    plan_extention: function(){
        console.log("Planning to build extention")
        var availableSpawns = spawnManager.getAvailableSpawns()
        if (availableSpawns.length == 0){
            return
        }
        var spawn = availableSpawns.pop()
        var radius = 2
        for(var x of utils.range(spawn.pos.x-radius, spawn.pos.x+radius+1)){
            for(var y of utils.range(spawn.pos.y-radius, spawn.pos.y+radius+1)){
                if(this.checkSurroundingsForClear(x, y, 1, spawn.room)){
                    console.log("Spawning building site at:",x,y)
                    console.log(spawn.room.createConstructionSite(x, y, STRUCTURE_EXTENSION))
                    return
                }
            }
        }
    }    
};