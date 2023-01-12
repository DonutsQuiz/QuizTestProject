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

    start() {
    }

    public Reset()
    {
        this.elapsed_time = 0;
    }

    public SetTimeLimit(limit: number)
    {
        this.time_limit = limit;
    }

    public GetTimeLeft()
    {
        return (this.time_limit - this.elapsed_time);
    }

    public Display()
    {
        let second = Math.ceil((this.time_limit - this.elapsed_time) / 60.0);
        let minutes = Math.floor(second / 60.0);
        second %= 60;

        // 時間を表示
        this.time_display.string = ("00" + minutes).slice(-2) + ":" + ("00" + second).slice(-2);

        //　時間（サークル）を表示
        let _endAngle = (0.5 - 2.0 * (this.elapsed_time / this.time_limit)) * Math.PI;
        // console.log(_endAngle);
        
        this.time_circle.fillColor.fromHEX('#00FFFF');
        this.time_circle.lineWidth = 2;

        this.time_circle.clear();
        this.time_circle.arc(0, 0, 30, 0.5 * Math.PI, _endAngle, true);
        this.time_circle.lineTo(0, 0);
        this.time_circle.close();
        this.time_circle.stroke();
        this.time_circle.fill();
        if(this.elapsed_time < this.time_limit) this.elapsed_time += 1;
    }

    update(deltaTime: number) {

    }
}

