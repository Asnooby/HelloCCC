import { _decorator, Component, EventTouch, Input, input, instantiate, Node, Prefab, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AttackController')
export class AttackController extends Component {
    @property
    public moveScale:number = 0.1;
    @property(Node)
    public BulletParent:Node=null;
    @property(Node)
    public Gound:Node=null;
    @property(Prefab)
    public Bullet:Prefab=null;
    @property(Number)
    public BulletSep:number=0;
    @property(Number)
    public BulletSpeed:number=30;

    private isAttcking:boolean=false;
    private fLastAttckTime:number;

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    update(deltaTime: number) {
        if (this.isAttcking)
        {
            this.fLastAttckTime += deltaTime;
            if (this.fLastAttckTime >= this.BulletSep)
            {
                this.fire();
                this.fLastAttckTime -= this.BulletSep;
            }
        }
    }

    fire()
    {
        if (this.Bullet != null)
        {
            var bullet = instantiate(this.Bullet);
            bullet.setParent(this.BulletParent);
            bullet.setWorldPosition(this.node.worldPosition);
            const rgd = bullet.getComponent(RigidBody);
            rgd.setLinearVelocity(new Vec3(0, 0, -this.BulletSpeed));
        }
    }

    onTouchStart(event: EventTouch) {
        console.log("TOUCH_START");
        this.isAttcking = true;
        this.fLastAttckTime = 0;
    }

    onTouchMove(event: EventTouch) {
        console.log("TOUCH_MOVE");
        var worldPosition:Vec3 = this.node.worldPosition;
        this.node.setWorldPosition(worldPosition.add3f(event.getDeltaX() * this.moveScale, event.getDeltaY() * this.moveScale, 0));
    }

    onTouchEnd(event: EventTouch) {
        console.log("TOUCH_END");
        this.isAttcking = false;
        this.fLastAttckTime = 0;
    }

    onTouchCancel(event: EventTouch) {
        console.log("TOUCH_CANCEL");
        this.isAttcking = false;
        this.fLastAttckTime = 0;
    }
}


