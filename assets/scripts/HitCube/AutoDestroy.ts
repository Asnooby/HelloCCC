import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AutoDestroy')
export class AutoDestroy extends Component {
    start() {

    }

    update(deltaTime: number) {
        if (this.node.worldPosition.z < -10)
        {
            this.node.destroy();
        }
    }
}


