var image  = new Image();
image.src  = "images/Backgrounds/green_house1.png";

var image2 = new Image();
image2.src = "images/Backgrounds/space.png";

function drawBackgrounds()
{
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 0, 0, 800, 600);
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 800, 0, 800, 600);
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 1600, 0, 800, 600);
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 2400, 0, 800, 600);
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 3200, 0, 800, 600);
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 4000, 0, 800, 600);
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 4800, 0, 800, 600);
	contextBuffering.drawImage(image2, 0, 0, 1600, 1200, 5600, 0, 800, 600);

	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 0, 0, 600, 600);
	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 600, 0, 600, 600);
	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 1200, 0, 600, 600);

	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 1800, 0, 600, 600);
	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 2400, 0, 600, 600);
	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 3000, 0, 600, 600);

	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 3600, 0, 600, 600);
	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 4200, 0, 600, 600);
	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 4800, 0, 600, 600);

	contextBuffering.drawImage(image, 0, 0, 1600, 1200, 5400, 0, 600, 600);
}