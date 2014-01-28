function update() 
{	
	stats.begin();

	world.Step
	(
        1 / 60   //frame-rate
     ,  10       //velocity iterations
     ,  10       //position iterations
    );
		
    world.DrawDebugData();
	
    world.ClearForces();
      
	///// update bullets //////////
	for (i = 0; i < bulletTable.length; i++)
	{
		bulletTable[i].lifeTime -= 1;
		
		if(bulletTable[i].lifeTime <= 0)
		{
			bulletTable[i].hasCollideWall = true;
			console.log("balle detruite");
		}
		bulletTable[i].update();

		if(bulletTable[i].destroyed)
		{
			bulletTable.splice(i, 1);
		}
	}
	///// update bullets ennemies//////////
	for (i = 0; i < bulletStaticEnemyTable.length; i++)
	{
		
		bulletStaticEnemyTable[i].update();

		if(bulletStaticEnemyTable[i].destroyed)
		{
			bulletStaticEnemyTable.splice(i, 1);
		}
	}

	///// update player /////////
	player.update();
	
	//// update platformes ////////
	for (i = 0; i < platformTable.length; i++)
	{
		platformTable[i].update();

		if(platformTable[i].destroyed)
		{
			platformTable.splice(i, 1);
		}
	}
	
	//////// update incateur de tracé des plateformes//////////
	
	if(isDrawing == true)
	{
		checkPlatformPosition();
	}

	////////// Static Enemies (tourelles)///////////////////////
	for (i = 0; i < staticEnemiesTable.length; i++)
	{
		if(frame % 90 === 0)
		{
			staticEnemiesTable[i].checkPlayerInRange();
		}
		staticEnemiesTable[i].update();

		if(staticEnemiesTable[i].destroyed)
		{
			staticEnemiesTable.splice(i, 1);
		}
	}

	///////////raycast saut///////////////////
	if(player.haveJump === true)
	{
		StartRay = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y);
	 	EndRay   = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y + 1);
	  
        world.RayCast(callback, StartRay, EndRay);	
	}
	
	//////// raycast traçage plateformes /////////////
	if(isDrawing === true)
	{
		drawingCrossingElement = false;
		StartRayPlatform = new b2Vec2(firstPointX/30, firstPointY/30);
		
	 	EndRayPlatform = new b2Vec2(mouseX/30, mouseY/30);
		
		world.RayCast(setLineColor, StartRayPlatform, EndRayPlatform);
	}
	
	///// décompte avant de passer player.reverseSliding en false ////////
	if(chronoReverseSlidingFalse === true)
	{
		count --;
		if(count === 0)
		{
			player.reverseSliding = false;
			count = 15;
		}
	}
	
	//// update doors /////////
	for (i = 0; i < doorsTable.length; i++)
	{
		doorsTable[i].update();

		if (!doorsTable[0].destroyed)
		{
			context.font      = "15px Calibri";
			context.fillStyle = "white";
			context.fillText("I must break dat Door !", player.playerCollider.GetPosition().x*30 - 30, player.playerCollider.GetPosition().y*30 - 30);
		}

		if(doorsTable[i].destroyed)
		{
			doorsTable.splice(i, 1);
		}
	}
	
	//// update neutrals /////////
	for (i = 0; i < neutralsTable.length; i++)
	{
		neutralsTable[i].update();

		if(neutralsTable[i].destroyed)
		{
			neutralsTable.splice(i, 1);
		}
	}

	/////// Update Munitions characters /////////
	for (i = 0; i < weaponData.length; i++)
	{
		if(frame % weaponData[i].reloadRate === 0 && weaponData[i].ammo < weaponData[i].ammoCapacity)
		{
			weaponData[i].ammo += 1;
		}
		var wichBar  = "Ammo"+(i+1);
		var barWidth = weaponData[i].ammo*(ammoBarWidth/weaponData[i].ammoCapacity);
		
		document.getElementById(wichBar).style.width = barWidth+"px";
	}

	selectedCharacter(selectedChar);
	
	camera.update();
	frame ++;
	stats.end();
};