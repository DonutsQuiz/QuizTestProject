import { _decorator, Component, Node, Button, RichText, ButtonComponent, Sprite, Color, input, Input, EventTouch, Vec2 } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { AnimationManager } from '../Manager/AnimationManager';
const { ccclass, property } = _decorator;

@ccclass('RuleModal')
export class RuleModal extends Component {

    @property(Button) // ルール説明スキップボタン
    private skipButton : Button = null;
    @property(Node) // ライバー用のノード
    private LiverNode : Node = null;
    // @property(Button)   // 次の画面へすすむボタン
    // private forwardButton : Button = null;
    // @property(Button)   // 前の画面へ戻るボタン
    // private backButton : Button = null;
    @property(Color)    // デフォルトのプログレスバーの色
    private defaultPointColor : Color = null;
    @property(Color)    // 現在地点のプログレスバーの色
    private currentPointColor : Color = null;
    @property(Sprite)   // プログレスバー
    private progressPoint : Sprite[] = [];

    @property(Node)
    private modalBack : Node = null;

    @property(Node)
    private ruleNodes : Node = null;

    private ruleNumber : number = 0;
    private isNext : boolean = false;

    @property(Number)
    private ANIMATION_TIME : number = 0.0; //アニメーションの時間
    private animationDelay : number = 0.0; //アニメーション用のディレイ

    private debugClientMode : ClientMode = 'Liver';

    //新仕様
    private MODAL_CHANGE_TIME = 3.0;    // モーダルが変わる時間(定数)
    private modalChangeTime = 3.0;      // モーダルが変わる時間(変数)
    private MODAL_CHANGE_COUNT = 3;     // モーダルが変わる回数(定数)
    private modalChangeCount = 0;       // モーダルが変わる回数(変数)

    // フリック
    private flickStartPoint : Vec2 = null;
    // private flickEndPoint : Vec2 = null;
    private flickDistance : Vec2 = null;
    private isFlick : boolean = false;
    // private isTransition : boolean = false;
    // private modalPosX : number = 0;

    public Constructor(){
        this.skipButton.node.on(Button.EventType.CLICK, this.NextModel02, this);

        this.modalBack.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.modalBack.on(Input.EventType.TOUCH_MOVE, this.onTouchFlick, this);
        this.modalBack.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.modalBack.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        //新仕様
        this.modalChangeTime = this.MODAL_CHANGE_TIME;
        this.modalChangeCount = 0;

        this.progressPoint[0].color = this.currentPointColor;

        this.skipButton.node.active = false;
        this.LiverNode.active = true;
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
        // if(!this.isFlick && this.isTransition){
        //     switch(this.modalChangeCount){
        //         case 0:
        //             if(this.modalPosX < 0 && this.modalPosX > -100){
        //                 let tmp = this.modalPosX + 10;
        //                 this.modalPosX = Math.min(0, tmp);
        //             }
        //             else if(this.modalPosX <= -100 && this.modalPosX > -375){
        //                 let tmp = this.modalPosX - 10;
        //                 this.modalPosX = Math.max(-375, tmp);
        //             }
        //             else if(this.modalPosX === -375){
        //                 this.ForwardRuleModal();
        //                 this.isTransition = false;
        //             }
        //             else{
        //                 this.isTransition = false;
        //             }
        //             console.log(this.modalPosX);
        //             break;
        //         case 1:
        //             if(this.modalPosX < -275 && this.modalPosX > -375){
        //                 let tmp = this.modalPosX - 10;
        //                 this.modalPosX = Math.min(-375, tmp);
        //             }
        //             else if(this.modalPosX <= -275 && this.modalPosX > 0){
        //                 let tmp = this.modalPosX + 10;
        //                 this.modalPosX = Math.max(0, tmp);
        //             }
        //             else if(this.modalPosX === 0){
        //                 this.BackRuleModal();
        //                 this.isTransition = false;
        //             }
        //             else if(this.modalPosX < -375 && this.modalPosX > -475){
        //                 let tmp = this.modalPosX + 10;
        //                 this.modalPosX = Math.min(0, tmp);
        //             }
        //             else if(this.modalPosX <= -475 && this.modalPosX > -750){
        //                 let tmp = this.modalPosX - 10;
        //                 this.modalPosX = Math.max(-750, tmp);
        //             }
        //             else if(this.modalPosX === -750){
        //                 this.ForwardRuleModal();
        //                 this.isTransition = false;
        //             }
        //             else{
        //                 this.isTransition = false;
        //             }
        //             break;
        //         case 2:
        //             break;
        //         case 3:
        //             break;
        //         default:
        //             break;
        //     }
        //     this.ruleNodes.setPosition(this.modalPosX, 0, 0);
        // }
        this.ChengeRuleModal(this.modalChangeCount);
        this.ShowButton(this.modalChangeCount);
        if(!this.isFlick){ //  && !this.isTransition) {
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
    }

    private onTouchStart(event: EventTouch){
        this.flickStartPoint = event.getUILocation();
        this.isFlick = true;
    }

    private onTouchFlick(event: EventTouch){
        // this.flickEndPoint = event.getUILocation();
        this.flickDistance = new Vec2(event.getUILocation().x - this.flickStartPoint.x, event.getUILocation().y - this.flickStartPoint.y);
        let PosX = -this.modalChangeCount * 375 + this.flickDistance.x;
        PosX = Math.min(PosX, 0);
        PosX = Math.max(PosX, -1125);
        this.ruleNodes.setPosition(PosX, 0, 0);

        // this.isTransition = true;
        // let flickDistance = new Vec2(this.flickEndPoint.x - this.flickStartPoint.x, this.flickEndPoint.y - this.flickStartPoint.y);
        // this.modalPosX += flickDistance.x;
        // this.modalPosX = Math.min(this.modalPosX, 0);
        // this.modalPosX = Math.max(this.modalPosX, -1125);
        // this.ruleNodes.setPosition(this.modalPosX, 0, 0);

        // this.flickStartPoint = this.flickEndPoint;
    }

    private onTouchEnd(event: EventTouch) {
        if(this.flickDistance.x > 100.0){
            this.BackRuleModal();
        }
        else if(this.flickDistance.x < -100.0)
        {
            this.ForwardRuleModal();
        }
        this.ruleNodes.setPosition(-this.modalChangeCount * 375, 0, 0);
        this.isFlick = false;
        // console.log('flick: ' + this.flickDistance);
    }

    private ChengeRuleModal(currentModal: number)
    {
        if(!this.isFlick){ // && !this.isTransition){
            this.ruleNodes.setPosition(-currentModal * 375, 0, 0);
        }

        for(let i = 0; i < this.progressPoint.length; ++i)
        {
            if(i == currentModal){
                // this.tutorialRule[i].active = true;
                this.progressPoint[i].color = this.currentPointColor;
            }
            else{
                // this.tutorialRule[i].active = false;
                this.progressPoint[i].color = this.defaultPointColor;
            }
        }
    }

    private ShowButton(currentModal: number)
    {
        switch(currentModal){
            case 0:
                // this.forwardButton.node.active = true;
                // this.backButton.node.active = false;
                this.skipButton.node.active = false;
                break;
            case 1:
            case 2:
                // this.forwardButton.node.active = true;
                // this.backButton.node.active = true;
                this.skipButton.node.active = false;
                break;
            case 3:
                // this.forwardButton.node.active = false;
                // this.backButton.node.active = true;
                this.skipButton.node.active = true;
                break;
            default:
                break;
        }
    }

    private ForwardRuleModal(){
        if(this.modalChangeCount < 3){
            this.modalChangeCount++;
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
        }
    }

    private BackRuleModal(){
        if(this.modalChangeCount > 0) {
            this.modalChangeCount--;
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
        }
    }

    private NextModel02()
    {
        QuizModalManager.Instance().ChangeModal('Genre');
    }

    private NextModal(){
        if(GameManager.Instance().GetGameInfo().isFirstTime){
            this.isNext = true;
            this.animationDelay = this.ANIMATION_TIME;
        }
        else{
            // QuizModalManager.Instance().ChangeModal('Ranking');
            QuizModalManager.Instance().ChangeModal('Genre');
        }
    }

    public SetUI(){
        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.debugClientMode = 'Liver';
            this.LiverNode.active = true;
        }
        else if(GameManager.Instance().GetClientMode() === 'User'){
            this.debugClientMode = 'User';
            this.LiverNode.active = false;
        }
    }

    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            this.SetUI();
        }
    }
}

