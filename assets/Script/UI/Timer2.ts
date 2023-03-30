import { _decorator, Component, Node, Graphics, Label, Vec3, Color} from 'cc';
import { ClientMode } from '../Game/Manager/GameManager';

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

    public Display(time : number, end : boolean, mode : ClientMode)
    {
        if(!end){
            if(mode != 'Audience'){
                this.timerDisplay.active = true;
                this.timerLabel.string = Math.ceil(time).toString() + "秒";
            } else{
                this.timerDisplay.active = false;
            }

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

