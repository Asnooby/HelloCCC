import { _decorator, Component, EventTouch, Input, input, math, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property
    public moveScale:number = 0.1;
    start() {
        input.on(Input.EventType.TOUCH_START, (event: EventTouch)=>
        {
        }, this);
        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch)=>
        {
            var worldPosition:Vec3 = this.node.worldPosition;
            this.node.setWorldPosition(worldPosition.add3f(event.getDeltaX() * this.moveScale, event.getDeltaY() * this.moveScale, 0));
        }, this);
        input.on(Input.EventType.TOUCH_END, (event: EventTouch)=>
        {
        }, this);
        input.on(Input.EventType.TOUCH_CANCEL, (event: EventTouch)=>
        {
        }, this);
    }

    update(deltaTime: number) {
        
    }
}


