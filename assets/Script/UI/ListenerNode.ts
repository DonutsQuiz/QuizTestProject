import { _decorator, Component, Node, Sprite, Label, labelAssembler, SpriteFrame, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ListenerNode')
export class ListenerNode extends Component {

    @property(Sprite)
    private iconSprite : Sprite = null;
    @property(Label)
    private nameLabel : Label = null;
    @property(Label)
    private pointLabel : Label = null;
    @property(Label)
    private gradeLabel : Label = null;
    @property(Node)
    private conteNode : Node = null;
    @property(Label)
    private conteLabel : Label = null;
    @property(Label)
    private achieveLabel : Label = null;
    @property(Sprite)
    private achieveSprite: Sprite = null;

    public SetRankiOrList(is : number){
        if(is === 0){
            this.iconSprite.node.position = new Vec3(-100, 0, 0);
            this.nameLabel.node.position = new Vec3(-60, 8, 0);
            this.gradeLabel.node.position = new Vec3(-60, -8, 0);
            this.pointLabel.node.position = new Vec3(145, 0, 0);
            this.conteNode.position = new Vec3(130, -8, 0);
            this.achieveLabel.node.active = true;
        }
        else{
            this.iconSprite.node.position = new Vec3(-140, 0, 0);
            this.nameLabel.node.position = new Vec3(-100, 8, 0);
            this.gradeLabel.node.position = new Vec3(-100, -8, 0);
            this.pointLabel.node.position = new Vec3(125, 0, 0);
            this.conteNode.position = new Vec3(110, -8, 0);
            this.achieveSprite.spriteFrame = null;
            this.achieveLabel.node.active = false;
        }
    }

    public SetInformation(icon : SpriteFrame, name : string, point : number, conte : number, grand : number, achieve : number){
        this.iconSprite.spriteFrame = icon;
        this.nameLabel.string = name;
        this.pointLabel.string = point.toString();
        this.achieveLabel.string = achieve.toString();
        //階級
        if(grand === 1){ 
            this.gradeLabel.string = "家族ナミにくわしい級";
        }
        else {
            this.gradeLabel.string = "家族ナミにくわしい級";
        }
        // 連続正解
        if(conte > 1){
            this.conteNode.active = true;
            this.conteLabel.string = conte.toString() + "問連続！";
            this.pointLabel.node.position = new Vec3(this.pointLabel.node.position.x, 8, 0);
        }
        else{
            this.conteNode.active = false;
            this.pointLabel.node.position = new Vec3(this.pointLabel.node.position.x, 0, 0);
        }
    }

    public SetAchieve(num:number, sprite:SpriteFrame){
        this.achieveLabel.string = num.toString();
        this.achieveSprite.spriteFrame = sprite;
    }
    public SetScore(num : number){
        this.pointLabel.string = num.toString() + "点";
    }
    public SetCombo(combo:number){
        if(combo > 1){
            this.conteNode.active = true;
            this.conteLabel.string = combo.toString() + "問連続！";
            this.pointLabel.node.position = new Vec3(this.pointLabel.node.position.x, 8, 0);
        }
        else{
            this.conteNode.active = false;
            this.pointLabel.node.position = new Vec3(this.pointLabel.node.position.x, 0, 0);
        }
    }
}

