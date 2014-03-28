
var StaticEnemy = function(params)
{
	this.params 							 = params;
	
	this.destroyed							 = false;

	this.fixStaticEnemy 			   		 = new b2FixtureDef;
	this.fixStaticEnemy.filter.categoryBits  = enemyData[this.params.data].CAT;
	this.fixStaticEnemy.filter.maskBits      = enemyData[this.params.data].MASK;
	this.fixStaticEnemy.userData             = {tag : enemyData[this.params.data].tag, obj : this};
	
	this.type								= enemyData[this.params.data].type;
	this.bodyStaticEnemy          			= new b2BodyDef;
	
	this.bodyStaticEnemy.type 				= enemyData[this.params.data].bodyType;
	
	
	this.fixStaticEnemy.shape       		= new b2CircleShape(enemyData[this.params.data].radius);
	
	
	this.bodyStaticEnemy.position.x 		= this.params.x;
	this.bodyStaticEnemy.position.y 		= this.params.y;
	this.range								= enemyData[this.params.data].detectionRange;
	this.life								= enemyData[this.params.data].life;
	this.canSeePlayer						= true;
	this.lockedPlayer						= false; // lockedPlayer est la detection du player pour les ennemis qui le suivent
	this.attackType 						= enemyData[this.params.data].attackType;
	this.variableAim                        = [0,0,0,5,10,15];
	this.wokeUp								= false;
	this.bodyStaticEnemy 					= world.CreateBody(this.bodyStaticEnemy).CreateFixture(this.fixStaticEnemy);
	
	this.positionVector                     = new b2Vec2(this.bodyStaticEnemy.GetBody().GetPosition().x, this.bodyStaticEnemy.GetBody().GetPosition().y);
	this.antigrav							= new b2Vec2(0, this.bodyStaticEnemy.GetBody().GetMass() * -world.GetGravity().y);

	this.image                              = new Image();
	this.bGX                                = 0;
	this.bGY                                = 0;
	this.bGStep								= 128;


	if (this.attackType === "kamikaze")
	{
		this.image.src                      = "images/Ennemies/kamikaze.png";
	}

	if (this.attackType === "ranged")
	{
		this.image.src = enemyData[this.params.data].wakeUpSkin;
	}
}

StaticEnemy.prototype.render = function()
{
	if (this.attackType === "kamikaze")
	{
		this.renderKamikaze();
	}

	if (this.attackType === "ranged")
	{
		this.renderTurret();
	}
}

StaticEnemy.prototype.update = function()
{
	if (this.life <= 0)
	{
		this.die();
	}

	this.checkPlayerInRange();
	this.render();
	
	if(this.attackType === "kamikaze" && this.lockedPlayer === true)
	{
		this.attack();
	}
}

StaticEnemy.prototype.checkPlayerInRange = function()
{
		var distancePlayer = Math.sqrt(Math.pow(this.params.x-player.playerCollider.GetPosition().x,2)
						     +(Math.pow(this.params.y-player.playerCollider.GetPosition().y,2)))/2;
		
		if(distancePlayer <= this.range)
		{
			this.canSeePlayer     = true;
			this.checkIfObjectInRange();
			
			if(this.canSeePlayer == true && frame%enemyData[this.params.data].fireRate == 0)
			{
				this.playerIsDetected = true;
				this.lockedPlayer = true;
				this.attack();
			}
		}
}

StaticEnemy.prototype.checkIfObjectInRange = function()
{
		this.StartView = new b2Vec2(this.bodyStaticEnemy.GetBody().GetPosition().x, this.bodyStaticEnemy.GetBody().GetPosition().y);
		this.EndView  = new b2Vec2(player.playerCollider.GetPosition().x, player.playerCollider.GetPosition().y);
		var that = this;
		world.RayCast(function(elementHit){that.checkIfObject(elementHit); }, this.StartView, this.EndView);
}

StaticEnemy.prototype.checkIfObject = function(elementHit)
{
	if (elementHit.GetUserData().tag === "SCENERY" || elementHit.GetUserData().tag === "NEUTRAL")
	{
		
		this.canSeePlayer = false;
	}
}

StaticEnemy.prototype.attack = function(hitObject)
{
	
		var xEnemy 		  	 = this.bodyStaticEnemy.GetBody().GetPosition().x;
		var xPlayer 		 = player.playerCollider.GetPosition().x;
		
		var yEnemy 		  	 = this.bodyStaticEnemy.GetBody().GetPosition().y;
		var yPlayer 		 = player.playerCollider.GetPosition().y;
		
		var angle = Math.atan2(yPlayer - yEnemy, xPlayer- xEnemy)*180/Math.PI;
		
			if(this.attackType == "ranged")
			{
				var decalAim = this.variableAim[Math.floor(Math.random()*(this.variableAim.length))];
				
				angle += decalAim;
				
				var vecangleShoot = new b2Vec2(enemyData[this.params.data].bulletSpeed*Math.cos(angle*Math.PI/180)
									,enemyData[this.params.data].bulletSpeed*Math.sin(angle*Math.PI/180));
				
				bulletStaticEnemyTable.push(new BulletStaticEnemy (xEnemy,yEnemy,vecangleShoot,this.params.data));
			}

			if(this.attackType == "kamikaze")
			{
				var trajectoire = new b2Vec2(enemyData[this.params.data].moveSpeed*Math.cos(angle*Math.PI/180)
									,enemyData[this.params.data].moveSpeed*Math.sin(angle*Math.PI/180));
				this.lockedPlayer = true;
				this.bodyStaticEnemy.GetBody().SetAwake(true);
				this.bodyStaticEnemy.GetBody().SetLinearVelocity(trajectoire);
				
			}
}

StaticEnemy.prototype.looseLife = function(lostLife)
{
	this.life -= lostLife;
}

StaticEnemy.prototype.die = function()
{
	world.DestroyBody(this.bodyStaticEnemy.GetBody());
	this.destroyed = true;
	var explosionEnemy = new Fx(this.bodyStaticEnemy.GetBody().GetPosition().x, this.bodyStaticEnemy.GetBody().GetPosition().y,0);
	FxTable.push(explosionEnemy);
}

StaticEnemy.prototype.renderKamikaze = function()
{
	if (!this.playerIsDetected)
	{
		this.bGY                         = 0;
		this.bGXMax                      = 256;
		this.randomSpeedFrame            = Math.floor(Math.random()*20) + 20;

		if (frame % this.randomSpeedFrame === 0)
		{
			if (this.bGX < this.bGXMax)
			{
				this.bGX += this.bGStep;
			}
			else
		 		this.bGX = 0;
		}
	}
	else
	{
		this.bGY                         = 128;
		this.bGXMax                      = 256;

		if (frame % 30 === 0)
		{
			if (this.bGX < this.bGXMax)
			{
				this.bGX += this.bGStep;
			}
		}
	}
	
	context.drawImage(this.image, this.bGX, this.bGY, 128, 128, this.bodyStaticEnemy.GetBody().GetPosition().x*30 - 47, this.bodyStaticEnemy.GetBody().GetPosition().y*30 - 47, 90, 90);
}

StaticEnemy.prototype.renderTurret = function()
{
	if(this.wokeUp === false)
	{
		if (!this.playerIsDetected)
		{
			this.bGX    = 0;
		}

		else
		{
			this.bGXMax = 896;

			if (frame % 10 === 0)
			{
				if (this.bGX < this.bGXMax)
				{
					this.bGX += this.bGStep;
				}
				if(this.bGX == this.bGXMax)
				{
					this.wokeUp = true;
					this.image.src = enemyData[this.params.data].shootingSkin;;
				}
			}
		}

		context.drawImage(this.image, this.bGX, this.bGY, 128, 128,
		this.bodyStaticEnemy.GetBody().GetPosition().x*30 - enemyData[this.params.data].animation.decalX,
		this.bodyStaticEnemy.GetBody().GetPosition().y*30 - enemyData[this.params.data].animation.decalY,
		enemyData[this.params.data].animation.renderSize,	enemyData[this.params.data].animation.renderSize);
	}
	else if(this.wokeUp === true)
	{
	
		context.drawImage(this.image, 0, 0, 128, 128,
		this.bodyStaticEnemy.GetBody().GetPosition().x*30 - enemyData[this.params.data].animation.decalX,
		this.bodyStaticEnemy.GetBody().GetPosition().y*30 - enemyData[this.params.data].animation.decalY,
		enemyData[this.params.data].animation.renderSize,	enemyData[this.params.data].animation.renderSize);
		var angleSight = Math.atan2
				(	
				    this.bodyStaticEnemy.GetBody().GetPosition().y - enemyData[this.params.data].animation.pivotY/30 - player.playerCollider.GetPosition().y
				  , this.bodyStaticEnemy.GetBody().GetPosition().x - enemyData[this.params.data].animation.pivotX/30 - player.playerCollider.GetPosition().x
				);

		context.save();

		context.translate(this.bodyStaticEnemy.GetBody().GetPosition().x*30 - enemyData[this.params.data].animation.pivotX
					, this.bodyStaticEnemy.GetBody().GetPosition().y*30 - enemyData[this.params.data].animation.pivotY);
		
		context.rotate(angleSight);
		
		context.drawImage
		(
			  this.image
			, 128
			, 0
			, 128
			, 128
			, enemyData[this.params.data].animation.decalXCanon
			, enemyData[this.params.data].animation.decalYCanon
			, enemyData[this.params.data].animation.renderSize
			, enemyData[this.params.data].animation.renderSize
		);
		
		context.restore();
		
		
		//////// Dessin point de pivow ////////////////
	context.fillStyle = "rgba(255,0,0,1)";
	context.beginPath();
	context.arc(this.bodyStaticEnemy.GetBody().GetPosition().x*30 - enemyData[this.params.data].animation.pivotX
				, this.bodyStaticEnemy.GetBody().GetPosition().y*30 - enemyData[this.params.data].animation.pivotY, 1, 0, Math.PI*2);
	context.closePath();
	context.fill();
	//////////////////////////////////////////////
	}
}