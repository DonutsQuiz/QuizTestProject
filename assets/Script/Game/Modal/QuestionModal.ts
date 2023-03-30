import { _decorator, Component, Node, Label, Button, Vec2, Vec3, SpriteFrame, Sprite, RichText, Game, color, Color, nextPow2, lerp, UIOpacity, Root, spriteAssembler, Animation, AnimationState } from 'cc';
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
    @property(RichText) //問題文
    private qSentence : RichText = null;
    @property(Button) //選択肢のボタン
    private qSelectB : Array<Button> = new Array<Button>();
    @property(Label) //選択肢の文
    private qSelectSent : Array<Label> = new Array<Label>();
    @property(Button) //リロールボタン
    private rerollButton : Button = null;
    @property(Node) //選択肢の情報
    private choiceInfoNode : Node = null; 

    @property(Label) //状況説明文
    private ExplanationLabel : Label = null;
    @property(Sprite)
    private ExplanationIcon : Sprite = null;
    @property(Label)
    private ExPointLabel : Label = null;

    private isSelect : number = -1; // 答えの番号

    private debugClientMode : ClientMode = 'Liver';


    private changeDelay : number = 0.0; // 演出用の時間
    @property(Number)
    private delayMax = 1.0;
    private isNext : boolean = false;

    private choiceInfoSlideIn : Animation = null;

    //新仕様
    private MODAL_CHANGE_TIME = 3.0;    // モーダルが変わる時間(定数)
    private modalChangeTime = 3.0;      // モーダルが変わる時間(変数)
    private isModelChange = false;
    private modalChangeCount = 0;       // モーダルが変わる回数(変数)

    public Constructor(){
        this.qSelectB[0].node.on(Button.EventType.CLICK, function(){this.ClickSelectButton(0);},this);
        this.qSelectB[1].node.on(Button.EventType.CLICK, function(){this.ClickSelectButton(1);},this);
        this.qSelectB[2].node.on(Button.EventType.CLICK, function(){this.ClickSelectButton(2);},this);
        this.rerollButton.node.on(Button.EventType.CLICK, this.ClickRerollButton, this);

        this.choiceInfoSlideIn = this.choiceInfoNode.getComponent(Animation);
        this.choiceInfoSlideIn.on(Animation.EventType.FINISHED, this.onTriggered, this);

        this.liverNode.active = true;
    }

    public OnUpdate(deltaTime: number){
        this.DebugModalUpdate();

        //　解答選択画面への遷移の準備
        if(!this.isModelChange && this.modalChangeCount === 0){
            this.isModelChange = true;
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
        }

        // 選択していない && 解答選択画面 && 
        if(this.isSelect < 0 && this.modalChangeCount > 0)
        {
            if(this.debugClientMode === 'Liver'){
                this.ExplanationLabel.string = "この問題の正解を決めよう";
                this.ExplanationIcon.node.position = new Vec3(-120, 0, 0);
            }
            else{
                this.ExplanationLabel.string = "ライバーが正解を決めています";
                this.ExplanationIcon.node.position = new Vec3(-135, 0, 0);
            }
        }

        // 解答を選択したら文字を変える
        if(this.isSelect >= 0){
            if(GameManager.Instance().GetClientMode() != 'Liver'){
                this.ExplanationLabel.string = "ライバーが正解を決定しました！";
                this.ExplanationIcon.node.position = new Vec3(-145, 0, 0);
            }

            GameManager.Instance().GetGameInfo().qCorNumber = this.isSelect; //正解の番号をセット
        }

        if(this.isNext){
            this.changeDelay -= deltaTime;
            AnimationManager.Instance().startAnim.SetQuizLabel("回答");
            AnimationManager.Instance().startAnim.Play();
            if(this.changeDelay <= 0.0){
                AnimationManager.Instance().startAnim.AnimationReset();
                QuizModalManager.Instance().ChangeModal('Choices');
                this.isNext = false;
                this.modalChangeCount = 0;
            }
        }

        // 新仕様
        // 選択前の画面を表示
        if(this.modalChangeCount === 0)
        {
            this.liverNode.active = true;
            this.choiceInfoNode.active = false;
            this.qSelectB.forEach(element =>{element.node.active = false;});
        }
        if(this.isModelChange){
            if(this.modalChangeTime > 0.0){
                this.modalChangeTime -= deltaTime;
                if(this.modalChangeCount === 1){
                    let par = 1.0 - (this.modalChangeTime / (this.MODAL_CHANGE_TIME - 2.0));
                    this.qSentence.node.position = new Vec3(0,0,0).lerp(new Vec3(0,55,0), par);
                    this.qSentence.node.scale = new Vec3(0.35,0.35,0.35).lerp(new Vec3(0.2,0.2,0.2),par);
                    this.choiceInfoNode.active = false;
                    this.ExPointLabel.color = new Color(0,0,0, 255 * (1.0 - par));
                }
            }
            else{ //解答選択画面
                this.modalChangeTime = 0.0;
                this.isModelChange = false;
                if(this.modalChangeCount === 0){
                    this.modalChangeTime = this.MODAL_CHANGE_TIME - 2.0;
                    this.isModelChange = true;
                }
                else if(this.modalChangeCount === 1){
                    // 選択画面に移る
                    this.liverNode.active = true;
                    this.choiceInfoNode.active = true;
                    this.qSentence.node.position = new Vec3(0,55,0);
                    this.qSentence.node.scale = new Vec3(0.2,0.2,0.2);
                    this.choiceInfoNode.getComponent(UIOpacity).opacity = 255;
                    this.choiceInfoSlideIn.play();
                    this.ExPointLabel.color = new Color(0,0,0,0);
                    this.ExplanationLabel.string = "この問題の正解を決めよう";
                    this.ExplanationIcon.node.position = new Vec3(-120, 0, 0);
                }
                else if(this.modalChangeCount === 2){
                    this.qSentence.node.position = new Vec3(0,0,0);
                    this.qSentence.node.scale = new Vec3(0.35,0.35,0.35);
                    this.choiceInfoNode.getComponent(UIOpacity).opacity = 0;
                    this.ExplanationLabel.string = "出題";
                    this.ExplanationIcon.node.position = new Vec3(-35, 0, 0);
                    this.ExPointLabel.color = new Color(0,0,0, 255);
                    this.Next();
                }
                this.modalChangeCount++;
            }
        }
    }

    private Next(){
        this.isNext = true;
        this.changeDelay = this.delayMax;
        this.liverNode.active = false;
        this.isSelect = -1;
    }


    // 選択肢をクリックした
    private ClickSelectButton(sele : number){
        this.isSelect = sele;
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            if(i === sele){
                AnimationManager.Instance().stampAnim.SetIsActive(false);
                AnimationManager.Instance().stampAnim.Play(sele);
            }
            else{
                this.qSelectSent[i].color = new Color(144,144,144,255);
            }
        }

        this.qSelectB.forEach(element=>{element.node.active = false;}); //ボタンを消す
        this.rerollButton.node.active = false; //リロールを消す

        // 回答をサーバーに送信
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

    // リロールボタンを押したら
    private ClickRerollButton(){
        QuizManager.Instance().RerollQuiz();
    }

    private onTriggered(){
        this.qSelectB.forEach(element =>{element.node.active = true;});
    }

    public SetUI(qtype : QuizType){
        this.liverNode.active = true;
        this.qSentence.node.active = true;

        this.qSelectB.forEach(element => {element.node.active = false;});

        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            this.qSelectB[i].node.active = true;
            this.qSelectSent[i].color = new Color(0,0,0,255);
            this.qSelectSent[i].string = GameManager.Instance().GetGameInfo().qSelectSent[i];
        }

        if(this.modalChangeCount === 0){
            this.liverNode.active = true;
            this.choiceInfoNode.active = false;
        }
    }

    // 問題文と選択肢のセット
    public SetQuizInfoUI(){
        this.qSentence.string = "<color=#000000>" + "第" + GameManager.Instance().GetGameInfo().qNumber.toString() + "問：" + GameManager.Instance().GetGameInfo().qSentence + "</color>";
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            this.qSelectSent[i].string = GameManager.Instance().GetGameInfo().qSelectSent[i];
        }
    }


    
    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.liverNode.active = true;
                AnimationManager.Instance().liverNode.active = true;
                AnimationManager.Instance().userNode.active = false;
    
                for(var i = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
                    this.qSelectB[i].node.active = true;
                    this.qSelectSent[i].string = GameManager.Instance().GetGameInfo().qSelectSent[i];
                }
            }
            else{
                this.liverNode.active = false;
                AnimationManager.Instance().liverNode.active = false;
                AnimationManager.Instance().userNode.active = true;
            }

            this.debugClientMode = GameManager.Instance().GetClientMode();
        }

    }
}

