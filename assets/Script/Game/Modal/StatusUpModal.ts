import { _decorator, Component, Node, Color, Sprite, Graphics, Button, Animation, Vec3, math, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StatusUpModal')
export class StatusUpModal extends Component {

    @property(Color)
    private default_pointColor : Color = null;
    @property(Color)
    private pass_pointColor : Color = null;

    @property(Node)
    private checkPoint : Node[] = [];
    @property(Graphics)
    private bar : Graphics = null;

    @property(Animation)
    private stage : Animation[] = [];

    @property(Label)
    private participantsNumLabel : Label = null;
    @property(Label)
    private participantsTotalLabel : Label = null;
    @property(Label)
    private testTotalLabel : Label = null;

    @property(Button)
    private progressButton : Button = null;

    private checkPointSprite : Sprite[] = [];
    private checkSpriteNode : Node[] = [];
    private checkPointAnim : Animation[] = [];

    private participantsNum : number = 0;
    private participantsTotal : number = 0;
    // private progressCount : number = 0;
    private currentStatus : number = 1;
    private nextRequiredNum : number = 3;
    private testTotal : number = 0;

    // private doAnim : boolean = false;

    private _LEFT_END : number = -90;
    private _OVERALL_WIDTH : number = 180;
    private _MAX_STATUS : number = 6;
    private _MAX_NUM : number = 15;
    private _REQUIRED_NUM : number = 3;

    start(){
        this.progressButton.node.on(Button.EventType.CLICK, this.progressCounter, this);
    }

    Constructor() {
        this.stage[0].node.active = true;
        for(let i = 1; i < this.stage.length; ++i)
        {
            this.stage[i].node.active = false;
        }

        for(let i = 0; i < this.checkPoint.length; ++i)
        {
            this.checkPointAnim[i] = this.checkPoint[i].getComponent(Animation);
            this.checkPointSprite[i] = this.checkPoint[i].getChildByName('CheckPointImage').getComponent(Sprite);
            this.checkSpriteNode[i] = this.checkPoint[i].getChildByName('CheckImage');
        }
        this.checkPointAnim[5].on(Animation.EventType.FINISHED, this.onTriggered, this);

        this.checkPoint[0].active = true;
        for(let i = 1; i < 4; ++i) {
            this.checkPoint[i].active = false;
        }
        this.checkPoint[5].active = true;
        this.checkPointSprite[0].color = this.pass_pointColor;
    }

    OnUpdate(deltaTime: number) {
        // Label
        this.participantsNumLabel.string = this.participantsNum + '人';
        this.participantsTotalLabel.string = this.participantsTotal.toString() + '人';
        this.testTotalLabel.string = this.testTotal.toString();

        // bar
        this.bar.clear();
        
        this.bar.lineWidth = 0;
        this.bar.fillColor = this.default_pointColor; 
        this.bar.rect(0, -5, this._OVERALL_WIDTH, 10);
        this.bar.stroke();
        this.bar.fill();

        this.bar.fillColor = this.pass_pointColor;
        this.bar.rect(0, -5, (this._OVERALL_WIDTH / Math.min(this.currentStatus, this._MAX_STATUS - 1)) * (1.0 / this._REQUIRED_NUM) * Math.min(this.testTotal, this._MAX_NUM), 10);
        this.bar.stroke();
        this.bar.fill();

        // check point
        // if(this.progressCount < this.participantsTotal && !this.doAnim){
        //     ++this.progressCount;
        // }
        if(this.testTotal >= this.nextRequiredNum && this.currentStatus < this._MAX_STATUS){
            this.checkPointSprite[5].color = this.pass_pointColor;
            this.checkSpriteNode[5].active = true;
            this.checkPointAnim[5].play();
            // this.doAnim = true;
            this.nextRequiredNum += this._REQUIRED_NUM;
        }
    }

    private progressCounter(){
        // this.participantsNum += 60;
        this.participantsNum = Math.floor(Math.random() * (60 - 30) + 30);
        this.participantsTotal += this.participantsNum;
        ++this.testTotal;
    }

    private onTriggered() {
        this.stage[this.currentStatus - 1].node.active = false;
        this.stage[this.currentStatus].node.active = true;
        this.stage[this.currentStatus].play();

        ++this.currentStatus;
        if(this.currentStatus < this._MAX_STATUS)
        {
            this.checkPointSprite[5].color = this.default_pointColor;
            this.checkSpriteNode[5].active = false;
            for(let i = 1; i < this.currentStatus; ++ i) {
                let pos = new Vec3(this._LEFT_END + i * this._OVERALL_WIDTH / this.currentStatus, 0, 0);
                this.checkPoint[i].setPosition(pos);
                this.checkPointSprite[i].color = this.pass_pointColor;
                this.checkSpriteNode[i].active = true;
                this.checkPoint[i].active = true;
            }
        }

        // this.doAnim = false;
    }
}

