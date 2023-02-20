import { _decorator, Component, Node, spriteAssembler, Sprite, Label, Button, Prefab } from 'cc';
import { GameManager } from '../../Game/Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('TitleRankerInfo')
export class TitleRankerInfo extends Component {

    @property(Sprite) //アイコン画像
    private iconSpriteList : Array<Sprite> = new Array<Sprite>();
    @property(Label) //一位の名前
    private topNameLabel : Label = null;
    @property(Label) //一位の獲得ポイント
    private topPointLabel : Label = null;
    @property(Button) //ランキング表示
    private rankButton : Button = null;

    @property(Prefab) //ランキングプレハブ
    private RankingPrefab : Prefab = null;


    public Constructor(){
        this.rankButton.node.on(Button.EventType.CLICK, function(){}, this);
    }

    public SetUI(){
        this.topNameLabel.string = GameManager.Instance().GetGameInfo().todayRanking[0].mName;
        this.topPointLabel.string = GameManager.Instance().GetGameInfo().todayRanking[0].mTotalPoint.toString() + "点";
        this.iconSpriteList[0].spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[0].mSprite;
        this.iconSpriteList[1].spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[1].mSprite;
        this.iconSpriteList[2].spriteFrame = GameManager.Instance().GetGameInfo().todayRanking[2].mSprite;
    }


    start() {

    }

    update(deltaTime: number) {
        
    }
}

