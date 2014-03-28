var AlienEgg = function(params)
{
	this.params 					 = params;
	
	this.taken						 = false;

	this.fixEgg			   		     = new b2FixtureDef;
	this.fixEgg.filter.categoryBits  = CATEGORY_COLLECTIBLE;
	this.fixEgg.filter.maskBits      = MASK_COLLECTIBLE;
	this.fixEgg.userData             = {tag : "EGG", obj : this};
	
	 
	this.bodyEgg          			= new b2BodyDef;
	
	this.bodyEgg.type 				= b2Body.b2_kinematicBody;
	
	this.takenDistance				= 0;
	this.radius   					= 0.3;
	this.fixEgg.shape       		= new b2CircleShape(this.radius);
	
	this.bodyEgg.position.x 		= this.params.x;
	this.bodyEgg.position.y 		= this.params.y;
	
	this.bodyEgg 					= world.CreateBody(this.bodyEgg).CreateFixture(this.fixEgg);

	this.image                      = new Image();
	this.image.src                  = "images/Collectibles/egg.png";
	
}
AlienEgg.prototype.Update = function()
{
	var distancePlayer = Math.sqrt(Math.pow(this.params.x-player.playerCollider.GetPosition().x,2)
						 +(Math.pow(this.params.y-player.playerCollider.GetPosition().y,2)))/2;

	if(distancePlayer < this.radius + player.params.radius + this.takenDistance)
	{
		this.taken = true;
		scoreEggs += 5;
		document.getElementById("score").innerHTML  = "Score : " +scoreEggs;
	
	}
	if(this.taken == true)
	{
		world.DestroyBody(this.bodyEgg.GetBody());
	}

	this.render();
}

AlienEgg.prototype.destroyEgg = function()
{	
	this.taken = true;
}

AlienEgg.prototype.render = function()
{
	context.drawImage(this.image, 0, 0, 32, 32, this.bodyEgg.GetBody().GetPosition().x*30 - 14, this.bodyEgg.GetBody().GetPosition().y*30 - 14, 28, 28);
}