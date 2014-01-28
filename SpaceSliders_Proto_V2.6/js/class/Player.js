var Player = function(params)
{
	this.haveJump 						= false;
	this.isSliding						= false;
	this.reverseSliding                 = false;
	this.canShoot    					= true;
	
	this.params 						= params;
	
	this.playerCollider                 = new colliderForPlayer(this, this.params);
	this.vel                            = this.playerCollider.GetLinearVelocity();
	
	
	this.update = function()
	{
		if (this.canShoot === false)
		{
			playerShootTimer += 1;

			if (playerShootTimer >= weaponData[selectedChar].fireRate)
			{
				this.canShoot = true;
				playerShootTimer = 0;
			}
		}

		if (this.reverseSliding === true && player.playerCollider)// si le joueur est en train de slider à l'envers, on INVERSE la gravité
		{
			var antigrav 						  = new b2Vec2(0, player.playerCollider.GetMass() * -world.GetGravity().y*2);
			player.playerCollider.ApplyForce( antigrav, player.playerCollider.GetWorldCenter());
		}

		if (this.isSliding === true && this.reverseSliding === false) // si le joueur slide normalement, on ANNULE simplement la gravité(peut etre pas necessaire)
		{
			var antigrav 						  = new b2Vec2(0, player.playerCollider.GetMass() * -world.GetGravity().y);
			player.playerCollider.ApplyForce( antigrav, player.playerCollider.GetWorldCenter());
		}

		this.render();
	}
}

Player.prototype.render = function()
{
	if (selectedChar === 0)
	{
		context.fillStyle = "rgb(28,134,238)";
	}

	if (selectedChar === 1)
	{
		context.fillStyle = "rgb(255,0,0)";
	}

	if (selectedChar === 2)
	{
		context.fillStyle = "rgb(0,205,0)";
	}

	if (selectedChar === 3)
	{
		context.fillStyle = "rgb(255,215,0)";
	}
	
	context.beginPath();
	context.arc(this.playerCollider.GetPosition().x*30 - 1, this.playerCollider.GetPosition().y*30 - 1, this.params.radius*30 + 2, 0, Math.PI*2);
	context.closePath();
	context.fill();
}

Player.prototype.move = function(sens)
{
	this.sens = sens;
	this.vel  = this.playerCollider.GetLinearVelocity();

		if (this.sens === "left")
		{
			if (this.haveJump === true)
			{
				this.playerCollider.ApplyImpulse(new b2Vec2(-10,0), this.playerCollider.GetWorldCenter());
				
				if (this.vel.x < -8)
				{
					this.vel.x = -8;
				}
			}

			else
			{
				this.playerCollider.ApplyImpulse(new b2Vec2(-40,0), this.playerCollider.GetWorldCenter());
			
				if (this.vel.x < -15)
				{
					this.vel.x = -15;
				}
			}
		}

		else if (this.sens === "right")
		{
			if (this.haveJump === true)
			{
				this.playerCollider.ApplyImpulse(new b2Vec2(20,0), this.playerCollider.GetWorldCenter());
				
				if (this.vel.x > 8)
				{
					this.vel.x = 8;
				}
			}

			else
			{
				this.playerCollider.ApplyImpulse(new b2Vec2(40,0), this.playerCollider.GetWorldCenter());
				
				if (this.vel.x > 15)
				{
					this.vel.x = 15;
				}
			}
		}
	
	else if (this.sens === "up")
	{
		if (this.haveJump === false)
		{
			this.playerCollider.ApplyImpulse(new b2Vec2(0,-50), this.playerCollider.GetWorldCenter());
			
			if (this.vel.y < -50)
			{
				this.vel.y = -50;
			}
			
			this.haveJump = true;
		}
	}

	else if (this.sens === "stop")
	{
		this.vel.x = 0;
	}
}

Player.prototype.shoot = function()
{
	if (this.canShoot === true && weaponData[selectedChar].ammo >= 1)
	{
		var x 		  	 = this.playerCollider.GetPosition().x;
		var y 		  	 = this.playerCollider.GetPosition().y;
		var PointX 	 	 = mouseX;
		var PointY     	 = mouseY;
			
		//var vecangleShoot 	 = new b2Vec2((mouseX/30 - x)*10, (mouseY/30 - y)*10);
		var angle = Math.atan2(PointY/30 - y, PointX/30- x)*180/Math.PI;
		var vecangleShoot 	 = new b2Vec2(weaponData[selectedChar].speed*Math.cos(angle*Math.PI/180),weaponData[selectedChar].speed*Math.sin(angle*Math.PI/180));
		
		bulletTable.push(new Bullet(x,y,vecangleShoot,selectedChar));
		weaponData[selectedChar].ammo -= 1;
		this.canShoot = false;
	}
}

 Player.prototype.slideImpulse = function(angle, playerBody, direction)
{
	if (direction === "droite")
	{
		var dir = new b2Vec2(player.params.slideSpeed*Math.cos(angle*Math.PI/180),player.params.slideSpeed*Math.sin(angle*Math.PI/180))
		
		player.vel = dir;
		playerBody.SetLinearVelocity(player.vel);	
	}

	else if (direction == "gauche")
	{
		var dir = new b2Vec2(-player.params.slideSpeed*Math.cos(angle*Math.PI/180),-player.params.slideSpeed*Math.sin(angle*Math.PI/180));
		player.vel = dir;
		playerBody.SetLinearVelocity(player.vel);
	}
}

var colliderForPlayer = function(_self, _params)
{
	this.params						    = _params;
	this.fixPlayer 			   			= new b2FixtureDef;
	this.fixPlayer.density 	   			= this.params.d  || 1;
	this.fixPlayer.friction    			= this.params.f  || 0;
	this.fixPlayer.restitution		    = this.params.r  || 0;
	this.fixPlayer.filter.categoryBits  = this.params.CAT;
	this.fixPlayer.filter.maskBits      = this.params.MASK;
	this.fixPlayer.userData             = {tag : this.params.tag, sliding : this.isSliding};

	this.bodyPlayer          			= new b2BodyDef;
	this.bodyPlayer.type 				= b2Body.b2_dynamicBody;

	this.fixPlayer.shape       			= new b2CircleShape(this.params.radius);
	this.bodyPlayer.position.x 			= this.params.x;
	this.bodyPlayer.position.y 			= this.params.y;
	
	this.bodyPlayer = world.CreateBody(this.bodyPlayer).CreateFixture(this.fixPlayer);
	return this.bodyPlayer.GetBody();
}

function reverseSliding(player, _params, xPlayer, yPlayer)
{
	player.playerCollider                 = new colliderForPlayer(this, _params, xPlayer, yPlayer+3);
	player.vel = player.playerCollider.GetLinearVelocity();
	
	if(player.playerCollider)
	{
		var antigrav 					  = new b2Vec2(0, player.playerCollider.GetMass() * -world.GetGravity().y*20);
		player.playerCollider.ApplyForce( antigrav, player.playerCollider.GetWorldCenter());
	}
}

function undoReverseSliding(player, _params, xPlayer, yPlayer)
{
	player.playerCollider                 = new colliderForPlayer(this, _params, xPlayer, yPlayer-3);
	player.vel = player.playerCollider.GetLinearVelocity();
	
	if(player.playerCollider)
	{
		var addGravity					  = new b2Vec2(0, player.playerCollider.GetMass() * world.GetGravity().y*20);
		player.playerCollider.ApplyForce( addGravity, player.playerCollider.GetWorldCenter());
	}		
}