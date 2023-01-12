import { _decorator, Component, Node, Button, Label, SpriteFrame, Sprite, Vec3 } from 'cc';
import { ChipControll } from '../../Chip/ChipControll';
import { Timer } from '../../UI/Timer';
import { ClientMode, GameManager } from '../Manager/GameManager';
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
    buttonList : Array<Button> = new Array<Button>();
    @property(Label) // 選択肢（文字）
    labelList : Array<Label> = new Array<Label>();
    @property(Sprite)// 選択肢（画像）
    spriteList : Array<Sprite> = new Array<Sprite>();
    @property(Label)// オッズ
    private oddsLabelList : Array<Label> = new Array<Label>();
    @property(Label)// 総ベット量
    private betLabelList : Array<Label> = new Array<Label>();
    @property(Label)// 問題文
    private questionLabel : Label = null;
    @property(Label)// 所持コイン
    private coinsLabel : Label = null;
    @property(BetModal)// ベットモーダル
    private betModal : BetModal = null; 
    @property(Button)// 次に進むボタン
    private nextButton : Button = null;
    @property(Node)// 答えの枠
    private liverAnswerFrameSprite : Node = null;
    @property(Node)// 選択した枠
    private userAnswerFrameSprite : Node = null;

    @property(Node) // リザルトモーダル
    private resultModa : Node = null;

    @property(Timer)
    timer : Timer = null;
    @property(ChipControll)
    chipAnim : ChipControll = null;

    choiceNumber : number = -1;
    private tempNumber : number = 0;
    private debugClientMode : ClientMode = 'Liver';

    start() {
        this.timer.SetTimeLimit(GameManager.Instance().GetGameInfo().thinkTime);   // タイマーのセット
        this.questionLabel.string = GameManager.Instance().GetGameInfo().qSentence;
        this.buttonList[0].node.on(Button.EventType.CLICK, function(){this.Choice(0);}, this);
        this.buttonList[1].node.on(Button.EventType.CLICK, function(){this.Choice(1);}, this);
        this.buttonList[2].node.on(Button.EventType.CLICK, function(){this.Choice(2);}, this);
        this.buttonList[3].node.on(Button.EventType.CLICK, function(){this.Choice(3);}, this);
        this.buttonList[4].node.on(Button.EventType.CLICK, function(){this.Choice(4);}, this);
        this.buttonList[5].node.on(Button.EventType.CLICK, function(){this.Choice(5);}, this);
        this.nextButton.node.on( Button.EventType.CLICK, this.Next, this);
        this.nextButton.node.active = false;
        this.coinsLabel.string = GameManager.Instance().GetGameInfo().coins.toString();
        this.betModal.node.active = false;
        this.liverAnswerFrameSprite.position = new Vec3(this.buttonList[GameManager.Instance().GetGameInfo().qAnswer].node.position);
    }

    update(deltaTime: number) {
        this.DebugModalUpdate();

        this.timer.Display();

        // 時間切れの処理
        if(this.timer.GetTimeLeft() <= 0){
            this.nextButton.node.active = true;
            for(const odds of this.oddsLabelList){
                odds.node.active = true;
            }
        }

        // ベットモーダルが出ている時は選択肢を押せないようにする
        if(this.betModal.node.active){
            this.DontClickButton();
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
        this.labelList[index].string = text;
        this.spriteList[index].spriteFrame = sprite;
    }

    
    public GetChoics() : number{
        return this.choiceNumber;
    }

    public SetQuestion(sent : string){
        this.questionLabel.string = sent;
    }

    private Initialize(){
        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.liverNode.active = true;
            this.userNode.active = false;
            for(const odds of this.oddsLabelList){
                odds.node.active = true;
            }
            this.liverAnswerFrameSprite.active = true;
            this.userAnswerFrameSprite.active = false;
            this.debugClientMode = 'Liver';

        }
        else{
            this.liverNode.active = false;
            this.userNode.active = true;
            for(const odds of this.oddsLabelList){
                odds.node.active = false;
            }
            this.liverAnswerFrameSprite.active = false;
            this.userAnswerFrameSprite.active = false;
            this.debugClientMode = 'User';
        }
    }

    private DecideChoice(){
        this.choiceNumber = this.tempNumber;
        this.userAnswerFrameSprite.active = true;
        this.userAnswerFrameSprite.position = new Vec3(this.buttonList[this.choiceNumber].node.position);
        this.chipAnim.Play();
    }

    private Next(){
        QuizModalManager.Instance().ChangeModal('Result');
        QuizModalManager.Instance().GetResultModal().SetCoinLabel("400");
    }

    private DontClickButton(){
        this.liverNode.active = true;
        this.userNode.active = false;
        for(const odds of this.oddsLabelList){
            odds.node.active = true;
        }
        this.debugClientMode = 'Liver';
    }

    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            this.Initialize();
        }
    }
}

