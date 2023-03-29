import { _decorator, Component, Node, Animation, Vec3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StampAnim')
export class StampAnim extends Component {
    @property({type: Animation})
    private StampAnim: Animation|null = null;

    // private posCenterX: number[] = [-160, -160, -160]; //[-95, 95, -95, 95];
    // private posCenterY: number[] = [60, 15, -30]; //[27.5, 27.5, -27.5, -27.5];

    @property(Vec3)
    private displayPos : Vec3[] = [];

    // private offsetY: number = -163;

    start() {
        this.StampAnim.node.active = false;
        // let animation = this.StampAnim.node.getComponent(Animation);
        // animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play(selection: number)
    {
        // let pos = new Vec3(this.posCenterX[selection] + 65, this.posCenterY[selection] + 20 + this.offsetY, 0);
        if(this.StampAnim && !this.StampAnim.node.active )
        {
            // console.log("stamp animation!" + pos);
            this.node.setPosition(this.displayPos[selection]);
            this.StampAnim.node.active = true;
            this.StampAnim.play();
        }
    }       

    update(deltaTime: number) {

    }

    public SetIsActive(is : boolean)
    {
        this.StampAnim.node.active = is;
    }

    public onTriggered(arg: number)
    {

    }
}

