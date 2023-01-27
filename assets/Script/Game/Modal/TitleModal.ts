import { _decorator, Component, Node, Label, Button, SpriteFrame, labelAssembler, Sprite, game, Game, Vec3 } from 'cc';
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
    @property(Node) // ランキング情報
    private topInfoNode : Node = null;
    @property(Label) //一位の名前
    private topNameLabel : Label = null;
    @property(Sprite) //一位のアイコン
    private topSprite : SpriteFrame = null;
    @property(Label) //一位の獲得ポイント
    private topPointLabel : Label = null;
    @property(Sprite) //二位のアイコン
    private secondSprite : SpriteFrame = null;
    @property(Sprite) //三位のアイコン
    private thirdSprite : SpriteFrame = null;
    @property(Button) //ランキング表示
    private rankButton : Button = null;


    private debugClientMode : ClientMode = 'Liver';

    
    public Constructor(){
        this.startButton.node.on(Button.EventType.CLICK, function(){QuizModalManager.Instance().ChangeModal('Rule')}, this);
        
        this.SetUI();
    }

    public OnUpdate(deltaTime: number){
        this.DebugUpdate();
    }

    public SetUI(){
        this.titleLabel.string = "「" + GameManager.Instance().GetGameInfo().liverName +  "」の推し検定";
        this.subTitleLabel.string = GameManager.Instance().GetGameInfo().subTitle + "編";
        this.topNameLabel.string = GameManager.Instance().GetGameInfo().rankName[GameManager.Instance().GetGameInfo().topIndex];
        this.topPointLabel.string = GameManager.Instance().GetGameInfo().rankTotalAcqPoint[GameManager.Instance().GetGameInfo().topIndex].toString() + "点";
        this.topSprite = GameManager.Instance().GetGameInfo().rankSprite[0];
        this.secondSprite = GameManager.Instance().GetGameInfo().rankSprite[1];
        this.thirdSprite = GameManager.Instance().GetGameInfo().rankSprite[2];
    }

    private DebugInit(){
        GameManager.Instance().GetGameInfo().liverName = "佐藤日向";
        GameManager.Instance().GetGameInfo().subTitle = "私のこと知ってる？";
        GameManager.Instance().GetGameInfo().topIndex = 0;

    }

    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.startButton.node.active = true;
                this.topInfoNode.position = new Vec3(0,0,0);
                this.topInfoNode.scale = new Vec3(1,1,1);
                this.debugClientMode = 'Liver';
            }
            else if(GameManager.Instance().GetClientMode() === 'User'){
                this.startButton.node.active = false;
                this.topInfoNode.position = new Vec3(0,25,0);
                this.topInfoNode.scale = new Vec3(1.2,1.2,1.0);
                this.debugClientMode = 'User';
            }
        }
    }
}

