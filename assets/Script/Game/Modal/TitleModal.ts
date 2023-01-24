import { _decorator, Component, Node, Label, Button, SpriteFrame, labelAssembler, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleModal')
export class TitleModal extends Component {

    @property(Label) //検定名
    private titleLabel : Label = null;
    @property(Label) //サブタイトル
    private subTitleLabel : Label = null;
    @property(Button) //ゲームスタート
    private startButton : Button = null;
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
    

    start() {

    }

    update(deltaTime: number) {
        
    }
}

