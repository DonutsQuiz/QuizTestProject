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
    private AchieveLabel : Label = null;

    public SetRankiOrList(is : boolean){
        if(is){
            this.iconSprite.node.position = new Vec3(-100, 0, 0);
            this.nameLabel.node.position = new Vec3(-60, 8, 0);
            this.gradeLabel.node.position = new Vec3(-60, -8, 0);
            this.pointLabel.node.position = new Vec3(105, 0, 0);
            this.conteNode.position = new Vec3(135, -8, 0);
            this.AchieveLabel.node.active = true;
        }
        else{
            this.iconSprite.node.position = new Vec3(-140, 0, 0);
            this.nameLabel.node.position = new Vec3(-100, 8, 0);
            this.gradeLabel.node.position = new Vec3(-100, -8, 0);
            this.pointLabel.node.position = new Vec3(85, 0, 0);
            this.conteNode.position = new Vec3(115, -8, 0);
            this.AchieveLabel.node.active = false;
        }
    }

    public SetInformation(icon : SpriteFrame, name : string, point : number, conte : number, achieve : number){
        this.iconSprite.spriteFrame = icon;
        this.nameLabel.string = name;
        this.pointLabel.string = point.toString();
        this.gradeLabel.string = "家族ナミにくわしい級";
        this.AchieveLabel.string = achieve.toString();
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

    public SetAchieve(num : number){
        this.AchieveLabel.string = num.toString();
    }
}

