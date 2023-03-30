import { _decorator, Component, Node, Button, Label, SpriteFrame, Sprite, Vec3,RichText, game, color, Game, ModelComponent, TERRAIN_SOUTH_INDEX, Color, InstanceMaterialType } from 'cc';
import { AnimationManager } from '../Manager/AnimationManager';
import { Timer2 } from '../../UI/Timer2';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { ResultModal } from './ResultModal';
const { ccclass, property } = _decorator;

@ccclass('ChoicesModal')
export class ChoicesModal extends Component {

    @property(Node) // ライバー側
    private liverNode : Node = null;
    @property(Node) // ユーザー側
    private userNode : Node = null;
    @property(Node) //ライバーとユーザー共通のノード
    private allSideNode : Node = null;
    @property(Button) // 選択肢（ボタン）
    private buttonList : Array<Button> = new Array<Button>();
    @property(Sprite) // 選択肢（枠）
    private frameList : Array<Sprite> = new Array<Sprite>();
    @property(Label) // 選択肢（文字　文章）
    private labelList : Array<Label> = new Array<Label>();
    @property(RichText)// 問題文
    private questionText : RichText = null;
    @property(Button)// カウントダウンボタン
    private countdownButton : Button = null;
    @property(SpriteFrame) //正解の枠
    private correctFrameSprite : SpriteFrame = null;
    @property(SpriteFrame) //選択した枠
    private selectFrameSprite : SpriteFrame = null;
    @property(SpriteFrame) //元々の枠
    private normalFrameSprite : SpriteFrame = null;
    @property(Button)
    private listenerListButton : Array<Button> = new Array<Button>();

    @property(ResultModal) // リザルトモーダル
    private resultModal : ResultModal = null;

    @property(Timer2)
    timer2 : Timer2 = null;

    choiceNumber : number = -1;
    private tempNumber : number = 0;
    private debugClientMode : ClientMode = 'Liver';

    private thinkingTime = 60.0;
    private isThinkingEnd : boolean = false;
    private MODAL_CHANGE_TIME :number = 3.0;
    private modalChangeTime :number = -1.0;
    private isModalChange :boolean = false;
    private correctAnswerTime : number = -1.0;
    private CORRECT_ANSWER_COUNT : number = 2;
    private correctAnswerCount : number = 0;
    private questionScrean : Node = null;   // 選択前の画面（ライバーとユーザー共通のノードの子ノード）
    private answerScrean : Node = null;     // 回答時の画面（ライバーとユーザー共通のノードの子ノード）
    private explanationNode : Node = null;  // 説明文のノード

    public Constructor(){
        this.buttonList[0].node.on(Button.EventType.CLICK, function(){this.Choice(0);}, this);
        this.buttonList[1].node.on(Button.EventType.CLICK, function(){this.Choice(1);}, this);
        this.buttonList[2].node.on(Button.EventType.CLICK, function(){this.Choice(2);}, this);
        this.countdownButton.node.on(Button.EventType.CLICK, this.ClickCountDownButton, this);
        this.questionScrean = this.allSideNode.getChildByName('QuestionScrean');
        this.answerScrean = this.allSideNode.getChildByName('AnswerScrean');
        this.explanationNode = this.answerScrean.getChildByName('Explanation');
    }

    public OnUpdate(deltaTime: number){
        this.DebugModalUpdate();

        // 解答締め切り || 選択済み|| 視聴者なら押せないようにする
        if(this.isThinkingEnd || this.choiceNumber >= 0 || GameManager.Instance().GetClientMode() === "Audience"){
            this.DontClickButton(false);
        }
        else{
            this.DontClickButton(true);
        }


        // 新仕様
        this.timer2.Display(this.thinkingTime, this.isThinkingEnd);
        this.timer2.SetTimeDisplayPos(this.debugClientMode);

        if(this.thinkingTime > 0.0){
            this.thinkingTime -= deltaTime;
        }
        else if(this.thinkingTime <= 0.0 && this.thinkingTime > -1.0 && this.isThinkingEnd === false){
            AnimationManager.Instance().timeUpAnim.Play();
            this.thinkingTime = -1.0;
            this.isThinkingEnd = true;
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
        }

        // 締め切りモーダル
        if(GameManager.Instance().debugTimeUpModal.GetIsDecise() && GameManager.Instance().debugTimeUpModal.GetIsCloseUp()){
            this.countdownButton.node.active = false;
            AnimationManager.Instance().timeUpAnim.Play();
            this.thinkingTime = -1.0;
            this.isThinkingEnd = true;
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
            GameManager.Instance().debugTimeUpModal.SetIsDecide(false);
        }

        // ３秒後に結果発表に移る
        if(this.modalChangeTime > 0.0){
            this.modalChangeTime -= deltaTime;
        }
        else if(this.modalChangeTime < 0.0 && this.modalChangeTime > -1.0 && this.isModalChange === false){
            this.modalChangeTime = -1.0;
            this.correctAnswerTime = 3.0;
            this.isModalChange = true;

            this.timer2.SetIsActive(false);

            AnimationManager.Instance().stampAnim.SetIsActive(false);

            this.questionScrean.active = true;
            this.answerScrean.active = false;
            this.userNode.active = false;
            this.liverNode.active = false;
            this.explanationNode.active = false;
        }

        // 正解発表
        if(this.correctAnswerTime > 0.0 && this.correctAnswerCount <= this.CORRECT_ANSWER_COUNT){
            this.correctAnswerTime -= deltaTime;
        }
        else if(this.correctAnswerTime < 0.0 && this.correctAnswerTime > -1.0){
            if(this.correctAnswerCount === 0){
                this.correctAnswerTime = 3.0;
                this.questionScrean.active = false;
                this.answerScrean.active = true;
                this.userNode.active = true;
                this.liverNode.active = true;
                

                AnimationManager.Instance().stampAnim.SetIsActive(true);
                
                this.ShowResult();
                this.resultModal.SetAnswerLabelActive("Before");
            }
            else if(this.correctAnswerCount === 1){
                this.correctAnswerTime = 5.0;

                this.resultModal.SetAnswerReslult(GameManager.Instance().GetGameInfo().qCorNumber, this.choiceNumber);
                this.resultModal.SetAnswerLabelActive("After");
            }
            else if(this.correctAnswerCount === 2){
                this.correctAnswerTime = -1.0;
                this.correctAnswerCount = -1;
                this.isModalChange = false;

                this.Next();
            }

            this.correctAnswerCount++;
        }

    }

    // クリックした時
    private Choice(index : number) {
        // this.betModal.node.active = true;    // ベットモーダルを表示
        this.tempNumber = index;      // 選択した番号
        this.DecideChoice();
        this.buttonList.forEach(element => {element.node.active = false;});
        this.frameList.forEach(element =>{element.node.active = true;});
        this.frameList[index].spriteFrame = this.selectFrameSprite;
    }

    // 選択肢を設定
    public SetChoices(index : number, text : string, sprite : SpriteFrame){
        console.log(('text: ' + text));
        var tempstring : string = "";
        if(index === 0){tempstring = "A.";}
        else if(index === 1){tempstring = "B.";}
        else if(index === 2){tempstring = "C.";}
        else if(index === 3){tempstring = "D.";}
        tempstring = text;
        this.labelList[index].string = tempstring;
        // this.spriteList[index].spriteFrame = sprite;
    }

    
    public GetChoics() : number{
        return this.choiceNumber;
    }

    public SetQuestion(sent : string){
        this.questionText.string = "<color=#000000>" + "第" + GameManager.Instance().GetGameInfo().qNumber + "問：" + sent + "</color>";
    }

    public SetUI(){
        this.questionText.string = "<color=#000000>" + "第" + GameManager.Instance().GetGameInfo().qNumber + "問：" + GameManager.Instance().GetGameInfo().qSentence + "</color>"
        this.resultModal.node.active = false;

        this.questionScrean.getChildByName('QuestionSentence').getComponent(RichText).string = this.questionText.string;

        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){ //フレームをリセット
            this.frameList[i].spriteFrame = this.normalFrameSprite;
        }

        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.liverNode.active = true;
            this.userNode.active = false;
            AnimationManager.Instance().liverNode.active = true;
            AnimationManager.Instance().userNode.active = false;
            // this.nextButton.node.active = false;
            // this.resultButton.node.active = false;
            for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                if(i === GameManager.Instance().GetGameInfo().qCorNumber){
                    this.labelList[i].color = new Color(0,0,0,255);
                }
                else{
                    this.labelList[i]. color = new Color(148,148,148,255);
                }
            }
            this.frameList[GameManager.Instance().GetGameInfo().qCorNumber].spriteFrame = this.correctFrameSprite;
            this.debugClientMode = 'Liver';

        }
        else{
            this.liverNode.active = false;
            this.userNode.active = true;
            for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                this.labelList[i].color = new Color(0,0,0,255);
            }
            AnimationManager.Instance().liverNode.active = false;
            AnimationManager.Instance().userNode.active = true;
            // this.coinsLabel.string = GameManager.Instance().GetGameInfo().coins.toString();
            this.debugClientMode = 'User';
        }
    }

   // 問題文などのセット
   public SetQuizInfoUI(){
    //    this.numberLabel.string = GameManager.Instance().GetGameInfo().qNumber.toString() + " / " + QuizManager.Instance().raundMax + "問";
    this.questionText.string = "<color=#000000>" + "第" + GameManager.Instance().GetGameInfo().qNumber + "問：" + GameManager.Instance().GetGameInfo().qSentence + "</color>"
       console.log(this.questionText.string);
       for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
           this.labelList[i].string = GameManager.Instance().GetGameInfo().qSelectSent[i];
       }
   }
    

    // 選択肢を決定
    private DecideChoice(){
        this.choiceNumber = this.tempNumber;
        this.frameList[this.choiceNumber].spriteFrame = this.selectFrameSprite;
        GameManager.Instance().GetApiConnect().guestAnswer(
            GameManager.Instance().GetGameInfo().userId,
            GameManager.Instance().GetGameInfo().token,
            GameManager.Instance().GetGameInfo().gameId,
            GameManager.Instance().GetGameInfo().hostId,
            GameManager.Instance().GetGameInfo().order,
            this.choiceNumber + 1
        )
        // if(this.betModal.getIsPushedDecideButton()) AnimationManager.Instance().betAnim.Play(this.choiceNumber, this.betModal.GetBetValue());
        AnimationManager.Instance().answerAnim.Play(this.choiceNumber, GameManager.Instance().GetGameInfo().ranking[0].mSprite);
    }

    // 正解表示
    private ShowResult(){
        this.resultModal.node.active = true;
        this.resultModal.SetAnswerLabel(GameManager.Instance().GetGameInfo().qCorNumber,"");
        this.questionText.node.active = false;

        // リザルトの取得
        GameManager.Instance().GetApiConnect().fixResult(
            GameManager.Instance().GetGameInfo().hostId,
            GameManager.Instance().GetGameInfo().token,
            GameManager.Instance().GetGameInfo().gameId,
            GameManager.Instance().GetGameInfo().order
        );
    }

    //カウントダウンボタン
    private ClickCountDownButton(){
        GameManager.Instance().debugTimeUpModal.SetIsActive(true);
    }

    // 結果発表に進む
    private Next(){
        AnimationManager.Instance().timeUpAnim.AnimationReset();
        AnimationManager.Instance().countDownAnim.AnimationReset();
        // AnimationManager.Instance().betAnim.AnimationReset();
        AnimationManager.Instance().answerAnim.AnimationReset();
        AnimationManager.Instance().stampAnim.SetIsActive(false);

        this.thinkingTime = 60.0;
        this.isThinkingEnd = false;

        this.resultModal.Init();

        this.resultModal.node.active = false;
        this.countdownButton.node.active = true;
        this.questionText.node.active = true;
        // this.betModal.SetIsDecide(false);
        this.choiceNumber = -1;
        this.ResetUI();

        QuizModalManager.Instance().ChangeModal('Overall');
    }

    // ボタンを押せないようにする
    private DontClickButton(is : boolean){
        for(const buttons of this.buttonList){
            buttons.node.active = is;
        }
    }


    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            var isResult : boolean = false;
            if(this.resultModal.node.active) isResult = true;

            this.SetUI();

            if(this.debugClientMode === 'User'){
                if(this.choiceNumber >= 0){ //選択したなら表示
                    this.frameList[this.choiceNumber].spriteFrame = this.selectFrameSprite;
                }
                if(isResult){ //リザルト表示時は正解を表示
                    this.frameList[GameManager.Instance().GetGameInfo().qCorNumber].spriteFrame = this.correctFrameSprite;
                }
            }

        }

        if(isResult){
            this.resultModal.node.active = true;            
            // this.liverAnswerFrameSprite.active = true;
        }
    }

    private ResetUI(){
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){ //フレームをリセット
            // this.oddsLabelList[i].color = color(255,255,0,255);
            // this.oddsLabelList[i].node.active = false;
            // this.betLabelList[i].node.active = true;
            this.frameList[i].spriteFrame = this.normalFrameSprite;
        }

        this.timer2.SetIsActive(true);
        this.explanationNode.active = true;
    }

    public GetResultModal() : ResultModal{
        return this.resultModal;
    }
}

