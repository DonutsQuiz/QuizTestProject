import { _decorator, Component, Node, Label, Button, Vec2, Vec3, SpriteFrame, Sprite, RichText, Game, color, Color, nextPow2 } from 'cc';
import { AnimationManager } from '../Manager/AnimationManager';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizType } from '../Quiz/QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('QuestionModal')
export class QuestionModal extends Component {

    @property(Node) //ライバー側のノード
    private liverNode : Node = null;
    @property(Node) //ユーザー側のノード
    private userNode : Node = null;
    @property(Node) //ライバーとユーザー共通のノード
    private allSideNode : Node = null;
    @property(Label) //何問目か
    private qNumber : Label = null;
    @property(RichText) //問題文
    private qSentence : RichText = null;
    @property(Node) //画像の枠(いらないかも)
    private qImageFrame : Node = null;
    @property(Sprite) //問題の画像(いらないかも)
    private qSpriteFrame : Sprite = null;
    @property(Button) //スタートボタン
    private qStartB : Button = null;
    @property(Button) //選択肢のボタン
    private qSelectB : Array<Button> = new Array<Button>();
    @property(Sprite) //選択肢の画像
    private qSelectSprite : Array<Sprite> = new Array<Sprite>();
    @property(Label) //選択肢の文
    private qSelectSent : Array<Label> = new Array<Label>();
    @property(Color) //非選択時のボタンの色
    private notSelectColor : Color = null;
    @property(Color) //選択時のボタンの色
    private selectColor : Color = null;
    @property(Button) //問題を変えるボタン
    private questionChangeButton : Button = null;
    @property(Sprite) //選択時のマーク
    private decideSprite : Sprite = null;
    @property(Button)
    private rerollButton : Button = null;


    @property(Label)
    private ExplanationLabel : Label = null;

    private debugClientMode : ClientMode = 'Liver';
    private debugQuizMode : QuizType = 'None';
    private isSelect : number = -1; // 答えの番号

    private changeDelay : number = 0.0; // 演出用の時間
    @property(Number)
    private delayMax = 1.0;
    private isNext : boolean = false;

    //新仕様
    private MODAL_CHANGE_TIME = 3.0;    // モーダルが変わる時間(定数)
    private modalChangeTime = 3.0;      // モーダルが変わる時間(変数)
    private isModelChange = false;
    private MODAL_CHANGE_COUNT = 3;     // モーダルが変わる回数(定数)
    private modalChangeCount = 0;       // モーダルが変わる回数(変数)
    private questionScrean : Node = null;   // 選択前の画面（ライバーとユーザー共通のノードの子ノード）
    private selectionScrean : Node = null;  // 選択時の画面（ライバーとユーザー共通のノードの子ノード）

    public Constructor(){
        this.qStartB.node.on(Button.EventType.CLICK, this.Next,this);
        this.qSelectB[0].node.on(Button.EventType.CLICK, function(){this.ClickSelectButton(0);},this);
        this.qSelectB[1].node.on(Button.EventType.CLICK, function(){this.ClickSelectButton(1);},this);
        this.qSelectB[2].node.on(Button.EventType.CLICK, function(){this.ClickSelectButton(2);},this);
        this.qSelectB[3].node.on(Button.EventType.CLICK, function(){this.ClickSelectButton(3);},this);
        this.questionChangeButton.node.on(Button.EventType.CLICK, this.ClikeChangeButton, this);
        this.rerollButton.node.on(Button.EventType.CLICK, this.ClickRerollButton, this);

        this.questionScrean = this.allSideNode.getChildByName('QuestionScrean');
        this.selectionScrean = this.allSideNode.getChildByName('SelectionScrean');

        this.liverNode.active = true;
        this.userNode.active = false;
    }

    public OnUpdate(deltaTime: number){
        this.DebugModalUpdate();

        if(!this.isModelChange && this.modalChangeCount === 0){
            this.isModelChange = true;
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
        }

        // if(this.isSelect < 0 && !this.isNext && GameManager.Instance().GetGameInfo().isFirstTime){
        //     AnimationManager.Instance().kumaHintAnim.SetPos(80, -250);
        //     AnimationManager.Instance().kumaHintAnim.SetFrameSize(210, 44);
        //     AnimationManager.Instance().kumaHintAnim.SetHintLabel('質問の回答をここで決めましょう\n上の４つのボタンから選択してね');
        //     AnimationManager.Instance().kumaHintAnim.Play();
        // }

        if(this.isSelect < 0 && !this.isNext)
        {
            if(this.debugClientMode === 'Liver'){
                this.ExplanationLabel.string = "この問題の正解を決めよう";
            }
            else{
                this.ExplanationLabel.string = "ライバーが正解を決めています";
            }
        }

        if(this.isSelect >= 0){
            if(this.debugClientMode === 'Liver'){
                this.ExplanationLabel.string = "この問題の正解を決めよう";
            }
            else{
                this.ExplanationLabel.string = "ライバーが正解を決定しました！";
            }

            // if(!this.isNext && GameManager.Instance().GetGameInfo().isFirstTime)
            // {
            //     AnimationManager.Instance().kumaHintAnim.SetPos(0, -60);
            //     AnimationManager.Instance().kumaHintAnim.SetFrameSize(132, 44);
            //     AnimationManager.Instance().kumaHintAnim.SetHintLabel('正解を決めたら\nスタートしましょう');
            //     AnimationManager.Instance().kumaHintAnim.Play();
            // }
            GameManager.Instance().GetGameInfo().qCorNumber = this.isSelect;
            this.qStartB.node.active = true;
        }

        if(this.isNext){
            this.changeDelay -= deltaTime;
            AnimationManager.Instance().startAnim.SetQuizLabel("回答");
            AnimationManager.Instance().startAnim.Play();
            if(this.changeDelay <= 0.0){
                AnimationManager.Instance().startAnim.AnimationReset();
                // AnimationManager.Instance().kumaHintAnim.AnimationReset();
                QuizModalManager.Instance().ChangeModal('Choices');
                this.isNext = false;
                this.decideSprite.node.active = false;
                this.modalChangeCount = 0;
            }
        }

        // 新仕様
        // 選択前の画面を表示
        if(this.modalChangeCount === 0)
        {
            this.questionScrean.getChildByName('QuestionNumber').getComponent(Label).string = this.qNumber.string;
            this.questionScrean.getChildByName('QuestionSentence').getComponent(RichText).string = this.qSentence.string;
            this.questionScrean.active = true;
            this.selectionScrean.active = false;
            this.userNode.active = false;
            this.liverNode.active = false;
        }
        if(this.isModelChange){
            if(this.modalChangeTime > 0.0){
                this.modalChangeTime -= deltaTime;
            }
            else{
                this.modalChangeTime = 0.0;
                this.isModelChange = false;
                if(this.modalChangeCount === 0){
                    // 選択画面に移る
                    this.questionScrean.active = false;
                    this.selectionScrean.active = true;
                    this.userNode.active = true;
                    this.liverNode.active = true;
                }
                else if(this.modalChangeCount === 1){
                    this.Next();
                }
                this.modalChangeCount++;
            }
        }
    }

    private Next(){
        // AnimationManager.Instance().stampAnim.AnimationReset();
        // AnimationManager.Instance().kumaHintAnim.AnimationReset();
        this.isNext = true;
        this.changeDelay = this.delayMax;
        this.userNode.active = false;
        this.liverNode.active = false;
        this.questionScrean.active = false;
        this.selectionScrean.active = false;
        this.isSelect = -1;
    }

    public SetNumber(num : number){
        // this.qNumber.string = num.toString() + " / " + QuizManager.Instance().raundMax + "問";
        this.qNumber.string = "第" + num.toString() + "問:";
    }

    public SetSentence(sent : string){
        this.qSentence.string = "<color=#000000>" + sent + "</color>";
    }

    public SetSelect(sele : Array<string>){
        for(const sent in sele){
            // this.qSelect.string += sent;
        }
    }

    public SetSprite(sprite : SpriteFrame){
        this.qSpriteFrame.spriteFrame = sprite;
    }

    // 選択肢をクリックした
    private ClickSelectButton(sele : number){
        // if(this.isSelect < 0){
        //     AnimationManager.Instance().kumaHintAnim.Stop();
        // }

        this.isSelect = sele;
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            if(i === sele){
                this.qSelectSprite[i].color = this.selectColor;
                AnimationManager.Instance().stampAnim.AnimationReset();
                AnimationManager.Instance().stampAnim.Play(sele);
                // this.decideSprite.node.active = true;
                // this.decideSprite.node.position = new Vec3(75 + this.qSelectB[i].node.position.x, this.qSelectB[i].node.position.y - 40, 0);
            }
            else{
                this.qSelectSprite[i].color = this.notSelectColor;
                this.qSelectSent[i].color = new Color(144,144,144,255);
            }
        }

        this.rerollButton.node.active = false;

        // GameManager.Instance().GetApiConnection().setAnswer(this.isSelect + 1);
        GameManager.Instance().GetApiConnect().setAnswer(
            GameManager.Instance().GetGameInfo().hostId,
            GameManager.Instance().GetGameInfo().token,
            GameManager.Instance().GetGameInfo().gameId,
            GameManager.Instance().GetGameInfo().order,
            this.isSelect + 1
        )

        // 新仕様
        if(!this.isModelChange){
            this.isModelChange = true;
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
        }
    }

    private ClikeChangeButton(){
        QuizManager.Instance().RerollQuiz();
        QuizModalManager.Instance().GetQuestionModal().SetUI(GameManager.Instance().GetGameInfo().qType);
    }

    private ClickRerollButton(){
        QuizManager.Instance().RerollQuiz();
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
                // this.qSentence.node.setPosition(new Vec3(0,75,0));
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
            // this.qSentence.node.setPosition(new Vec3(0,35,0));
            this.qStartB.node.active = true;
        }
        else if(qtype === 'Personal'){   // クイズ
            // this.qSentence.node.setPosition(new Vec3(0,35,0));ss
            //this.qSelectB.forEach(element => {element.node.active = true;});
            var sele : string = "";
            for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                this.qSelectB[i].node.active = true;
                this.qSelectSprite[i].color = this.notSelectColor;
                this.qSelectSent[i].color = new Color(0,0,0,255);
                if(i === 0)sele = "A.";
                if(i === 1)sele = "B.";
                if(i === 2)sele = "C.";
                if(i === 3)sele = "D.";
                this.qSelectSent[i].string = GameManager.Instance().GetGameInfo().qSelectSent[i];
            }
        }
    }

    // 問題文などのセット
    public SetQuizInfoUI(){
        // this.qNumber.string = GameManager.Instance().GetGameInfo().qNumber.toString() + " / " + QuizManager.Instance().raundMax + "問";
        // this.qNumber.string = "第" + GameManager.Instance().GetGameInfo().qNumber.toString() + "問";
        this.qSentence.string = "<color=#000000>" + "第" + GameManager.Instance().GetGameInfo().qNumber.toString() + "問：" + GameManager.Instance().GetGameInfo().qSentence + "</color>";
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            this.qSelectSent[i].string = GameManager.Instance().GetGameInfo().qSelectSent[i];
        }
    }


    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.node.active = true;
                this.liverNode.active = true;
                AnimationManager.Instance().liverNode.active = true;
                this.qNumber.node.active = true;
                this.qSentence.node.active = true;
    
                this.qImageFrame.active = false;
                this.qSpriteFrame.node.active = false;
                this.qStartB.node.active = false;
                this.qSelectB.forEach(element => {element.node.active = false;});
                this.userNode.active = false;
                AnimationManager.Instance().userNode.active = false;
    
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
                    // this.qSentence.node.setPosition(new Vec3(0,35,0));
                    this.qStartB.node.active = true;
                }
                else if(this.debugQuizMode === 'Personal'){   // クイズ
                    // this.qSentence.node.setPosition(new Vec3(0,35,0));
                    this.qSelectB.forEach(element => {element.node.active = true;});
                    var sele : string = "";
                    for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                        if(i === 0)sele = "A.";
                        if(i === 1)sele = "B.";
                        if(i === 2)sele = "C.";
                        if(i === 3)sele = "D.";
                        this.qSelectSent[i].string = GameManager.Instance().GetGameInfo().qSelectSent[i];
                    }
                }

                this.debugClientMode = 'Liver';
            }
            else if(GameManager.Instance().GetClientMode() === 'User'){
                this.liverNode.active = false;
                AnimationManager.Instance().liverNode.active = false;
                this.userNode.active = true;
                this.debugClientMode = 'User';
                AnimationManager.Instance().userNode.active = true;
            }
            else if(GameManager.Instance().GetClientMode() === 'Audience'){
                this.liverNode.active = false;
                this.userNode.active = false;
                this.debugClientMode = 'Audience';
            }
        }

    }
}

