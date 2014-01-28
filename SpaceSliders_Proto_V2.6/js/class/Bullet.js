var Bullet = function(x,y,angleShoot,bulletType)
{
	this.x 	            = x;
	this.y     			= y;
	
	this.angle 			= angleShoot;
	this.type			= bulletType;
	this.lifeTime       = weaponData[this.type].range;
	
	this.bulletCollider = new ColliderForBullets(this);
	this.trajectoire    = this.bulletCollider.GetLinearVelocity();
	this.hasCollideWall = false;
	this.destroyed      = false;
	
	this.update = function()
	{
		if (this.hasCollideWall === true)
		{
			this.destroy();
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
		fixBullet.userData    = {tag:"BULLET", obj: thisObj, dmg: weaponData[thisObj.type].dmg};
	
	var bodyBullet  		  = new b2BodyDef;   //Body des bullets
	bodyBullet.type           = b2Body.b2_dynamicBody;
		
	fixBullet.shape           = new b2CircleShape(weaponData[thisObj.type].size);
	bodyBullet.position.x     = thisObj.x;
    bodyBullet.position.y     = thisObj.y;
			
	bodyBullet = world.CreateBody(bodyBullet).CreateFixture(fixBullet);
	bodyBullet.GetBody().ApplyImpulse(thisObj.angle,bodyBullet.GetBody().GetWorldCenter());

	return bodyBullet.GetBody();
}

Bullet.prototype.destroy = function()
{
	world.DestroyBody(this.bulletCollider);
	this.destroyed = true;
}