var BulletStaticEnemy = function(x,y,angleShoot,bulletType)
{
	this.x 	            = x;
	this.y     			= y;
	this.angle 			= angleShoot;
	this.dammages       = enemyData[bulletType].dmg; 
	this.enemyBulletCollider = new ColliderForBulletsEnemy(this);
	this.type           = bulletType;
	this.hasCollideWall = false;
	this.destroyed      = false;
	this.image                      = new Image();
	this.image.src                  = "images/Bullet/bullet_turret.png";
	
	
	this.update = function()
	{
		if (this.hasCollideWall === true)
		{
			world.DestroyBody(this.enemyBulletCollider);
			this.destroyed = true;
		}
		this.enemyBulletCollider.SetLinearVelocity(this.angle); // on update la vitesse de la bullet pour qu'elle ne retombe pas
		this.render();
	}
	
}
BulletStaticEnemy.prototype.render = function(){

	/*context.fillStyle = "rgba(250,0,0,0.8)";
	context.beginPath();
	context.arc(this.enemyBulletCollider.GetPosition().x*30, this.enemyBulletCollider.GetPosition().y*30, enemyData[this.type].shotSize*30, 0, Math.PI*2);
	context.closePath();
	context.fill();*/
	context.drawImage(this.image, 0, 0, 20, 20, this.enemyBulletCollider.GetPosition().x*30-10
	, this.enemyBulletCollider.GetPosition().y*30-10, 20, 20);
}

var ColliderForBulletsEnemy = function(thisObj)
{
	var fixBulletEnemy             = new b2FixtureDef; //fixture des bullets
        fixBulletEnemy.density     = 0;
        fixBulletEnemy.friction    = 0.6;
        fixBulletEnemy.restitution = 0;
		fixBulletEnemy.filter.categoryBits  = CATEGORY_STATICENEMYBULLET;
		fixBulletEnemy.filter.maskBits      = MASK_STATICENEMYBULLET;
		fixBulletEnemy.userData    = {tag:"BULLET_STATIC_ENEMY", obj: thisObj, dmg:thisObj.dammages};
	
	var bodyBulletEnemy  		  = new b2BodyDef; //Body des bullets
	bodyBulletEnemy.type           = b2Body.b2_dynamicBody;
		
	fixBulletEnemy.shape           = new b2CircleShape(0.2);
	bodyBulletEnemy.position.x     = thisObj.x;
    bodyBulletEnemy.position.y     = thisObj.y;
			
	bodyBulletEnemy = world.CreateBody(bodyBulletEnemy).CreateFixture(fixBulletEnemy);
	//bodyBulletEnemy.GetBody().ApplyImpulse(thisObj.angle,bodyBulletEnemy.GetBody().GetWorldCenter());

	return bodyBulletEnemy.GetBody();
}