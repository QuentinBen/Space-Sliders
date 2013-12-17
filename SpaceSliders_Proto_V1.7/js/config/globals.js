var state 		  		  = "SHOOT";
var world;
var canvas;
var context;

var stats;
var frame;
var mouseX;
var mouseY;

var camera;

var player;

var enemiesTable		  = [];
var platformTable 		  = [];
var bulletTable           = [];
	  
var b2Vec2 			      = Box2D.Common.Math.b2Vec2
,	b2BodyDef 		      = Box2D.Dynamics.b2BodyDef
,	b2Body 			      = Box2D.Dynamics.b2Body
,	b2FixtureDef	      = Box2D.Dynamics.b2FixtureDef
,	b2Fixture 		      = Box2D.Dynamics.b2Fixture
,	b2World 		      = Box2D.Dynamics.b2World
,	b2MassData 		      = Box2D.Collision.Shapes.b2MassData
,	b2PolygonShape        = Box2D.Collision.Shapes.b2PolygonShape
,	b2CircleShape         = Box2D.Collision.Shapes.b2CircleShape
,	b2DebugDraw           = Box2D.Dynamics.b2DebugDraw
,   b2RevoluteJointDef    = Box2D.Dynamics.Joints.b2RevoluteJointDef
,   b2Listener 		      = Box2D.Dynamics.b2ContactListener
;

var CATEGORY_PLAYERBULLET = 0x0001;
var CATEGORY_PLAYER 	  = 0x0002;
var CATEGORY_SCENERY 	  = 0x0004;
var CATEGORY_ENEMY 	  	  = 0x0008;
var CATEGORY_NEUTRAL	  = 0x0016;
var CATEGORY_PLATFORM 	  = 0x0032;

var MASK_PLAYER           = CATEGORY_ENEMY   | CATEGORY_SCENERY | CATEGORY_PLATFORM;
var MASK_PLAYERBULLET 	  = CATEGORY_SCENERY | CATEGORY_ENEMY;
var MASK_ENEMY			  = CATEGORY_PLAYER  | CATEGORY_SCENERY | CATEGORY_NEUTRAL | CATEGORY_PLAYERBULLET | CATEGORY_PLATFORM;
var MASK_NEUTRAL		  = CATEGORY_ENEMY   | CATEGORY_PLAYER  | CATEGORY_SCENERY | CATEGORY_NEUTRAL      | CATEGORY_PLAYERBULLET;
var MASK_PLATFORM 		  = CATEGORY_PLAYER  | CATEGORY_ENEMY   | CATEGORY_NEUTRAL;
var MASK_SCENERY 	 	  = -1;