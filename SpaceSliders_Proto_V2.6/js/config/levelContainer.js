function loadLevel()
{
    var mainGround = new Square
    ({
            x    : 20
        ,   y    : 59.5
        ,   w    : 20
        ,   h    : 0.5
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var leftWall = new Square
    ({
            x    : 0.5
        ,   y    : 50
        ,   w    : 0.5
        ,   h    : 10
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var rightWall = new Square
    ({
            x    : 39.5
        ,   y    : 53
        ,   w    : 0.5
        ,   h    : 7
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var interruptorDoor1 = new Square
    ({
            x       : 39.7
        ,   y       : 43
        ,   w       : 0.3
        ,   h       : 2
        ,   needInt : true
        ,   type    : "kinematic"
        ,   CAT     : CATEGORY_SCENERY
        ,   MASK    : MASK_SCENERY
        ,   tag     : "SCENERY"
    });

    doorsTable.push(interruptorDoor1);

    var plafond = new Square
    ({
            x    : 20
        ,   y    : 40
        ,   w    : 20
        ,   h    : 1
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var pf1 = new Square
    ({
            x    : 37
        ,   y    : 45.5
        ,   w    : 9
        ,   h    : 0.5
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var pf2 = new Square
    ({
            x    : 36
        ,   y    : 54
        ,   w    : 3
        ,   h    : 0.5
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var pf3 = new Square
    ({
            x    : 10.5
        ,   y    : 52
        ,   w    : 10.5
        ,   h    : 0.5
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var pf4 = new Square
    ({
            x    : 7
        ,   y    : 54
        ,   w    : 0.2
        ,   h    : 2.5
        ,   type : "static"
        ,   CAT  : CATEGORY_SCENERY
        ,   MASK : MASK_SCENERY
        ,   tag  : "SCENERY"
    });

    var prisonDoor = new Square
    ({
            x      : 7
        ,   y      : 57.7
        ,   w      : 0.1
        ,   h      : 1.3
        ,   life   : 5
        ,   type   : "kinematic"
        ,   CAT    : CATEGORY_SCENERY
        ,   MASK   : MASK_SCENERY
        ,   tag    : "SCENERY"
    });

    doorsTable.push(prisonDoor);

    var box1 = new Square
    ({
            x      : 31
        ,   y      : 58.2
        ,   w      : 0.8
        ,   h      : 0.8
        ,   life   : 3
        ,   type   : "dynamic"
        ,   CAT    : CATEGORY_NEUTRAL
        ,   MASK   : MASK_NEUTRAL
        ,   tag    : "NEUTRAL"
    });

    var box2 = new Square
    ({
            x      : 29
        ,   y      : 58.2
        ,   w      : 0.8
        ,   h      : 0.8
        ,   life   : 3
        ,   type   : "dynamic"
        ,   CAT    : CATEGORY_NEUTRAL
        ,   MASK   : MASK_NEUTRAL
        ,   tag    : "NEUTRAL"
    });

    var box3 = new Square
    ({
            x      : 30
        ,   y      : 56.6
        ,   w      : 0.8
        ,   h      : 0.8
        ,   life   : 3
        ,   type   : "dynamic"
        ,   CAT    : CATEGORY_NEUTRAL
        ,   MASK   : MASK_NEUTRAL
        ,   tag    : "NEUTRAL"
    });

    neutralsTable.push(box1);
    neutralsTable.push(box2);
    neutralsTable.push(box3);
};