function init() 
{
    stats   = new Stats();
    stats.setMode(0);
    document.body.appendChild(stats.domElement);

	world   = new b2World
    (
 		new b2Vec2(0, 50, 0)    //gravity
 		,  true                 //allow sleep
    );
		 
	canvas  = document.getElementById("canvas");
	context = canvas.getContext('2d');
    camera  = new Camera();

    var mainGround = new Square
    ({
    		x    : 0
    	,	y    : 17
    	,	w    : 50
    	,	h    : 0.5
    	,	type : "static"
    	,	CAT  : CATEGORY_SCENERY
    	,	MASK : MASK_SCENERY
    	,	tag  : "SCENERY"
    });
	
	var mainGround3 = new Square
    ({
    		x    : 0
    	,	y    : 25
    	,	w    : 50
    	,	h    : 0.5
    	,	type : "static"
    	,	CAT  : CATEGORY_SCENERY
    	,	MASK : MASK_SCENERY
    	,	tag  : "SCENERY"
    });
	var mainGroundWall = new Square
    ({
    		x    : 88
    	,	y    : 10
    	,	w    : 5
    	,	h    : 7
    	,	type : "static"
    	,	CAT  : CATEGORY_SCENERY
    	,	MASK : MASK_SCENERY
    	,	tag  : "SCENERY"
    });
	var mainGroundWall2 = new Square
    ({
    		x    : 75
    	,	y    : 26
    	,	w    : 10
    	,	h    : 10
    	,	type : "static"
    	,	CAT  : CATEGORY_SCENERY
    	,	MASK : MASK_SCENERY
    	,	tag  : "SCENERY"
    });

    var smallGround = new Square
    ({
    		x    : 0
    	,	y    : 13
    	,	w    : 10
    	,	h    : 0.5
    	,	type : "static"
    	,	CAT  : CATEGORY_SCENERY
    	,	MASK : MASK_SCENERY
    	,	tag  : "SCENERY"
    });

    var leftWall = new Square
    ({
    		x    : 0
    	,	y    : 13
    	,	w    : 0.5
    	,	h    : 9
    	,	type : "static"
    	,	CAT  : CATEGORY_SCENERY
    	,	MASK : MASK_SCENERY
    	,	tag  : "SCENERY"
    });

    var littleBox1 = new Square
    ({
    		x    : 20
    	,	y    : 2
    	,	w    : 1
    	,	h    : 1
    	,	type : "dynamic"
    	,	CAT  : CATEGORY_NEUTRAL
    	,	MASK : MASK_NEUTRAL
    	,	tag  : "NEUTRAL"
    });
	 var littleBox2 = new Square
    ({
    		x    : 20
    	,	y    : 2
    	,	w    : 1
    	,	h    : 1
    	,	type : "dynamic"
    	,	CAT  : CATEGORY_NEUTRAL
    	,	MASK : MASK_NEUTRAL
    	,	tag  : "NEUTRAL"
    });
	 var littleBox3 = new Square
    ({
    		x    : 67
    	,	y    : 3
    	,	w    : 1
    	,	h    : 1
    	,	type : "dynamic"
    	,	CAT  : CATEGORY_NEUTRAL
    	,	MASK : MASK_NEUTRAL
    	,	tag  : "NEUTRAL"
    });
	 var littleBox4 = new Square
    ({
    		x    : 67
    	,	y    : 3
    	,	w    : 1
    	,	h    : 1
    	,	type : "dynamic"
    	,	CAT  : CATEGORY_NEUTRAL
    	,	MASK : MASK_NEUTRAL
    	,	tag  : "NEUTRAL"
    });
	 var littleBox5 = new Square
    ({
    		x    : 67
    	,	y    : 3
    	,	w    : 1
    	,	h    : 1
    	,	type : "dynamic"
    	,	CAT  : CATEGORY_NEUTRAL
    	,	MASK : MASK_NEUTRAL
    	,	tag  : "NEUTRAL"
    });

    player = new Player
    ({
    		x      : 8
    	,	y      : 2
    	,	radius : 0.8
    	,	type   : "dynamic"
    	,	CAT    : CATEGORY_PLAYER
    	,	MASK   : MASK_PLAYER
    	,	tag    : "PLAYER"
    });	
	
	var staticEnemy1 = new StaticEnemy
    ({
            x      : 35
        ,   y      : 23
        ,   radius : 0.8
        ,   CAT    : CATEGORY_ENEMY
        ,   MASK   : MASK_ENEMY
        ,   tag    : "ENEMY"
        ,   life   : 5
    });
	var staticEnemy2 = new StaticEnemy
    ({
            x      : 90
        ,   y      : 2
        ,   radius : 0.8
        ,   CAT    : CATEGORY_ENEMY
        ,   MASK   : MASK_ENEMY
        ,   tag    : "ENEMY"
        ,   life   : 5
    });
    
    enemiesTable.push(staticEnemy1);
    enemiesTable.push(staticEnemy2);
    
    //setup debug draw
    var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		debugDraw.SetDrawScale(30.0);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);
         
    window.setInterval(update, 1000 / 60);
		 
		 
	canvas.addEventListener ("mousemove", getMouseCoor);
	canvas.addEventListener ("mousedown", checkState);
	canvas.addEventListener ("mouseup", platformEnd);

	var listener 		  = new b2Listener;

	listener.BeginContact = function(contact) 
	{
	   if     ((contact.GetFixtureB().GetUserData().tag	=== 'BULLET') 
			&& (contact.GetFixtureA().GetUserData().tag === 'SCENERY')
            || (contact.GetFixtureB().GetUserData().tag === 'BULLET')
			&& (contact.GetFixtureA().GetUserData().tag === 'NEUTRAL')
            || (contact.GetFixtureB().GetUserData().tag === 'BULLET')
			&& (contact.GetFixtureA().GetUserData().tag === 'PLATFORM')) 
	    {	   
		   contact.GetFixtureB().GetUserData().obj.hasCollideWall = true;
	    }
		if    ((contact.GetFixtureA().GetUserData().tag === 'BULLET')
            && (contact.GetFixtureB().GetUserData().tag === 'ENEMY'))
        {
            contact.GetFixtureA().GetUserData().obj.hasCollideWall = true;
            contact.GetFixtureB().GetUserData().obj.looseLife();
        }
		
	}
	
	listener.EndContact = function(contact)
	{
	     
	}
	
	listener.PostSolve  = function(contact)
	{
	    if    (contact.GetFixtureB().GetUserData().tag	=== 'PLAYER'
		    && contact.GetFixtureA().GetUserData().tag	=== 'PLATFORM')
		{
		console.log(contact.GetFixtureA().GetUserData().dir);
			slideImpulse(contact.GetFixtureA().GetUserData().angle,contact.GetFixtureB().GetBody(),contact.GetFixtureA().GetUserData().dir);
		}
	}
	
	listener.PreSolve   = function(contact)
	{
	    
	}
	
	world.SetContactListener(listener);

    update();
};