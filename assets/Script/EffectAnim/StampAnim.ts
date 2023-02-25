import { _decorator, Component, Node, Animation, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StampAnim')
export class StampAnim extends Component {
    @property({type: Animation})
    private StampAnim: Animation|null = null;

    @property(Number)
    private posCenterX: number[] = []; //[-150, -150, -150]; //[-95, 95, -95, 95];
    @property(Number)
    private posCenterY: number[] = []; //[60, 15, -30]; //[27.5, 27.5, -27.5, -27.5];

    private offsetY: number = -168; //-163;

    start() {
        this.StampAnim.node.active = false;
        // let animation = this.StampAnim.node.getComponent(Animation);
        // animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play(selection: number)
    {
        console.log('hoge');
        // let pos = new Vec3(this.posCenterX[selection] + 65, this.posCenterY[selection] + 20 + this.offsetY, 0);
        let pos = new Vec3(this.posCenterX[selection], this.posCenterY[selection] + this.offsetY, 0);
        if(this.StampAnim && !this.StampAnim.node.active )
        {
            console.log("stamp animation!" + pos);
            this.node.setPosition(pos);
            this.StampAnim.node.active = true;
            this.StampAnim.play('StampAnim');
        }
    }       

    update(deltaTime: number) {

    }

    public AnimationReset()
    {
        this.StampAnim.node.active = false;
    }

    public onTriggered(arg: number)
    {

    }
}

