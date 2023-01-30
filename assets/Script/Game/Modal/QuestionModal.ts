import { _decorator, Component, Node, Label, Button, Vec2, Vec3, SpriteFrame, Sprite, RichText, Game } from 'cc';
import { StartControll } from '../../EffectAnim/StartControll';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizType } from '../Quiz/QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('QuestionModal')
export class QuestionModal extends Component {

    @property(Node)
    private liverNode : Node = null;
    @property(Label)
    qNumber : Label = null;
    @property(RichText)
    qSentence : RichText = null;
    @property(Node)
    qImageFrame : Node = null;
    @property(Sprite)
    qSpriteFrame : Sprite = null;
    @property(Button)
    qStartB : Button = null;
    @property(Button)
    qSelectB : Array<Button> = new Array<Button>();
    @property(Label)
    qSelectSent : Array<Label> = new Array<Label>();
    @property(Node)
    private userNode : Node = null;

    private debugClientMode : ClientMode = 'Liver';
    private debugQuizMode : QuizType = 'None';
    private isSelect : number = -1; // 答えの番号

    private changeDelay : number = 0.0; // 演出用の時間
    @property(Number)
    private delayMax = 1.0;
    private isNext : boolean = false;

    @property(StartControll)
    startAnim : StartControll = null;


    public Constructor(){
        this.qStartB.node.on(Button.EventType.CLICK, this.Next,this);
        this.qSelectB[0].node.on(Button.EventType.CLICK, function(){this.isSelect = 0;},this);
        this.qSelectB[1].node.on(Button.EventType.CLICK, function(){this.isSelect = 1;},this);
        this.qSelectB[2].node.on(Button.EventType.CLICK, function(){this.isSelect = 2;},this);
        this.qSelectB[3].node.on(Button.EventType.CLICK, function(){this.isSelect = 3;},this);
    }

    public OnUpdate(deltaTime: number){
        this.DebugModalUpdate();

        if(this.isSelect >= 0){
            GameManager.Instance().GetGameInfo().qCorNumber = this.isSelect;
            this.qStartB.node.active = true;
        }

        if(this.isNext){
            this.changeDelay -= deltaTime;
            this.startAnim.Play();
            if(this.changeDelay <= 0.0){
                this.startAnim.AnimationReset();
                QuizModalManager.Instance().ChangeModal('Choices');
                this.isNext = false;
            }
        }
    }

    private Next(){
        this.isNext = true;
        this.changeDelay = this.delayMax;
        this.userNode.active = false;
        this.liverNode.active = false;
    }

    public SetNumber(num : number){
        this.qNumber.string = num.toString() + " / " + QuizManager.Instance().raundMax + "問";
    }

    public SetSentence(sent : string){
        this.qSentence.string = sent;
    }

    public SetSelect(sele : Array<string>){
        for(const sent in sele){
            // this.qSelect.string += sent;
        }
    }

    public SetSprite(sprite : SpriteFrame){
        this.qSpriteFrame.spriteFrame = sprite;
    }

    public SetUI(qtype : QuizType){

        this.debugQuizMode = qtype;

        this.liverNode.active = true;
        this.qNumber.node.active = true;
        this.qSentence.node.active = true;

        this.qImageFrame.active = false;
        this.qSpriteFrame.node.active = false;
        this.qStartB.node.active = false;
        this.qSelectB.forEach(element => {element.node.active = false;});
        this.userNode.active = false;

        if(qtype === 'Gesture'){    // ジェスチャー
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.qSentence.node.setPosition(new Vec3(0,75,0));
                this.qImageFrame.active = true;
                this.qSpriteFrame.node.active = true;
                this.qStartB.node.active = true;
                this.debugClientMode = 'Liver';
            }
            else{
                this.liverNode.active = false;
                this.userNode.active = true;
                this.debugClientMode = 'User';
            }
        }
        else if(qtype === 'Act'){   // アクト
            this.qSentence.node.setPosition(new Vec3(0,25,0));
            this.qStartB.node.active = true;
        }
        else if(qtype === 'Personal'){   // クイズ
            this.qSentence.node.setPosition(new Vec3(0,25,0));
            //this.qSelectB.forEach(element => {element.node.active = true;});
            var sele : string = "";
            for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                this.qSelectB[i].node.active = true;
                if(i === 0)sele = "A.";
                if(i === 1)sele = "B.";
                if(i === 2)sele = "C.";
                if(i === 3)sele = "D.";
                this.qSelectSent[i].string = sele + GameManager.Instance().GetGameInfo().qParSelect[i];
            }
        }
    }

    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){

            this.node.active = true;
            this.liverNode.active = true;
            this.qNumber.node.active = true;
            this.qSentence.node.active = true;

            this.qImageFrame.active = false;
            this.qSpriteFrame.node.active = false;
            this.qStartB.node.active = false;
            this.qSelectB.forEach(element => {element.node.active = false;});
            this.userNode.active = false;

            if(this.debugQuizMode === 'Gesture'){    // ジェスチャー
                if(GameManager.Instance().GetClientMode() === 'Liver'){
                    this.qSentence.node.setPosition(new Vec3(0,75,0));
                    this.qImageFrame.active = true;
                    this.qSpriteFrame.node.active = true;
                    this.qStartB.node.active = true;
                    this.debugClientMode = 'Liver';
                }
                else{
                    this.liverNode.active = false;
                    this.userNode.active = true;
                    this.debugClientMode = 'User';
                }
            }
            else if(this.debugQuizMode === 'Act'){   // アクト
                this.qSentence.node.setPosition(new Vec3(0,25,0));
                this.qStartB.node.active = true;
            }
            else if(this.debugQuizMode === 'Personal'){   // クイズ
                this.qSentence.node.setPosition(new Vec3(0,25,0));
                this.qSelectB.forEach(element => {element.node.active = true;});
                var sele : string = "";
                for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                    if(i === 0)sele = "A.";
                    if(i === 1)sele = "B.";
                    if(i === 2)sele = "C.";
                    if(i === 3)sele = "D.";
                    this.qSelectSent[i].string = sele + GameManager.Instance().GetGameInfo().qParSelect[i];
                }
            }
        }

    }
}

