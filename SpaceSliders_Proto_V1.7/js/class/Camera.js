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
		_wrapper.scrollLeft = this.camPos.x - 400;
		_wrapper.scrollTop  = this.camPos.y - 300;

		this.focusPlayer();

		this.render();
	}

	this.focusPlayer = function()
	{
		if (player.bodyPlayer.GetBody())
		{
			this.camPos.x = player.bodyPlayer.GetBody().GetWorldCenter().x*30;
			this.camPos.y = player.bodyPlayer.GetBody().GetWorldCenter().y*30;
		}
	}
}