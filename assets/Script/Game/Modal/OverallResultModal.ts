import { _decorator, Component, Node, PageView, Label, Button, labelAssembler, game, RichText, Vec3, Sprite, SpriteFrame, CameraComponent, Prefab, InstanceMaterialType, instantiate, Game } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { RetryModal } from './RetryModal';
import { ScrollAnim } from '../../EffectAnim/ScrollAnim';
import { Ranking } from '../../UI/Ranking';
import { RankTopThreeIcon } from '../../UI/RankTopThreeIcon';
import { Ranking2 } from '../../UI/Ranking2';
import { FixReslutRankingData } from '../Manager/GameInformation';
import { AnimationManager } from '../Manager/AnimationManager';
import { GameMenu } from '../../UI/GameMenu';
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
    @property(Button) // 次のクイズへ
    private nextRoundButton : Button = null;
    @property(Button) // 次のラウンドへ
    private nextQuizButton : Button = null;
    @property(Button) // 総合結果へ
    private resultButton : Button = null;
    @property(Button) // ランキングチェンジ
    private rankChangeButton : Button = null;
    @property(RichText) // 次のランキンング
    private rankChangeText : RichText = null;
    @property(Label) // 問題数
    private questionNumberLabel : Label = null;
    @property(Label) // 今のランキング
    private rankLabel : Label = null;
    @property(RichText) //カンペラベル
    private compeLabel : RichText = null;
    // @property(RankTopThreeIcon)
    // private topThreeIcon : RankTopThreeIcon = null;
    @property(Sprite) //一位の画像（モダール内）
    private topSprite : Sprite = null;
    @property(ScrollAnim) // ランキングのスクロールアニメーション
    private scrollAnim : ScrollAnim = null;
    @property(Ranking) //ランキング部分
    private ranking : Ranking = null;
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
    // @property(Node) //正解したリスナー
    // private listenerListNode : Node = null;
    // @property(Node) //ランキングリスナー
    // private listenerRankNode : Node = null;
    @property(Button)
    private advanceButton : Button = null;
    @property(Label)
    private advanceLabel : Label = null;

    private userList : Array<UserInfomation> = new Array<UserInfomation>();
    private nowRankMode : number = 0; //0:獲得点数　1:BET 2:総合
    private isRoundEnd : boolean = false; // ラウンドが終了したか
    private isNextQuiestion : boolean = false; // 次の問題に進むか
    private retryModal : RetryModal = null;

    // 新仕様
    private nowNode : number = 0; // 0:正解者　1:順位
    private isRetry : boolean = false;
    
    private animationTime : number = 0.0;
    private ANIMATION_TIME : number = 8.0;

    private debugClientMode : ClientMode = 'Liver';

    public Constructor(){
        var temp = instantiate(this.RetryModalPrefab);
        temp.setParent(QuizModalManager.Instance().frontCanvas);
        this.retryModal = temp.getComponent(RetryModal);
        this.retryModal.Constructor();

        this.nextRoundButton.node.on(Button.EventType.CLICK, this.ClickRetryModal, this);
        this.nextQuizButton.node.on(Button.EventType.CLICK, this.ClickNextQuizButton, this);
        this.resultButton.node.on(Button.EventType.CLICK, this.ClickResultButton, this);
        this.resultButton.node.active = false;

        this.rankChangeButton.node.on(Button.EventType.CLICK, this.ChangeRanking, this);    
    
        this.advanceButton.node.on(Button.EventType.CLICK, this.ClickAdvanceButton, this);

        this.ranking.Constructor();
        this.ranking.SetRankOrList(false);
    }

    public OnUpdate(deltaTime: number){
        if(this.retryModal.GetIsDecide()){
            if(this.retryModal.GetIsRetry()){
                QuizModalManager.Instance().ChangeModal('Genre');
                GameManager.Instance().SetParticipantActive(true);
                GameManager.Instance().GetGameInfo().qNumber = 0;
                this.nowRankMode = 0;
                this.ChangeRanking();
            }
            else{
                QuizModalManager.Instance().node.active = false;
            }
            this.retryModal.Reset();
        }

        // 新仕様
        if(QuizManager.Instance().GetIsLast() && this.isRetry){
            QuizModalManager.Instance().ChangeModal('Genre');
            // QuizManager.Instance().quizComponent.SetQuiz();
            GameManager.Instance().SetParticipantActive(true);
            GameManager.Instance().GetGameInfo().qNumber = 0;
            this.nowRankMode = 0;
            this.ChangeRanking();
        }

        this.DebugModalUpdate();

        this.scrollAnim.Play();

        if(this.nowNode === 0){
            AnimationManager.Instance().blessingAnim.Play();
        }

        // ボタンとカンペ表示
        if(this.nowRankMode === 0){
            if(this.animationTime > 0.0){
                this.animationTime -= deltaTime;
                this.rankChangeButton.node.active = false;
                this.compeLabel.node.active = true;
            }
            else{
                this.animationTime = 0.0;
                this.rankChangeButton.node.active = true;
                this.compeLabel.node.active = false;
            }

        }
        else if(this.nowRankMode === 1){
            if(this.animationTime > 0.0){
                this.animationTime -= deltaTime;
                this.compeLabel.node.active = true;
                this.resultButton.node.active = false;
                this.nextQuizButton.node.active = false;
                this.nextRoundButton.node.active = false;
            }
            else{
                this.animationTime = 0.0;
                this.compeLabel.node.active = false;
                if(this.isRoundEnd){
                    this.resultButton.node.active = true;
                }
                else{
                    this.nextQuizButton.node.active = true;
                }
            }


        }


    }

    private ChangeRanking(){
        if(this.nowRankMode === 0){
            this.rankLabel.string = "BETメダルランキング";
            this.userList.sort((a,b) => {return b.mBet - a.mBet})
            this.rankChangeText.string = "<color=#000000>獲得点数<br/>ランキングへ戻る</color>"
            this.rankChangeText.fontSize = 48;
            // this.rankChangeButton.node.position = new Vec3(-130,20,0);
            this.rankChangeButton.node.position = new Vec3(-530,20,0);
            this.compeLabel.string = "<color=#ff0000>BETメダルの多い<br/>参加者を褒めて下さい</color>";
            this.nowRankMode = 1;
        }
        else{
            this.rankLabel.string = "獲得点数ランキング";
            this.userList.sort((a,b) => {return b.mCoin - a.mCoin})
            this.rankChangeText.string = "<color=#000000>BETメダル<br/>ランキングへ</color>"
            this.rankChangeText.fontSize = 60;
            // this.rankChangeButton.node.position = new Vec3(0,20,0);
            this.rankChangeButton.node.position = new Vec3(500,20,0);
            this.compeLabel.string = "<color=#ff0000>獲得点数の高い参加者を褒めて下さい</color>";
            this.nowRankMode = 0;
        }

        this.SetUI();
        this.animationTime = this.ANIMATION_TIME;
    }

    // 進むボタン(新仕様)
    private ClickAdvanceButton(){
        if(this.nowNode === 0){
            this.titleNode.position = new Vec3(0, 90, 0);
            this.blessingSprite.node.active = false;
            this.ranking.SetRankOrList(true);
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
            // this.blessingSprite.node.active = true;
            // this.listenerListNode.active = true;
            // this.listenerRankNode.active = false;
            this.ranking.SetRankOrList(false);
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
        this.nowRankMode = 0;
        this.isRoundEnd = false;
        this.debugClientMode = 'Liver';
        this.animationTime = this.ANIMATION_TIME;

        for(var i = 0; i < GameManager.Instance().GetGameInfo().ranking.length; i++){
            this.userList.push(new UserInfomation("",0,0,0,null));
            this.userList[i].mName       = GameManager.Instance().GetGameInfo().ranking[i].mName;
            this.userList[i].mBet        = GameManager.Instance().GetGameInfo().ranking[i].mBet;
            this.userList[i].mCoin       = GameManager.Instance().GetGameInfo().ranking[i].mPoint;
            this.userList[i].mTotalPoint = GameManager.Instance().GetGameInfo().ranking[i].mTotalPoint;
            this.userList[i].mSprite = GameManager.Instance().GetGameInfo().ranking[i].mSprite;
        }

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

        this.scrollAnim.Reset();
    }

    public SetUI(){

        this.questionNumberLabel.string = GameManager.Instance().GetGameInfo().qNumber + "/" + QuizManager.Instance().raundMax + "問";

        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.liverNode.active = true;
            this.debugClientMode = 'Liver';
        }
        else{
            this.liverNode.active = false;
            this.debugClientMode = 'User';
        }

        if(this.nowRankMode === 0){
            this.resultButton.node.active = false;
            this.nextQuizButton.node.active = false;
            this.nextRoundButton.node.active = false;
        }
        else if(this.nowRankMode === 1){
            if(this.isRoundEnd){
                this.resultButton.node.active = true;
                this.nextQuizButton.node.active = false;
                this.nextRoundButton.node.active = false;
            }
            else{
                this.nextQuizButton.node.active = true;
                this.resultButton.node.active = false;
                this.nextRoundButton.node.active = false;
            }
        }
        else if(this.nowRankMode === 2){
            this.nextRoundButton.node.active = true;
        }


        for(var i = 0; i < this.ranking.GetLength(); i++){
            // this.ranking.GetRankignUser(i).SetInfomation((i + 1).toString() + "位 : " + this.userList[i].mName + "  ");
            if(this.nowRankMode === 0){
                // this.ranking.GetRankignUser(i).SetInfomation(this.ranking.GetRankignUser(i).GetInfomation() + this.userList[i].mCoin.toString() + "点");
            }
            else if(this.nowRankMode === 1){
                // this.ranking.GetRankignUser(i).SetInfomation(this.ranking.GetRankignUser(i).GetInfomation() + this.userList[i].mBet.toString() + "点");
            }
            else if(this.nowRankMode === 2){
                // this.ranking.GetRankignUser(i).SetInfomation(this.ranking.GetRankignUser(i).GetInfomation() + this.userList[i].mTotalPoint.toString() + "点");
            }
        }


        // // ランキング画像の設定
        // this.topSprite.spriteFrame = this.userList[0].mSprite;
        // this.topThreeIcon.SetFirstSprite(this.userList[0].mSprite);
        // this.topThreeIcon.SetSecondSprite(this.userList[1].mSprite);
        // this.topThreeIcon.SetThirdSprite(this.userList[2].mSprite);

        // ランキング
        // this.ranking2.SetRankOrList(1);
        // this.ranking2.SetMaxCount(GameManager.Instance().GetGameInfo().nowRankingList.length);
        // this.ranking2.SetRankingList(GameManager.Instance().GetGameInfo().nowRankingList)


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
        this.ChangeRanking();
    }

    // リトライモーダルを表示
    private ClickRetryModal(){
        this.retryModal.SetActive();
    }

    private ClickResultButton(){
        this.resultButton.node.active = false;
        this.rankChangeButton.node.active = false;
        this.rankLabel.string = "ランキング発表！";
        this.userList.sort((a,b) => {return b.mTotalPoint - a.mTotalPoint});
        this.nowRankMode = 2;
        this.SetUI();
    }

    public SetIsRoundEnd(is : boolean){
        this.isRoundEnd = is;
        this.SetUI();
    }

    public SetIsNextQuestion(is : boolean){
        this.isNextQuiestion = is;
    }

    public GetIsNextQuestion() : boolean{
        return this.isNextQuiestion;
    }
}

