
var StaticEnemy = function(params)
{
	this.params 							 = params;
	
	this.destroyed							 = false;

	this.fixStaticEnemy 			   		 = new b2FixtureDef;
	this.fixStaticEnemy.density 	   		 = this.params.d  || 1.0;
	this.fixStaticEnemy.friction    		 = this.params.f  || 0;
	this.fixStaticEnemy.restitution		     = this.params.r  || 0;
	this.fixStaticEnemy.filter.categoryBits  = this.params.CAT;
	this.fixStaticEnemy.filter.maskBits      = this.params.MASK;
	this.fixStaticEnemy.userData             = {tag : this.params.tag, obj : this};

	this.bodyStaticEnemy          			= new b2BodyDef;
	this.bodyStaticEnemy.type 				= b2Body.b2_kinematicBody;

	this.fixStaticEnemy.shape       		= new b2CircleShape(this.params.radius);
	this.bodyStaticEnemy.position.x 		= this.params.x;
	this.bodyStaticEnemy.position.y 		= this.params.y;
	this.range								= this.params.range;
	this.bodyStaticEnemy = world.CreateBody(this.bodyStaticEnemy).CreateFixture(this.fixStaticEnemy);
	
	this.positionVector                     = new b2Vec2(this.bodyStaticEnemy.GetBody().GetPosition().x, this.bodyStaticEnemy.GetBody().GetPosition().y);
}

StaticEnemy.prototype.update = function()
{
	if (this.params.life <= 0)
	{
		this.die();
	}
		
}
StaticEnemy.prototype.checkPlayerInRange = function()
{
		var distanceShot = Math.sqrt(Math.pow(this.params.x-player.playerCollider.GetPosition().x,2)
						 +(Math.pow(this.params.y-player.playerCollider.GetPosition().y,2)))/2;
        
		if(distanceShot <= this.range)
		{
			this.shoot();
		}

}

StaticEnemy.prototype.shoot = function(hitObject)
{
	
	var xEnemy 		  	 = this.params.x;
	var xPlayer 		 = player.playerCollider.GetPosition().x;
	
	var yEnemy 		  	 = this.params.y;
	var yPlayer 		 = player.playerCollider.GetPosition().y;

	var vecangleShoot 	 = new b2Vec2((xPlayer - xEnemy)*5, (yPlayer - yEnemy)*5);
	
	bulletStaticEnemyTable.push(new BulletStaticEnemy (xEnemy,yEnemy,vecangleShoot));
	
	
}

StaticEnemy.prototype.looseLife = function(lostLife)
{
	this.params.life -= lostLife;
}

StaticEnemy.prototype.die = function()
{
	world.DestroyBody(this.bodyStaticEnemy.GetBody());
	this.destroyed = true;
}