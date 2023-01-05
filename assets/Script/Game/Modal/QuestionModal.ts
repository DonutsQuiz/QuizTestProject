import { _decorator, Component, Node, Label, Button, Vec2, Vec3, SpriteFrame, Sprite } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizType } from '../Quiz/QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('QuestionModal')
export class QuestionModal extends Component {

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
    @property(Label)
    qWaitLabel : Label = null;

    private debugClientMode : number = 0;

    start() {
        this.qStartB.node.on(Button.EventType.CLICK, function(){
            QuizModalManager.Instance().ChangeModal('Choices');
        },this);
    }

    update(deltaTime: number) {
        this.DebugModalUpdate();
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

        this.node.active = true;
        this.qNumber.node.active = true;
        this.qSentence.node.active = true;

        this.qSelect.node.active = false;
        this.qImageFrame.active = false;
        this.qSpriteFrame.node.active = false;
        this.qStartB.node.active = false;
        this.qSelectB.forEach(element => {element.node.active = false;});
        this.qWaitLabel.node.active = false;

        if(qtype === 'Gesture'){    // ジェスチャー
            if(GameManager.Instance().GetClientMode() === 0){
                this.qSentence.node.setPosition(new Vec3(0,75,0));
                this.qImageFrame.active = true;
                this.qSpriteFrame.node.active = true;
                this.qStartB.node.active = true;
                this.debugClientMode = 0;
            }
            else{
                this.qSentence.node.setPosition(new Vec3(0,0,0));
                this.qWaitLabel.node.active = true;
                this.qWaitLabel.fontSize = 19;
                this.debugClientMode = 1;
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
            this.qNumber.node.active = true;
            this.qSentence.node.active = true;
    
            this.qSelect.node.active = false;
            this.qImageFrame.active = false;
            this.qSpriteFrame.node.active = false;
            this.qStartB.node.active = false;
            this.qSelectB.forEach(element => {element.node.active = false;});
            this.qWaitLabel.node.active = false;

            if(GameManager.Instance().GetClientMode() === 0){
                this.qSentence.node.setPosition(new Vec3(0,75,0));
                this.qImageFrame.active = true;
                this.qSpriteFrame.node.active = true;
                this.qStartB.node.active = true;
                this.debugClientMode = 0;
            }
            else{
                this.qSentence.node.setPosition(new Vec3(0,0,0));
                this.qWaitLabel.node.active = true;
                this.qWaitLabel.fontSize = 19;
                this.debugClientMode = 1;
            }
        }

    }
}

