import { _decorator, Component, Node, Animation, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResultAnimControll')
export class ResultAnimControll extends Component {
    @property(Node)
    public correctAnimNode: Node = null;
    @property({type: Animation})
    public correctAnim: Animation|null = null;
    @property(Label)
    private correctLabel: Label = null;

    @property(Node)
    public incorrectAnimNode: Node = null;
    @property({type: Animation})
    public incorrectAnim: Animation|null = null;

    start() {
        this.correctAnimNode.active = false
        this.incorrectAnimNode.active = false

        // let animation = this.correctAnim.node.getComponent(Animation);
        // animation.on(Animation.EventType.FINISHED, this.onTriggered, this);

        let animation = this.incorrectAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    update()
    {
    }

    public PlayCorrectAnim(comboCount: number)
    {
        if(this.correctAnim && !this.correctAnimNode.active)
        {
            // let posX = 30 * Math.floor(Math.random() * (3 - (-2)) + (-2));
            // let posY = 30 * Math.floor(Math.random() * (3 - (-2)) + (-2));
            // let pos = new Vec3(posX, posY, 0);
            // this.correctAnimNode.setPosition(pos);
            if(comboCount <= 1){
                this.correctLabel.string = '+200点'
            }
            else{
                this.correctLabel.string = comboCount + '問連続！\n+200点'
            }

            this.correctAnimNode.active = true;
            this.correctAnim.play();
        }
    }   

    public PlayIncorrectAnim()
    {
        if(this.incorrectAnim && !this.incorrectAnimNode.active)
        {
            this.incorrectAnimNode.active = true;
            this.incorrectAnim.play();
        }
    } 
    
    public AnimationReset()
    {
        this.correctAnimNode.active = false;
        this.incorrectAnimNode.active = false;
    }
    
    private onTriggered(arg: number)
    {
        // this.correctAnim.node.active = false;
        this.incorrectAnimNode.active = false;
    }
}

