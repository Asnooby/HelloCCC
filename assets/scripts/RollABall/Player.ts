import { _decorator, Camera, Collider, Component, EventTouch, ICollisionEvent, Input, input, math, Node, RigidBody, Vec2, Vec3, ITriggerEvent } from 'cc';
import { Food } from './Food';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Node)
    public cameraNode:Node = null;
    @property(Vec3)
    public cameraOffset:Vec3 = null;

    @property(Number)
    public moveForceScalar:number = 10;
    private moveForceDir:Vec3 = null;

    private rgd:RigidBody = null;

    
    start() {
        this.rgd = this.getComponent(RigidBody);

        let collider = this.node.getComponent(Collider);
        if (collider != null) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
            collider.on('onTriggerStay', this.onTriggerStay, this);
            collider.on('onTriggerExit', this.onTriggerExit, this);
        }
    }

    protected onLoad(): void {
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
        
        let collider = this.node.getComponent(Collider);
        if (collider != null) {
            collider.off('onTriggerEnter', this.onTriggerEnter, this);
            collider.off('onTriggerStay', this.onTriggerStay, this);
            collider.off('onTriggerExit', this.onTriggerExit, this);
        }
    }

    update(deltaTime: number) {
        this.updatePosition();
    }

    lateUpdate(deltaTime: number) {
        this.updateCamera();
    }

    updatePosition() {
        if (this.moveForceDir != null && this.rgd != null)
        {
            this.rgd.applyForce(this.moveForceDir);
            // const pos:Vec3 = this.node.position;
            // this.node.setPosition(pos.x + this.moveForceDir.x, pos.y, pos.z + this.moveForceDir.y);
        }
    }

    updateCamera() {
        if (this.cameraNode != null)
        {
            const pos:Vec3 = new math.Vec3(this.node.position);
            pos.add(this.cameraOffset);
            this.cameraNode.position = pos;
            this.cameraNode.lookAt(this.node.position);
        }
    }
    
    onTouchStart(event: EventTouch) {
        this.moveForceDir = null;
    }

    onTouchMove(event: EventTouch) {
        const moveDir: Vec2 = event.getDelta();
        
        // Create a direction vector from screen space (x right, z forward)
        const screenDir = new Vec3(moveDir.x, 0, -moveDir.y);
        
        // Get camera quaternion rotation
        const cameraQuat = this.cameraNode.rotation;
        
        // Transform the screen direction to world space using the camera's quaternion
        this.moveForceDir = new Vec3();
        Vec3.transformQuat(this.moveForceDir, screenDir, cameraQuat);
        
        // Keep movement on horizontal plane
        this.moveForceDir.y = 0;
        this.moveForceDir.normalize();
        this.moveForceDir.multiplyScalar(this.moveForceScalar);
    }

    onTouchEnd(event: EventTouch) {
        this.moveForceDir = null;
    }

    onTouchCancel(event: EventTouch) {
        this.moveForceDir = null;
    }

    onTriggerEnter(event: ITriggerEvent) {
        if (null != event.otherCollider.getComponent(Food)) {
            event.otherCollider.node.destroy();
            console.log('onTriggerEnter');
        }
    }

    onTriggerStay(event: ITriggerEvent) {
        if (null != event.otherCollider.getComponent(Food)) {
            console.log('onTriggerStay');
        }
    }

    onTriggerExit(event: ITriggerEvent) {
        if (null != event.otherCollider.getComponent(Food)) {
            console.log('onTriggerExit');
        }
    }
}


