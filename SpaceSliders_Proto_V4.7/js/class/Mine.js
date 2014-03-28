var Mine = function(params)
{
	this.params 							 = params;
	this.y = this.params.y;
	this.x = this.params.x;
	this.fixMine			   		 = new b2FixtureDef;
	
	this.fixMine.filter.categoryBits  = trapData[1].CAT;
	this.fixMine.filter.maskBits      = trapData[1].MASK;
	this.fixMine.userData             = {tag : trapData[1].tag, obj : this};
	
	this.bodyMine          			= new b2BodyDef;
	this.bodyMine.type 				= b2Body.b2_kinematicBody;

	//this.fixMine.shape       		= new b2CircleShape(trapData[1].radius);
	this.fixMine.shape       		= new b2PolygonShape;
	this.fixMine.shape.SetAsBox(trapData[1].w, trapData[1].h);
	
	this.bodyMine.position.x 		= this.params.x;
	this.bodyMine.position.y 		= this.params.y;
	
	this.bodyMine                   = world.CreateBody(this.bodyMine).CreateFixture(this.fixMine);

	this.image                      = new Image();
	this.image.src                  = "images/Ennemies/mine_on.png";
	
	this.destroyed                  = false;
	this.range                      = trapData[1].range;
	
	
}

Mine.prototype.update = function()
{
	this.checkPlayerInRange();
	this.drawRange();

	this.render();
}

Mine.prototype.drawRange = function()
{
	context.fillStyle = "rgba(255,0,0,0.2)";
	context.beginPath();
	context.arc(this.x*30, this.y*30, this.range, 0, Math.PI*2);
	context.closePath();
	context.fill();
}
Mine.prototype.checkPlayerInRange = function()
{
	var distance = Math.sqrt(Math.pow(this.x - player.playerCollider.GetPosition().x,2)
						 +(Math.pow(this.y - player.playerCollider.GetPosition().y,2)))/2;
						 
		if(distance < (this.range/60 + player.params.radius/2))
		{
			
			player.death();
			this.explose();
		}
}

Mine.prototype.explose = function()
{
	var explosionEnemy = new Fx(this.x, this.y,1);
	FxTable.push(explosionEnemy);
	world.DestroyBody(this.bodyMine.GetBody());
	this.destroyed = true;
	
}

Mine.prototype.render = function()
{
	context.drawImage(this.image, 0, 0, 96, 96, this.bodyMine.GetBody().GetPosition().x*30 - 47, this.bodyMine.GetBody().GetPosition().y*30 - 48, 96, 96);
}