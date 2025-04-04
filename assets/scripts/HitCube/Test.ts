import { _decorator, Component, EventTouch, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AttackController')
export class AttackController extends Component {
    start() {
        input.on(Input.EventType.TOUCH_START, (event: EventTouch)=>
        {
            console.log("TOUCH_START");
        }, this);
        input.on(Input.EventType.TOUCH_MOVE, (event: EventTouch)=>
        {
            console.log("TOUCH_MOVE");
        }, this);
        input.on(Input.EventType.TOUCH_END, (event: EventTouch)=>
        {
            console.log("TOUCH_END");
        }, this);
        input.on(Input.EventType.TOUCH_CANCEL, (event: EventTouch)=>
        {
            console.log("TOUCH_CANCEL");
        }, this);
    }

    update(deltaTime: number) {
        
    }
}


