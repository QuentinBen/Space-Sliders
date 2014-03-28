function callback(elementHit, point)
{

	if(elementHit.GetUserData().tag === "SCENERY" || elementHit.GetUserData().tag === "NEUTRAL" || elementHit.GetUserData().tag === "PLATFORM")
	{
    	player.haveJump = false;
    	player.isFalling = false;
		
	}
	
}

function checkReversePossible(elementHit)
{
	if(elementHit.GetUserData().tag === "SCENERY" || elementHit.GetUserData().tag === "NEUTRAL")
	{
		player.canReverse = false;
		return;
	}
	else
	{
		player.canReverse = true;
	}
}

function checkReverseFirst(elementHit)
{
	if(elementHit.GetUserData().tag === "PLATFORM")
	{
		player.isSliding = true;
		player.reverseSliding = true;
		player.slideAngle = elementHit.GetUserData().angle;
		player.slideSens = elementHit.GetUserData().dir;
		
	}
}



function setLineColor(elementHit)
{
	drawingCrossingElement = true;
}
function carre(x)
{
	return x*x;
}

