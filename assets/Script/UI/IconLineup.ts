import { _decorator, Component, Node, Sprite, SpriteFrame, Vec3, Button, labelAssembler, Label } from 'cc';
import { GameManager } from '../Game/Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('IconLineup')
export class IconLineup extends Component {

    @property(Sprite)
    private iconSprite : Array<Sprite> = new Array<Sprite>();
    @property(Label)
    private moreLabel : Label = null;
    @property(Button)
    private addButton : Button = null;

    public Constructor(){
        this.iconSprite.forEach(element => {element.node.active = false;});
        this.moreLabel.node.active = false;
        //this.addButton.node.on(Button.EventType.CLICK, function(){this.AddIcon(GameManager.Instance().GetGameInfo().ranking[0].mSprite);}, this);
    }

    // start(){
    //     this.iconSprite.forEach(element => {element.node.active = false;});        
    //     this.moreLabel.node.active = false;
    //     this.addButton.node.on(Button.EventType.CLICK, function(){this.AddIcon(GameManager.Instance().GetGameInfo().ranking[0].mSprite);}, this);
    // }

    public AddIcon(sprite : SpriteFrame){
        var count : number = 0;
        for(var i = 0; i < this.iconSprite.length + 1; i++){
            if(i === 7){
                count = 7;
                break;
            }
            else if(!this.iconSprite[i].node.active){
                this.iconSprite[i].node.active = true;
                this.iconSprite[i].spriteFrame = sprite;
                count = i;
                break;
            }
        }

        if(count === 0){
            this.iconSprite[0].node.position = new Vec3(0,0,0);
        }
        else if(count === 1){
            this.iconSprite[0].node.position = new Vec3(-15,0,0);
            this.iconSprite[1].node.position = new Vec3(15,0,0);
        }
        else if(count === 2){
            this.iconSprite[0].node.position = new Vec3(-28,0,0);
            this.iconSprite[1].node.position = new Vec3(0,0,0);
            this.iconSprite[2].node.position = new Vec3(28,0,0);
        }
        else if(count === 3){
            this.iconSprite[0].node.position = new Vec3(-39,0,0);
            this.iconSprite[1].node.position = new Vec3(-13,0,0);
            this.iconSprite[2].node.position = new Vec3(13,0,0);
            this.iconSprite[3].node.position = new Vec3(39,0,0);
        }        
        else if(count === 4){
            this.iconSprite[0].node.position = new Vec3(-46,0,0);
            this.iconSprite[1].node.position = new Vec3(-22,0,0);
            this.iconSprite[2].node.position = new Vec3(0,0,0);
            this.iconSprite[3].node.position = new Vec3(22,0,0);
            this.iconSprite[4].node.position = new Vec3(46,0,0);
        }
        else if(count === 5){
            this.iconSprite[0].node.position = new Vec3(-55,0,0);
            this.iconSprite[1].node.position = new Vec3(-33,0,0);
            this.iconSprite[2].node.position = new Vec3(-11,0,0);
            this.iconSprite[3].node.position = new Vec3(11,0,0);
            this.iconSprite[4].node.position = new Vec3(33,0,0);
            this.iconSprite[5].node.position = new Vec3(55,0,0);
        }
        else if(count === 6){
            this.iconSprite[0].node.position = new Vec3(-60,0,0);
            this.iconSprite[1].node.position = new Vec3(-40,0,0);
            this.iconSprite[2].node.position = new Vec3(-20,0,0);
            this.iconSprite[3].node.position = new Vec3(0,0,0);
            this.iconSprite[4].node.position = new Vec3(20,0,0);
            this.iconSprite[5].node.position = new Vec3(40,0,0);
            this.iconSprite[6].node.position = new Vec3(60,0,0);
        }
        else if(count === 7){
            this.iconSprite[0].node.position = new Vec3(-70,0,0);
            this.iconSprite[1].node.position = new Vec3(-55,0,0);
            this.iconSprite[2].node.position = new Vec3(-40,0,0);
            this.iconSprite[3].node.position = new Vec3(-25,0,0);
            this.iconSprite[4].node.position = new Vec3(-10,0,0);
            this.iconSprite[5].node.position = new Vec3(5,0,0);
            this.iconSprite[6].node.position = new Vec3(20,0,0);
            this.moreLabel.node.active = true;
        }
    }

    public Reset(){
        this.iconSprite.forEach(element => {element.node.active = false;});
        this.moreLabel.node.active = false;
    }


}

