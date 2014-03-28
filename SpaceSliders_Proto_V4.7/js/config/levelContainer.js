function loadLevel()
{
    var ground = new Square
    ({
            x    : 5
        ,   y    : 580
        ,   data : 1
    });

	neutralsTable.push(ground);

	for(i = 0; i < 420; i+=140)
	{
		var ground2 = new Square
		({
				x    : 145+i
			,   y    : 580
			,   data : 0
		});
		
		neutralsTable.push(ground2);
	}
	
	var tuyauVertival1 = new Square
	({
            x    : 535
        ,   y    : 440
        ,   data : 5
    });

	neutralsTable.push(tuyauVertival1);
	
	var ground3 = new Square
	({
			x    : 535
		,   y    : 425
		,   data : 0
	});
		
	neutralsTable.push(ground3);

    var pipe1 = new Square
    ({
            x    : 557
        ,   y    : 540
        ,   data : 6
    });

    neutralsTable.push(pipe1);

    var pipe2 = new Square
    ({
            x    : 557
        ,   y    : 455
        ,   data : 7
    });

    neutralsTable.push(pipe2);

    var pipeAngle1 = new Square
    ({
            x    : 555
        ,   y    : 435
        ,   data : 9
    });

    neutralsTable.push(pipeAngle1);

	var ground = new Square
    ({
            x    : 675
        ,   y    : 423
        ,   data : 1
    });

    neutralsTable.push(ground);

    //Challenge 1 saut

	for(i = 0; i < 280; i+=140)
	{
		var ground4 = new Square
		({
				x    : 1000+i
			,   y    : 425
			,   data : 0
		});
		
		neutralsTable.push(ground4);
	}

	var tuyauVertival = new Square
	({
            x    : 1260
        ,   y    : 440
        ,   data : 4
    });

	neutralsTable.push(tuyauVertival);

	for(i = 0; i < 560; i+=140)
	{
		var ground4 = new Square
		({
				x    : 1260+i
			,   y    : 580
			,   data : 0
		});
		
		neutralsTable.push(ground4);
	}

	for(i = 0; i < 280; i+=140)
	{
		var ground4 = new Square
		({
				x    : 2075+i
			,   y    : 580
			,   data : 0
		});
		
		neutralsTable.push(ground4);
	}

	for(i = 0; i < 280; i+=140)
	{
		var ground4 = new Square
		({
				x    : 2355+i
			,   y    : 580
			,   data : 1
		});
		
		neutralsTable.push(ground4);
	}

	for(i = 0; i < 420; i+=140)
	{
		var ground = new Square
		({
				x    : 2635+i
			,   y    : 580
			,   data : 0
		});
		
		neutralsTable.push(ground);
	}

	var ground = new Square
	({
			x    : 3055
		,   y    : 580
		,   data : 1
	});
		
	neutralsTable.push(ground);

	var pipeAngle = new Square
    ({
            x    : 3195
        ,   y    : 570
        ,   data : 9
    });

    neutralsTable.push(pipeAngle);

	var ground = new Square
	({
			x    : 3245
		,   y    : 575
		,   data : 13
	});

	neutralsTable.push(ground);

	var pipeAngle = new Square
    ({
            x    : 3385
        ,   y    : 565
        ,   data : 12
    });

    neutralsTable.push(pipeAngle);

    var pipe = new Square
	({
			x    : 3395
		,   y    : 425
		,   data : 14
	});

	neutralsTable.push(pipe);

	var pipeAngle = new Square
    ({
            x    : 3387
        ,   y    : 375
        ,   data : 11
    });

    neutralsTable.push(pipeAngle);

	var pipe = new Square
	({
			x    : 3420
		,   y    : 460
		,   data : 14
	});

	neutralsTable.push(pipe);

	var pipe = new Square
	({
			x    : 3420
		,   y    : 320
		,   data : 14
	});

	neutralsTable.push(pipe);

	var pipe = new Square
	({
			x    : 3420
		,   y    : 180
		,   data : 14
	});

	neutralsTable.push(pipe);

	var hPipe = new Square
	({
			x    : 3250
		,   y    : 390
		,   data : 13
	});

	neutralsTable.push(hPipe);

	var hPipe = new Square
	({
			x    : 3110
		,   y    : 390
		,   data : 13
	});

	neutralsTable.push(hPipe);

	var hPipe = new Square
	({
			x    : 2970
		,   y    : 390
		,   data : 13
	});

	neutralsTable.push(hPipe);

	var hPipe = new Square
	({
			x    : 2830
		,   y    : 390
		,   data : 13
	});

	neutralsTable.push(hPipe);

    var hPipe = new Square
	({
			x    : 3465
		,   y    : 135
		,   data : 13
	});

	neutralsTable.push(hPipe);

	var hPipe = new Square
	({
			x    : 3605
		,   y    : 135
		,   data : 13
	});

	neutralsTable.push(hPipe);

	var pipe = new Square
	({
			x    : 3750
		,   y    : 180
		,   data : 14
	});

	neutralsTable.push(pipe);

	var pipe = new Square
	({
			x    : 3750
		,   y    : 320
		,   data : 14
	});

	neutralsTable.push(pipe);

	var pipe = new Square
	({
			x    : 3750
		,   y    : 460
		,   data : 14
	});

	neutralsTable.push(pipe);

	var pipeAngle = new Square
    ({
            x    : 3415
        ,   y    : 130
        ,   data : 9
    });

    neutralsTable.push(pipeAngle);

    var pipeAngle = new Square
    ({
            x    : 3745
        ,   y    : 130
        ,   data : 11
    });

    neutralsTable.push(pipeAngle);

    for (i = 0; i < 280; i+=140)
    {
   		var ground = new Square
    	({
        	    x    : 4060+i
        	,   y    : 560
        	,   data : 1
    	});

		neutralsTable.push(ground);
	}

	var tuyauVertival1 = new Square
	({
            x    : 4550
        ,   y    : 460
        ,   data : 5
    });

	neutralsTable.push(tuyauVertival1);

	var tuyauVertival1 = new Square
	({
            x    : 4550
        ,   y    : 320
        ,   data : 5
    });

	neutralsTable.push(tuyauVertival1);

	for(i = 0; i < 700; i+=140)
	{
		var ground2 = new Square
		({
				x    : 4550+i
			,   y    : 310
			,   data : 0
		});
		
		neutralsTable.push(ground2);
	}

	for(i = 0; i < 420; i+=140)
	{
		var tuyauVertival1 = new Square
		({
				x    : 5225
			,   y    : 170-i
			,   data : 5
		});
		
		neutralsTable.push(tuyauVertival1);
	}
};

function bufferingDraw()
{
	  for (i = 0; i < neutralsTable.length; i++)
	{
		if(neutralsTable[i].tag == "SCENERY")
		neutralsTable[i].bufferRender();
	}
	bufferDrawn = true;
}