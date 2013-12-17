var Player = function(params)
{
	this.haveJump 						= false;
	this.params 						= params;

	this.fixPlayer 			   			= new b2FixtureDef;
	this.fixPlayer.density 	   			= this.params.d  || 1.0;
	this.fixPlayer.friction    			= this.params.f  || 0;
	this.fixPlayer.restitution		    = this.params.r  || 0;
	this.fixPlayer.filter.categoryBits  = this.params.CAT;
	this.fixPlayer.filter.maskBits      = this.params.MASK;
	this.fixPlayer.userData             = {tag : this.params.tag};

	this.bodyPlayer          			= new b2BodyDef;
	this.bodyPlayer.type 				= b2Body.b2_dynamicBody;

	this.fixPlayer.shape       			= new b2CircleShape(this.params.radius);
	this.bodyPlayer.position.x 			= this.params.x;
	this.bodyPlayer.position.y 			= this.params.y;

	this.bodyPlayer = world.CreateBody(this.bodyPlayer).CreateFixture(this.fixPlayer);
	
	
}

Player.prototype.move = function(sens)
{
	this.sens = sens;
	this.vel  = this.bodyPlayer.GetBody().GetLinearVelocity();

	if (this.sens === "left")
	{
		this.bodyPlayer.GetBody().ApplyImpulse(new b2Vec2(-40,0), this.bodyPlayer.GetBody().GetWorldCenter());
	
		if (this.vel.x < -15)
		{
			this.vel.x = -15;
		}
	}

	else if (this.sens === "right")
	{
		this.bodyPlayer.GetBody().ApplyImpulse(new b2Vec2(40,0), this.bodyPlayer.GetBody().GetWorldCenter());
		
		if (this.vel.x > 15)
		{
			this.vel.x = 15;
		}
	}

	else if (this.sens === "up")
	{
		if (this.haveJump === false)
		{
			this.bodyPlayer.GetBody().ApplyImpulse(new b2Vec2(0,-50), this.bodyPlayer.GetBody().GetWorldCenter());
			
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
	var x 		  	 = this.bodyPlayer.GetBody().GetPosition().x;
	var y 		  	 = this.bodyPlayer.GetBody().GetPosition().y;

	var vecangleShoot 	 = new b2Vec2((mouseX/30 - x)*10, (mouseY/30 - y)*10);
	
	bulletTable.push(new Bullet (x,y,vecangleShoot));
}

