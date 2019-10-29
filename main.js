var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var dataStates = require('data.states');
var dataCreeps = require('data.creeps');

var roleManager = require('manager.roles');
var spawnManager = require('manager.spawns');

module.exports.loop = function () {

    var state = dataStates.getState()
    console.log("Tick state:", state.name)

    
    var creepDisparity = dataCreeps.getCreepDistributionDisparity(state.creepDistribution)
    //console.log("Creep disparity (Harvester):", creepDisparity['harvester'])
    //roleManager.redistribute()
    spawnManager.spawn(creepDisparity)
    //console.log("Creep disparity after spawning (Harvester):", creepDisparity['harvester'])

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.spawning){
            continue
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}