function getMouseCoor(event)
{
	mouseX = event.offsetX;
	mouseY = event.offsetY;
}

window.onkeydown = function(event)
{
	
	//je vais detecter le numero des touches
	var keyPressed = event.keyCode;
	
	if (keyPressed === 49)
	{
		selectedChar = 0;		
	}
	if (keyPressed === 50)
	{
		selectedChar = 1;		
	}

	if (keyPressed === 51)
	{
		selectedChar = 2;		
	}

	if (keyPressed === 52)
	{
		selectedChar = 3;		
	}
	
	if(player.isSliding === false)
	{
		if (keyPressed === 81)	
		{	
			player.move("left");
		}
		if (keyPressed === 68)	
		{
			player.move("right");
		}
	}
	
	if (keyPressed === 90)	// haut
	{
		if(player.isSliding)
		{
			if(player.isSliding === true)
			{
				if(player.reverseSliding === true) // si player slide à l'envers, on va le remettre à l'endroit
				{
					player.reverseSliding = false;
				var positionDestroyedPlayerX = player.playerCollider.GetPosition().x;
				var positionDestroyedPlayerY = player.playerCollider.GetPosition().y;
		
				world.DestroyBody(player.playerCollider);
				undoReverseSliding(player, player.params, positionDestroyedPlayerX,positionDestroyedPlayerY);
				}
				else{
					player.isSliding = false;
					player.vel = 0;
					console.log("saut");
					player.move("up");
				}
			}
			
			else{
			player.isSliding = false;
				player.move("up");
			}
		}
		else{
		
				player.move("up");
		}
	}
	
	if(keyPressed ===  83) // bas
	{
		if(player.isSliding)
		{
			if(player.isSliding === true)
			{
				if(player.reverseSliding === false) // si player slide à l'endroit, on va le reverse
				{
					player.reverseSliding = true;
				var positionDestroyedPlayerX = player.playerCollider.GetPosition().x;
				var positionDestroyedPlayerY = player.playerCollider.GetPosition().y;
		
				world.DestroyBody(player.playerCollider);
				reverseSliding(player, player.params, positionDestroyedPlayerX,positionDestroyedPlayerY);
				}
		
				
					
				
				else					// si il est deja à l'envers, on le fait arreter le slide
				{
					player.isSliding = false;
					player.reverseSliding = false;
					
				}
			}
		}
		
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
	
	if(player && player.isSliding === false)
	{
		if (keyUp === 81 || keyUp === 68)
		{
			player.move("stop");
		}
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
		isDrawing = true;
		drawPlatform();
	}
}