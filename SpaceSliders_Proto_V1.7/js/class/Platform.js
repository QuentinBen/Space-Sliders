var Platform = function(X1,Y1,secPointX,secPointY,anglePlatform)
{
	this.x1 = X1/30;
	this.y1 = Y1/30;
	this.x2 = secPointX/30;
	this.y2 = secPointY/30;

	if((this.x1 - this.x2) < 0)
		this.direction = "droite";
	else
		this.direction = "gauche";
	
	this.angle = anglePlatform;
	this.hasBeenDelete = false;
	this.destroyed     = false;
	this.platformCollider = new ColliderForPlatforms(this,this.x1,this.y1,this.x2,this.y2,this.angle,this.direction);
	
	this.update = function()
	{
		if (this.hasBeenDelete === true)
		{
			world.DestroyBody(this.platformCollider);
			this.destroyed = true;
		}
		
	}

	
}

var ColliderForPlatforms = function(thisObj,x1,y1,x2,y2,angle,direction)
{
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var b2Body = Box2D.Dynamics.b2Body;
	 
	
	var fixPlatform = new b2FixtureDef;		
         fixPlatform.density = 0;
         fixPlatform.friction = 0;
         fixPlatform.restitution = 0;
		 fixPlatform.userData = {tag:"PLATFORM", obj: thisObj, angle:angle, dir:direction};
		 fixPlatform.filter.categoryBits = CATEGORY_PLATFORM;
		 fixPlatform.filter.maskBits = MASK_PLATFORM;
		
	
	var bodyPlatform = new b2BodyDef;
			bodyPlatform.type = b2Body.b2_staticBody;
			fixPlatform.shape = new b2PolygonShape;
			
			if (x2 > x1)
				fixPlatform.shape.SetAsBox((x2 - x1)/2, 0.1);
			else
				fixPlatform.shape.SetAsBox((x1 - x2)/2, 0.1);
			
			bodyPlatform.position.x = x1+(x2-x1)/2;
			bodyPlatform.position.y = y1+(y2-y1)/2;
			bodyPlatform.angle = angle;
		bodyPlatform = world.CreateBody(bodyPlatform).CreateFixture(fixPlatform);
		return bodyPlatform.GetBody();
		
}
