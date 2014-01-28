var Interruptor = function(params, linkedDoor)
{
    this.x                                       = params.x;
    this.y                                       = params.y;
    this.linkedDoor                              = linkedDoor;

    this.activated                               = false;
    this.InterruptorCollider                     = new InterruptorCollider(this, this.params);
}

var InterruptorCollider = function(_self, _params)
{
    this.params                                  = _params;
    this.fixInterruptor                          = new b2FixtureDef;
    this.fixInterruptor.density                  = this.params.d  || 1;
    this.fixInterruptor.friction                 = this.params.f  || 0;
    this.fixInterruptor.restitution              = this.params.r  || 0;
    this.fixInterruptor.filter.categoryBits      = this.params.CAT;
    this.fixInterruptor.filter.maskBits          = this.params.MASK;
    this.fixInterruptor.userData                 = {tag : this.params.tag, obj : this};

    this.bodyInterruptor                         = new b2BodyDef;
    this.bodyInterruptor.type                    = b2Body.b2_kinematicBody;

    this.fixSquare.shape                         = new b2PolygonShape;
    this.fixSquare.shape.SetAsBox(this.params.w, this.params.h);

    this.bodyInterruptor.position.x              = this.params.x;
    this.bodyInterruptor.position.y              = this.params.y;
    
    this.bodyInterruptor = world.CreateBody(this.bodyInterruptor).CreateFixture(this.fixInterruptor);
    return this.bodyInterruptor.GetBody();
}