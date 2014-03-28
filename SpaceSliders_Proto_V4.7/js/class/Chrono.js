var LevelTimer = function()
{
	this.running = false;
	
	this.secondes = 0;
	this.minutes = 0;
	this.startingFrame = chronoFrame;
	

}

LevelTimer.prototype.Update = function()
{
	if((chronoFrame-this.startingFrame)%60 == 0)
	{
		this.secondes += 1;
		
		if(this.secondes == 60)
		{
			this.secondes = 0;
			this.minutes += 1;
		}
		if(this.secondes <10)
		{
			document.getElementById("chrono").innerHTML = "Time = " + this.minutes + " : 0" + this.secondes; 
		}
		else
		{
			document.getElementById("chrono").innerHTML = "Time = " + this.minutes + " : " + this.secondes; 
		}
	}
}