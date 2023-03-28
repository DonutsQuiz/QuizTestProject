import { _decorator, Component, Node, Graphics, Label, Vec3, Color} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Timer2')
export class Timer2 extends Component {
    @property(Graphics)
    private timeGauge : Graphics = null;
    @property(Label)
    private timerLabel : Label = null;
    @property(Node)
    private timerDisplay : Node = null;
    @property(Number)
    private timeMax : number = 0;
    @property(Color)
    private baseColor : Color = null;
    @property(Color)
    private layeredColor : Color = null;

    start() {

    }

    public SetTimeDisplayPos(mode : string)
    {
        // if(mode === 'Liver'){
        //     this.timerLabel.node.setPosition(new Vec3(-158, -80, 0));
        // }
        // else if(mode === 'User'){
        //     this.timerLabel.node.setPosition(new Vec3(-158, -80, 0));
        // }
    }

    public Display(time : number, end : boolean)
    {
        if(!end){
            this.timerDisplay.active = true;
            this.timerLabel.string = Math.ceil(time).toString() + "秒";

            if(time < this.timeMax){
                this.timeGauge.clear();
    
                this.timeGauge.fillColor = this.baseColor;
                this.timeGauge.rect(0, 0, 375, 5);
                this.timeGauge.stroke();
                this.timeGauge.fill();
    
                this.timeGauge.fillColor = this.layeredColor;
                this.timeGauge.rect(0, 0, 375 * (time / this.timeMax), 5);
                this.timeGauge.stroke();
                this.timeGauge.fill();
            }
            else{
                this.ClearDisplay();
            }
        }
        else{
            this.ClearDisplay();
        }
    }

    private ClearDisplay(){
        this.timeGauge.clear();
    
        this.timeGauge.fillColor = this.baseColor;
        this.timeGauge.rect(0, 0, 375, 5);
        this.timeGauge.stroke();
        this.timeGauge.fill();
        this.timerLabel.string = "";
        this.timerDisplay.active = false;
    }

    public SetIsActive(is : boolean){
        this.node.active = is;
    }

    update(deltaTime: number) {
    }
}

