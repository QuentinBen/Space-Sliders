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
	this.fragmented     = false;
	this.image                      = new Image();
	this.image.src                  = weaponData[this.type].bulletSkin;
	
	
	this.update = function()
	{
		if (this.hasCollideWall === true)
		{
			world.DestroyBody(this.bulletCollider);
			this.destroyed = true;
		}
		if (this.fragmented == true)	// si la bullet a été fragmentée, on lance la fonction frag(x départ, y départ, bulletType, nb de bullets)
		{
			this.Frag(this.bulletCollider.GetPosition().x,this.bulletCollider.GetPosition().y,4,16);
			this.fragmented = false;
		}
		
		this.bulletCollider.SetLinearVelocity(this.angle); // on update la vitesse de la bullet pour qu'elle ne retombe pas
		
		this.render();
	}
}

Bullet.prototype.render = function(){

	/*context.fillStyle = "rgba(99,184,255,0.8)";
	context.beginPath();
	context.arc(this.bulletCollider.GetPosition().x*30, this.bulletCollider.GetPosition().y*30, weaponData[this.type].size*30, 0, Math.PI*2);
	context.closePath();
	context.fill();*/
	
	context.drawImage(this.image, 0, 0, 48, 48, this.bulletCollider.GetPosition().x*30-weaponData[this.type].bulletRenderSize/2
	, this.bulletCollider.GetPosition().y*30-weaponData[this.type].bulletRenderSize/2, weaponData[this.type].bulletRenderSize, weaponData[this.type].bulletRenderSize);

}

Bullet.prototype.Frag = function(x, y, bulletType, nbBullet)
{
	var angle = 0;
	for(i=0;i<nbBullet;i++)
		{
			
			var prog = i / nbBullet;
			var angle = prog * Math.PI *2;
			var posx = Math.sin(angle);
			var posy = Math.cos(angle);
			var trueangle = Math.atan2(posy, posx)*180/Math.PI;
			
			
			var vecangleShoot 	 = new b2Vec2(weaponData[bulletType].speed*Math.cos(trueangle*Math.PI/180),weaponData[bulletType].speed*Math.sin(trueangle*Math.PI/180));
			bulletTable.push(new Bullet (x,y,vecangleShoot,bulletType));
		}
	

}

var ColliderForBullets = function(thisObj)
{
	var fixBullet             = new b2FixtureDef; //fixture des bullets
        fixBullet.density     = 0;
        fixBullet.friction    = 0.6;
        fixBullet.restitution = 0;
		fixBullet.userData    = {tag:"BULLET", obj: thisObj, dmg:weaponData[thisObj.type].dmg};
	
	var bodyBullet  		  = new b2BodyDef; //Body des bullets
	bodyBullet.type           = b2Body.b2_dynamicBody;
		
	fixBullet.shape           = new b2CircleShape(weaponData[thisObj.type].size);
	bodyBullet.position.x     = thisObj.x;
    bodyBullet.position.y     = thisObj.y;
			
	bodyBullet = world.CreateBody(bodyBullet).CreateFixture(fixBullet);
	bodyBullet.GetBody().ApplyImpulse(thisObj.angle,bodyBullet.GetBody().GetWorldCenter());

	return bodyBullet.GetBody();
}