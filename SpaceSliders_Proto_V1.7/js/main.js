function update() 
{	
	stats.begin();

	world.Step
	(
        1 / 60   //frame-rate
     ,  10       //velocity iterations
     ,  10       //position iterations
    );
		
      
	///// update bullets //////////
	for (i = 0; i < bulletTable.length; i++)
	{
		bulletTable[i].update();

		if(bulletTable[i].destroyed)
		{
			bulletTable.splice(i, 1);
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

	////////// Enemis///////////////////////
	for (i = 0; i < enemiesTable.length; i++)
	{
		enemiesTable[i].update();

		if(enemiesTable[i].destroyed)
		{
			enemiesTable.splice(i, 1);
		}
	}
	
	///////////raycast///////////////////
	if(player.haveJump === true)
	{
		StartRay = new b2Vec2(player.bodyPlayer.GetBody().GetPosition().x, player.bodyPlayer.GetBody().GetPosition().y);
	 	EndRay   = new b2Vec2(player.bodyPlayer.GetBody().GetPosition().x, player.bodyPlayer.GetBody().GetPosition().y + 1);
	  
        world.RayCast(callback, StartRay, EndRay);	
	}

	
    world.DrawDebugData();
    world.ClearForces();
	camera.update();

	stats.end();
};