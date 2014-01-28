function init()
{
	ammoBarWidth = 100;
	frame        = 0;
	count        = 15;

    stats        = new Stats();
    stats.setMode(0);

    document.body.appendChild(stats.domElement);
	
	world        = new b2World
    (
 		new b2Vec2(0, 50, 0)    //gravity
 		,  true                 //allow sleep
    );

    canvas  = document.getElementById("canvas");
    context = canvas.getContext('2d');
    
    loadLevel();

    camera  = new Camera();

    player  = new Player
    ({
            x          : 2
        ,   y          : 58.5
        ,   radius     : 0.8
        ,   type       : "dynamic"
        ,   CAT        : CATEGORY_PLAYER
        ,   MASK       : MASK_PLAYER
        ,   tag        : "PLAYER"
		,   slideSpeed : 7
    });

    var staticEnemy1 = new StaticEnemy
    ({
            x      : 37
        ,   y      : 58.2
        ,   life   : 4
		,   radius : 0.8
		,   range  : 10
        ,   type   : "static"
        ,   CAT    : CATEGORY_ENEMY
        ,   MASK   : MASK_ENEMY
        ,   tag    : "ENEMY"
    });
	
	var staticEnemy2 = new StaticEnemy
    ({
            x      : 5
        ,   y      : 50.7
        ,   life   : 4
		,   radius : 0.8
		,   range  : 10
        ,   type   : "static"
        ,   CAT    : CATEGORY_ENEMY
        ,   MASK   : MASK_ENEMY
        ,   tag    : "ENEMY"
    });
	
	staticEnemiesTable.push(staticEnemy1);
	staticEnemiesTable.push(staticEnemy2);
	
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
	    if    ((contact.GetFixtureB().GetUserData().tag	=== 'BULLET') 
		   && (contact.GetFixtureA().GetUserData().tag === 'SCENERY') 
		    || (contact.GetFixtureB().GetUserData().tag	=== 'BULLET_STATIC_ENEMY') 
		   && (contact.GetFixtureA().GetUserData().tag === 'SCENERY'))
        {
            contact.GetFixtureB().GetUserData().obj.hasCollideWall = true;
            
            if (contact.GetFixtureA().GetUserData().obj.life != null)
                {
                    contact.GetFixtureA().GetUserData().obj.looseLife();
                }
        }

        if    ((contact.GetFixtureB().GetUserData().tag === 'BULLET')
		   && (contact.GetFixtureA().GetUserData().tag === 'NEUTRAL')
           || (contact.GetFixtureB().GetUserData().tag === 'BULLET_STATIC_ENEMY')
		   && (contact.GetFixtureA().GetUserData().tag === 'NEUTRAL')
           || (contact.GetFixtureB().GetUserData().tag === 'BULLET')
		   && (contact.GetFixtureA().GetUserData().tag === 'PLATFORM')
		   || (contact.GetFixtureB().GetUserData().tag === 'BULLET_STATIC_ENEMY')
		   && (contact.GetFixtureA().GetUserData().tag === 'PLATFORM'))
	    {	   
		   contact.GetFixtureB().GetUserData().obj.hasCollideWall = true;
	    }

		if    ((contact.GetFixtureB().GetUserData().tag === 'BULLET')
		   && (contact.GetFixtureA().GetUserData().tag === 'NEUTRAL')
		   || (contact.GetFixtureB().GetUserData().tag === 'BULLET_STATIC_ENEMY')
		   && (contact.GetFixtureA().GetUserData().tag === 'NEUTRAL'))
        {
            contact.GetFixtureB().GetUserData().obj.hasCollideWall = true;
            
            if (contact.GetFixtureA().GetUserData().obj.life != null)
                {
                    contact.GetFixtureA().GetUserData().obj.looseLife();
                }
        }

        if    ((contact.GetFixtureB().GetUserData().tag === 'BULLET')
		   && (contact.GetFixtureA().GetUserData().tag === 'PLATFORM')) 
	    {	   
		   contact.GetFixtureB().GetUserData().obj.hasCollideWall = true;
	    }

		if    ((contact.GetFixtureA().GetUserData().tag === 'BULLET')
           && (contact.GetFixtureB().GetUserData().tag === 'ENEMY'))
        {
            contact.GetFixtureA().GetUserData().obj.hasCollideWall = true;
            contact.GetFixtureB().GetUserData().obj.looseLife(contact.GetFixtureA().GetUserData().dmg);
        }
		
		if   ((contact.GetFixtureA().GetUserData().tag === 'BULLET_STATIC_ENEMY')
           && (contact.GetFixtureB().GetUserData().tag === 'PLAYER'))
		   
		{
			contact.GetFixtureA().GetUserData().obj.hasCollideWall = true;
			alert("Try Again!");
		}
		
	}
	
	listener.EndContact = function(contact)
	{
	     if    (contact.GetFixtureB().GetUserData().tag	=== 'PLAYER'
		    && contact.GetFixtureA().GetUserData().tag	=== 'PLATFORM')
		{
			player.isSliding = false;
			
			if(player.reverseSliding === true && chronoReverseSlidingFalse === false)
			{
				TimerForVariableFalse();
			}
		}
		else if (contact.GetFixtureB().GetUserData().tag === 'PLATFORM'
		     &&  contact.GetFixtureA().GetUserData().tag === 'PLAYER')
		{
			player.isSliding = false;
			
			if (player.reverseSliding === true && chronoReverseSlidingFalse === false)
			{
				TimerForVariableFalse();
			}
			
		}
	}
	
	listener.PostSolve  = function(contact)
	{
	    if (contact.GetFixtureB().GetUserData().tag	=== 'PLAYER'
		&&  contact.GetFixtureA().GetUserData().tag	=== 'PLATFORM')
		{
			player.isSliding          = true;
			chronoReverseSlidingFalse = false;
			count                     = 15;
			player.slideImpulse(contact.GetFixtureA().GetUserData().angle,contact.GetFixtureB().GetBody(),contact.GetFixtureA().GetUserData().dir);	
		}
	}
	
	listener.PreSolve   = function(contact)
	{
	  
	}
	
	world.SetContactListener(listener);

    update();
};