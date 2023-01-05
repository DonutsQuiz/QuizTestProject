import { _decorator, Component, Node, Button, labelAssembler, Label, SpriteFrame, Color, Sprite } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizData } from '../Quiz/Data/QuizData';
import { QuestionModal } from './QuestionModal';
const { ccclass, property } = _decorator;

@ccclass('ResultModal')
export class ResultModal extends Component {

    @property(Button)
    private nextButton : Button = null;
    @property(Label)
    private resultLabel : Label = null;
    @property(Label)
    private answerLabel : Label = null;
    @property(Sprite)
    private answerSprite : Sprite = null;
    @property(Label)
    private coinLabel : Label = null;

    public isNext = false;

    private debugClientMode : number = 0;


    start() {
        this.nextButton.node.on(Button.EventType.CLICK, function(){
            QuizModalManager.Instance().ChangeModal('Question');
            this.isNext = true;
        }, this)
    }

    update(deltaTime : number){
        this.DebugModalUpdate();
    }

    public SetInfo(choice : number, data : QuizData){
        if(choice === data.mAnswer){
            this.resultLabel.string = "正解";
            this.resultLabel.color = new Color(0,255,0,255);
            this.coinLabel.node.active = true;
        }
        else{
            this.resultLabel.string = "不正解";
            this.resultLabel.color = new Color(255,0,0,255);
            this.coinLabel.node.active = false;
        }
        
        if(GameManager.Instance().GetClientMode() === 0){
            this.nextButton.node.active = true;
            this.coinLabel.node.active = false;
            this.debugClientMode = 0;
        }
        else{
            this.nextButton.node.active = false;
            this.coinLabel.node.active = true;
            this.debugClientMode = 1;
        }
    }

    public SetAnswerSprite(sprite : SpriteFrame){
        this.answerSprite.spriteFrame = sprite;
    }

    public SetAnswerLabel(ansnum : number, label : string){
        if(ansnum === 0){
            this.answerLabel.string = "A.";
        }
        else if(ansnum === 1){
            this.answerLabel.string = "B.";
        }
        else if(ansnum === 2){
            this.answerLabel.string = "C.";
        }
        else if(ansnum === 3){
            this.answerLabel.string = "D.";
        }
        else if(ansnum === 4){
            this.answerLabel.string = "E.";
        }
        else if(ansnum === 5){
            this.answerLabel.string = "F.";
        }
        this.answerLabel.string += label;
    }

    public SetCoinLabel(coin : string){
        this.coinLabel.string = coin + "コイン獲得!!";
    }

    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){

            if(GameManager.Instance().GetClientMode() === 0){
                this.nextButton.node.active = true;
                this.coinLabel.node.active = false;
                this.debugClientMode = 0;
            }
            else{
                this.nextButton.node.active = false;
                this.coinLabel.node.active = true;
                this.debugClientMode = 1;
            }
        }
    }
}

