function getMouseCoor(event)
{
	mouseX = event.offsetX;
	mouseY = event.offsetY;
}

window.onkeydown = function(event)
{
	//je vais detecter le numero des touches
	var keyPressed = event.keyCode;
	console.log(keyPressed);
	
	if (keyPressed === 81)	
	{	
		player.move("left");
	}
	if (keyPressed === 68)	
	{
		player.move("right");
	}
	if (keyPressed === 90)	
	{
		player.move("up");
	}
	if (keyPressed === 32)	
	{	
		if(state === "SHOOT")
		{
			state = "SLIDE_MAKER";
			document.getElementById("canvas").style.cursor = "col-resize";
		}
		else
		{
			state = "SHOOT";
			document.getElementById("canvas").style.cursor = "crosshair";
		}
	}
	if (keyPressed === 82)	
	{	
		depopPlatform();
	}
}
	
	
window.onkeyup = function(event)
{
	//je vais detecter les le numero des touches
	var keyUp  = event.keyCode;
	
	if (keyUp === 81 || keyUp === 68)
	{
		player.move("stop");
	}
}

function checkState()
{
	if (state === "SHOOT")
	{
		player.shoot();
	}

	if (state === "SLIDE_MAKER")
	{
		drawPlatform();
	}
}