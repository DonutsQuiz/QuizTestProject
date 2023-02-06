import { _decorator, Component, Node, Animation, EventMouse, input, Input, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChipControll')
export class ChipControll extends Component {
    @property({type: Animation})
    private ChipAnim: Animation|null = null;

    @property(Label)
    private money_display : Label = null;

    private posCenterX: number[] = [-94.5, 94.5, -94.5, 94.5];
    private posCenterY: number[] = [57, 57, -57, -57];

    start() {
        console.log("set bet");
        this.ChipAnim.node.active = false;
        // this.money_display.node.active = false;

        let animation = this.ChipAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play(selection: number, money: number)
    {
        console.log("animation!");
        let pos = new Vec3(this.posCenterX[selection] - 50, this.posCenterY[selection] - 20, 0);
        if(this.ChipAnim && !this.ChipAnim.node.active )
        {
            this.money_display.string = (money).toString();
            // this.money_display.node.active = true;

            this.node.setPosition(pos);
            this.ChipAnim.node.active = true;
            this.ChipAnim.play('BetChip');
        }
    }       

    update(deltaTime: number) {

    }

    public Reset()
    {
        this.money_display.string = null;
        // this.money_display.node.active = false;
        this.ChipAnim.node.active = false;
    }

    public onTriggered(arg: number)
    {
        // console.log("triggered!!");
    }
}

