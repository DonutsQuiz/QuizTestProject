import { _decorator, Component, Node, Label, Button, SpriteFrame, labelAssembler, Sprite, game, Game, Vec3, UITransform, RichText } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('TitleModal')
export class TitleModal extends Component {

    @property(Label) //検定名
    private titleLabel : Label = null;
    @property(Label) //サブタイトル
    private subTitleLabel : Label = null;
    @property(Button) //ゲームスタート
    private startButton : Button = null;
    @property(Label) //スタートボタンのラベル
    private startLabel : Label = null;
    @property(Node) // ランキング情報
    private topInfoNode : Node = null;
    @property(Label) //一位の名前
    private topNameLabel : Label = null;
    @property(UITransform) // 一位の名前の大きさ
    private topNameTrans : UITransform = null;
    @property(Node) // 敬称のノード
    private topHonoNode : Node = null;
    @property(Sprite) //一位のアイコン
    private topSprite : Sprite = null;
    @property(Label) //一位の獲得ポイント
    private topPointLabel : Label = null;
    @property(Sprite) //二位のアイコン
    private secondSprite : Sprite = null;
    @property(Sprite) //三位のアイコン
    private thirdSprite : Sprite = null;
    @property(Button) //ランキング表示
    private rankButton : Button = null;
    @property(Node) //ランキングのノード
    private rankingInfoNode : Node = null;
    @property(Node) //チュートリアル用のノード
    private tutorialNode : Node = null;
    @property(Label) //検定名(チュートリアル用)
    private certTitleLabel : Label = null;



    private debugClientMode : ClientMode = 'Liver';
    private debugIsFirst : boolean = false;

    private isFirst : boolean = false;

    
    public Constructor(){
        this.startButton.node.on(Button.EventType.CLICK, function(){
            QuizModalManager.Instance().ChangeModal('Rule')
            this.isFirst = false;}, 
            this);
        
        this.SetUI();

        this.debugIsFirst = GameManager.Instance().GetGameInfo().isFirstTime;
    }

    public OnUpdate(deltaTime: number){
        if(this.isFirst){
            // this.topHonoNode.position = new Vec3(this.topNameTrans.contentSize.width, 0,0);
            this.isFirst = false;
        }

        this.DebugUpdate();
    }

    public SetUI(){
        this.titleLabel.string = "「" + GameManager.Instance().GetGameInfo().liverName +  "」の推し検定";
        this.subTitleLabel.string = GameManager.Instance().GetGameInfo().subTitle + "編";
        if(GameManager.Instance().GetGameInfo().isFirstTime){
            this.rankingInfoNode.active = false;
            this.tutorialNode.active = true;
            this.certTitleLabel.string = GameManager.Instance().GetGameInfo().liverName +  "検定";
            this.startLabel.string = "チュートリアル";
        }
        else{
            this.rankingInfoNode.active = true;
            this.tutorialNode.active = false;
            this.topNameLabel.string = GameManager.Instance().GetGameInfo().todayRanking[0].mName;
            this.topPointLabel.string = GameManager.Instance().GetGameInfo().todayRanking[0].mTotalPoint.toString() + "点";
            this.topSprite.spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[0].mSprite;
            this.secondSprite.spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[1].mSprite;
            this.thirdSprite.spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[2].mSprite;
            this.startLabel.string = "ゲームスタート";
        }
        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.startButton.node.active = true;
            this.topInfoNode.position = new Vec3(0,-20,0);
            this.topInfoNode.scale = new Vec3(1,1,1);
        }
        else if(GameManager.Instance().GetClientMode() === 'User'){
            this.startButton.node.active = false;
            this.topInfoNode.position = new Vec3(0,0,0);
            this.topInfoNode.scale = new Vec3(1.2,1.2,1.0);
        }
    }

    public SetIsFirst(is : boolean){
        this.isFirst = is;
    }




    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.startButton.node.active = true;
                this.topInfoNode.position = new Vec3(0,-20,0);
                this.topInfoNode.scale = new Vec3(1,1,1);
                this.debugClientMode = 'Liver';
            }
            else if(GameManager.Instance().GetClientMode() === 'User'){
                this.startButton.node.active = false;
                this.topInfoNode.position = new Vec3(0,0,0);
                this.topInfoNode.scale = new Vec3(1.2,1.2,1.0);
                this.debugClientMode = 'User';
            }
        }

        if(GameManager.Instance().GetGameInfo().isFirstTime != this.debugIsFirst){
            if(GameManager.Instance().GetGameInfo().isFirstTime){
                this.rankingInfoNode.active = false;
                this.tutorialNode.active = true;
                this.certTitleLabel.string = GameManager.Instance().GetGameInfo().liverName +  "検定";
                this.startLabel.string = "チュートリアル";
                this.debugIsFirst = true;   
            }
            else{
                this.rankingInfoNode.active = true;
                this.tutorialNode.active = false;
                this.topNameLabel.string = GameManager.Instance().GetGameInfo().todayRanking[0].mName;
                this.topPointLabel.string = GameManager.Instance().GetGameInfo().todayRanking[0].mTotalPoint.toString() + "点";
                this.topSprite.spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[0].mSprite;
                this.secondSprite.spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[1].mSprite;
                this.thirdSprite.spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[2].mSprite;
                this.startLabel.string = "ゲームスタート";
                this.debugIsFirst = false;
            }
        }
    }
}

