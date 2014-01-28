var Square = function(params)
{
	this.params 			  			= params;
	this.angle 				            = params.angle   || 0;
	this.life							= params.life 	 || null;
	this.destroyed 						= false;
	this.needInterruptor                = params.needInt || false;

	this.fixSquare 			   			= new b2FixtureDef;
	this.fixSquare.density 	   			= this.params.d  || 1.0;
	this.fixSquare.friction    			= this.params.f  || 0.7;
	this.fixSquare.restitution		    = this.params.r  || 0.2;
	this.fixSquare.filter.categoryBits  = this.params.CAT;
	this.fixSquare.filter.maskBits      = this.params.MASK;
	this.fixSquare.userData             = {tag : this.params.tag, obj: this};

	this.bodySquare 					= new b2BodyDef;

	if (this.params.type 	   === "static")
	{
		this.bodySquare.type   = b2Body.b2_staticBody;
	}
	else if (this.params.type  === "dynamic")
	{
		this.bodySquare.type   = b2Body.b2_dynamicBody;
	}
	else if (this.params.type  === "kinematic")
	{
		this.bodySquare.type   = b2Body.b2_kinematicBody;
	}

	this.fixSquare.shape 	   = new b2PolygonShape;
	this.fixSquare.shape.SetAsBox(this.params.w, this.params.h);

	this.bodySquare.position.x = this.params.x;
	this.bodySquare.position.y = this.params.y;

	this.bodySquare            = world.CreateBody(this.bodySquare).CreateFixture(this.fixSquare);

	this.update = function ()
	{
		if (!this.needInterruptor)
		{
			if (this.life <= 0)
				this.die();
		}
	}

	this.die = function()
	{
		world.DestroyBody(this.bodySquare.GetBody());
		this.destroyed = true;
	}

	this.looseLife = function()
	{
		this.life -= 1;
	}
}