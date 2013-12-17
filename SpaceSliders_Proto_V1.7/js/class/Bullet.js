var Bullet = function(x,y,angleShoot)
{
	this.x 	            = x;
	this.y     			= y;
	this.speed 			= 50;
	this.angle 			= angleShoot;
	
	this.bulletCollider = new ColliderForBullets(this);
	
	this.hasCollideWall = false;
	this.destroyed      = false;

	this.update = function()
	{
		if (this.hasCollideWall === true)
		{
			world.DestroyBody(this.bulletCollider);
			this.destroyed = true;
		}
		this.bulletCollider.SetLinearVelocity(this.angle); // on update la vitesse de la bullet pour qu'elle ne retombe pas
	}
}

var ColliderForBullets = function(thisObj)
{
	var fixBullet             = new b2FixtureDef; //fixture des bullets
        fixBullet.density     = 0;
        fixBullet.friction    = 0.6;
        fixBullet.restitution = 0;
		fixBullet.userData    = {tag:"BULLET", obj: thisObj};
	
	var bodyBullet  		  = new b2BodyDef; //Body des bullets
	bodyBullet.type           = b2Body.b2_dynamicBody;
		
	fixBullet.shape           = new b2CircleShape(0.2);
	bodyBullet.position.x     = thisObj.x;
    bodyBullet.position.y     = thisObj.y;
			
	bodyBullet = world.CreateBody(bodyBullet).CreateFixture(fixBullet);
	bodyBullet.GetBody().ApplyImpulse(thisObj.angle,bodyBullet.GetBody().GetWorldCenter());

	return bodyBullet.GetBody();
}