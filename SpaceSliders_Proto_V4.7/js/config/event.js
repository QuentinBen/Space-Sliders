function getMouseCoor(event)
{
	mouseX = event.offsetX;
	mouseY = event.offsetY;
}

window.onkeydown = function(event)
{
	
	//je vais detecter le numero des touches
	keyPressed = event.keyCode;
	
	if (keyPressed === 49)
	{
		for(i=0;i<characterTable.length;i++) // on check si le player selectionné est encore en vie (si il existe encore dans le tableau characterTable)
		{
			if(characterTable[i] === 0)
			{
				var switchLight = new Fx(player.playerCollider.GetPosition().x,player.playerCollider.GetPosition().y,2);
				FxTable.push(switchLight);
				selectedChar = 0;
				player.image.src = "images/Players/assault_spritesheet.png";
				player.armImage.src = "images/Players/weapon_assault.png";
			}
		}
	}
	if (keyPressed === 50)
	{
		for (i=0;i<characterTable.length;i++) 
		{
			if (characterTable[i] === 1)
			{
				var switchLight = new Fx(player.playerCollider.GetPosition().x,player.playerCollider.GetPosition().y,2);
				FxTable.push(switchLight);
				selectedChar = 1;
				player.image.src = "images/Players/sniper_spritesheet.png";
				player.armImage.src = "images/Players/weapon_sniper.png";
			}
		}	
	}

	/*if (keyPressed === 52)
	{
		for (i=0;i<characterTable.length;i++) 
		{
			if (characterTable[i] === 2)
			{
				selectedChar = 2;
				player.image.src = "images/Players/sword_spritesheet.png";
				player.armImage.src = "images/Players/weapon_sword.png";
				
			}
		}		
	}*/

	if (keyPressed === 51)
	{
		for (i = 0; i < characterTable.length; i++) 
		{
			if (characterTable[i] === 3)
			{
				var switchLight = new Fx(player.playerCollider.GetPosition().x,player.playerCollider.GetPosition().y,2);
				FxTable.push(switchLight);
				selectedChar = 3;
				player.image.src = "images/Players/rocket_spritesheet.png";
				player.armImage.src = "images/Players/weapon_rocket.png";
			}
		}		
	}
	
	if (player.isSliding === false)
	{
		if (keyPressed === 81)	
		{	
			player.move("left");
			player.formerSens = "left";
			return;
		}
		if (keyPressed === 68)	
		{
			player.move("right");
			player.formerSens = "right";
			return;
		}
	}
	
	if (keyPressed === 90)	// haut
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
					
					
					
					player.move("up");
					
				}
			}
			
			else
			{
				
				player.move("up");
			}
		
		
		
	}
	
	if(keyPressed ===  83) // bas
	{
		
			if(player.isSliding === true)
			{
				if(player.reverseSliding === false && player.canReverse === true) // si player slide à l'endroit, on va le reverse
				{
				console.log("reverseSlidingtrue");
					player.reverseSliding = true;
				var positionDestroyedPlayerX = player.playerCollider.GetPosition().x;
				var positionDestroyedPlayerY = player.playerCollider.GetPosition().y;
		
				world.DestroyBody(player.playerCollider);
				reverseSliding(player, player.params, positionDestroyedPlayerX,positionDestroyedPlayerY);
				}
		
				
					
				
				else					// si il est deja à l'envers, on le fait arreter le slide
				{
					player.playerCollider.ApplyImpulse(new b2Vec2(0,70), player.playerCollider.GetWorldCenter());
					player.isSliding = false;
					player.reverseSliding = false;
					
					
				}
			}
		
		
	}
	/*if (keyPressed === 32)	
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
	}*/
	if (keyPressed === 82)	
	{	
		depopPlatform(platformTable.length-1);
	}
	
}
	
	
window.onkeyup = function(event)
{
	//je vais detecter les le numero des touches
	var keyUp  = event.keyCode;
	
	if(player && player.isSliding === false)
	{
		if (keyUp === 68)//right
		{
			if(keyPressed != 81)
			player.move("stop");
		}
		if (keyUp === 81)//left
		{
			if(keyPressed != 68)
			player.move("stop");
		}
		
	}
	
	if(keyUp === 90)
	{
		player.canJump = true;
	}
}

