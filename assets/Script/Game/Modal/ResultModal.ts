import { _decorator, Component, Node, Button, labelAssembler, Label, SpriteFrame, Color, Sprite, UITransform, Vec2, Size } from 'cc';
import { ResultAnimControll } from '../../EffectAnim/ResultAnimControll';
import { ClientMode, GameManager } from '../Manager/GameManager';
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

    @property(Label)
    answerSentence : Label = null;
    @property(Sprite)
    answerImage : Sprite = null;


    @property(ResultAnimControll)
    resultAnim : ResultAnimControll = null;

    public isNext = false;

    private debugClientMode : ClientMode = 'Liver';

    private answerResult : boolean = false;

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
        if(choice === GameManager.Instance().GetGameInfo().qCorNumber){
            this.resultLabel.string = "正解";
            this.resultLabel.color = new Color(0,255,0,255);
            this.coinLabel.node.active = true;
        }
        else{
            this.resultLabel.string = "不正解";
            this.resultLabel.color = new Color(255,0,0,255);
            this.coinLabel.node.active = false;
        }
        
        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.nextButton.node.active = true;
            this.coinLabel.node.active = false;
            this.debugClientMode = 'Liver';
        }
        else{
            this.nextButton.node.active = false;
            this.coinLabel.node.active = true;
            this.debugClientMode = 'User';
        }
    }

    public SetAnswerSprite(sprite : SpriteFrame){
        this.answerImage.spriteFrame = sprite;
        this.answerImage.getComponent(UITransform).setContentSize(new Size(36,36));
    }

    public SetAnswerLabel(ansnum : number, label : string){
        this.answerSentence.string = "答えは";

        if(ansnum === 0){
            this.answerSentence.string += "A";
        }
        else if(ansnum === 1){
            this.answerSentence.string += "B";
        }
        else if(ansnum === 2){
            this.answerSentence.string += "C";
        }
        else if(ansnum === 3){
            this.answerSentence.string += "D";
        }
        else if(ansnum === 4){
            this.answerSentence.string += "E";
        }
        else if(ansnum === 5){
            this.answerSentence.string += "F";
        }
        this.answerSentence.string += "!!!";
    }

    public SetCoinLabel(coin : string){
        this.coinLabel.string = coin + "コイン獲得!!";
    }

    // クイズの回答があっているか
    public SetAnswerReslult(ansnum: number, choice: number)
    {
        console.log("choice: " + choice);
        console.log("ansnum: " + ansnum);
        if(ansnum === choice){
            this.answerResult = true;
        }
        else{
            this.answerResult = false;
        }
    }

    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){

            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.nextButton.node.active = true;
                this.coinLabel.node.active = false;
                this.debugClientMode = 'Liver';
            }
            else{
                this.nextButton.node.active = false;
                this.coinLabel.node.active = true;
                this.debugClientMode = 'User';
            }
        }

                // animation
                if(this.debugClientMode=== 'User'){
                    if(this.answerResult)
                    {
                        this.resultAnim.PlayCorrectAnim();
                    }
                    else{
                        this.resultAnim.PlayIncorrectAnim();
                    }
                }
    }
}

