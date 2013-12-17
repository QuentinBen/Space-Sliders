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

	this.bodyStaticEnemy = world.CreateBody(this.bodyStaticEnemy).CreateFixture(this.fixStaticEnemy);
}

StaticEnemy.prototype.update = function()
{
	if (this.params.life <= 0)
	{
		this.die();
	}

	var x1    = player.bodyPlayer.GetBody().GetWorldCenter().x;
	var y1    = player.bodyPlayer.GetBody().GetWorldCenter().y;

	var x2    = this.bodyStaticEnemy.GetBody().GetWorldCenter().x;
	var y2    = this.bodyStaticEnemy.GetBody().GetWorldCenter().y;

	var diffX = carre(x2 - x1);
	var diffY = carre(y2 - y1);

	var distance = Math.sqrt(diffX + diffY);

	if (distance < 8)
	{
		// this.shoot(x1, x2);
	}
}

StaticEnemy.prototype.shoot = function()
{
	if (canShoot)
	{

	}
}

StaticEnemy.prototype.looseLife = function()
{
	this.params.life -= 1;
}

StaticEnemy.prototype.die = function()
{
	world.DestroyBody(this.bodyStaticEnemy.GetBody());
	this.destroyed = true;
}