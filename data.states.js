module.exports = {
    getState: function(){
        for (var state in this.states){
            if(this.states[state].check()) {
                return state
            }
        };
        //For now the first relevant state is returned
    },
    states: {
        genesis: {
            check: function(){
                var controller = Game.rooms[Object.keys(Game.rooms)[0]].controller
                return controller.level == 1
            },
            name: "Genesis",
            creepDistribution: {
                harvester: 1,
                upgrader: 2,
            }
        },
        first_base: {
            check: function(){
                var controller = Game.rooms[Object.keys(Game.rooms)[0]].controller
                return controller.level == 2
            },
            name: "First Base",
            creepDistribution: {
                harvester: 2,
                upgrader: 2,
            },
        }
    }
};

//TODO: these states can be modified by modifiers (e.g. being attacked)