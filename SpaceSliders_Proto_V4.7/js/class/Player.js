var Player = function(params)
{
	this.haveJump 						= false;
	this.isSliding						= false;
	this.reverseSliding                 = false;
	this.canShoot    					= true;
	this.canJump						= true;
	this.anglePlatformSliding;
	this.slideSens;	//"droite" ou "gauche"
	this.slideAngle;
	this.params 						= params;
	this.registerX						= this.params.x;
	this.registerY						= this.params.y;
	
	this.playerCollider                 = new colliderForPlayer(this, this.params);
	this.vel                            = this.playerCollider.GetLinearVelocity();
	this.invincibility 					= false;
	this.invincibilityTimer 			= 120;	
	this.canDraw 						= true;
	this.canReverse						= false;
	this.sens							= "stop";
	this.isFalling						= true;
	this.aimSide						= "RIGHT";
	this.pivotX							= 0;
	this.pivotY							= 0;

	this.image                          = new Image();
	this.armImage                       = new Image();
	this.image.src						= weaponData[selectedChar].animation.url;
	this.armImage.src					= weaponData[selectedChar].animation.urlWeapon;
	
	
	
	this.animState						= "IDLE_RIGHT";
	this.bGX                            = 0;
	this.bGXMax;
	this.lineAnim                       = 0;
	this.bGStep                         = 128;
	this.lineAnimWeapon					= 0;

Player.prototype.render = function()
{
	this.animFrameCounter();
	
	switch (this.animState){
		case "IDLE_RIGHT":
			this.lineAnim  = 0;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.idle.BGXMax;
		break;
		case "IDLE_LEFT":
			this.lineAnim  = 6;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.idle.BGXMax;
		break;
		case "WALK_RIGHT":
			this.lineAnim  = 1;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.walk.BGXMax;
		break;
		case "WALK_LEFT":
			this.lineAnim  = 7;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.walk.BGXMax;
		break;
		case "JUMP_RIGHT":
			this.lineAnim  = 2;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.jump.BGXMax;
		break;
		case "JUMP_LEFT":
			this.lineAnim  = 8;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.jump.BGXMax;
		break;
		case "SLIDE_RIGHT":
			this.lineAnim  = 4;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.slide.BGXMax;
		break;
		case "SLIDE_LEFT":
			this.lineAnim  = 10;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.slide.BGXMax;
		break;
		case "DEATH_RIGHT":
			this.lineAnim  = 5;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.death.BGXMax;
		break;
		case "DEATH_LEFT":
			this.lineAnim  = 11;
			this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.death.BGXMax;
		break;
	}
	
	if(this.animState == "SLIDE_RIGHT" && this.reverseSliding == true)
	{
		this.lineAnim  = 10;
		this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.slide.BGXMax;
	}
	if(this.animState == "SLIDE_LEFT" && this.reverseSliding == true)
	{
		this.lineAnim  = 4;
		this.bGXMax    = weaponData[selectedChar].animation.character.whichAnim.slide.BGXMax;
	}
	
	if((this.animState == "SLIDE_RIGHT"||this.animState == "SLIDE_LEFT") && this.reverseSliding == true)
	{
		if(this.slideSens == "droite")
		{	
			
				context.save();
				context.translate(this.playerCollider.GetPosition().x*30
							, this.playerCollider.GetPosition().y*30);
				
				context.rotate(Math.PI);
				
				context.drawImage
				(
					  this.image
					, this.bGX
					, this.lineAnim * weaponData[selectedChar].animation.character.frameAnimHeight
					, weaponData[selectedChar].animation.character.frameAnimWidth
					, weaponData[selectedChar].animation.character.frameAnimHeight
					, - weaponData[selectedChar].animation.character.centerXisAt
					, - weaponData[selectedChar].animation.character.centerYisAt
					, weaponData[selectedChar].animation.character.renderSizeX
					, weaponData[selectedChar].animation.character.renderSizeY
					
				);
				context.restore();
		}
	}
		/*
		else if(this.slideSens == "gauche")
		{
				context.save();
				context.translate(this.playerCollider.GetPosition().x*30
							, this.playerCollider.GetPosition().y*30);
				
				context.rotate(this.slideAngle + Math.PI);
				
				context.drawImage
				(
					  this.image
					, this.bGX
					, this.lineAnim * weaponData[selectedChar].animation.character.frameAnimHeight
					, weaponData[selectedChar].animation.character.frameAnimWidth
					, weaponData[selectedChar].animation.character.frameAnimHeight
					, - weaponData[selectedChar].animation.character.centerXisAt
					, - weaponData[selectedChar].animation.character.centerYisAt
					, weaponData[selectedChar].animation.character.renderSizeX
					, weaponData[selectedChar].animation.character.renderSizeY
					
				);
				context.restore();
		}
	}*/
	
	
	else{
	context.drawImage
		(
			  this.image
			, this.bGX
			, this.lineAnim * weaponData[selectedChar].animation.character.frameAnimHeight
			, weaponData[selectedChar].animation.character.frameAnimWidth
			, weaponData[selectedChar].animation.character.frameAnimHeight
			, this.playerCollider.GetPosition().x*30 - weaponData[selectedChar].animation.character.centerXisAt
			, this.playerCollider.GetPosition().y*30 - weaponData[selectedChar].animation.character.centerYisAt
			, weaponData[selectedChar].animation.character.renderSizeX
			, weaponData[selectedChar].animation.character.renderSizeY
		);
	}
}
Player.prototype.renderArm = function()
{
	var wichLine;
	var decalX;
	var decalY;
	var angleInversion;
	if(this.reverseSliding===false && this.aimSide === "RIGHT")
	{
		angleInversion = Math.PI;
		wichLine = 0;
		this.pivotX = weaponData[selectedChar].animation.weapon.pivotXRight;
		this.pivotY = weaponData[selectedChar].animation.weapon.pivotY;
		decalX = weaponData[selectedChar].animation.weapon.imageDecalXRight;
		decalY = weaponData[selectedChar].animation.weapon.imageDecalY;
	}
	if(this.reverseSliding===false && this.aimSide === "LEFT")
	{
		angleInversion = 0;
		wichLine = 128;
		this.pivotX = weaponData[selectedChar].animation.weapon.pivotXLeft;
		this.pivotY = weaponData[selectedChar].animation.weapon.pivotY;
		decalX = weaponData[selectedChar].animation.weapon.imageDecalXLeft;
		decalY = weaponData[selectedChar].animation.weapon.imageDecalY;
	}
	if(this.reverseSliding===true && this.aimSide ==="RIGHT")
	{
		angleInversion = 0;
		wichLine = 128;
		this.pivotX = -weaponData[selectedChar].animation.weapon.pivotXLeft;
		this.pivotY = -weaponData[selectedChar].animation.weapon.pivotY;
		decalX = weaponData[selectedChar].animation.weapon.imageDecalXLeft;
		decalY = weaponData[selectedChar].animation.weapon.imageDecalY;
	}
	if(this.reverseSliding===true && this.aimSide ==="LEFT")
	{
		angleInversion = Math.PI;
		wichLine = 0;
		this.pivotX = -weaponData[selectedChar].animation.weapon.pivotXRight;
		this.pivotY = -weaponData[selectedChar].animation.weapon.pivotY;
		decalX = weaponData[selectedChar].animation.weapon.imageDecalXRight;
		decalY = weaponData[selectedChar].animation.weapon.imageDecalY;
	}
	if(selectedChar == 3 && this.aimSide === "RIGHT" && (this.animState == "WALK_RIGHT"||this.animState == "WALK_LEFT"))
	{
		decalX = weaponData[selectedChar].animation.weapon.imageDecalXRightRun;
		decalY = weaponData[selectedChar].animation.weapon.imageDecalYRun;
	}
	if(selectedChar == 3 && this.aimSide === "LEFT" && (this.animState == "WALK_RIGHT"||this.animState == "WALK_LEFT"))
	{
		decalX = weaponData[selectedChar].animation.weapon.imageDecalXLeftRun;
		decalY = weaponData[selectedChar].animation.weapon.imageDecalYRun;
	}
	if(this.aimSide === "RIGHT")
	{
		var angleSight = Math.atan2
				(	
				    this.playerCollider.GetPosition().y - this.pivotY/30 - mouseY/30
				  , this.playerCollider.GetPosition().x - this.pivotX/30 - mouseX/30
				);

		context.save();

		context.translate(this.playerCollider.GetPosition().x*30 - this.pivotX
					, this.playerCollider.GetPosition().y*30 - this.pivotY);
		
		context.rotate(angleSight + angleInversion);
		
		context.drawImage
		(
			  this.armImage
			, weaponData[selectedChar].animation.weapon.bGxStart
			, wichLine
			, 128
			, 128
			, decalX
			, decalY
			, weaponData[selectedChar].animation.weapon.renderSize
			, weaponData[selectedChar].animation.weapon.renderSize
		);
	}
	else
	{
		var angleSight = Math.atan2
				(	
				    this.playerCollider.GetPosition().y - this.pivotY/30 - mouseY/30
				  , this.playerCollider.GetPosition().x - this.pivotX/30 - mouseX/30
				);

		context.save();

		context.translate(this.playerCollider.GetPosition().x*30 - this.pivotX
					, this.playerCollider.GetPosition().y*30 - this.pivotY);
		
		context.rotate(angleSight + angleInversion);
		
		context.drawImage
		(
			  this.armImage
			, weaponData[selectedChar].animation.weapon.bGxStart
			, wichLine
			, 128
			, 128
			, decalX
			, weaponData[selectedChar].animation.weapon.imageDecalY
			, weaponData[selectedChar].animation.weapon.renderSize
			, weaponData[selectedChar].animation.weapon.renderSize
		);
	}

	context.restore();
	//////// Dessin point de pivow ////////////////
	context.fillStyle = "rgba(255,0,0,1)";
	context.beginPath();
	context.arc(this.playerCollider.GetPosition().x*30 - this.pivotX
				, this.playerCollider.GetPosition().y*30 - this.pivotY, 1, 0, Math.PI*2);
	context.closePath();
	context.fill();
	//////////////////////////////////////////////
}
Player.prototype.animFrameCounter = function()
{
	if (this.bGX < this.bGXMax)
	{
		if (frame % 7 === 0)
		{
			this.bGX += this.bGStep;
		}
	}
	if (this.bGX >= this.bGXMax)
	{
		 this.bGX = 0;
	}

	return this.bGX;
}
	
Player.prototype.update = function()
	{
		
		/////// dégueulasse, faire une fonction pour l'invulnérabilité du joueur sinon ça fait vomir///////
		if (this.invincibility === true)
		{
			this.invincibilityTimer -= 1;

			if (this.invincibilityTimer <= 0)
			{
				this.invincibility = false;
				this.invincibilityTimer = 120;
				this.canDraw = true;
			}
			
			if (frame%10==0)
			{
				if(this.canDraw == false)
					this.canDraw = true;
				else
					this.canDraw = false;
			}
		}
		if(this.invincibility === false)
		{
			this.canDraw = true;
		}
		/////////////////////////////////////////////////////////////////////////
		
		if (this.canShoot === false)
		{
			playerShootTimer += 1;

			if (playerShootTimer >= weaponData[selectedChar].fireRate)
			{
				this.canShoot = true;
				playerShootTimer = 0;
			}
		}
		
		
		if (this.canDraw === true)
		{
			this.render();
			this.renderArm();
		}
		
		if(this.isSliding === true)
		{
			this.slideImpulse();
		}
		
		this.checkAimSide(); // fonction qui va checker si le viseur est à gauche ou à droite du joueur
		
		if(this.playerCollider.GetPosition().y*30 >= 1300)
		{
			this.respawnCheckpoint();
		}
		
	}
}


Player.prototype.move = function(sens)
{
	this.sens = sens;
	this.vel  = this.playerCollider.GetLinearVelocity();
	
	if (this.sens === "left")
	{
		
		if(this.aimSide === "LEFT")
		{
		this.animState = "WALK_LEFT";
		}
		else{
		this.animState = "WALK_RIGHT";
		}
		/////// A Ameliorer (parce que c'est vraiment dégueulasse (et je sais meme plus à quoi ça sert /////////////
		if(this.haveJump === true)
		{
			this.playerCollider.ApplyImpulse(new b2Vec2(-20,0), this.playerCollider.GetWorldCenter());
			if (this.vel.x < -10)
			{
				this.vel.x = -10;
			}
		}
		else if(this.haveJump === false && this.isFalling === false){

		this.playerCollider.SetAwake(true);
		var dir    = new b2Vec2(-10, 0)
		player.vel = dir;
		player.playerCollider.SetLinearVelocity(player.vel);
		}
		else if(this.haveJump === false && this.isFalling === true){
			this.playerCollider.ApplyImpulse(new b2Vec2(-20,0), this.playerCollider.GetWorldCenter());
			if (this.vel.x < -10)
			{
				this.vel.x = -10;
			}
		}
		////////////////////////////////////////////////////////////////////////////////////////////
	}
	else if (this.sens === "right")
	{
		if(this.aimSide === "LEFT")
		{
		this.animState = "WALK_LEFT";
		}
		else{
		this.animState = "WALK_RIGHT";
		}

		if(this.haveJump === true)
		{
			this.playerCollider.ApplyImpulse(new b2Vec2(20,0), this.playerCollider.GetWorldCenter());
			
			if (this.vel.x > 10)
			{
				this.vel.x = 10;
			}
		}
		else if(this.haveJump === false && this.isFalling === false)
		{
			this.playerCollider.SetAwake(true);
			var dir    = new b2Vec2(10, 0)
			player.vel = dir;
			player.playerCollider.SetLinearVelocity(player.vel);
			
		}
		else if(this.haveJump === false && this.isFalling === true){
			this.playerCollider.ApplyImpulse(new b2Vec2(20,0), this.playerCollider.GetWorldCenter());
			if (this.vel.x > 10)
			{
				this.vel.x = 10;
			}
		}
	}
	else if (this.sens === "up")
	{
		if (this.haveJump === false && this.canJump === true && this.reverseSliding === false)
		{
			if(this.isSliding == true)
			{
				
				this.isSliding = false;
				this.playerCollider.ApplyImpulse(new b2Vec2(0,-70), this.playerCollider.GetWorldCenter());
			}
			else
			{
				this.playerCollider.ApplyImpulse(new b2Vec2(0,-90), this.playerCollider.GetWorldCenter());
				
				if (this.vel.y < -50)
				{
					this.vel.y = -50;
				}
			}
			this.haveJump = true;
			this.canJump = false;
		}

		if (this.aimSide === "LEFT")
		{
			this.animState = "JUMP_LEFT";
		}
		else
		{
			this.animState = "JUMP_RIGHT";
		}
	}
	else if (this.sens === "stop" && this.isSliding === false)
	{
		if (this.aimSide === "LEFT")
		{
			this.animState = "IDLE_LEFT";
		}
		else
		{
			this.animState = "IDLE_RIGHT";
		}

		this.vel.x = 0;
	}
	
}
Player.prototype.death = function()
{
		
	if(this.invincibility === false)
	{
		
		if(characterTable.length >= 1)
		{
			
			for(i = 0; i < characterTable.length; i++)
			{
				if(characterTable[i] === selectedChar)
				{
					var characterUI  = "Character" + (selectedChar+1);
					document.getElementById(characterUI).style.backgroundImage = weaponData[selectedChar].uiDeath;
					characterTable.splice(i, 1);
				}
			}
			if (characterTable.length >= 1)
			{
				selectedChar         = characterTable[0];
				this.image.src		 = weaponData[selectedChar].animation.url;
				this.armImage.src	 = weaponData[selectedChar].animation.urlWeapon;
				this.invincibility   = true;
			}
			else
			{
				window.location.href = "menu.html";
			}
		}
	}
}

Player.prototype.shoot = function()
{
	if(this.canShoot === true && weaponData[selectedChar].ammo >=1)
	{
		var x 		  	  = this.playerCollider.GetPosition().x;
		var y 		  	  = this.playerCollider.GetPosition().y;
		var PointX 	 	  = mouseX;
		var PointY     	  = mouseY;
			
		var angle         = Math.atan2(PointY/30 - y, PointX/30- x)*180/Math.PI;
		var vecangleShoot = new b2Vec2(weaponData[selectedChar].speed*Math.cos(angle*Math.PI/180),weaponData[selectedChar].speed*Math.sin(angle*Math.PI/180));
		
		bulletTable.push(new Bullet (x,y,vecangleShoot,selectedChar));
		weaponData[selectedChar].ammo -= 1;
		this.canShoot     = false;
		this.shootAnim	  = true;
	}
}


 Player.prototype.slideImpulse = function()
{
	//this.playerCollider.angle = this.slideAngle;
	
		if (this.reverseSliding === true)// si le joueur est en train de slider à l'envers, on INVERSE la gravité
		{
			
			var antigrav 						  = new b2Vec2(0, player.playerCollider.GetMass() * -world.GetGravity().y);
			player.playerCollider.ApplyForce(antigrav, player.playerCollider.GetWorldCenter());
			
			var antigrav2 = new b2Vec2(30*Math.cos(this.slideAngle-Math.PI/2)
									  , 30*Math.sin(this.slideAngle-Math.PI/2))
			player.playerCollider.ApplyForce(antigrav2, player.playerCollider.GetWorldCenter());
		}
		if (this.reverseSliding === false) // si le joueur slide normalement, on ANNULE simplement la gravité(peut etre pas necessaire)
		{
			var antigrav 						  = new b2Vec2(0, player.playerCollider.GetMass() * -world.GetGravity().y);
			player.playerCollider.ApplyForce(antigrav, player.playerCollider.GetWorldCenter());
		}
	
		
					
				var dir    = new b2Vec2(player.params.slideSpeed*Math.cos(this.slideAngle)
									  , player.params.slideSpeed*Math.sin(this.slideAngle))
			
				this.playerCollider.SetLinearVelocity(dir);
				
			
		
			if(this.aimSide === "LEFT")
			{
				this.animState = "SLIDE_LEFT";
			}
			else
			{
				this.animState = "SLIDE_RIGHT";	
			}
		
	
	
}

var colliderForPlayer = function(_self, _params, x, y)
{
	this.params						    = _params;
	this.fixPlayer 			   			= new b2FixtureDef;
	this.fixPlayer.density 	   			= this.params.d  || 1;
	this.fixPlayer.friction    			= this.params.f  || 0;
	this.fixPlayer.restitution		    = this.params.r  || 0;
	this.fixPlayer.filter.categoryBits  = this.params.CAT;
	this.fixPlayer.filter.maskBits      = this.params.MASK;
	this.fixPlayer.userData             = {tag : this.params.tag, obj:_self, sliding:this.isSliding};

	this.bodyPlayer          			= new b2BodyDef;
	this.bodyPlayer.type 				= b2Body.b2_dynamicBody;

	this.fixPlayer.shape       			= new b2CircleShape(this.params.radius);
	this.bodyPlayer.position.x 			= x || this.params.x;
	this.bodyPlayer.position.y 			= y || this.params.y;
	
	this.bodyPlayer = world.CreateBody(this.bodyPlayer).CreateFixture(this.fixPlayer);
	return this.bodyPlayer.GetBody();
}

function reverseSliding(player, _params, xPlayer, yPlayer)
{
	
		player.playerCollider                 = new colliderForPlayer(player, _params, xPlayer, yPlayer+player.params.radius*1.5);
		player.vel = player.playerCollider.GetLinearVelocity();
		
		if(player.playerCollider)
		{
			var antigrav 					  = new b2Vec2(0, player.playerCollider.GetMass() * -world.GetGravity().y*2);
			player.playerCollider.ApplyForce( antigrav, player.playerCollider.GetWorldCenter());
		}	
	
}

function undoReverseSliding(player, _params, xPlayer, yPlayer)
{	
	player.playerCollider                 = new colliderForPlayer(player, _params, xPlayer, yPlayer - (player.params.radius*2));
	player.vel = player.playerCollider.GetLinearVelocity();
	
	if(player.playerCollider)
	{
		var addGravity					  = new b2Vec2(0, player.playerCollider.GetMass() * world.GetGravity().y*2);
		player.playerCollider.ApplyForce( addGravity, player.playerCollider.GetWorldCenter());
	}	
}

Player.prototype.checkAimSide = function()
{
	if(mouseX/30 > this.playerCollider.GetPosition().x)
	{
		this.aimSide = "RIGHT";
	}
	else
	{
		this.aimSide = "LEFT";
	}
	if(this.isSliding=== true)
	{
		if (this.aimSide === "LEFT")
		{
			this.animState = "SLIDE_LEFT";
		}
		else
		{
			this.animState = "SLIDE_RIGHT";
		}
	}
	else
	{
		if(this.sens === "stop")
		{
			if (this.aimSide === "LEFT")
			{
				this.animState = "IDLE_LEFT";
			}
			else
			{
				this.animState = "IDLE_RIGHT";
			}
		}
		if(this.sens ==="up")
		{
			if (this.aimSide === "LEFT")
			{
				this.animState = "JUMP_LEFT";
			}
			else
			{
				this.animState = "JUMP_RIGHT";
			}
		}
	}
	
}
Player.prototype.respawnCheckpoint = function()
{
	world.DestroyBody(this.playerCollider);
	this.playerCollider                 = new colliderForPlayer(player, this.params,this.registerX/30, this.registerY/30);
	this.death();
}