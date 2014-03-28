var enemyData = 
	[
		{
			type: "light static tower",	// data 0
			data:0,
			wakeUpSkin :"images/Ennemies/turret_wake_up.png",
			shootingSkin: "images/Ennemies/turret.png",
			fireRate: 60, 	
			dmg: 1,		
			detectionRange: 10, 
			bulletSpeed: 15, 
			moveSpeed: 0,
			life: 3,	
			shotSize: 0.2,
		    type   : "static",
            CAT    : CATEGORY_ENEMY,
            MASK   : MASK_ENEMY,
            tag    : "ENEMY",
			radius : 0.8,
			canShoot: true,
			attackType: "ranged",
			canMove : false,
			shape : "circle",
			bodyType : b2Body.b2_kinematicBody,
			animation : {
							pivotX : 5,
							pivotY : 10,
							decalXCanon : -42,
							decalYCanon : -38,
							decalX : 47,
							decalY : 49,
							renderSize : 90
						}
			
			
		},

		{
			type: "heavy static tower",	// data 1
			data:1,
			wakeUpSkin :"images/Ennemies/turret_wake_up.png",
			shootingSkin: "images/Ennemies/turret.png",
			fireRate: 30, 	
			dmg: 1,		
			detectionRange: 10, 
			bulletSpeed: 30, 
			moveSpeed: 0,
			life: 5,	
			shotSize: 0.2,
			type   : "static",
            CAT    : CATEGORY_ENEMY,
            MASK   : MASK_ENEMY,
            tag    : "ENEMY",
			radius : 1.5,
			canShoot : true,
			attackType : "ranged",
			canMove : false,
			shape  : "circle",
			bodyType : b2Body.b2_kinematicBody,
			animation : {
							pivotX : 0,
							pivotY : 10,
							decalXCanon : -65,
							decalYCanon : -50,
							decalX : 65,
							decalY : 60,
							renderSize : 128
						}
		},

		{
			type: "kamikaze",	//data 2
			data:2,
			fireRate: 1, 	
			dmg: 1,		
			detectionRange: 12, 
			bulletSpeed: 0,
			moveSpeed: 5,			
			life: 2,	
			shotSize: 0.2,
			type   : "static",
            CAT    : CATEGORY_ENEMY,
            MASK   : MASK_ENEMY,
            tag    : "ENEMY",
			radius : 0.9,
			canShoot : false,
			attackType : "kamikaze",
			canMove : true,
			shape  : "cube",
			bodyType : b2Body.b2_kinematicBody
		},
		{
			type: "light tower reverse",	// data 3
			data:3,
			wakeUpSkin :"images/Ennemies/turret_wake_up_reverse.png",
			shootingSkin: "images/Ennemies/turret_reverse.png",
			fireRate: 60, 	
			dmg: 1,		
			detectionRange: 10, 
			bulletSpeed: 15, 
			moveSpeed: 0,
			life: 3,	
			shotSize: 0.2,
		    type   : "static",
            CAT    : CATEGORY_ENEMY,
            MASK   : MASK_ENEMY,
            tag    : "ENEMY",
			radius : 0.8,
			canShoot: true,
			attackType: "ranged",
			canMove : false,
			shape : "circle",
			bodyType : b2Body.b2_kinematicBody,
			animation : {
							pivotX : 5,
							pivotY : -5,
							decalXCanon : -42,
							decalYCanon : -55,
							decalX : 47,
							decalY : 49,
							renderSize : 90
						}
			
			
		},
		
		{
			type: "light shooter alien", // data 4
			data:4,
			fireRate: 15, 	
			dmg: 1,		
			detectionRange: 30, 
			bulletSpeed: 30,
			moveSpeed: 10,
			life: 3,	
			shotSize: 0.2,
			type   : "static",
            CAT    : CATEGORY_ENEMY,
            MASK   : MASK_ENEMY,
            tag    : "ENEMY",
			radius : 0.9,
			shape  : "circle",
			canShoot : true,
			canMove : false
		},
		{
			type: "heavy shooter alien", // data 5
			data:5,
			fireRate: 15, 	
			dmg: 1,		
			detectionRange: 30, 
			bulletSpeed: 30, 
			moveSpeed: 10, 
			life: 5,	
			shotSize: 0.2,
			type   : "static",
            CAT    : CATEGORY_ENEMY,
            MASK   : MASK_ENEMY,
            tag    : "ENEMY",
			radius : 0.9,
			shape : "circle",
			canShoot : true,
			canMove : false
		}];