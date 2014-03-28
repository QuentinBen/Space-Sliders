var Camera = function()
{
	var _wrapper = document.getElementById("wrapper");

	this.camPos = 
	{
			x : 400
		,	y : 300
	};

	this.render = function()
	{
		context.fillStyle = "rgb(255, 255, 255)";
		context.fillRect(this.camPos.x - 5, this.camPos.y - 5, 10, 10);
	}

	this.update = function()
	{
		_wrapper.scrollLeft = this.camPos.x - 500;
		_wrapper.scrollTop  = this.camPos.y - 300;

		this.focusPlayer();

		//this.render();
	}

	this.focusPlayer = function()
	{
		if (player.playerCollider)
		{
			this.camPos.x = player.playerCollider.GetWorldCenter().x*30 + 250;
			this.camPos.y = player.playerCollider.GetWorldCenter().y*30;
		}
	}
}