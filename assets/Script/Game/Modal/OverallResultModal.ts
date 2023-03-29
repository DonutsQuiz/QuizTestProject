import { _decorator, Component, Node, PageView, Label, Button, labelAssembler, game, RichText, Vec3, Sprite, SpriteFrame, CameraComponent, Prefab, InstanceMaterialType, instantiate, Game } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { RetryModal } from './RetryModal';
import { Ranking2 } from '../../UI/Ranking2';
import { FixReslutRankingData } from '../Manager/GameInformation';
import { AnimationManager } from '../Manager/AnimationManager';
const { ccclass, property } = _decorator;

export class UserInfomation{
    constructor(name : string, coin : number, bet : number, point : number, sprite : SpriteFrame){
        this.mName = name;
        this.mCoin = coin;
        this.mBet = bet;
        this.mTotalPoint = point;
        this.mSprite = sprite;
    }

    mName : string;
    mCoin : number;
    mBet  : number;
    mTotalPoint : number;
    mSprite : SpriteFrame;
}

@ccclass('OverallResultModal')
export class OverallResultModal extends Component {

    @property(Node) // ライバー側のUI
    private liverNode : Node = null;
    @property(Prefab) //リトライモーダルのプレハブ
    private RetryModalPrefab : Prefab = null;
    @property(Ranking2)
    private ranking2 : Ranking2 = null;

    // 新仕様
    @property(Node) //タイトルのノード
    private titleNode : Node = null;
    @property(Label)
    private titleLabel : Label = null;
    @property(Sprite)
    private blessingSprite : Sprite = null;
    @property(Button)
    private advanceButton : Button = null;
    @property(Label)
    private advanceLabel : Label = null;

    private isNextQuiestion : boolean = false; // 次の問題に進むか
    private retryModal : RetryModal = null;

    // 新仕様
    private nowNode : number = 0; // 0:正解者　1:順位
    private isRetry : boolean = false;
    
    private animationTime : number = 0.0;
    private ANIMATION_TIME : number = 8.0;

    private debugClientMode : ClientMode = 'Liver';

    public Constructor(){
        // リトライモーダルを生成
        var temp = instantiate(this.RetryModalPrefab);
        temp.setParent(QuizModalManager.Instance().frontCanvas);
        this.retryModal = temp.getComponent(RetryModal);
        this.retryModal.Constructor();
    
        this.advanceButton.node.on(Button.EventType.CLICK, this.ClickAdvanceButton, this);
    }

    public OnUpdate(deltaTime: number){
        if(this.retryModal.GetIsDecide()){
            if(this.retryModal.GetIsRetry()){
                QuizModalManager.Instance().ChangeModal('Genre');
                GameManager.Instance().SetParticipantActive(true);
                GameManager.Instance().GetGameInfo().qNumber = 0;
            }
            else{
                QuizModalManager.Instance().node.active = false;
            }
            this.retryModal.Reset();
        }

        // 新仕様
        if(QuizManager.Instance().GetIsLast() && this.isRetry){
            QuizModalManager.Instance().ChangeModal('Genre');
            GameManager.Instance().SetParticipantActive(true);
            GameManager.Instance().GetGameInfo().qNumber = 0;
            this.isRetry = false;
            QuizManager.Instance().SetIsLast(false);
        }

        this.DebugModalUpdate();

        if(this.nowNode === 0){
            AnimationManager.Instance().blessingAnim.Play();
        }
    }

    // 進むボタン(新仕様)
    private ClickAdvanceButton(){
        if(this.nowNode === 0){
            this.titleNode.position = new Vec3(0, 90, 0);
            this.blessingSprite.node.active = false;
            // ポイントランキングのセット
            this.ranking2.SetRankOrList(0);
            this.ranking2.SetResultRankingList(GameManager.Instance().GetGameInfo().nowRankingList);
            this.ranking2.SetMaxCount(GameManager.Instance().GetGameInfo().nowRankingList.length);
            this.ranking2.Generate();
            GameManager.Instance().GetParticipant().SetRankInfo(GameManager.Instance().GetGameInfo().nowRankingList);

            AnimationManager.Instance().blessingAnim.Reset();

            if(QuizManager.Instance().GetIsLast()){
                this.titleLabel.string = "結果発表！！";
                this.titleLabel.fontSize = 55;
                this.advanceLabel.string = "もう一度遊ぶ";
                this.advanceLabel.fontSize = 50;
            }
            else{
                this.titleLabel.string = "現在の順位 (" + GameManager.Instance().GetGameInfo().qNumber + "/" + QuizManager.Instance().raundMax + "問)";
                this.advanceLabel.string = "次の出題へ";
                this.advanceLabel.fontSize = 60;
                QuizManager.Instance().quizComponent.SetQuiz();
            }
            this.nowNode = 1;
        }
        else if(this.nowNode === 1){
            this.titleLabel.string = "正解おめでとう！";
            this.titleLabel.fontSize = 80;
            this.titleNode.position = new Vec3(0, 90, 0);
            this.advanceLabel.string = "次へ";
            this.advanceLabel.fontSize = 80;
            if(QuizManager.Instance().GetIsLast()){
                this.isRetry = true;
            }
            else{
                this.ClickNextQuizButton();            
                GameManager.Instance().SetParticipantActive(true);
            }
            this.nowNode = 0;
        }

    }

    public Initialize(){
        this.debugClientMode = 'Liver';
        this.animationTime = this.ANIMATION_TIME;

        GameManager.Instance().SetParticipantActive(false);

        // ランキングのセット
        this.ranking2.SetIsResult(true);
        this.ranking2.SetRankOrList(1);
        let correctList : Array<FixReslutRankingData> = new Array<FixReslutRankingData>();
        for(var i = 0; i < GameManager.Instance().GetGameInfo().nowRankingList.length; i++){
            if(GameManager.Instance().GetGameInfo().nowRankingList[i].IsCorrect){
                correctList.push(GameManager.Instance().GetGameInfo().nowRankingList[i]);
            }
            if(GameManager.Instance().GetGameInfo().nowRankingList[i].Id === GameManager.Instance().GetGameInfo().userId){
                GameManager.Instance().GetGameInfo().rankInfo = GameManager.Instance().GetGameInfo().nowRankingList[i];
            }
        }
        this.ranking2.SetResultRankingList(correctList);
        this.ranking2.SetMaxCount(correctList.length);
        this.ranking2.Generate();

    }

    public SetUI(){


        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.liverNode.active = true;
            this.debugClientMode = 'Liver';
        }
        else{
            this.liverNode.active = false;
            this.debugClientMode = 'User';
        }

        GameManager.Instance().GetApiConnect().restoreGameProgress(
            GameManager.Instance().GetGameInfo().hostId,
            GameManager.Instance().GetGameInfo().token,
            GameManager.Instance().GetGameInfo().gameId,
            GameManager.Instance().GetGameInfo().order
        )
    }

    private DebugModalUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.liverNode.active = true;
                this.debugClientMode = 'Liver';
            }
            else{
                this.liverNode.active = false;
                this.debugClientMode = 'User';
            }
        }
    }

    // 次の問題に進むボタン処理
    private ClickNextQuizButton(){
        QuizModalManager.Instance().ChangeModal('Question');
        this.isNextQuiestion = true;
    }

    // リトライモーダルを表示
    private ClickRetryModal(){
        this.retryModal.SetActive();
    }

    public SetIsNextQuestion(is : boolean){
        this.isNextQuiestion = is;
    }

    public GetIsNextQuestion() : boolean{
        return this.isNextQuiestion;
    }
}

