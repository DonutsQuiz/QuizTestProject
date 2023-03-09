import { _decorator, Component, Node, Button, Label, SpriteFrame, Sprite, Vec3,RichText, game, color, Game, ModelComponent, TERRAIN_SOUTH_INDEX } from 'cc';
import { AnimationManager } from '../Manager/AnimationManager';
import { Timer } from '../../UI/Timer';
import { Timer2 } from '../../UI/Timer2';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { BetModal } from './BetModal';
import { ResultModal } from './ResultModal';
import { IconLineup } from '../../UI/IconLineup';
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
    @property(RichText) // 選択肢（文字　文章）
    private textList : Array<RichText> = new Array<RichText>();
    @property(Label) // 選択肢（文字　文章）
    private labelList : Array<Label> = new Array<Label>();
    @property(Sprite)// 選択肢（画像）
    private spriteList : Array<Sprite> = new Array<Sprite>();
    @property(Label)// オッズ
    private oddsLabelList : Array<Label> = new Array<Label>();
    @property(Label)// 総ベット量
    private betLabelList : Array<Label> = new Array<Label>();
    @property(Label) // 問題数
    private numberLabel : Label = null;
    @property(RichText)// 問題文
    private questionText : RichText = null;
    @property(Label)// 所持コイン
    private coinsLabel : Label = null;
    @property(BetModal)// ベットモーダル
    private betModal : BetModal = null; 
    @property(Button)// 次に進むボタン
    private nextButton : Button = null;
    @property(Button)// 結果表示ボタン
    private resultButton : Button = null;
    @property(Button)// カウントダウンボタン
    private countdownButton : Button = null;
    @property(Label) //ヒント
    private hintLabel : Label = null;
    @property(Button)// ヒントボタン
    private hintButton : Button = null;
    @property(SpriteFrame) //正解の枠
    private correctFrameSprite : SpriteFrame = null;
    @property(SpriteFrame) //選択した枠
    private selectFrameSprite : SpriteFrame = null;
    @property(SpriteFrame) //元々の枠
    private normalFrameSprite : SpriteFrame = null;
    @property(Node)
    private TitleFrameNode : Node = null;
    @property(Label)
    private TitleFrameLabel : Label = null;
    @property(IconLineup)
    private iconLineupList : Array<IconLineup> = new Array<IconLineup>();
    @property(Button)
    private listenerListButton : Array<Button> = new Array<Button>();

    @property(ResultModal) // リザルトモーダル
    private resultModal : ResultModal = null;

    @property(Timer)
    timer : Timer = null;

    @property(Timer2)
    timer2 : Timer2 = null;

    choiceNumber : number = -1;
    private tempNumber : number = 0;
    private debugClientMode : ClientMode = 'Liver';
    private isCountDown : boolean = false;

    isToRanking : boolean = false;

    private hintIndex : number = 0;

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
        this.buttonList[3].node.on(Button.EventType.CLICK, function(){this.Choice(3);}, this);
        this.nextButton.node.on( Button.EventType.CLICK, this.Next, this);
        this.resultButton.node.on( Button.EventType.CLICK, this.ShowResult, this);
        this.countdownButton.node.on(Button.EventType.CLICK, this.ClickCountDownButton /* function(){this.isCountDown = true; this.countdownButton.node.active = false;} */, this);
        this.hintButton.node.on(Button.EventType.CLICK, function(){this.ChangeHint();}, this);
        for(const icon of this.iconLineupList){
            icon.Constructor();
        }

        this.questionScrean = this.allSideNode.getChildByName('QuestionScrean');
        this.answerScrean = this.allSideNode.getChildByName('AnswerScrean');
        this.explanationNode = this.answerScrean.getChildByName('Explanation');
    }

    public OnUpdate(deltaTime: number){
        this.DebugModalUpdate();

        // カウントダウン処理
        if(this.isCountDown){
            this.timer.Display();
            AnimationManager.Instance().countDownAnim.Play(this.timer.GetTimeLeft());
        }

        // 時間切れの処理
        if(this.timer.GetIsFinish()){
            // this.resultButton.node.active = true;
            this.TitleFrameNode.active = true;
            this.TitleFrameLabel.string = "ボーナス倍率結果";
            for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                this.oddsLabelList[i].node.active = true;
                this.betLabelList[i].node.active = false;
                this.iconLineupList[i].Reset();
            }
        }

        if(!this.timer.GetIsEnd()){
            for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                this.oddsLabelList[i].string = "x" + GameManager.Instance().GetGameInfo().odds[i].toString();
                this.betLabelList[i].string = GameManager.Instance().GetGameInfo().totalBet[i].toString() + "点";
            }
        }

        // ベットモーダルが出ている時は選択肢を押せないようにする
        if(this.betModal.node.active || this.timer.GetIsEnd() || this.choiceNumber >= 0){
            this.DontClickButton(false);
        }
        else{
            this.DontClickButton(true);
        }

        if(this.betModal.GetIsDecide()){
            this.DecideChoice();
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
            this.CloseUpFunction();

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
        this.DecideChoice();
        this.tempNumber = index;      // 選択した番号
    }

    // 選択肢を設定
    public SetChoices(index : number, text : string, sprite : SpriteFrame){
        var tempstring : string = "";
        if(index === 0){tempstring = "A.";}
        else if(index === 1){tempstring = "B.";}
        else if(index === 2){tempstring = "C.";}
        else if(index === 3){tempstring = "D.";}
        tempstring = text;
        this.textList[index].string = "<color=#000000>" + tempstring + "</color>";
        this.labelList[index].string = tempstring;
        this.spriteList[index].spriteFrame = sprite;
    }

    
    public GetChoics() : number{
        return this.choiceNumber;
    }

    public SetQuestion(sent : string){
        this.questionText.string = "<color=#000000>" + sent + "</color>";
    }

    public SetUI(){
        this.timer.SetTimeLimit(GameManager.Instance().GetGameInfo().thinkTime);   // タイマーのセット
        this.questionText.string ="<color=#000000>" +  GameManager.Instance().GetGameInfo().qSentenceUser + "</color>";
        // this.numberLabel.string = GameManager.Instance().GetGameInfo().qNumber + "/" + QuizManager.Instance().raundMax + "問";
        this.numberLabel.string = "第" + GameManager.Instance().GetGameInfo().qNumber + "問:";
        this.betModal.node.active = false;
        this.resultModal.node.active = false;

        this.questionScrean.getChildByName('QuestionSentence').getComponent(RichText).string = this.questionText.string;
        this.questionScrean.getChildByName('QuestionNumber').getComponent(Label).string = this.numberLabel.string;

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
            this.frameList[GameManager.Instance().GetGameInfo().qCorNumber].spriteFrame = this.correctFrameSprite;
            this.hintLabel.string = GameManager.Instance().GetGameInfo().hintSentence[this.hintIndex];
            this.debugClientMode = 'Liver';

        }
        else{
            this.liverNode.active = false;
            this.userNode.active = true;
            AnimationManager.Instance().liverNode.active = false;
            AnimationManager.Instance().userNode.active = true;
            this.coinsLabel.string = GameManager.Instance().GetGameInfo().coins.toString();
            this.debugClientMode = 'User';
        }
    }

    // 選択肢を決定
    private DecideChoice(){
        this.choiceNumber = this.tempNumber;
        this.frameList[this.choiceNumber].spriteFrame = this.selectFrameSprite;
        this.iconLineupList[this.choiceNumber].AddIcon(GameManager.Instance().GetGameInfo().ranking[0].mSprite);
        // if(this.betModal.getIsPushedDecideButton()) AnimationManager.Instance().betAnim.Play(this.choiceNumber, this.betModal.GetBetValue());
        AnimationManager.Instance().answerAnim.Play(this.choiceNumber);
        this.betModal.SetIsDecide(false);
    }

    // 正解表示
    private ShowResult(){
        // this.resultButton.node.active = false;
        // this.nextButton.node.active = true;
        this.resultModal.node.active = true;
        this.resultModal.SetAnswerLabel(GameManager.Instance().GetGameInfo().qCorNumber,"");
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            if(i != GameManager.Instance().GetGameInfo().qCorNumber){
                this.oddsLabelList[i].string = "x1.0";
                this.oddsLabelList[i].color = color(255,255,255,255);
            }
        }
        this.TitleFrameLabel.string = "正解発表";
    }

    //カウントダウンボタン
    private ClickCountDownButton(){
        GameManager.Instance().debugTimeUpModal.SetIsActive(true);
    }

    // 回答締め切り処理
    private CloseUpFunction(){
        // this.resultButton.node.active = true;
        this.TitleFrameNode.active = true;
        this.TitleFrameLabel.string = "ボーナス倍率結果";
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            this.oddsLabelList[i].node.active = true;
            this.betLabelList[i].node.active = false;
            this.iconLineupList[i].Reset();
        }
    }

    // 結果発表に進む
    private Next(){
        this.timer.Reset();
        AnimationManager.Instance().timeUpAnim.AnimationReset();
        AnimationManager.Instance().countDownAnim.AnimationReset();
        // AnimationManager.Instance().betAnim.AnimationReset();
        AnimationManager.Instance().answerAnim.AnimationReset();
        AnimationManager.Instance().stampAnim.AnimationReset();

        this.thinkingTime = 60.0;
        this.isThinkingEnd = false;

        this.resultModal.Init();

        this.isCountDown = false;
        this.isToRanking = true;
        this.resultModal.node.active = false;
        this.TitleFrameNode.active = false;
        this.TitleFrameLabel.string = "ボーナス倍率結果";
        this.countdownButton.node.active = true;
        this.betModal.SetIsDecide(false);
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

    // 次のヒントを表示する
    private ChangeHint(){
        this.hintIndex = (this.hintIndex + 1) % GameManager.Instance().GetGameInfo().hintSentence.length;
        this.hintLabel.string = GameManager.Instance().GetGameInfo().hintSentence[this.hintIndex];
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

            if(this.timer.GetIsEnd()){

                if(this.debugClientMode === 'Liver'){
                    for(const odds of this.oddsLabelList){
                        odds.node.active = true;
                    }
                }
                else{
                    for(const odds of this.oddsLabelList){
                        odds.node.active = false;
                    }
                }

                if(isResult){
                    // this.nextButton.node.active = true;
                }
                else{
                    // this.resultButton.node.active = true;
                }
                for(const odds of this.oddsLabelList){
                    odds.node.active = true;
                }
            }


            if(isResult){
                this.resultModal.node.active = true;            
                // this.liverAnswerFrameSprite.active = true;
            }
        }
    }

    private ResetUI(){
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){ //フレームをリセット
            this.oddsLabelList[i].color = color(255,255,0,255);
            this.oddsLabelList[i].node.active = false;
            this.betLabelList[i].node.active = true;
            this.frameList[i].spriteFrame = this.normalFrameSprite;
        }
    }

    public GetResultModal() : ResultModal{
        return this.resultModal;
    }

    public GetTimer() : Timer{
        return this.timer;
    }
}

