import { _decorator, Component, Node, Button, RichText, ButtonComponent } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { AnimationManager } from '../Manager/AnimationManager';
const { ccclass, property } = _decorator;

@ccclass('RuleModal')
export class RuleModal extends Component {

    @property(Button)
    private rankButton : Button = null;

    @property(Node) //二回目以降のルール表示
    private ruleNode : Node = null;
    @property(Node) //初回のルール表示
    private tutorialNode : Node = null;
    @property(Node) //初回のルール文１
    private tutorialRule1 : Node = null;
    @property(Node) //初回のルール文２
    private tutorialRule2 : Node = null;
    @property(Button) // 初回用ボタン
    private tutorialButton : Button = null;
    @property(RichText) //初回用ボタンのテキスト
    private tutorialButtonText : RichText = null;
    @property(Node) //見出しのノード
    private titleNode : Node = null;

    private ruleNumber : number = 0;
    private isNext : boolean = false;

    @property(Number)
    private ANIMATION_TIME : number = 0.0; //アニメーションの時間
    private animationDelay : number = 0.0; //アニメーション用のディレイ

    private debugClientMode : ClientMode = 'Liver';
    private debugIsFirst : boolean = false;

    //新仕様
    private MODAL_CHANGE_TIME = 3.0;    // モーダルが変わる時間(定数)
    private modalChangeTime = 3.0;      // モーダルが変わる時間(変数)
    private MODAL_CHANGE_COUNT = 3;     // モーダルが変わる回数(定数)
    private modalChangeCount = 0;       // モーダルが変わる回数(変数)

    public Constructor(){
        this.rankButton.node.on(Button.EventType.CLICK, this.NextModal, this);
        this.tutorialButton.node.on(Button.EventType.CLICK, this.ClickTutorialButton, this);

        this.debugIsFirst = GameManager.Instance().GetGameInfo().isFirstTime;

        //新仕様
        this.modalChangeTime = this.MODAL_CHANGE_TIME;
        this.modalChangeCount = 0;

    }

    public OnUpdate(deltaTime: number){
        this.DebugUpdate();

        if(this.isNext && this.animationDelay > 0.0){
            AnimationManager.Instance().startAnim.SetQuizLabel("体験問題");
            AnimationManager.Instance().startAnim.Play();

            this.animationDelay -= deltaTime;
        }
        else if(this.isNext && this.animationDelay <= 0.0){
            AnimationManager.Instance().startAnim.AnimationReset();

            this.animationDelay = 0.0;
            this.isNext = false;
            // QuizModalManager.Instance().ChangeModal('Question');
            QuizModalManager.Instance().ChangeModal('Genre');
        }

        //新仕様
        if(this.modalChangeTime > 0.0){
            this.modalChangeTime -= deltaTime;
        }
        else{
            if(this.modalChangeCount < this.MODAL_CHANGE_COUNT){
                this.modalChangeCount++;
            }
            else{
                QuizModalManager.Instance().ChangeModal('Genre');
                this.modalChangeCount = 0;
            }
            this.modalChangeTime = this.MODAL_CHANGE_TIME;

        }
    }

    private ClickTutorialButton(){
        this.ruleNumber++;
        if(this.ruleNumber === 1){
            this.tutorialRule1.active = false;
            this.tutorialRule2.active = true;
            this.tutorialButtonText.string = "<color=#000000>体験問題<br/>スタート</color>";
        }
        else if(this.ruleNumber === 2){
            this.tutorialRule1.active = true;
            this.tutorialRule2.active = false;
            this.NextModal();
            this.ruleNumber = 0;
            this.tutorialButtonText.string = "<color=#000000>ルール<br/>説明２へ</color>";
        }
    }

    private NextModal(){
        if(GameManager.Instance().GetGameInfo().isFirstTime){
            this.isNext = true;
            this.animationDelay = this.ANIMATION_TIME;
            this.titleNode.active = false;
            this.ruleNode.active = false;
            this.tutorialNode.active = false;
        }
        else{
            // QuizModalManager.Instance().ChangeModal('Ranking');
            QuizModalManager.Instance().ChangeModal('Genre');
        }
    }

    public SetUI(){
        this.titleNode.active = true;

        if(GameManager.Instance().GetGameInfo().isFirstTime){
            this.ruleNode.active = false;
            this.tutorialNode.active = true;
            this.tutorialRule1.active = true;
            this.tutorialButton.node.active = true;
            this.debugIsFirst = true;   
        }
        else{
            this.ruleNode.active = true;
            this.tutorialNode.active = false;
            this.debugIsFirst = false;
        }
    }

    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.rankButton.node.active = true;
                this.debugClientMode = 'Liver';
            }
            else if(GameManager.Instance().GetClientMode() === 'User'){
                this.rankButton.node.active = false;
                this.debugClientMode = 'User';
            }
        }

        if(GameManager.Instance().GetGameInfo().isFirstTime != this.debugIsFirst){
            if(GameManager.Instance().GetGameInfo().isFirstTime){
                this.ruleNode.active = false;
                this.tutorialNode.active = true;
                this.debugIsFirst = true;   
            }
            else{
                this.ruleNode.active = true;
                this.tutorialNode.active = false;
                this.debugIsFirst = false;
            }
        }
    }
}

