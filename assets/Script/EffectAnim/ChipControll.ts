import { _decorator, Component, Node, Animation, EventMouse, input, Input, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChipControll')
export class ChipControll extends Component {
    @property({type: Animation})
    public ChipAnim: Animation|null = null;

    private posX: number[] = [-94.5, 94.5, -94.5, 94.5];
    private posY: number[] = [57, 57, -57, -57];

    start() {
        // console.log("set trigger");
        this.ChipAnim.node.active = false;

        let animation = this.ChipAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play(selection: number)
    {
        console.log("animation!");
        let pos = new Vec3(this.posX[selection], this.posY[selection], 0);
        if(this.ChipAnim && !this.ChipAnim.node.active )
        {
            this.node.setPosition(pos);
            this.ChipAnim.node.active = true;
            this.ChipAnim.play('BetChip');
        }
    }       

    update(deltaTime: number) {

    }

    public onTriggered(arg: number)
    {
        // console.log("triggered!!");
        this.ChipAnim.node.active = false;
    }
}

