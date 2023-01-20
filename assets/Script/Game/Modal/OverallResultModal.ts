import { _decorator, Component, Node, PageView, Label, Button, labelAssembler, game, RichText } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { RetryModal } from './RetryModal';
const { ccclass, property } = _decorator;

class UserInfomation{
    constructor(name : string, coin : number, bet : number){
        this.mName = name;
        this.mCoin = coin;
        this.mBet = bet;
    }

    mName : string;
    mCoin : number;
    mBet  : number;
}

@ccclass('OverallResultModal')
export class OverallResultModal extends Component {

    @property(Label)
    rankName : Array<Label> = new Array<Label>();
    @property(Label)
    rankNumber : Array<Label> = new Array<Label>();
    @property(Button)
    nextButton : Button = null;
    @property(Button)
    rankChangeButton : Button = null;
    @property(RichText)
    rankChangeText : RichText = null;
    @property(Label)
    rankLabel : Label = null;
    @property(RetryModal)
    retryModal : RetryModal = null;

    userList : Array<UserInfomation> = new Array<UserInfomation>();
    displayNumber : number = 10;
    nowRankMode : number = 0;

    start() {
        this.TestPlayerInfo();

        this.userList.sort((a,b) => {return b.mCoin - a.mCoin})
        this.Initialize();

        this.nextButton.node.on(Button.EventType.CLICK, this.ClickRetryModal, this);

        this.rankChangeButton.node.on(Button.EventType.CLICK, this.ChangeRanking, this);
    }

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
    }


    private TestPlayerInfo(){
        this.userList.push(new UserInfomation("パンダ",   20000, 5000));
        this.userList.push(new UserInfomation("キリン",    19000, 3000));
        this.userList.push(new UserInfomation("マングース", 18000, 1000));
        this.userList.push(new UserInfomation("インパラ",   17000, 6000));
        this.userList.push(new UserInfomation("シロクマ",   16000, 2000));
        this.userList.push(new UserInfomation("ライオン",   15000, 8000));
        this.userList.push(new UserInfomation("サイ",      14000, 10000));
        this.userList.push(new UserInfomation("ゾウ",      13000, 9000));
        this.userList.push(new UserInfomation("カメレオン", 12000, 4000));
        this.userList.push(new UserInfomation("サメ",      11000, 7000));

        for(var i = 0; i < 10; i++){
            GameManager.Instance().GetGameInfo().rankUserName[i] = this.userList[i].mName
            GameManager.Instance().GetGameInfo().rankUserAcqPoint[i] = this.userList[i].mCoin;
            GameManager.Instance().GetGameInfo().rankUserBetPoint[i] = this.userList[i].mBet;
        }
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

        this.Initialize();
    }

    public Initialize(){
        for(var i = 0; i < this.displayNumber; i++){
            this.rankName[i].string = (i + 1).toString() + "位 : " + this.userList[i].mName;
            if(this.nowRankMode === 0){
                this.rankNumber[i].string = this.userList[i].mCoin.toString() + "ポイント";
            }
            else {
                this.rankNumber[i].string = this.userList[i].mBet.toString() + "ポイント";
            }
        }
    }

    private ClickRetryModal(){
        this.retryModal.SetActive();
    }
}

