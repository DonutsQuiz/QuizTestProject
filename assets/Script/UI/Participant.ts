import { _decorator, Component, Node, spriteAssembler, Sprite, Label, Root, UITransform, Vec3, game, Game, debug, Button, TERRAIN_MAX_LAYER_COUNT, SpriteFrame, tweenUtil } from 'cc';
import { FixReslutRankingData } from '../Game/Manager/GameInformation';
import { ClientMode, GameManager } from '../Game/Manager/GameManager';
import { UserInfomation } from '../Game/Modal/OverallResultModal';
import { Ranking } from './Ranking';
const { ccclass, property } = _decorator;

@ccclass('Participant')
export class Participant extends Component {

    @property(Sprite)
    private iconList : Array<Sprite> = new Array<Sprite>();
    @property(Label)
    private scoreList : Array<Label> = new Array<Label>();
    @property(Node)
    private scoreNodeList : Array<Node> = new Array<Node>();
    @property(Node)
    private iconRootNode : Node = null;
    @property(UITransform)
    private content : UITransform = null;
    @property(Sprite)
    private crownSpriteList : Array<Sprite> = new Array<Sprite>();
    @property(Node)
    private liverNode : Node = null;
    @property(Label)
    private joinCountLabel : Label = null;
    @property(Node)
    private userNode : Node = null;
    @property(Node)
    private comboNode : Node = null;
    @property(Label)
    private comboLabel : Label = null;
    @property(Label)
    private scoreLabel : Label = null;
    @property(Label)
    private rankLabel : Label = null;
    @property(Node)
    private joinNode : Node = null;
    @property(Node)
    private noJoinNode : Node = null;
    @property(Button)
    private buyButton : Button = null;
    @property(Button)
    private joinButton : Button = null;
    @property(Label)
    private joinLabel : Label = null;
    @property(Node)
    private audienceNode : Node = null;
    @property(Node)
    private coinNode : Node = null;
    @property(Node)
    private recruitNode : Node = null;
    @property(SpriteFrame)
    private testIconSprite : SpriteFrame  =null;
    @property(Button)
    private debugButton : Button = null;



    private maxCount : number = 5; //ランキングの最大数
    private topNode : number = 0; //表示してるランキングの番号
    private topIndex : number = 0; //一番上のノードのインデックス
    private nowIndex : number = 0;
    private joinCount :number = 0;

    private ICON_MAX :number = 9;
    private RECRU_ICON_MAX : number = 4;
    private INTERVAL : number = 50;
    private TRANS_POS : number = 55;
    private POS_X : number = 0;
    private MARGIN : number = 0;
    private FIXED_POINT : number = -187.5;

    private isRecruitment : boolean = true;
    private isJoin : boolean = false;
    private isFixedPoint : boolean = false;
    private userInfo :Array<UserInfomation> = new Array<UserInfomation>();
    private rankInfo : Array<FixReslutRankingData> = new Array<FixReslutRankingData>();

    private debugClientMode : ClientMode = 'Liver';

    public OnUpdate(){
        let buttomNode : number = this.topNode + this.ICON_MAX - 1;
        let buttomIndex : number = (this.topIndex + this.ICON_MAX - 1) % this.ICON_MAX;


        // 見えなくなったら最後尾(先頭)に移動
        var temp = (this.content.node.position.y - this.TRANS_POS) / this.INTERVAL + 1;
        if(temp < 0) temp = 0;
        temp = Math.floor(temp);
        if(this.topNode != temp){
            const awayIndex = temp - this.topNode;
            if(awayIndex > 0){        //下スクロール
                for(var i = 0; i < awayIndex; i++){
                    if(this.topNode > this.maxCount - this.ICON_MAX - 1) break;
                    this.iconList[this.topIndex].node.position = new Vec3(this.POS_X, this.iconList[this.topIndex].node.position.y - this.INTERVAL * this.ICON_MAX, 0);
                    this.SetInformation(this.topIndex, this.topNode + this.ICON_MAX);
                    this.topIndex = (this.topIndex + 1) % this.ICON_MAX;
                    this.topNode++;
                }
            }
            else if(awayIndex < 0){    // 上スクロール
                for(var i = 0; i < Math.abs(awayIndex); i++){
                    buttomIndex = (this.topIndex + this.ICON_MAX - 1) % this.ICON_MAX;
                    buttomNode = this.topNode + this.ICON_MAX - 1;
                    this.iconList[buttomIndex].node.position = new Vec3(this.POS_X, this.iconList[buttomIndex].node.position.y + this.INTERVAL * this.ICON_MAX, 0);
                    this.SetInformation(buttomIndex, buttomNode- this.ICON_MAX);
                    this.topIndex = (this.topIndex + this.ICON_MAX - 1) % this.ICON_MAX;
                    this.topNode--;
                }
            }
        }

        // 王冠の追尾処理
        if(this.topNode < 3){
            var count : number = 0;
            for(var i = 0; i < 3; i++){
                if(i >= this.topNode && !this.isRecruitment){
                    this.crownSpriteList[i].node.active = true;
                    this.crownSpriteList[i].node.position = new Vec3(25, this.iconList[this.topIndex + count].node.position.y, 0);
                    count++;
                }
                else{
                    this.crownSpriteList[i].node.active = false;
                }
            }
        }

        // もし参加しなかったら
        if(!this.isRecruitment){
            this.scoreNodeList.forEach(element => {element.active = true;});

            if(this.debugClientMode === 'User' && !this.isJoin){
                GameManager.Instance().SetClientMode('Audience');
                this.SetUI();
            }
        }
    }

    private SetInfo(index:number){
        this.iconList[index].spriteFrame = this.testIconSprite;
        this.scoreList[index].string = "0";
    }

    public Generate(){
        this.content.height = this.INTERVAL * this.maxCount + this.MARGIN;

        // 9以下だったら非表示
        if(this.maxCount < this.ICON_MAX){
            for(var i = 0; i < this.ICON_MAX; i++){
                if(i < this.maxCount){
                    this.iconList[i].node.active = true;
                }
                else{
                    this.iconList[i].node.active = false;
                }
            }

            if(!this.isRecruitment){
                this.content.node.position = new Vec3(-2.5, -(375 - this.content.height), 0);
            }

        }
        else{
            for(var i = 0; i < this.ICON_MAX; i++){
                this.iconList[i].node.active = true;
                if(this.isRecruitment){
                    this.scoreNodeList[i].active = false;
                }
            }
        }

        this.topNode = 0
        this.topIndex = 0;
    }

    // UIのセット
    public SetUI(){
        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.liverNode.active = true;
            this.userNode.active = false;
            this.iconRootNode.active = true;

            if(this.isRecruitment){ //参加者募集中
                this.recruitNode.active = true;
                this.joinCountLabel.node.active = true;
                this.joinCountLabel.string = this.joinCount.toString() + "名";
                this.iconRootNode.position = new Vec3(-2.5, 12.5, 0);
                this.maxCount = 4;
                this.Generate();
                for(var i = 0; i < this.maxCount; i++){
                    this.scoreNodeList[i].active = false;
                }
            }
            else{
                this.iconRootNode.position = new Vec3(-2.5, 187.5, 0);
                this.recruitNode.active = false;
                for(var i = 0; i < this.ICON_MAX; i++){
                    this.scoreNodeList[i].active = false;
                }
            }


        }
        else if(GameManager.Instance().GetClientMode() === 'User'){ //ユーザー側
            this.liverNode.active = false;
            this.userNode.active = true;
            this.coinNode.active = true;
            this.joinButton.node.active = true;
            this.audienceNode.active = false;

            // 未参加なら
            if(!this.isJoin){
                this.noJoinNode.active = true;
                this.joinNode.active = false;
                this.iconRootNode.active = false;
            }
            else{
                this.noJoinNode.active = false;
                this.joinNode.active = true;
                this.iconRootNode.active = true;
            }

            // NULLチェック
            if(!GameManager.Instance().GetGameInfo().rankInfo){
                this.comboNode.active = false;
                this.comboLabel.string = 0 + "問連続正解!!";
                this.scoreLabel.string = "スコア：" + 0;
                this.rankLabel.string = "順位：" + 0 + "位"
                return;
            }

            if(GameManager.Instance().GetGameInfo().rankInfo.ComboCount > 1){
                this.comboNode.active = true;
                this.comboLabel.string = GameManager.Instance().GetGameInfo().rankInfo.ComboCount + "問連続正解!!";
            }
            this.scoreLabel.string = "スコア：" + GameManager.Instance().GetGameInfo().rankInfo.Score;
            this.rankLabel.string = "順位：" + GameManager.Instance().GetGameInfo().rankInfo.Rank + "位"
        }
        else if(GameManager.Instance().GetClientMode() === 'Audience'){
            this.joinLabel.string = "次の検定募集をお待ちください";
            this.coinNode.active = false;
            this.joinButton.node.active = false;
            this.audienceNode.active = true;
        }
    }

    public Constructor(){
        this.joinButton.node.on(Button.EventType.CLICK, this.ClickJoin, this);
    }
    
    private ClickJoin(){
        GameManager.Instance().GetApiConnect().registerGuest(
            GameManager.Instance().GetGameInfo().userId,
            GameManager.Instance().GetGameInfo().token,
            GameManager.Instance().GetGameInfo().gameId,
            GameManager.Instance().GetGameInfo().hostId
        );
        this.isJoin = true;
        this.joinCount++;
        this.SetUI();
        this.DebugClickJoin();
    }

    public SetMaxCount(max : number){
        this.maxCount = max + 1;
    }
    public SetIsRecruitment(is:boolean){
        this.isRecruitment = is;
        this.Generate();
        this.SetUI();
    }


    start() {
        this.Generate();
        this.debugButton.node.on(Button.EventType.CLICK, this.DebugClickJoin, this);
    }

    update(deltaTime: number) {
        this.OnUpdate();

        this.DebugUpdate();
    }

    // スコアと順位の情報を入れる
    public SetRankInfo(resultRanking : Array<FixReslutRankingData>){
        if(resultRanking.length <= 0){
            return;
        }

        this.rankInfo = resultRanking;
        this.maxCount = resultRanking.length;
        this.Generate();

        let formax = Math.min(this.maxCount, this.ICON_MAX);

        for(var i = 0; i < formax; i++){
            this.scoreList[i].string = this.rankInfo[i].Score.toString();
        }

        if(GameManager.Instance().GetGameInfo().rankInfo){
            this.scoreLabel.string = "スコア：" + GameManager.Instance().GetGameInfo().rankInfo.Score;
            this.rankLabel.string = "順位：" + GameManager.Instance().GetGameInfo().rankInfo.Rank + "位"
        }
    }

    // nodeIndex:値を入れるノードの添字　rankIndex:値を取り出すリストの添字
    private SetInformation(nodeIndex:number, rankIndex:number){
        this.scoreList[nodeIndex].string = this.rankInfo[rankIndex].Score.toString();
    }




    public DebugUpdate(){
        if(this.debugClientMode != GameManager.Instance().GetClientMode()){
            this.SetUI();
            this.debugClientMode = GameManager.Instance().GetClientMode();
        }
    }

    private DebugClickJoin(){
        if(this.nowIndex < this.RECRU_ICON_MAX){
            this.SetInfo(this.nowIndex);
            this.maxCount = this.nowIndex + 1;
        }
        this.userInfo.push(new UserInfomation("",0,0,0,null));  //ユーザー情報を格納(現段階では仮)
        this.maxCount = this.nowIndex + 1;
        this.nowIndex++;
    }
}

