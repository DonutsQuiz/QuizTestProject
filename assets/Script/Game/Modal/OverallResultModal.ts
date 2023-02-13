import { _decorator, Component, Node, PageView, Label, Button, labelAssembler, game, RichText, Vec3, Sprite, SpriteFrame, CameraComponent, Prefab } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { RetryModal } from './RetryModal';
import { ScrollAnim } from '../../EffectAnim/ScrollAnim';
import { RankingUser } from '../../UI/RankingUser';
import { Ranking } from '../../UI/Ranking';
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
    @property(RankingUser) //ランキングユーザー情報
    private rankingUser : Array<RankingUser> = new Array<RankingUser>();
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
    @property(RetryModal) // 確認モーダル
    private retryModal : RetryModal = null;
    @property(RichText) //カンペラベル
    private compeLabel : RichText = null;
    @property(Sprite) //一位の画像（モダール内）
    private topSprite : Sprite = null;
    @property(Sprite) //一位の画像（モーダル外）
    private firstSprite : Sprite = null;
    @property(Sprite) //二位の画像
    private secondSprite : Sprite = null;    
    @property(Sprite) //三位の画像
    private thirdSprite : Sprite = null;
    @property(ScrollAnim) // ランキングのスクロールアニメーション
    private scrollAnim : ScrollAnim = null;
    @property(Ranking) //ランキング部分
    private ranking : Ranking = null;

    @property(Node)
    private rankingRootNode : Node = null;
    @property(Prefab)
    private rankingPrefab : Prefab = null;
    private nowRankingNodeNum : number = 0;
    private basePositionY : number = -336;
    private INTERVAL : number = -26;

    private userList : Array<UserInfomation> = new Array<UserInfomation>();
    private displayNumber : number = 10; //表示するランキングの個数
    private nowRankMode : number = 0; //0:獲得点数　1:BET 2:総合
    private isRoundEnd : boolean = false; // ラウンドが終了したか
    private isResultDisply : boolean = false; // 総合結果を表示するか
    
    private animationTime : number = 0.0;
    private ANIMATION_TIME : number = 8.0;

    private debugClientMode : ClientMode = 'Liver';

    public Constructor(){
        this.retryModal.Constructor();

        this.nextRoundButton.node.on(Button.EventType.CLICK, this.ClickRetryModal, this);
        this.nextQuizButton.node.on(Button.EventType.CLICK, this.ClickNextQuizButton, this);
        this.resultButton.node.on(Button.EventType.CLICK, this.ClickResultButton, this);
        this.resultButton.node.active = false;

        this.rankChangeButton.node.on(Button.EventType.CLICK, this.ChangeRanking, this);    

        this.ranking.Constructor();
    }

    public OnUpdate(deltaTime: number){
        if(this.retryModal.GetIsDecide()){
            if(this.retryModal.GetIsRetry()){
                QuizModalManager.Instance().ChangeModal('Question');
                QuizManager.Instance().quizComponent.SetQuiz();
                this.nowRankMode = 0;
                this.ChangeRanking();
            }
            else{
                QuizModalManager.Instance().node.active = false;
            }
            this.retryModal.Reset();
        }

        this.DebugModalUpdate();

        this.scrollAnim.Play();


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
            this.rankChangeButton.node.position = new Vec3(-130,20,0);
            this.compeLabel.string = "<color=#ff0000>BETメダルの多い<br/>参加者を褒めて下さい</color>";
            this.nowRankMode = 1;
        }
        else{
            this.rankLabel.string = "獲得点数ランキング";
            this.userList.sort((a,b) => {return b.mCoin - a.mCoin})
            this.rankChangeText.string = "<color=#000000>BETメダル<br/>ランキングへ</color>"
            this.rankChangeText.fontSize = 60;
            this.rankChangeButton.node.position = new Vec3(0,20,0);
            this.compeLabel.string = "<color=#ff0000>獲得点数の高い参加者を褒めて下さい</color>";
            this.nowRankMode = 0;
        }

        this.SetUI();
        this.animationTime = this.ANIMATION_TIME;
    }

    public Initialize(){
        this.displayNumber = 10;
        this.nowRankMode = 0;
        this.isRoundEnd = false;
        this.isResultDisply = false;
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
            this.ranking.GetRankignUser(i).SetInfomation((i + 1).toString() + "位 : " + this.userList[i].mName + "  ");
            if(this.nowRankMode === 0){
                this.ranking.GetRankignUser(i).SetInfomation(this.ranking.GetRankignUser(i).GetInfomation() + this.userList[i].mCoin.toString() + "点");
            }
            else if(this.nowRankMode === 1){
                this.ranking.GetRankignUser(i).SetInfomation(this.ranking.GetRankignUser(i).GetInfomation() + this.userList[i].mBet.toString() + "点");
            }
            else if(this.nowRankMode === 2){
                this.ranking.GetRankignUser(i).SetInfomation(this.ranking.GetRankignUser(i).GetInfomation() + this.userList[i].mTotalPoint.toString() + "点");
            }
        }


        // ランキング画像の設定
        this.topSprite.spriteFrame = this.userList[0].mSprite;
        this.firstSprite.spriteFrame = this.userList[0].mSprite;
        this.secondSprite.spriteFrame = this.userList[1].mSprite;
        this.thirdSprite.spriteFrame = this.userList[2].mSprite;
    }


    private RankingGeneration(){
        const rankMax : number = GameManager.Instance().GetGameInfo().ranking.length;

        if(rankMax > this.nowRankingNodeNum){
            const dif : number = rankMax - this.nowRankingNodeNum;
            // var interval : number = 
        }
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

    private ClickNextQuizButton(){
        QuizModalManager.Instance().ChangeModal('Question');
        this.nowRankMode = 0;
        this.ChangeRanking();
    }

    private ClickRetryModal(){
        this.retryModal.SetActive();
    }

    private ClickResultButton(){
        this.isResultDisply = true;
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
}

