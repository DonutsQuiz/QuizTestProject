import { _decorator, Component, Node, Graphics, Label, Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Timer2')
export class Timer2 extends Component {
    @property(Graphics)
    private timeGauge : Graphics = null;

    @property(Label)
    private timeDisplay : Label = null;
    
    @property(Number)
    private timeMax : number = 0;

    private isFinish : boolean = false;
    private isEnd : boolean = false;

    start() {

    }

    public Reset()
    {
        this.isEnd = false;
        this.isFinish = false;
    }

    public SetTimeDisplayPos(mode : string)
    {
        if(mode === 'Liver'){
            this.timeDisplay.node.setPosition(new Vec3(-158, -80, 0));
        }
        else if(mode === 'User'){
            this.timeDisplay.node.setPosition(new Vec3(130, 170, 0));
        }
    }

    public GetIsFinish() : boolean{
        return this.isFinish;
    }

    public GetIsEnd() : boolean{
        return this.isEnd;
    }

    public Display(time : number, end : boolean)
    {
        this.timeDisplay.string = (end) ? "0秒" : Math.ceil(time).toString() + "秒";

        if(time < this.timeMax){
            this.timeGauge.clear();

            this.timeGauge.fillColor.fromHEX('#E63222');
            this.timeGauge.rect(0, 0, 375, 10);
            this.timeGauge.stroke();
            this.timeGauge.fill();

            this.timeGauge.fillColor.fromHEX('#F6FF8A');
            this.timeGauge.rect(0, 0, 375 * (time / this.timeMax), 10);
            this.timeGauge.stroke();
            this.timeGauge.fill();
        }
        else{
            this.timeGauge.clear();

            if(!this.isEnd){
                this.isEnd = true;
                this.isFinish = true;
            }
        }
    }

    update(deltaTime: number) {
        
    }
}

