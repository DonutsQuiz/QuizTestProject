import { _decorator, Component, Node, Button, labelAssembler, Label, SpriteFrame, Color, Sprite, UITransform, Vec2, Size } from 'cc';
import { AnimationManager } from '../Manager/AnimationManager';
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
    private answerBeforeSentence : Label = null;
    @property(Label)
    private answerSentence : Label = null;
    @property(Sprite)
    answerImage : Sprite = null;

    public isNext = false;

    private debugClientMode : ClientMode = 'Liver';

    private answerResult : string = 'Default';

    private comboCount : number = -1;

    start() {
        this.nextButton.node.on(Button.EventType.CLICK, function(){
            this.isNext = true;
        }, this)
    }

    update(deltaTime : number){
        this.DebugModalUpdate();
    }

    public Init()
    {
        this.answerResult = 'Default';

        this.answerBeforeSentence.node.active = false;
        this.answerSentence.node.active = false;

        AnimationManager.Instance().resultAnim.AnimationReset();
    }

    public SetAnswerLabelActive(sentence : string)
    {
        if(sentence === "Before")
        {
            this.answerBeforeSentence.node.active = true;
            this.answerSentence.node.active = false;
        }
        else if(sentence === "After")
        {
            this.answerBeforeSentence.node.active = false;
            this.answerSentence.node.active = true;
        }
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
        this.answerSentence.string = "正解.";

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
        this.answerSentence.string += "!";
    }

    public SetCoinLabel(coin : string){
        this.coinLabel.string = coin + "コイン獲得!!";
    }

    // クイズの回答があっているか
    public SetAnswerReslult(ansnum: number, choice: number)
    {
        for(var i = 0; i < GameManager.Instance().GetGameInfo().nowRankingList.length; i++){
            if(GameManager.Instance().GetGameInfo().nowRankingList[i]['UserId'] === GameManager.Instance().GetGameInfo().userId){
                this.comboCount = GameManager.Instance().GetGameInfo().nowRankingList[i].ComboCount;
                this.answerResult = (GameManager.Instance().GetGameInfo().nowRankingList[i].IsCorrect) ? 'True' : 'False';

            }
        }

        // console.log("choice: " + choice);
        // console.log("ansnum: " + ansnum);
        // if(ansnum === choice){
        //     this.answerResult = 'True';
        // }
        // else{
        //     this.answerResult = 'False';
        // }
    }

    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){

            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.nextButton.node.active = true;
                this.coinLabel.node.active = false;
                this.debugClientMode = 'Liver';

                AnimationManager.Instance().liverNode.active = true;
                AnimationManager.Instance().userNode.active = false;
            }
            else{
                this.nextButton.node.active = false;
                this.coinLabel.node.active = true;
                this.debugClientMode = 'User';

                AnimationManager.Instance().liverNode.active = false;
                AnimationManager.Instance().userNode.active = true;
            }
        }

        // animation
        if(this.debugClientMode === 'User'){
            if(this.answerResult === 'True')
            {
                AnimationManager.Instance().resultAnim.PlayCorrectAnim(this.comboCount);
            }
            else if(this.answerResult === 'False')
            {
                AnimationManager.Instance().resultAnim.PlayIncorrectAnim();
            }
        }
    }
}

