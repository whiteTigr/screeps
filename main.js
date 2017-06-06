var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

var cfg = require('config');

var room_helper = require('room');

module.exports.loop = function () {
    console.log('-------------------------------------------------------');
    console.log(JSON.stringify(Game.cpu));
    
    var spawn = Game.spawns["z"];
    console.log('Room: ' + spawn.room.name + '; Energy: ' + spawn.energy);
    
    room_helper.init(spawn.room);
    
    var harvesters = 0;
    var upgraders = 0;
    var builders = 0;
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            harvesters += 1;
        } 
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            builders += 1;
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            upgraders += 1;
        }
    }
    
    console.log('h: ' + harvesters + '; u: ' + upgraders + '; b:' + builders);
    if (harvesters < max_harvesters)
    {
        console.log("Want spawn harvester");
        var res = spawn.canCreateCreep([WORK, CARRY, MOVE]);
        console.log(res);
        if (res == OK)
        {
            spawn.createCreep([WORK, CARRY, MOVE], {role: "harvester"});
        }
    } else if (upgraders < max_upgraders)
    {
        console.log("Want spawn upgrader");
        if (spawn.canCreateCreep([WORK, CARRY, MOVE]) == OK)
        {
            spawn.createCreep([WORK, CARRY, MOVE], {role: "upgrader"});
        }
    } else if (builders < max_builders)
    {
        console.log("Want spawn builder");
        if (spawn.canCreateCreep([WORK, CARRY, MOVE]) == OK)
        {
            spawn.createCreep([WORK, CARRY, MOVE], {role: "builder"});
            builders += 1;
        }
    }
    
    console.log("CPU: " + Game.cpu.getUsed().toPrecision(5) + " ms");
}