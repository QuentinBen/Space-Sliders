var weaponData = 
	[
		{
			type: "classic rifle",
			fireRate: 15,        // done	    // le joueur ne peut tirer que toutes les 15 frames
			dmg: 1,				 // done		// dégats infligés par le tir
			range: 30, 			 // done		// durée de vie en frame du tir avant qu'il ne disparaisse
			speed: 30, 			 // done		// Multiplicateur donné au SetLinearVelocity de la bullet
			ammoCapacity: 20,					// nombre de tirs possibles avec chargeur plein
			ammo: 20,			 // done		// current ammo
			reloadRate: 120,					// nombre de frame à attendre pour recupérer 1 munition
			shape: "circle",
			size: 0.2			 //done			// taille de la bullet
		},

		{
			type: "laser sword",
			fireRate: 10,
			dmg: 4,
			range: 5, 
			speed: 50, 
			ammoCapacity: 50,
			ammo: 50,
			reloadRate: 600,	
			shape:"box",
			size: 1  
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
			size: 0.2
		},
		
		{
			type: "plasma rocket",
			fireRate: 80,
			dmg: 4,
			range: 120,
			speed:15,
			ammoCapacity: 10,
			ammo: 10,
			reloadRate: 240,	
			shape:"circle",
			size: 0.5
		}
	];