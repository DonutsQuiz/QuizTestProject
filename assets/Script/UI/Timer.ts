import { _decorator, Component, Node, Graphics, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Timer')
export class Timer extends Component {
    @property(Graphics)
    time_circle : Graphics = null;

    @property(Label)
    time_display : Label = null;

    private elapsed_time : number = 0;

    private time_limit : number = 1800.0;

    private radius: number = 24;

    private isFinish : boolean = false;
    private isEnd : boolean = false;


    start() {
    }

    public Reset()
    {
        this.isEnd = false;
        this.isFinish = false;
        this.elapsed_time = 0;
        this.isFinish = false;
        this.isEnd  = false; 
    }

    public SetTimeLimit(limit: number)
    {
        this.time_limit = limit;
    }

    public GetTimeLeft()
    {
        return (this.time_limit - this.elapsed_time);
    }

    public GetIsFinish() : boolean{
        return this.isFinish;
    }

    public GetIsEnd() : boolean{
        return this.isEnd;
    }

    public Display()
    {
        if(this.isFinish)this.isFinish = false;

        if(this.elapsed_time < this.time_limit){
            let second = Math.ceil((this.time_limit - this.elapsed_time) / 60.0);
            let minutes = Math.floor(second / 60.0);
            second %= 60;
    
            // 時間を表示
            // this.time_display.string = ("00" + minutes).slice(-2) + ":" + ("00" + second).slice(-2);
            this.time_display.string = (second).toString();
    
            //　時間（サークル）を表示
            let _endAngle = (0.5 - 2.0 * (this.elapsed_time / this.time_limit)) * Math.PI;
            
            this.time_circle.clear();
            
            this.time_circle.lineWidth = 2;
            this.time_circle.strokeColor.fromHEX('#000000');
            this.time_circle.fillColor.fromHEX('#FFFF00');
            this.time_circle.circle(0, 0, this.radius);
            this.time_circle.stroke();
            this.time_circle.fill();

            this.time_circle.lineWidth = 0;
            this.time_circle.fillColor.fromHEX('#9B9B9B');
            this.time_circle.arc(0, 0, this.radius, 0.5 * Math.PI, _endAngle, true);
            this.time_circle.lineTo(0, 0);
            this.time_circle.close();
            this.time_circle.stroke();
            this.time_circle.fill();
            
            this.elapsed_time += 1;
        }
        else{
            this.time_circle.clear();
            this.time_display.string = null;

            if(!this.isEnd){
                this.isEnd = true;
                this.isFinish = true;
            }
        }
    }

    update(deltaTime: number) {

    }
}

