

function drawPlatform()
{
	firstPointX 	  	  = mouseX;
	firstPointY 	  	  = mouseY;
}

function platformEnd()
{
	
		var firPointX 	  = firstPointX;
		var firPointY 	  = firstPointY;
		var secPointX 	  = mouseX;
 		var secPointY     = mouseY;
 		var anglePlatform = Math.atan2(firPointY - secPointY, firPointX - secPointX) + Math.PI;
		
		var platformWidth = Math.sqrt(Math.pow(firstPointX-mouseX,2)
						 +(Math.pow(firstPointY-mouseY,2)))/2;
		
		if(drawingCrossingElement === false && platformWidth > platformMinSize*30)
		{
			
				platformTable.push(new Platform(firPointX,firPointY,secPointX,secPointY,anglePlatform));
				isDrawing = false;
				
				if(platformTable.length > maxPlatform)
				{
					depopPlatform(0);
				
				}
		}
		else
		{
			isDrawing = false;
		}
	
}

	
function depopPlatform(wichPlatformDeleted)
{

	if(platformTable.length>=1)
	{
	
		platformTable[wichPlatformDeleted].hasBeenDelete = true;
		
	}
}

function checkPlatformPosition() // Quand platforme dessinée, on check si elle traverse un élément du decor
{
	
		var platformWidth = Math.sqrt(Math.pow(firstPointX-mouseX,2)
						 +(Math.pow(firstPointY-mouseY,2)))/2;
		if(platformWidth < platformMinSize*30)
		{
			drawingCrossingElement = true;
		}
		if(drawingCrossingElement == false)
		context.strokeStyle = "rgb(50,255,50)";
		else{
		context.strokeStyle = "rgb(255,50,50)";
		}
		context.beginPath();
		context.moveTo(firstPointX, firstPointY);
		context.lineTo(mouseX, mouseY);
		context.closePath();
		context.stroke();
		
		

}

