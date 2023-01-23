import { _decorator, Component, Node, PageView, Label, Button, labelAssembler, game, RichText } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { RetryModal } from './RetryModal';
import { ScrollAnim } from '../../EffectAnim/ScrollAnim';
const { ccclass, property } = _decorator;

class UserInfomation{
    constructor(name : string, coin : number, bet : number, point : number){
        this.mName = name;
        this.mCoin = coin;
        this.mBet = bet;
        this.mTotalPoint = point;
    }

    mName : string;
    mCoin : number;
    mBet  : number;
    mTotalPoint : number;
}

@ccclass('OverallResultModal')
export class OverallResultModal extends Component {

    @property(Node) // ライバー側のUI
    private liverNode : Node = null;
    @property(Label) // ユーザー名前
    private rankName : Array<Label> = new Array<Label>();
    @property(Label) // ポイント
    private rankNumber : Array<Label> = new Array<Label>();
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
    @property(Label) // 今のランキング
    private rankLabel : Label = null;
    @property(RetryModal) // 確認モーダル
    private retryModal : RetryModal = null;
    @property(ScrollAnim) // ランキングのスクロールアニメーション
    private scrollAnim : ScrollAnim = null;

    private userList : Array<UserInfomation> = new Array<UserInfomation>();
    private displayNumber : number = 10;
    private nowRankMode : number = 0;
    private isRoundEnd : boolean = false; // ラウンドが終了したか
    private isResultDisply : boolean = false; // 総合結果を表示するか

    private debugClientMode : ClientMode = 'Liver';

    public Constructor(){
        this.TestPlayerInfo();

        this.retryModal.Constructor();

        this.nextRoundButton.node.on(Button.EventType.CLICK, this.ClickRetryModal, this);
        this.nextQuizButton.node.on(Button.EventType.CLICK, this.ClickNextQuizButton, this);
        this.resultButton.node.on(Button.EventType.CLICK, this.ClickResultButton, this);
        this.resultButton.node.active = false;

        this.rankChangeButton.node.on(Button.EventType.CLICK, this.ChangeRanking, this);    
    }

    // start() {
    //     this.TestPlayerInfo();

    //     this.nextRoundButton.node.on(Button.EventType.CLICK, this.ClickRetryModal, this);
    //     this.nextQuizButton.node.on(Button.EventType.CLICK, this.ClickNextQuizButton, this);
    //     this.resultButton.node.on(Button.EventType.CLICK, this.ClickResultButton, this);
    //     this.resultButton.node.active = false;

    //     this.rankChangeButton.node.on(Button.EventType.CLICK, this.ChangeRanking, this);        

    // }

    update(deltaTime: number) {

        if(this.retryModal.GetIsDecide()){
            if(this.retryModal.GetIsRetry()){
                QuizModalManager.Instance().ChangeModal('Question');
                QuizManager.Instance().quizComponent.SetQuiz();
            }
            else{
                QuizModalManager.Instance().node.active = false;
            }
            this.retryModal.Reset();
        }
        this.scrollAnim.Play();
    }

    private ChangeRanking(){
        if(this.nowRankMode === 0){
            this.rankLabel.string = "BETコインランキング";
            this.userList.sort((a,b) => {return b.mBet - a.mBet})
            //this.rankChangeLabel.string = "獲得コイン¥nランキング";
            this.rankChangeText.string = "<color=#000000>獲得コイン<br/>ランキング</color>"
            this.nowRankMode = 1;
        }
        else{
            this.rankLabel.string = "獲得コインランキング";
            this.userList.sort((a,b) => {return b.mCoin - a.mCoin})
            //this.rankChangeLabel.string = "BETコイン" + '¥r' + "ランキング";
            this.rankChangeText.string = "<color=#000000>BETコイン<br/>ランキング</color>"
            this.nowRankMode = 0;
        }

        this.SetUI();
    }

    public Initialize(){
        this.displayNumber = 10;
        this.nowRankMode = 0;
        this.isRoundEnd = false;
        this.isResultDisply = false;
        this.debugClientMode = 'Liver';

        this.scrollAnim.Reset();
    }

    public SetUI(){

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


        for(var i = 0; i < this.displayNumber; i++){
            this.rankName[i].string = (i + 1).toString() + "位 : " + this.userList[i].mName;
            if(this.nowRankMode === 0){
                this.rankNumber[i].string = this.userList[i].mCoin.toString() + "ポイント";
            }
            else if(this.nowRankMode === 1){
                this.rankNumber[i].string = this.userList[i].mBet.toString() + "ポイント";
            }
            else if(this.nowRankMode === 2){
                this.rankNumber[i].string = this.userList[i].mTotalPoint.toString() + "ポイント";
            }
        }
    }

    private ClickNextQuizButton(){
        QuizModalManager.Instance().ChangeModal('Question');
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




    private TestPlayerInfo(){
        this.userList.push(new UserInfomation("パンダ",   20000, 5000, 35000));
        this.userList.push(new UserInfomation("キリン",    19000, 3000, 62000));
        this.userList.push(new UserInfomation("マングース", 18000, 1000, 18000));
        this.userList.push(new UserInfomation("インパラ",   17000, 6000, 49000));
        this.userList.push(new UserInfomation("シロクマ",   16000, 2000, 21000));
        this.userList.push(new UserInfomation("ライオン",   15000, 8000, 74000));
        this.userList.push(new UserInfomation("サイ",      14000, 10000, 91000));
        this.userList.push(new UserInfomation("ゾウ",      13000, 9000, 95000));
        this.userList.push(new UserInfomation("カメレオン", 12000, 4000, 39000));
        this.userList.push(new UserInfomation("サメ",      11000, 7000, 24000));

        for(var i = 0; i < 10; i++){
            GameManager.Instance().GetGameInfo().rankName[i] = this.userList[i].mName
            GameManager.Instance().GetGameInfo().rankAcqPoint[i] = this.userList[i].mCoin;
            GameManager.Instance().GetGameInfo().rankBetPoint[i] = this.userList[i].mBet;
            GameManager.Instance().GetGameInfo().rankTotalAcqPoint[i] = this.userList[i].mTotalPoint;
        }
    }
}

