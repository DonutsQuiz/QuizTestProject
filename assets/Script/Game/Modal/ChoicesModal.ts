import { _decorator, Component, Node, Button, Label, SpriteFrame, Sprite, Vec3,RichText, game, color } from 'cc';
import { ChipControll } from '../../EffectAnim/ChipControll';
import { Timer } from '../../UI/Timer';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { BetModal } from './BetModal';
import { ResultModal } from './ResultModal';
const { ccclass, property } = _decorator;

@ccclass('ChoicesModal')
export class ChoicesModal extends Component {

    @property(Node) // ライバー側
    private liverNode : Node = null;
    @property(Node) // ユーザー側
    private userNode : Node = null;
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

    @property(ResultModal) // リザルトモーダル
    private resultModal : ResultModal = null;

    @property(Timer)
    timer : Timer = null;
    @property(ChipControll)
    chipAnim : ChipControll = null;

    choiceNumber : number = -1;
    private tempNumber : number = 0;
    private debugClientMode : ClientMode = 'Liver';
    private isCountDown : boolean = false;

    isNext : boolean = false;

    private hintIndex : number = 0;


    public Constructor(){
        this.buttonList[0].node.on(Button.EventType.CLICK, function(){this.Choice(0);}, this);
        this.buttonList[1].node.on(Button.EventType.CLICK, function(){this.Choice(1);}, this);
        this.buttonList[2].node.on(Button.EventType.CLICK, function(){this.Choice(2);}, this);
        this.buttonList[3].node.on(Button.EventType.CLICK, function(){this.Choice(3);}, this);
        this.nextButton.node.on( Button.EventType.CLICK, this.Next, this);
        this.resultButton.node.on( Button.EventType.CLICK, this.ShowResult, this);
        this.countdownButton.node.on(Button.EventType.CLICK, function(){this.isCountDown = true; this.countdownButton.node.active = false;}, this);
        this.hintButton.node.on(Button.EventType.CLICK, function(){this.ChangeHint();}, this);
    }

    public OnUpdate(deltaTime: number){
        this.DebugModalUpdate();

        // カウントダウン処理
        if(this.isCountDown){
            this.timer.Display();
        }

        // 時間切れの処理
        if(this.timer.GetIsFinish()){
            this.resultButton.node.active = true;
            this.TitleFrameNode.active = true;
            this.TitleFrameLabel.string = "ボーナス倍率結果";
            for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                this.oddsLabelList[i].node.active = true;
                this.betLabelList[i].node.active = false;
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
    }

    // クリックした時
    private Choice(index : number) {
        this.betModal.node.active = true;    // ベットモーダルを表示
        this.tempNumber = index;      // 選択した番号
    }

    // 選択肢を設定
    public SetChoices(index : number, text : string, sprite : SpriteFrame){
        var tempstring : string = "";
        if(index === 0){tempstring = "A.";}
        else if(index === 1){tempstring = "B.";}
        else if(index === 2){tempstring = "C.";}
        else if(index === 3){tempstring = "D.";}
        tempstring = tempstring + text;
        this.textList[index].string = "<color=#000000>" + tempstring + "</color>";
        this.labelList[index].string = tempstring;
        this.spriteList[index].spriteFrame = sprite;
    }

    
    public GetChoics() : number{
        return this.choiceNumber;
    }

    public SetQuestion(sent : string){
        this.questionText.string = "<color=#ffffff>" + sent + "</color>";
    }

    public SetUI(){
        this.timer.SetTimeLimit(GameManager.Instance().GetGameInfo().thinkTime);   // タイマーのセット
        this.questionText.string ="<color=#ffffff>" +  GameManager.Instance().GetGameInfo().qSentenceUser + "</color>";
        this.numberLabel.string = GameManager.Instance().GetGameInfo().qNumber + "/" + QuizManager.Instance().raundMax + "問";
        this.betModal.node.active = false;
        this.resultModal.node.active = false;

        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){ //フレームをリセット
            this.frameList[i].spriteFrame = this.normalFrameSprite;
        }

        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.liverNode.active = true;
            this.userNode.active = false;
            this.nextButton.node.active = false;
            this.resultButton.node.active = false;
            this.frameList[GameManager.Instance().GetGameInfo().qCorNumber].spriteFrame = this.correctFrameSprite;
            this.hintLabel.string = GameManager.Instance().GetGameInfo().hintSentence[this.hintIndex];
            this.debugClientMode = 'Liver';

        }
        else{
            this.liverNode.active = false;
            this.userNode.active = true;
            this.coinsLabel.string = GameManager.Instance().GetGameInfo().coins.toString();
            this.debugClientMode = 'User';
        }
    }

    // 選択肢を決定
    private DecideChoice(){
        this.choiceNumber = this.tempNumber;
        this.frameList[this.choiceNumber].spriteFrame = this.selectFrameSprite;
        if(this.betModal.getIsPushedDecideButton()) this.chipAnim.Play(this.choiceNumber);
        this.betModal.SetIsDecide(false);
    }

    // 正解表示
    private ShowResult(){
        this.resultButton.node.active = false;
        this.nextButton.node.active = true;
        this.resultModal.node.active = true;
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            if(i != GameManager.Instance().GetGameInfo().qCorNumber){
                this.oddsLabelList[i].string = "x1.0";
                this.oddsLabelList[i].color = color(0,0,0,255);
            }
        }
        this.TitleFrameLabel.string = "正解発表";
    }

    // 結果発表に進む
    private Next(){
        this.timer.Reset();
        this.isNext = true;
        this.resultModal.node.active = false;
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
                    this.nextButton.node.active = true;
                }
                else{
                    this.resultButton.node.active = true;
                }
                for(const odds of this.oddsLabelList){
                    odds.node.active = true;
                }
            }


            if(isResult){
                this.resultModal.node.active = true;            
                // this.liverAnswerFrameSprite.active = true;
                this.resultModal.SetAnswerReslult(GameManager.Instance().GetGameInfo().qCorNumber, this.choiceNumber);
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

