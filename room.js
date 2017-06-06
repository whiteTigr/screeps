var room_info = {};

function add_source(source)
{
    room_info.source = {};
    room_info.source[source.id] = {};
    var current = room_info.source[source.id];
    var pos = source.pos;
    current.pos = pos;
    current.work_cell = {};
    var work_cell = current.work_cell;
    var cell = source.room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true);
    var index = 0;
    for(var i in cell)
    {
        if (cell[i].type == "terrain" && (cell[i].terrain == "plain" || cell[i].terrain == "swamp"))
        {
            work_cell[index] = {};
            work_cell[index].pos = source.room.getPositionAt(cell[i].x, cell[i].y);
            work_cell[index].target_id = source.id;
            index += 1;
        }
    }
    console.log("Work cells: " + JSON.stringify(work_cell));
}

function init_sources(room)
{
    var sources = room.find(FIND_SOURCES);
    
    for(var i in sources)
    {
        add_source(sources[i]);
    }
}

var room_helper = {
    init: function(room)
    {
        console.log('Init room: ' + room.name);
        
        //if (room_info.name && room_info.name == room.name)
        //    return;
            
        room_info.name = room.name;
        console.log("Room info: " + JSON.stringify(room_info));
        
        init_sources(room);
    },
    
    update_usage: function()
    {
           
    }
}

module.exports = room_helper;