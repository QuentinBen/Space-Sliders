function init()
{
	ammoBarWidth = 70;
	scoreEggs = 0;
	frame = 0;
	chronoFrame = 0;
	count = 15;
	
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
	
	canvasBuffering = document.getElementById("canvasBuffering");
	contextBuffering = canvasBuffering.getContext('2d');
    
    loadLevel();

    camera  = new Camera();
	
	chronoLevel = new LevelTimer();
	
    player  = new Player
    ({
            x          : 10
        ,   y          : 0
        ,   radius     : 1.1
        ,   type       : "dynamic"
        ,   CAT        : CATEGORY_PLAYER
        ,   MASK       : MASK_PLAYER
        ,   tag        : "PLAYER"
		,   slideSpeed : 7
    });

    collectible1 = new AlienEgg
	({
			x      : 30
		,	y	   : 10
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 64
		,	y	   : 15
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 66
		,	y	   : 15
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 110.5
		,	y	   : 18.5
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 111.5
		,	y	   : 17.5
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 112.5
		,	y	   : 18.5
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 139.5
		,	y	   : 18.5
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 138.5
		,	y	   : 18.5
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 140.5
		,	y	   : 18.5
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 137.5
		,	y	   : 18.5
	});

	eggTable.push(collectible1);

	collectible1 = new AlienEgg
	({
			x      : 141.5
		,	y	   : 18.5
	});

	eggTable.push(collectible1);

	mine1 = new Mine
    ({
            x      : 44
        ,   y      : 18.5
	});

	mineTable.push(mine1);

	var staticEnemy1 = new StaticEnemy
    ({
            x      : 60
        ,   y      : 18.5
		,   data   : 0
    });

    staticEnemiesTable.push(staticEnemy1);

   var kamikazeEnemy = new StaticEnemy
    ({
            x      : 85
        ,   y      : 10
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var kamikazeEnemy = new StaticEnemy
    ({
            x      : 83
        ,   y      : 10
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var kamikazeEnemy = new StaticEnemy
    ({
            x      : 87
        ,   y      : 10
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var laser1 = new Laser
    ({
            x      : 85
        ,   y      : 19
		,   dir    : "haut"
		
    });

    laserTable.push(laser1);

    var kamikazeEnemy = new StaticEnemy
    ({
            x      : 111
        ,   y      : 17
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var kamikazeEnemy = new StaticEnemy
    ({
            x      : 112
        ,   y      : 16
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var staticEnemy1 = new StaticEnemy
    ({
            x      : 118
        ,   y      : 0
		,   data   : 3
    });

    staticEnemiesTable.push(staticEnemy1);

    var kamikazeEnemy = new StaticEnemy
    ({
            x      : 130
        ,   y      : 17
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);
	
	var kamikazeEnemy = new StaticEnemy
    ({
            x      : 128
        ,   y      : 17.5
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var kamikazeEnemy = new StaticEnemy
    ({
            x      : 148
        ,   y      : 17
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var kamikazeEnemy = new StaticEnemy
    ({
            x      : 150
        ,   y      : 18
		,   data   : 2
    });

    staticEnemiesTable.push(kamikazeEnemy);

    var laser1 = new Laser
    ({
            x      : 140
        ,   y      : 0
		,   dir    : "bas"
		
    });

    laserTable.push(laser1);

	 whichCharacterIsSelected = 1;
	
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
	canvas.addEventListener ("mousedown", function(e){
			if (e.button === 0)
		{
			player.shoot();
		}

		if (e.button === 2)
		{
			isDrawing = true;
			drawPlatform();
		}
			
	},false);
	canvas.addEventListener ("mouseup", function(e){
		if (e.button === 2)
		{
			platformEnd();
		}
	},false);

	var listener 		  = new b2Listener;

	listener.BeginContact = function(contact) 
	{
		if    (contact.GetFixtureB().GetUserData().tag	=== 'PLAYER'
		    && contact.GetFixtureA().GetUserData().tag	=== 'PLATFORM')
		{
			
			player.isSliding = true;
			player.slideAngle = contact.GetFixtureA().GetUserData().angle;
			player.slideSens = contact.GetFixtureA().GetUserData().dir;
			//player.slideImpulse(contact.GetFixtureA().GetUserData().angle,contact.GetFixtureB().GetBody(),contact.GetFixtureA().GetUserData().dir);	
		}
	
	    if    ((contact.GetFixtureB().GetUserData().tag	=== 'BULLET') 
		   && (contact.GetFixtureA().GetUserData().tag === 'SCENERY') 
		    || (contact.GetFixtureB().GetUserData().tag	=== 'BULLET_STATIC_ENEMY') 
		   && (contact.GetFixtureA().GetUserData().tag === 'SCENERY'))
        {
			if(contact.GetFixtureB().GetUserData().tag	=== 'BULLET' && weaponData[contact.GetFixtureB().GetUserData().obj.type].type == "rocket")
					{
						
						contact.GetFixtureB().GetUserData().obj.fragmented = true;
					}
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
			if(contact.GetFixtureB().GetUserData().tag	=== 'BULLET' && weaponData[contact.GetFixtureB().GetUserData().obj.type].type == "rocket")
					{
						
						contact.GetFixtureB().GetUserData().obj.fragmented = true;
					}
            contact.GetFixtureB().GetUserData().obj.hasCollideWall = true;
            
            if (contact.GetFixtureA().GetUserData().obj.life != null)
               {
                   contact.GetFixtureA().GetUserData().obj.looseLife(contact.GetFixtureB().GetUserData().dmg);
					
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
		
            
            contact.GetFixtureB().GetUserData().obj.looseLife(contact.GetFixtureA().GetUserData().dmg);
				if(weaponData[contact.GetFixtureA().GetUserData().obj.type].type == "rocket")
					{
						
						contact.GetFixtureA().GetUserData().obj.fragmented = true;
					}
					
			contact.GetFixtureA().GetUserData().obj.hasCollideWall = true;
        }
		
		if   ((contact.GetFixtureA().GetUserData().tag === 'BULLET_STATIC_ENEMY')
           && (contact.GetFixtureB().GetUserData().tag === 'PLAYER'))
		{
			contact.GetFixtureA().GetUserData().obj.hasCollideWall = true;
			contact.GetFixtureB().GetUserData().obj.death();
			
		}
		if   ((contact.GetFixtureA().GetUserData().tag === 'PLAYER')
           && (contact.GetFixtureB().GetUserData().tag === 'BULLET_STATIC_ENEMY'))
		{
			contact.GetFixtureB().GetUserData().obj.hasCollideWall = true;
			contact.GetFixtureA().GetUserData().obj.death();
		}
		
		if ((contact.GetFixtureA().GetUserData().tag === 'PLAYER')
			&& (contact.GetFixtureB().GetUserData().tag === 'ENEMY'))
		{
			contact.GetFixtureA().GetUserData().obj.death();
		}
		if ((contact.GetFixtureB().GetUserData().tag === 'PLAYER')
			&& (contact.GetFixtureA().GetUserData().tag === 'ENEMY'))
		{
			contact.GetFixtureB().GetUserData().obj.death();
		}
	}
	
	listener.EndContact = function(contact)
	{
	///////////////////////// Gestion platformes ///////////////////////
	     if    (contact.GetFixtureB().GetUserData().tag	=== 'PLAYER'
		    && contact.GetFixtureA().GetUserData().tag	=== 'PLATFORM')
		{
			player.isSliding = false;
			player.reverseSliding = false;
			
			
		}

		else if    (contact.GetFixtureB().GetUserData().tag	=== 'PLATFORM'
		    && contact.GetFixtureA().GetUserData().tag	=== 'PLAYER')
		{
			player.isSliding = false;
			player.reverseSliding = false;
			
			
			
		}
	}
	
	listener.PostSolve  = function(contact)
	{
	     
		
		
	}
	
	listener.PreSolve   = function(contact)
	{
	  
	}
	
	world.SetContactListener(listener);

    update();
};