import { _decorator, Component, Node, Label, Button, Vec2, Vec3, SpriteFrame, Sprite } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizType } from '../Quiz/QuizComponent';
import { StartControll } from '../../EffectAnim/StartControll';
const { ccclass, property } = _decorator;

@ccclass('QuestionModal')
export class QuestionModal extends Component {

    @property(Node)
    private liverNode : Node = null;
    @property(Label)
    qNumber : Label = null;
    @property(Label)
    qSentence : Label = null;
    @property(Label)
    qSelect : Label = null;
    @property(Node)
    qImageFrame : Node = null;
    @property(Sprite)
    qSpriteFrame : Sprite = null;
    @property(Button)
    qStartB : Button = null;
    @property(Button)
    qSelectB : Array<Button> = new Array<Button>();
    @property(Node)
    private userNode : Node = null;

    private debugClientMode : ClientMode = 'Liver';
    private debugQuizMode : QuizType = 'None';

    private changeDelay : number = 0.0; // 演出用の時間
    @property(Number)
    private delayMax : number = 1.0;
    private isNext : boolean = false;

    @property(StartControll)
    startAnim : StartControll = null;

    start() {
        this.qStartB.node.on(Button.EventType.CLICK, this.Next,this);
    }

    update(deltaTime: number) {
        this.DebugModalUpdate();

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
        this.qNumber.string = "第" + num.toString() + "問"; 
    }

    public SetSentence(sent : string){
        this.qSentence.string = sent;
    }

    public SetSelect(sele : Array<string>){
        for(const sent in sele){
            this.qSelect.string += sent;
        }
    }

    public SetSprite(sprite : SpriteFrame){
        this.qSpriteFrame.spriteFrame = sprite;
    }

    public Initialize(qtype : QuizType){

        this.debugQuizMode = qtype;

        this.node.active = true;
        this.liverNode.active = true;
        this.qNumber.node.active = true;
        this.qSentence.node.active = true;

        this.qSelect.node.active = false;
        this.qImageFrame.active = false;
        this.qSpriteFrame.node.active = false;
        this.qStartB.node.active = false;
        this.qSelectB.forEach(element => {element.node.active = false;});
        this.userNode.active = false;

        if(qtype === 'Gesture'){    // ジェスチャー
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.qSentence.node.setPosition(new Vec3(0,75,0));
                this.qSentence.fontSize = 23;
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
            this.qSentence.node.setPosition(new Vec3(0,50,0));
            this.qStartB.node.active = true;
        }
        else if(qtype === 'Quiz'){   // クイズ
            this.qSentence.node.setPosition(new Vec3(0,75,0));
            this.qSelect.node.active = true;
            this.qSelectB.forEach(element => {element.node.active = true;});
        }
    }

    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){

            this.node.active = true;
            this.liverNode.active = true;
            this.qNumber.node.active = true;
            this.qSentence.node.active = true;
    
            this.qSelect.node.active = false;
            this.qImageFrame.active = false;
            this.qSpriteFrame.node.active = false;
            this.qStartB.node.active = false;
            this.qSelectB.forEach(element => {element.node.active = false;});
            this.userNode.active = false;

            if(this.debugQuizMode === 'Gesture'){    // ジェスチャー
                if(GameManager.Instance().GetClientMode() === 'Liver'){
                    this.qSentence.node.setPosition(new Vec3(0,75,0));
                    this.qSentence.fontSize = 23;
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
                this.qSentence.node.setPosition(new Vec3(0,50,0));
                this.qStartB.node.active = true;
            }
            else if(this.debugQuizMode === 'Quiz'){   // クイズ
                this.qSentence.node.setPosition(new Vec3(0,75,0));
                this.qSelect.node.active = true;
                this.qSelectB.forEach(element => {element.node.active = true;});
            }
        }

    }
}

