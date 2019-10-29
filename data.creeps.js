module.exports = {
    getCreepDistributionDisparity: function(preferredDistribution){
        var disparity = _.cloneDeep(preferredDistribution);
        for(var name in Game.creeps) {
            disparity[Game.creeps[name].memory.role]--;
        }
        return disparity
    }
};
