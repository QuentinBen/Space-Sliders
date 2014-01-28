var BulletStaticEnemy = function(x,y,angleShoot)
{
	this.x 	            = x;
	this.y     			= y;
	this.speed 			= 50;
	this.angle 			= angleShoot;
	
	this.enemyBulletCollider = new ColliderForBulletsEnemy(this);
	
	this.hasCollideWall = false;
	this.destroyed      = false;

	this.update = function()
	{
		if (this.hasCollideWall === true)
		{
			world.DestroyBody(this.enemyBulletCollider);
			this.destroyed = true;
		}
		this.enemyBulletCollider.SetLinearVelocity(this.angle); // on update la vitesse de la bullet pour qu'elle ne retombe pas
	}
}

var ColliderForBulletsEnemy = function(thisObj)
{
	var fixBulletEnemy             = new b2FixtureDef; //fixture des bullets
        fixBulletEnemy.density     = 0;
        fixBulletEnemy.friction    = 0.6;
        fixBulletEnemy.restitution = 0;
		fixBulletEnemy.filter.categoryBits  = CATEGORY_STATICENEMYBULLET;
		fixBulletEnemy.filter.maskBits      = MASK_STATICENEMYBULLET;
		fixBulletEnemy.userData    = {tag:"BULLET_STATIC_ENEMY", obj: thisObj};
	
	var bodyBulletEnemy  		  = new b2BodyDef; //Body des bullets
	bodyBulletEnemy.type           = b2Body.b2_dynamicBody;
		
	fixBulletEnemy.shape           = new b2CircleShape(0.2);
	bodyBulletEnemy.position.x     = thisObj.x;
    bodyBulletEnemy.position.y     = thisObj.y;
			
	bodyBulletEnemy = world.CreateBody(bodyBulletEnemy).CreateFixture(fixBulletEnemy);
	bodyBulletEnemy.GetBody().ApplyImpulse(thisObj.angle,bodyBulletEnemy.GetBody().GetWorldCenter());

	return bodyBulletEnemy.GetBody();
}