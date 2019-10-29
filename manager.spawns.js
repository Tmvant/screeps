module.exports = {
    creepRoles: {
        harvester: [WORK, CARRY, MOVE],
        upgrader: [WORK, CARRY, MOVE],
        builder: [WORK, CARRY, MOVE],
        scout: [MOVE]
    },
    creepDistributions: {
        harvester: 1,
        upgrader: 1,
        builder: 1,
        scout: 1
    },
    creepPriorities: {
        harvester: 1,
        upgrader: 1,
        builder: 1,
        scout: 1
    },
    getAvailableSpawns: function(){
        var availableSpawns = []
        for(var name in Game.spawns){
            if(Game.spawns[name].spawning){
                var spawningCreep = Game.creeps[Game.spawns[name].spawning.name]
                Game.spawns[name].room.visual.text("Spawning " + spawningCreep.memory.role, Game.spawns[name].pos.x + 1, Game.spawns[name].pos.y, {align: 'left', opacity: 0.8})    
            } else {
                availableSpawns.push(Game.spawns[name])
            }
        }
        return availableSpawns
    },    
    spawn: function(creepDisparity){
        var availableSpawns = this.getAvailableSpawns()
        if (availableSpawns.length == 0){
            return
        }
        for(var role in creepDisparity){
            if(creepDisparity[role] > 0){
                var newName = role + Game.time
                var spawn = availableSpawns.pop()
                spawn.spawnCreep(this.creepRoles[role], newName, {memory: {role: role}})
                creepDisparity[role]--
                if(availableSpawns.length == 0){
                    return
                }
            }
        }
    }
};