var Checkpoint = function(x,y,width,height,xRespawn,yRespawn)//Valeurs en pixel (comme le decor pour faciliter construvtion)
{
	// x,y : position du checkpoint  width,height : dimension du checkpoint  xRespawn,yRespawn : point de réapparition du joueur
	this.y = y;
	this.x = x;
	this.width = width;
	this.height = height;
	
	this.respawnX = xRespawn;
	this.respawnY = yRespawn;
	
}

Checkpoint.prototype.update = function()
{
	
	this.checkPlayerEnter();
	this.render();
}
Checkpoint.prototype.checkPlayerEnter = function()
{
	if(player.playerCollider.GetPosition().x*30 > this.x && player.playerCollider.GetPosition().x*30 < this.x + this.width)
	{
		this.SavePosition();
	}
}
Checkpoint.prototype.render = function()
{
	context.fillStyle = "rgba(250,250,250,0.5)";
	context.beginPath();
	
	context.rect(this.x,this.y,this.width,this.height);
	context.closePath();
	context.fill();
	
	
}
Checkpoint.prototype.SavePosition = function()
{
	player.registerX = this.respawnX;
	player.registerY = this.respawnY;
}