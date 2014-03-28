var Square = function(params)
{
	this.params 			  			= params;
	this.life							= levelData[this.params.data].life 	 || null;
	this.destroyed 						= false;

	this.fixSquare 			   			= new b2FixtureDef;
	this.fixSquare.density 	   			= levelData[this.params.data].d  || 1.0;
	this.fixSquare.friction    			= levelData[this.params.data].f  || 0.7;
	this.fixSquare.restitution		    = levelData[this.params.data].r  || 0;
	this.fixSquare.filter.categoryBits  = levelData[this.params.data].CAT;
	this.fixSquare.filter.maskBits      = levelData[this.params.data].MASK;
	this.fixSquare.userData             = {tag : levelData[this.params.data].tag, obj: this};
	this.tag 							= levelData[this.params.data].tag;
	this.bodySquare 					= new b2BodyDef;
	
	
	this.img = new Image();
	this.img.src = levelData[this.params.data].sprite;
	

	this.bodySquare.type   = levelData[this.params.data].type;
	

	this.fixSquare.shape 	   = new b2PolygonShape;
	this.fixSquare.shape.SetAsBox(levelData[this.params.data].w/60, levelData[this.params.data].h/60);

	this.bodySquare.position.x = this.params.x/30 + levelData[this.params.data].w/60;
	
	this.bodySquare.position.y = this.params.y/30 + levelData[this.params.data].h/60;

	this.bodySquare            = world.CreateBody(this.bodySquare).CreateFixture(this.fixSquare);

	this.update = function ()
	{
		if(this.tag == "NEUTRAL")
		{
			if (this.life <= 0)
				this.die();
				this.render();
		}	
		
	}
	
	this.render = function()
	{
	
		context.drawImage(this.img,0 ,0 ,levelData[this.params.data].spriteWidth ,levelData[this.params.data].spriteHeight 
							,this.params.x ,this.params.y , levelData[this.params.data].w, levelData[this.params.data].h);
	
	}

	this.bufferRender = function()
	{
		contextBuffering.drawImage(this.img,0 ,0 ,levelData[this.params.data].spriteWidth ,levelData[this.params.data].spriteHeight 
							,this.params.x ,this.params.y , levelData[this.params.data].w, levelData[this.params.data].h);
	
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