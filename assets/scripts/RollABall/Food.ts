import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Food')
export class Food extends Component {
    @property(Number)
    public fRotationPerSec:number = 30;
    start() {

    }

    update(deltaTime: number) {
        const eulerAngles = this.node.eulerAngles;
        this.node.eulerAngles = new Vec3(eulerAngles.x, eulerAngles.y + this.fRotationPerSec * deltaTime, eulerAngles.z);
    }
}


