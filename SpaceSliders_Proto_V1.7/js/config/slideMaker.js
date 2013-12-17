var firstPointX;
var firstPointY;

function drawPlatform()
{
	firstPointX 	  	  = mouseX;
	firstPointY 	  	  = mouseY;
}

function platformEnd()
{
	if (state === "SLIDE_MAKER")
	{
		var firPointX 	  = firstPointX;
		var firPointY 	  = firstPointY;
		var secPointX 	  = mouseX;
 		var secPointY     = mouseY;
 		var anglePlatform = Math.atan2(firPointY - secPointY, firPointX - secPointX) + Math.PI;
		if((firPointX<secPointX && (secPointX-firPointX)>100)||(firPointX>secPointX && (firPointX-secPointX)>100))
		{
			platformTable.push(new Platform(firPointX,firPointY,secPointX,secPointY,anglePlatform));
		}
	}
}

function slideImpulse(angle, player, direction)
	{
	// check la direction de tracé de la platform
		if(direction == "droite")
		{
			var dir = new b2Vec2(2*Math.cos(angle*Math.PI/180),2*Math.sin(angle*Math.PI/180));
			player.ApplyImpulse(dir,player.GetWorldCenter());
			var playerVel = player.GetLinearVelocity();
			if(playerVel>1)
			{
				player.SetLinearVelocity(dir);
			}
		}
		else if(direction == "gauche")
		{
			var dir = new b2Vec2(-2*Math.cos(angle*Math.PI/180),-2*Math.sin(angle*Math.PI/180));
			player.ApplyImpulse(dir,player.GetWorldCenter());
			var playerVel = player.GetLinearVelocity();
			if(playerVel<1)
			{
				player.SetLinearVelocity(dir);
			}
		}
	}
	
function depopPlatform()
{

	if(platformTable.length>=1)
	{
	console.log("destroyed platform");
		platformTable[0].hasBeenDelete = true;
		
	}
}