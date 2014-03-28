var weaponData = 
	[
		{
			type: "classic rifle",
			fireRate: 15, // done	// le joueur ne peut tirer que toutes les 15 frames
			dmg: 1,	// done			// dégats infligés par le tir
			range: 30, // done		// durée de vie en frame du tir avant qu'il ne disparaisse
			speed: 30, // done		// Multiplicateur donné au SetLinearVelocity de la bullet
			ammoCapacity: 20,		// nombre de tirs possibles avec chargeur plein
			ammo: 20,// done		// current ammo
			reloadRate: 120,		// nombre de frame à attendre pour recupérer 1 munition
			shape: "circle",
			bulletRenderSize : 80,
			bulletSkin : "images/Bullet/bullet_assault.png",
			size: 0.2,	//done		// taille de la bullet
			uiDeath : "url(images/HUD/HUD_assault_dead.png)",
			animation :  {  url       : "images/Players/assault_spritesheet.png",
							urlWeapon : "images/Players/weapon_assault.png",
							character : {
											centerXisAt : 58,
											centerYisAt : 65,
											renderSizeX : 116,
											renderSizeY : 116,
											frameAnimWidth  : 128,
											frameAnimHeight  : 128,
											
											whichAnim : {
															idle :  {
																		BGXMax : 384,
																		animSpeed : 7,
																    },
															walk :  {
																		BGXMax : 640,
																		animSpeed : 7,
																    },
															jump :  {
																		BGXMax : 768,
																		animSpeed : 7,
																    },
														    slide : {
																		BGXMax : 256,
																		animSpeed : 7,
																    },
															death : {
																		BGXMax : 768,
																		animSpeed : 7,
																    }
											}
							
										 },
							 weapon    : {
												
												frameAnimWidth : 128,
												framAnimHeight : 128,
												pivotXRight :14,
												pivotXLeft :-10,												
												pivotY :28,
												imageDecalXRight :-36,
												imageDecalXLeft :-64,
												imageDecalY :-45,
												renderSize :116,
												bGxMax : 640,
												bGxStart : 128
										 },
			
			
				            }
				
		},

		{
			type: "sniper rifle",
			fireRate: 50,
			dmg: 2,
			range: 120,
			speed:50,
			ammoCapacity: 15,
			ammo: 15,
			reloadRate: 180,	
			shape:"circle",
			bulletRenderSize : 80,
			bulletSkin : "images/Bullet/bullet_sniper.png",
			size: 0.2,
			uiDeath : "url(images/HUD/HUD_sniper_dead.png)",
			animation :  {  url       : "images/Players/sniper_spritesheet.png",
						    urlWeapon : "images/Players/weapon_sniper.png",
						    character : {
											centerXisAt : 58,
											centerYisAt : 65,
											renderSizeX : 116,
											renderSizeY : 116,
											frameAnimWidth  : 128,
											frameAnimHeight  : 128,
											
											whichAnim : {
															idle :  {
																		BGXMax : 384,
																		animSpeed : 7,
																    },
															walk :  {
																		BGXMax : 640,
																		animSpeed : 7,
																    },
															jump :  {
																		BGXMax : 768,
																		animSpeed : 7,
																    },
														    slide : {
																		BGXMax : 256,
																		animSpeed : 7,
																    },
															death : {
																		BGXMax : 768,
																		animSpeed : 7,
																    }
											}
							
										 },
							 weapon    : {
												
												frameAnimWidth : 128,
												framAnimHeight : 128,
												pivotXRight :14, 
												pivotXLeft :-10,
												pivotY :28,
												imageDecalXRight :-36,
												imageDecalXLeft :-70,
												imageDecalY :-45,
												renderSize :116,
												bGxMax : 640,
												bGxStart : 128
										 },
			
			
				            }
		},

		{
			type: "laser sword",
			fireRate: 10,
			dmg: 4,
			range: 4, 
			speed: 50, 
			ammoCapacity: 25,
			ammo: 25,
			reloadRate: 400,	
			shape:"box",
			size: 0.6, 
			uiDeath : "url(images/HUD/HUD_sword_dead.png)",
			animation :  {   url       : "images/Players/sword_spritesheet.png",
						     urlWeapon : "images/Players/weapon_sword.png",
							 character : {
											centerXisAt : 45,
											centerYisAt : 52,
											renderSizeX : 90,
											renderSizeY : 90,
											frameAnimWidth  : 128,
											frameAnimHeight  : 128,
											
											whichAnim : {
															idle :  {
																		BGXMax : 512,
																		animSpeed : 7,
																    },
															walk :  {
																		BGXMax : 640,
																		animSpeed : 7,
																    },
															jump :  {
																		BGXMax : 256,
																		animSpeed : 7,
																    },
														    slide : {
																		BGXMax : 256,
																		animSpeed : 7,
																    },
															death : {
																		BGXMax : 640,
																		animSpeed : 7,
																    }
											}
							
										 },
							 weapon    : {
												frameAnimWidth : 128,
												framAnimHeight : 128,
												pivotXRight :24, 
												pivotXLeft :-20,
												pivotY :32,
												imageDecalXRight :-25,
												imageDecalXLeft :-75,
												imageDecalY :-10,
												renderSize :90,
												bGxMax : 384,
												bGxStart : 0
										 },
			
			
				            }
		},
		
		{
			type: "rocket",
			fireRate: 80,
			dmg: 4,
			range: 120,
			speed:15,
			ammoCapacity: 10,
			ammo: 10,
			reloadRate: 400,	
			shape:"circle",
			bulletRenderSize : 120,
			bulletSkin : "images/Bullet/bullet_rocket.png",
			size: 0.5,
			uiDeath : "url(images/HUD/HUD_rocket_dead.png)",
			animation :  {  url       : "images/Players/rocket_spritesheet.png",
							urlWeapon : "images/Players/weapon_rocket.png",
							character : {
											centerXisAt : 45,
											centerYisAt : 52,
											renderSizeX : 90,
											renderSizeY : 90,
											frameAnimWidth  : 128,
											frameAnimHeight  : 128,
											
											whichAnim : {
															idle :  {
																		BGXMax : 512,
																		animSpeed : 7,
																    },
															walk :  {
																		BGXMax : 640,
																		animSpeed : 7,
																    },
															jump :  {
																		BGXMax : 256,
																		animSpeed : 7,
																    },
														    slide : {
																		BGXMax : 256,
																		animSpeed : 7,
																    },
															death : {
																		BGXMax : 640,
																		animSpeed : 7,
																    }
											}
							
										 },
							 weapon    : {
												
												frameAnimWidth : 128,
												framAnimHeight : 128,
												pivotXRight :24, 
												pivotXLeft :-20,
												pivotY :32,
												imageDecalXRight :-15,
												imageDecalXLeft :-80,
												imageDecalY :-10,
												imageDecalYRun : -5,
												imageDecalXRightRun : 0,
												imageDecalXLeftRun : -90,
												renderSize :90,
												bGxMax : 384,
												bGxStart : 0
										 },
			
			
				            }
		},
		
		{
			type: "fragmentation Roquette",
			bulletSkin : "images/Bullet/bullet_rocket.png",
			bulletRenderSize : 90,
			dmg: 4,
			range: 15,
			speed:15,
			shape:"circle",
			size: 0.3
		},
		];