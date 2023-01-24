import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TimeUpAnim')
export class TimeUpAnim extends Component {
    @property({type: Animation})
    public TimeUpAnim: Animation|null = null;

    // @property(String)
    // private AnimName: String = "Anim";

    start() {
        this.TimeUpAnim.node.active = false
        let animation = this.TimeUpAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play()
    {
        if(this.TimeUpAnim && !this.TimeUpAnim.node.active)
        {
            this.TimeUpAnim.node.active = true;
            this.TimeUpAnim.play('TimeUpAnim');
            // this.TimeUpAnim.play(this.AnimName.toString());
        }
    }   

    public AnimationReset()
    {
        this.TimeUpAnim.node.active = false;
    }
    
    public onTriggered(arg: number)
    {
        
    }
}

