import { _decorator, Component, Node, spriteAssembler, Sprite, Label, Root, UITransform, Vec3, game, Game, debug, Button, TERRAIN_MAX_LAYER_COUNT } from 'cc';
import { ClientMode, GameManager } from '../Game/Manager/GameManager';
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




    private maxCount : number = 20; //ランキングの最大数
    private topNode : number = 0; //表示してるランキングの番号
    private topIndex : number = 0; //一番上のノードのインデックス

    private ICON_MAX = 9;
    private INTERVAL = 50;
    private TRANS_POS : number = 55;
    private POS_X : number = 0;
    private MARGIN : number = 0;

    private isRecruitment : boolean = true;
    private isJoin : boolean = false;

    private debugClientMode : ClientMode = 'Liver';

    public OnUpdate(){
        let buttomNode : number = this.topNode + this.ICON_MAX - 1;
        let buttomIndex : number = (this.topIndex + this.ICON_MAX - 1) % this.ICON_MAX;

        // 飛んだときの処理を入れる
        var temp = (this.content.node.position.y - this.TRANS_POS) / this.INTERVAL + 1;
        if(temp < 0) temp = 0;
        temp = Math.floor(temp);
        if(this.topNode != temp){
            const awayIndex = temp - this.topNode;
            if(awayIndex > 0){        //下スクロール
                for(var i = 0; i < awayIndex; i++){
                    if(this.topNode > this.maxCount - this.ICON_MAX - 1) break;
                    this.iconList[this.topIndex].node.position = new Vec3(this.POS_X, this.iconList[this.topIndex].node.position.y - this.INTERVAL * this.ICON_MAX, 0);
                    this.topIndex = (this.topIndex + 1) % this.ICON_MAX;
                    this.topNode++;
                }
            }
            else if(awayIndex < 0){    // 上スクロール
                for(var i = 0; i < Math.abs(awayIndex); i++){
                    buttomIndex = (this.topIndex + this.ICON_MAX - 1) % this.ICON_MAX;
                    buttomNode = this.topNode + this.ICON_MAX - 1;
                    this.iconList[buttomIndex].node.position = new Vec3(this.POS_X, this.iconList[buttomIndex].node.position.y + this.INTERVAL * this.ICON_MAX, 0);
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
        if(!this.isRecruitment && !this.isJoin){
            if(this.debugClientMode === 'User'){
                GameManager.Instance().SetClientMode('Audience');
                this.SetUI();
            }
        }
    }

    public Generate(){
        this.content.height = this.INTERVAL * this.maxCount + this.MARGIN;

        // 5以下だったら非表示
        if(this.maxCount < 6){
            for(var i = this.maxCount; i < this.ICON_MAX; i++){
                this.iconList[i].node.active = false;
            }
        }
        else{
            for(var i = 0; i < this.ICON_MAX; i++){
                this.iconList[i].node.active = true;
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
                this.joinCountLabel.string = "0" + "名";
                this.iconRootNode.position = new Vec3(-2.5, 110, 0);
                this.maxCount = 5;
                this.Generate();
                for(var i = 0; i < this.maxCount; i++){
                    this.scoreNodeList[i].active = false;
                }
            }
            else{
                this.iconRootNode.position = new Vec3(-2.5, 90, 0);
                for(var i = 0; i < this.maxCount; i++){
                    this.scoreNodeList[i].active = false;
                }
            }


        }
        else if(GameManager.Instance().GetClientMode() === 'User'){ //ユーザー側
            this.liverNode.active = false;
            this.userNode.active = true;

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
        this.SetUI();
    }

    public SetMaxCount(max : number){
        this.maxCount = max + 1;
    }
    public SetIsRecruitment(is:boolean){
        this.isRecruitment = is;
    }


    start() {
        this.Generate();
    }

    update(deltaTime: number) {
        this.OnUpdate();

        this.DebugUpdate();
    }




    public DebugUpdate(){
        if(this.debugClientMode != GameManager.Instance().GetClientMode()){
            this.SetUI();
            this.debugClientMode = GameManager.Instance().GetClientMode();
        }
    }
}

