var Platform = function(X1,Y1,secPointX,secPointY,anglePlatform)
{
	this.x1 = X1/30;
	this.y1 = Y1/30;
	this.x2 = secPointX/30;
	this.y2 = secPointY/30;
	this.width = Math.sqrt(Math.pow(this.x2*30-this.x1*30,2)+(Math.pow(this.y2*30-this.y1*30,2)));
	if((this.x1 - this.x2) < 0)
		this.direction = "droite";
	else
		this.direction = "gauche";
	this.angle = anglePlatform;
	this.epaisseur = 0.1;
	
	this.hasBeenDelete = false;
	this.destroyed     = false;
	this.platformCollider = new ColliderForPlatforms(this,this.x1,this.y1,this.x2,this.y2,this.angle,this.direction,this.epaisseur);
	this.image                          = new Image();
	this.image.src						= "images/Plasma/plasma.png";
	
	this.update = function()
	{
		if (this.hasBeenDelete === true)
		{
			world.DestroyBody(this.platformCollider);
			this.destroyed = true;
		}
		this.render();
	}
}
Platform.prototype.render = function()
{
	var angleImg = this.angle;
				
	
		context.save();

		context.translate(this.x1*30, this.y1*30);
		
		context.rotate(angleImg);
		
		context.drawImage
		(
			  this.image
			, 0
			, 0
			, 300
			, 32
			, 0
			, -16
			, this.width
			, 32
		);
		
		context.restore();
	context.strokeStyle = "rgb(50,50,250)";
		
		/*context.beginPath();
		context.moveTo(this.x1*30,this.y1*30);
		context.lineTo(this.x2*30,this.y2*30);
		context.closePath();
		context.lineWidth = 10;
		context.stroke();*/

}

var ColliderForPlatforms = function(thisObj,x1,y1,x2,y2,angle,direction,epaisseur)
{
	var fixPlatform = new b2FixtureDef;		
         fixPlatform.density = 0;
         fixPlatform.friction = 1;
         fixPlatform.restitution = 0;
		 fixPlatform.userData = {tag:"PLATFORM", obj: thisObj, angle:angle, dir:direction};
		 fixPlatform.filter.categoryBits = CATEGORY_PLATFORM;
		 fixPlatform.filter.maskBits = MASK_PLATFORM;
		
	
	var bodyPlatform = new b2BodyDef;
			bodyPlatform.type = b2Body.b2_staticBody;
			fixPlatform.shape = new b2PolygonShape;
			
			if (x2 > x1)
				fixPlatform.shape.SetAsBox(Math.sqrt(Math.pow(x2-x1,2)+(Math.pow(y2-y1,2)))/2, epaisseur);
			else
				fixPlatform.shape.SetAsBox(Math.sqrt(Math.pow(x1-x2,2)+(Math.pow(y1-y2,2)))/2, epaisseur);
			
			bodyPlatform.position.x = x1+(x2-x1)/2;
			bodyPlatform.position.y = y1+(y2-y1)/2;
			bodyPlatform.angle = angle;
		bodyPlatform = world.CreateBody(bodyPlatform).CreateFixture(fixPlatform);
		return bodyPlatform.GetBody();
		
}
