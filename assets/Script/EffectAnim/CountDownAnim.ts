import { _decorator, Component, Node, Animation, Label } from 'cc';
import { Timer } from '../UI/Timer';

const { ccclass, property } = _decorator;

@ccclass('CountDownAnim')
export class CountDownAnim extends Component {
    @property({type: Animation})
    private CountDownAnime: Animation|null = null;

    @property(Label)
    private countLabel: Label = null;

    @property(Timer)
    private timer: Timer = null;

    private time: number = 0;

    start() {
        this.CountDownAnime.node.active = false
        let animation = this.CountDownAnime.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play()
    {
        if(this.CountDownAnime && !this.CountDownAnime.node.active)
        {
            this.time = Math.ceil(this.timer.GetTimeLeft() / 60.0);
            let count = this.timer.GetTimeLeft() % 60;

            if(this.time <= 10 && count == 0)
            {
                // console.log(this.time);
                this.countLabel.string = this.time.toString();
                this.CountDownAnime.node.active = true;
                this.CountDownAnime.play('CountAnim');
            }
        }
    }   

    public AnimationReset()
    {
        this.CountDownAnime.node.active = false;
    }
    
    public onTriggered(arg: number)
    {
        if(this.time > 1){
            this.CountDownAnime.node.active = false;
        }
    }
}

