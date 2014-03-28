var Laser = function(params)
{
	this.params 							 = params;
	this.y = this.params.y;
	this.x = this.params.x;
	this.fixLaser			   		 = new b2FixtureDef;
	this.fixLaser.filter.categoryBits  = trapData[0].CAT;
	this.fixLaser.filter.maskBits      = trapData[0].MASK;
	this.fixLaser.userData             = {tag : trapData[0].tag, obj : this};
	
	this.bodyLaser          			= new b2BodyDef;
	this.bodyLaser.type 				= b2Body.b2_kinematicBody;

	this.fixLaser.shape       		= new b2PolygonShape;
	this.fixLaser.shape.SetAsBox(trapData[0].w, trapData[0].h);
	this.bodyLaser.position.x 		= this.params.x;
	this.bodyLaser.position.y 		= this.params.y;
	
	
	this.direction = this.params.dir;
	this.bodyLaser = world.CreateBody(this.bodyLaser).CreateFixture(this.fixLaser);
	this.firstElementHit = false;
	this.positionVector                     = new b2Vec2(this.bodyLaser.GetBody().GetPosition().x, this.bodyLaser.GetBody().GetPosition().y);
	
	this.image                      = new Image();
	
	if(this.direction == "bas")
	{
		this.image.src                  = "images/Ennemies/Traps/laser_bas.png";
	}
	else
	{
		this.image.src                  = "images/Ennemies/Traps/laser_haut.png";
	}
	
	this.laserRange = 100;
	this.EndRay = {};
	this.EndRay.hitPoint = {};
	this.EndRay.hitPoint = 100000;
}

Laser.prototype.update = function()
{
	this.checkRange();
	this.render();
	this.drawLaser();
	this.checkIfPlayerHit();
}

Laser.prototype.checkRange = function() // raycast qui se fait du laser jusqu'à sa portée maximum
{
	this.StartRay = new b2Vec2(this.bodyLaser.GetBody().GetPosition().x, this.bodyLaser.GetBody().GetPosition().y);
	if(this.direction === "bas")
	{
		this.EndRay   = new b2Vec2(this.bodyLaser.GetBody().GetPosition().x, this.bodyLaser.GetBody().GetPosition().y + this.laserRange);
	}
	if(this.direction ==="haut")
	{
		this.EndRay   = new b2Vec2(this.bodyLaser.GetBody().GetPosition().x, this.bodyLaser.GetBody().GetPosition().y - this.laserRange);
	}
	
	this.firstElementHit = false;
	var that  = this;
    world.RayCast(function(elementHit,point){that.checkLaserHits(elementHit,point);}, this.StartRay, this.EndRay); //si le raycast touche un objet, j'appelle la fonction checkLaserHit
}

Laser.prototype.checkLaserHits = function(elementHit,point) // checklaserHit va vérifier quel élément est touché, et ajuster la range du laser en conséquence
{

	var currentElementHit;
	if(this.direction === "bas")
	{
		if (this.EndRay.y > point.y && elementHit.GetUserData().tag != "PLAYER")
			{
			this.EndRay = point;
			
			}
	}
	if(this.direction === "haut")
	{
		if (this.EndRay.y < point.y && elementHit.GetUserData().tag != "PLAYER")
				{
				this.EndRay = point;
				
				}
	}
}

Laser.prototype.checkIfPlayerHit = function()
{
	if(this.direction == "bas")
	{
		if(player.playerCollider.GetPosition().y <= this.EndRay.y && this.y < player.playerCollider.GetPosition().y)
		{
			if(player.playerCollider.GetPosition().x - player.params.radius < this.x && player.playerCollider.GetPosition().x + player.params.radius > this.x)
				player.death();
		}
	}
	if(this.direction == "haut")
	{
		if(player.playerCollider.GetPosition().y >= this.EndRay.y && this.y > player.playerCollider.GetPosition().y)
		{
			
			if( this.x > player.playerCollider.GetPosition().x - player.params.radius && player.playerCollider.GetPosition().x + player.params.radius > this.x)
			{
				player.death();
			}
		}
	}
}

Laser.prototype.drawLaser = function() // je dessine le laser en fonction de sa range calculée
{
		context.strokeStyle = "rgb(255,0,0)";
		
		context.beginPath();
		context.moveTo(this.x*30, this.y*30);
		context.lineTo(this.x*30, this.EndRay.y*30);
		context.lineWidth = 1;
		context.closePath();
		context.stroke();
}

Laser.prototype.render = function ()
{
	context.drawImage(this.image, 0, 0, 64, 64, this.bodyLaser.GetBody().GetPosition().x*30 - 32, this.bodyLaser.GetBody().GetPosition().y*30 - 35, 64, 64);
}