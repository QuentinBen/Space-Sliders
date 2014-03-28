function update() 
{
	stats.begin();
	
	context.clearRect(0, 0, 6000, 600);
	
	world.Step
	(
        1 / 60   //frame-rate
     ,  10       //velocity iterations
     ,  10       //position iterations
    );
	context.lineWidth = 1;
   // world.DrawDebugData();
	
    world.ClearForces();
	
	if(frame < 3)
	{
		drawBackgrounds();

		for (i = 0; i < neutralsTable.length; i++)
		{
			if(neutralsTable[i].tag == "SCENERY")
			{
				neutralsTable[i].bufferRender();
			}
		}
	}
      
	///// update bullets //////////
	for (i = 0; i < bulletTable.length; i++)
	{
		bulletTable[i].lifeTime -= 1;
		
		if(bulletTable[i].lifeTime <= 0)
		{
			bulletTable[i].hasCollideWall = true;
		}

		bulletTable[i].update();

		if(bulletTable[i].destroyed)
		{
			bulletTable.splice(i, 1);
		}
	}

	///// update bullets ennemy//////////
	for (i = 0; i < bulletStaticEnemyTable.length; i++)
	{
		
		bulletStaticEnemyTable[i].update();

		if(bulletStaticEnemyTable[i].destroyed)
		{
			bulletStaticEnemyTable.splice(i, 1);
		}
	}
	
	//// update platformes ////////
	for (i = 0; i < platformTable.length; i++)
	{
		platformTable[i].update();

		if(platformTable[i].destroyed)
		{
			platformTable.splice(i, 1);
		}
	}
	
	/////// Update Collectibles ////////////////////
	for(i=0;i<eggTable.length; i++)
	{
		eggTable[i].Update();
	
		if(eggTable[i].taken)
		{
			eggTable.splice(i,1);
		}
	
	}
	
	//////// update incateur de tracé des plateformes//////////
	
	if(isDrawing == true)
	{
		checkPlatformPosition();
	}

	////////// Update Ennemies///////////////////////
	for (i = 0; i < staticEnemiesTable.length; i++)
	{
		/*if(frame % enemyData[staticEnemiesTable[i].params.data].fireRate === 0)
		{
			staticEnemiesTable[i].checkPlayerInRange();
		}*/
		staticEnemiesTable[i].update();

		if(staticEnemiesTable[i].destroyed)
		{
			staticEnemiesTable.splice(i, 1);
		}
	}

	/////////// Lasers Update //////////////////
	for (i = 0; i < laserTable.length; i++)
	{
		laserTable[i].update();
	}

	////////// Mines Update /////////////////////
	for (i = 0; i < mineTable.length; i++)
	{
		mineTable[i].update();
		
		if(mineTable[i] && mineTable[i].destroyed)
		{
			mineTable.splice(i, 1);
		}
	}

	///////////raycast saut///////////////////
	player.isFalling = true;
		StartRay = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y);
	 	EndRay   = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y + player.params.radius + 0.1);
	  
        world.RayCast(callback, StartRay, EndRay);	
	

	///////// raycast de check si reverse slide possible//////////
	if(player.isSliding === true)
	{
		StartRay = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y);
	 	EndRay   = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y + player.params.radius*3);
	  
        world.RayCast(checkReversePossible, StartRay, EndRay);	
	}
	
	//////////// Raycast de check si player commence slide à l'envers ///////
	//if(player.isSliding === true)
		//{
		StartRayCheck = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y);
	 	EndRayCheck = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y - (player.params.radius+0.2));
	  
        world.RayCast(checkReverseFirst, StartRayCheck, EndRayCheck);	
		//}
	
	//////// raycast traçage plateformes /////////////
	if(isDrawing === true)
	{
		drawingCrossingElement = false;
		StartRayPlatform = new b2Vec2(firstPointX/30, firstPointY/30);
		
	 	EndRayPlatform = new b2Vec2(mouseX/30, mouseY/30);
		
		world.RayCast(setLineColor, StartRayPlatform, EndRayPlatform);

	}
	
	
	
	//// update checkpoints /////////
	for (i = 0; i < checkpointTable.length; i++)
	{
		checkpointTable[i].update();
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
	for (i = 0; i < characterTable.length; i++)
	{
		if(frame % weaponData[characterTable[i]].reloadRate === 0 && weaponData[characterTable[i]].ammo < weaponData[characterTable[i]].ammoCapacity)
		{
			weaponData[characterTable[i]].ammo += 1;
		}

		var wichBar  = "Ammo" + (characterTable[i]+1);
		var barWidth = weaponData[characterTable[i]].ammo*(ammoBarWidth/weaponData[characterTable[i]].ammoCapacity);
		
		if (weaponData[characterTable[i]].ammo <= 5)
		{
			document.getElementById(wichBar).style.backgroundColor = "rgb(255,0,0)";
		}
		else
		{
			document.getElementById(wichBar).style.backgroundColor = "rgb(0,255,50)";
		}

		document.getElementById(wichBar).style.width = barWidth + "px";
	}

	///// update player /////////
	player.update();
	
	//// update FX /////////
	for (i = 0; i < FxTable.length; i++)
	{
		FxTable[i].update();
	
		if(FxTable[i].ended == true)
		{
			FxTable.splice(i, 1);
		}
	}
	//// update platformes ////////
	for (i = 0; i < platformTable.length; i++)
	{
		platformTable[i].update();

		if(platformTable[i].destroyed)
		{
			platformTable.splice(i, 1);
		}
	}
	
	////////// Update Chrono //////////////////
	
	chronoLevel.Update();	

	selectedCharacter(selectedChar);
	
	camera.update();
	frame ++;
	
	if(chronoLevel.running = true)
	{
		chronoFrame ++;
	}


	stats.end();
	
};