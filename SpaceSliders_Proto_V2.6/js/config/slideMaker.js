

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
		if(drawingCrossingElement === false)
		{
			
				platformTable.push(new Platform(firPointX,firPointY,secPointX,secPointY,anglePlatform));
			
			
		isDrawing = false;
		}
		else
		{
			isDrawing = false;
		}
	}
}

	
function depopPlatform()
{

	if(platformTable.length>=1)
	{
	
		platformTable[platformTable.length-1].hasBeenDelete = true;
		
	}
}

function checkPlatformPosition() // Quand platforme dessinée, on check si elle traverse un élément du decor
{
	
		
		
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

