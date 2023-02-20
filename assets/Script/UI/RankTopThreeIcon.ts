import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { GameManager } from '../Game/Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('RankTopThreeIcon')
export class RankTopThreeIcon extends Component {

    @property(Sprite)
    private firstSprite : Sprite = null;
    @property(Sprite)
    private secondSprite : Sprite = null;
    @property(Sprite)
    private thirdSprite : Sprite = null;

    private debugIsFirst : boolean = false;

    public Constructor(){
        this.debugIsFirst = GameManager.Instance().GetGameInfo().isFirstTime;
        if(GameManager.Instance().GetGameInfo().isFirstTime){
            this.SetActive(false);
        }
        else{
            this.SetActive(true);
            this.SetFirstSprite(GameManager.Instance().GetGameInfo().ranking[0].mSprite);
            this.SetSecondSprite(GameManager.Instance().GetGameInfo().ranking[1].mSprite);
            this.SetThirdSprite(GameManager.Instance().GetGameInfo().ranking[2].mSprite);
        }
    }

    public SetFirstSprite(icon : SpriteFrame){
        this.firstSprite.spriteFrame = icon;
    }

    public SetSecondSprite(icon : SpriteFrame){
        this.secondSprite.spriteFrame = icon;
    }

    public SetThirdSprite(icon : SpriteFrame){
        this.thirdSprite.spriteFrame = icon;
    }

    public SetAllSprite(first : SpriteFrame, second : SpriteFrame, third : SpriteFrame){
        this.firstSprite.spriteFrame = first;
        this.secondSprite.spriteFrame = second;
        this.thirdSprite.spriteFrame = third;
    }

    public SetActive(is : boolean){
        this.node.active = is;
    }

    public DebugUpdate(){
        if(this.debugIsFirst != GameManager.Instance().GetGameInfo().isFirstTime){
            if(GameManager.Instance().GetGameInfo().isFirstTime){
                this.SetActive(false);
            }
            else{
                this.SetActive(true);
                this.SetFirstSprite(GameManager.Instance().GetGameInfo().ranking[0].mSprite);
                this.SetSecondSprite(GameManager.Instance().GetGameInfo().ranking[1].mSprite);
                this.SetThirdSprite(GameManager.Instance().GetGameInfo().ranking[2].mSprite);
            }

            this.debugIsFirst = GameManager.Instance().GetGameInfo().isFirstTime;
        }
    }

}

