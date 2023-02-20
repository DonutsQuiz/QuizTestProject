import { _decorator, Component, Node, Button, Label, Game, game, SpriteFrame, Prefab, Canvas, instantiate } from 'cc';
import { UserInfomation } from '../Modal/OverallResultModal';
import { QuizDataBase } from '../Quiz/Data/QuizDataBase';
import { GameInformation, RankingInfo } from './GameInformation';
import { QuizManager } from './QuizManager';
import { QuizModalManager } from './QuizModalManager';
import { AnimationManager } from './AnimationManager';
import { RankTopThreeIcon } from '../../UI/RankTopThreeIcon';
const { ccclass, property } = _decorator;

const ClientMode = {
    Liver : 'Liver',
    User : 'User',
} as const;

export type ClientMode = typeof ClientMode[keyof typeof ClientMode];

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance : GameManager;
    
    public static Instance() : GameManager {
        if(!GameManager.instance){
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    @property(QuizManager) //クイズマネージャー
    quizManager : QuizManager = null;
    @property(QuizModalManager) // モーダルマネージャー
    modalManager : QuizModalManager = null;
    @property(AnimationManager) // アニメーションマネージャー
    animManager : QuizModalManager = null;
    @property(RankTopThreeIcon) //トップ３のアイコン
    private topThreeIcon : RankTopThreeIcon = null;
    @property(QuizDataBase) // データベース（デバッグ用）
    dataBase : QuizDataBase = null;
    @property(SpriteFrame)
    iconSpriteList : Array<SpriteFrame> = new Array<SpriteFrame>();

    @property(Node)
    private canvas : Node = null;
    @property(Prefab) //ゲームメニュー
    private gameMenuPrefab : Prefab = null;
    @property(Prefab) //コメント
    private commentPrefab : Prefab = null;

    @property(Button) // ライバーとユーザーを変えるボタン
    private clientButton : Button = null;
    @property(Label) // 今ライバー側かユーザー側か
    private clientLabel : Label = null;

    @property(Button) // 初回かどうか変えるボタン
    private firstButton : Button = null;
    @property(Label) // 初回か二回目以降か
    private firstLabel : Label = null;

    private clientMode : ClientMode = 'Liver';
    private gameInformation : GameInformation = new GameInformation();
    private gameMenu = null;
    private comment = null;

    start() {
        GameManager.instance = this;

        this.clientButton.node.on(Button.EventType.CLICK, this.ChangeClientMode, this);
        this.firstButton.node.on(Button.EventType.CLICK, this.ChangeFirstMode, this);

        this.DebugConstractor();

        this.topThreeIcon.Constructor();

        this.dataBase.Constructor();
        this.modalManager.Constructor();

        this.gameMenu = instantiate(this.gameMenuPrefab);
        this.gameMenu.setParent(this.canvas);
        this.gameMenu.active = false;
        this.comment = instantiate(this.commentPrefab);
        this.comment.setParent(this.canvas);
        this.comment.active = false;
        
        this.animManager.Constructor();
    }

    update(deltaTime: number) {
        this.quizManager.OnUpdate();
        this.modalManager.OnUpdate(deltaTime);

        this.topThreeIcon.DebugUpdate();
    }

    // ライバーとユーザーの切り替え(デバッグ用)
    private ChangeClientMode(){
        if(this.clientMode === 'Liver'){
            this.clientMode = 'User';
            this.clientLabel.string = "ユーザー";
        }
        else if(this.clientMode === 'User'){
            this.clientMode = 'Liver';
            this.clientLabel.string = "ライバー";
        }
    }

    // ライバーとユーザーの切り替え(デバッグ用)
    private ChangeFirstMode(){
        if(this.gameInformation.isFirstTime){
            this.gameInformation.isFirstTime = false;
            this.firstLabel.string = "二回目以降";
        }
        else if(!this.gameInformation.isFirstTime){
            this.gameInformation.isFirstTime = true;
            this.firstLabel.string = "初回";
        }
    }

    public GetClientMode() : ClientMode{
        return this.clientMode;
    }

    public GetGameInfo() : GameInformation{
        return this.gameInformation;
    }

    public GetTopThreeIcon() : RankTopThreeIcon{
        return this.topThreeIcon;
    }

    public SetMenuActive(){
        this.gameMenu.active = true;
        this.comment.active = true;
    }




    private DebugConstractor(){

        // ランキング情報
        var userList : Array<UserInfomation> = new Array<UserInfomation>();
        userList.push(new UserInfomation("パンダ",   20000, 5000, 35000,this.iconSpriteList[0]));
        userList.push(new UserInfomation("キリン",    19000, 3000, 62000,this.iconSpriteList[1]));
        userList.push(new UserInfomation("マングース", 18000, 1000, 18000,this.iconSpriteList[2]));
        userList.push(new UserInfomation("インパラ",   17000, 6000, 49000,this.iconSpriteList[3]));
        userList.push(new UserInfomation("シロクマ",   16000, 2000, 21000,this.iconSpriteList[4]));
        userList.push(new UserInfomation("ライオン",   15000, 8000, 74000,this.iconSpriteList[5]));
        userList.push(new UserInfomation("サイ",      14000, 10000, 91000,this.iconSpriteList[6]));
        userList.push(new UserInfomation("ゾウ",      13000, 9000, 95000,this.iconSpriteList[7]));
        userList.push(new UserInfomation("カメレオン", 12000, 4000, 39000,this.iconSpriteList[8]));
        userList.push(new UserInfomation("サメ",      11000, 7000, 24000,this.iconSpriteList[9]));

        for(var i = 0; i < 10; i++){
            GameManager.Instance().GetGameInfo().ranking.push(new RankingInfo());
            GameManager.Instance().GetGameInfo().ranking[i].mName       = userList[i].mName;
            GameManager.Instance().GetGameInfo().ranking[i].mBet        = userList[i].mBet;
            GameManager.Instance().GetGameInfo().ranking[i].mPoint      = userList[i].mCoin;
            GameManager.Instance().GetGameInfo().ranking[i].mTotalPoint = userList[i].mTotalPoint;
            this.gameInformation.ranking[i].mSprite = userList[i].mSprite;
        }


        GameManager.Instance().GetGameInfo().totalBet = [100, 100, 100, 100];
        GameManager.Instance().GetGameInfo().odds = [1, 1, 1, 1];
        GameManager.Instance().GetGameInfo().coins = 20000;
        GameManager.Instance().GetGameInfo().thinkTime = 600;


        GameManager.Instance().GetGameInfo().liverName = "ライオン";
        GameManager.Instance().GetGameInfo().subTitle = "私のこと知ってる？";
        GameManager.Instance().GetGameInfo().topIndex = 0;

        // 今日のランキング
        var todaytemp = new RankingInfo();
        todaytemp.mName = "パラダイス運河";
        todaytemp.mTotalPoint = 999000;
        todaytemp.mSprite = this.iconSpriteList[0];
        GameManager.Instance().GetGameInfo().todayRanking.push(todaytemp);        
        todaytemp = new RankingInfo();
        todaytemp.mSprite = this.iconSpriteList[1];
        GameManager.Instance().GetGameInfo().todayRanking.push(todaytemp);
        todaytemp = new RankingInfo();
        todaytemp.mSprite = this.iconSpriteList[2];
        GameManager.Instance().GetGameInfo().todayRanking.push(todaytemp);


        // 先月のランキング
        var lasttemp = new RankingInfo();
        lasttemp.mName = "ささき";
        lasttemp.mBet = 10000;
        lasttemp.mPoint = 999000;
        lasttemp.mSprite = this.iconSpriteList[3];
        GameManager.Instance().GetGameInfo().lastMonthRanking.push(lasttemp);
        lasttemp = new RankingInfo();
        lasttemp.mName = "こんどう";
        lasttemp.mBet = 20000;
        lasttemp.mPoint = 872000;
        lasttemp.mSprite = this.iconSpriteList[4];
        GameManager.Instance().GetGameInfo().lastMonthRanking.push(lasttemp);
        lasttemp = new RankingInfo();
        lasttemp.mName = "さいとう";
        lasttemp.mBet = 30000;
        lasttemp.mPoint = 642000;
        lasttemp.mSprite = this.iconSpriteList[5];
        GameManager.Instance().GetGameInfo().lastMonthRanking.push(lasttemp);
        lasttemp = new RankingInfo();
        lasttemp.mName = "やました";
        lasttemp.mBet = 40000;
        lasttemp.mPoint = 311000;
        lasttemp.mSprite = this.iconSpriteList[6];
        GameManager.Instance().GetGameInfo().lastMonthRanking.push(lasttemp);

        this.gameInformation.odds[0] = 3.2;
        this.gameInformation.odds[1] = 4.6;
        this.gameInformation.odds[2] = 5.0;
        this.gameInformation.odds[3] = 6.8;

        this.gameInformation.isFirstTime = true;

        // ヒント
        this.gameInformation.hintSentence.push("ヒント1");
        this.gameInformation.hintSentence.push("ヒント2");
        this.gameInformation.hintSentence.push("ヒント3");
        this.gameInformation.hintSentence.push("ヒント4");
        this.gameInformation.hintSentence.push("ヒント5");
    }
}

