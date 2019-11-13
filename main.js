var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var dataStates = require('data.states');
var dataCreeps = require('data.creeps');

var constructionManager = require('manager.construction');
var roleManager = require('manager.roles');
var spawnManager = require('manager.spawns');

module.exports.loop = function () {

    var state = dataStates.getState()
    console.log("Tick state:", state.name)

    
    var creepDisparity = dataCreeps.getCreepDistributionDisparity(state.creepDistribution)
    //console.log("Creep disparity (Harvester):", creepDisparity['harvester'])
    //roleManager.redistribute()
    spawnManager.spawn(creepDisparity)
    //TODO: This is not generalized for multiple rooms or for multiple buildings
    if(constructionManager.extentions < state.extentions){
        constructionManager.plan_extention()
    }
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