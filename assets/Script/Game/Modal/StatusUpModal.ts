import { _decorator, Component, Node, Color, Sprite, Graphics, Button, Animation, Vec3, math, Label, Prefab, instantiate, AnimationState, UITransform, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StatusUpModal')
export class StatusUpModal extends Component {

    @property(Color)
    private default_pointColor : Color = null;
    @property(Color)
    private pass_pointColor : Color = null;
    @property(Node)
    private checkPointParentNode : Node = null;
    @property(Node)
    private humanNode : Node = null;
    @property(Prefab)
    private checkPointPrefab : Prefab = null;
    @property(Number)
    private checkPointNum : number = 0;
    @property(Graphics)
    private bar : Graphics = null;
    @property(SpriteFrame)
    private passSprite : SpriteFrame = null;
    @property(UITransform)
    private contentTransform : UITransform = null;
    @property(Label)
    private participantsNumLabel : Label = null;
    @property(Label)
    private participantsTotalLabel : Label = null;
    @property(Label)
    private testTotalLabel : Label = null;

    @property(Button)
    private progressButton : Button = null;


    // @property(Prefab)
    // private bookPrefab : Prefab = null;

    private checkPointNode : Node[] = [];
    private checkPointSprite : Sprite[] = [];
    // private bookAnim : Animation[] = [];

    private participantsNum : number = 0;
    private participantsTotal : number = 0;
    private currentStatus : number = 0;
    private nextRequiredNum : number = 0;
    private testTotal : number = 0;

    private _LEFT_END : number = -90;
    private _OVERALL_WIDTH : number = 180;
    private _MAX_STATUS : number = 6;
    private _MAX_NUM : number = 15;

    private _NUM_REQUIRED_NEXT_STATUS : number[] = [1, 3, 5, 9, 11, 11];
    private _ANIM_DELAY : number[] = [0.2, 0.25];

    private _CHECK_POINT_POS_X : number[] = [-100, 0, 100, 0];
    private _CHECK_POINT_POS_Y : number = 40;
    private _OFFSET_Y : number = 100;

    private _ANIMATION_TIME : number = 60;
    private animElapsed : number = 0;

    start(){
        this.progressButton.node.on(Button.EventType.CLICK, this.progressCounter, this);
    }

    Constructor() {
        // チェックポイントを生成
        for(let i = 0; i < this.checkPointNum; ++i){
            let tmpNode = instantiate(this.checkPointPrefab);
            this.checkPointParentNode.addChild(tmpNode);
            this.checkPointNode[i] = tmpNode;
            this.checkPointNode[i].setPosition(this._CHECK_POINT_POS_X[i % 4], this._CHECK_POINT_POS_Y * i, 0);
            this.checkPointNode[i].active = true;

            this.checkPointSprite[i] = this.checkPointNode[i].getChildByName('CheckPointImage').getComponent(Sprite);
        }
        this.checkPointSprite[0].spriteFrame = this.passSprite;
    }

    OnUpdate(deltaTime: number) {
        // Label
        this.participantsNumLabel.string = this.participantsNum + '人';
        this.participantsTotalLabel.string = this.participantsTotal.toString() + '人';
        this.testTotalLabel.string = this.testTotal.toString();

        // bar
        this.bar.clear();
        
        this.bar.lineWidth = 10;
        this.bar.strokeColor = this.default_pointColor; 
        this.bar.moveTo(this._CHECK_POINT_POS_X[0], 0);
        for(let i = 1; i < this.checkPointNum; ++i){
            this.bar.lineTo(this._CHECK_POINT_POS_X[i % 4], this._CHECK_POINT_POS_Y * i);
        }
        this.bar.stroke();

        this.bar.strokeColor = this.pass_pointColor; 
        this.bar.moveTo(this._CHECK_POINT_POS_X[0], 0);
        for(let i = 1; i < Math.min(this.checkPointNum, this.testTotal + 1); ++i){
            this.bar.lineTo(this._CHECK_POINT_POS_X[i % 4], this._CHECK_POINT_POS_Y * i);
        }
        this.bar.stroke();

        if(this.testTotal < this.checkPointNum){
            // human & scroll
            var beforePosXId = (this.testTotal - 1) % 4;
            var currentPosXId = this.testTotal % 4;
            if(this.animElapsed === 0){
                var tmp = Math.max(0, beforePosXId);
                this.humanNode.setPosition(this._CHECK_POINT_POS_X[tmp], this._OFFSET_Y - this.contentTransform.node.position.y);
                ++this.animElapsed;
            }
            else if(this.animElapsed < this._ANIMATION_TIME){
                var tmpDisY = 0;
                if(this.testTotal > 0){
                    tmpDisY = -this._CHECK_POINT_POS_Y * (this.testTotal - 1) - this._CHECK_POINT_POS_Y * (this.animElapsed / 60.0);
                }
                this.contentTransform.node.setPosition(0, tmpDisY);
    
                var tmp = Math.max(0, beforePosXId);
                var humanMoveDisX = this._CHECK_POINT_POS_X[currentPosXId] - this._CHECK_POINT_POS_X[tmp];
                this.humanNode.setPosition(this._CHECK_POINT_POS_X[tmp] + humanMoveDisX * (this.animElapsed / 60.0), this._OFFSET_Y - tmpDisY);
    
                ++this.animElapsed;
            }

            // chenge sprite
            if(this.animElapsed === this._ANIMATION_TIME){
                this.checkPointSprite[this.testTotal].spriteFrame = this.passSprite;
                ++this.animElapsed;
            }
        }
    }

    private Generate(){
        this.contentTransform.height = 200 + this._CHECK_POINT_POS_Y * this.testTotal;
        this.animElapsed = 0;
    }

    private progressCounter(){
        this.participantsNum += 60;
        ++this.testTotal;

        this.Generate();
    }

    private onTriggered() {

    }
}

