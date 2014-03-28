var Fx = function(x,y,data)
{
	
	this.y = y*30;
	this.x = x*30;
	this.data = data;
	
	this.image                      = new Image();
	
	this.image.src                  = FxData[data].img;
	this.animSpeed = FxData[this.data].animSpeed;
	this.bGx = 0;
	this.bGxMax = FxData[this.data].bGxMax;
	this.renderSize = FxData[this.data].renderSize;
	this.frameWidth = FxData[this.data].frameWidth;
	this.frameHeight = FxData[this.data].frameHeight;
	
	this.ended = false;
}

Fx.prototype.update = function()
{
	
	this.animeManager();
	this.render();
}
Fx.prototype.animeManager = function()
{

	if(frame % this.animSpeed == 0)
	{
	
		this.bGx += this.frameWidth;
	}
	if(this.bGx >= this.bGxMax)
	{
		this.ended = true;
	}
}
Fx.prototype.render = function()
{
	context.drawImage(this.image, this.bGx, 0, this.frameWidth, this.frameHeight, this.x-this.renderSize/2, this.y-this.renderSize/2, this.renderSize, this.renderSize);
	
}