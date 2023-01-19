import { _decorator, Component, Node, Animation, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResultAnimControll')
export class ResultAnimControll extends Component {
    @property(Node)
    public correctAnimNode: Node = null;
    @property({type: Animation})
    public correctAnim: Animation|null = null;

    @property(Node)
    public incorrectAnimNode: Node = null;
    @property({type: Animation})
    public incorrectAnim: Animation|null = null;

    start() {
        this.correctAnim.node.active = false
        this.incorrectAnim.node.active = false

        let animation = this.correctAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);

        animation = this.incorrectAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    update()
    {
    }

    public PlayCorrectAnim()
    {
        if(this.correctAnim && !this.correctAnim.node.active)
        {
            let posX = 30 * Math.floor(Math.random() * (3 - (-2)) + (-2));
            let posY = 30 * Math.floor(Math.random() * (3 - (-2)) + (-2));
            let pos = new Vec3(posX, posY, 0);
            this.correctAnimNode.setPosition(pos);
            this.correctAnim.node.active = true;
            this.correctAnim.play('CorrectAnim');
        }
    }   

    public PlayIncorrectAnim()
    {
        if(this.incorrectAnim && !this.incorrectAnim.node.active)
        {
            this.incorrectAnim.node.active = true;
            this.incorrectAnim.play('IncorrectAnim');
        }
    }  
    
    private onTriggered(arg: number)
    {
        this.correctAnim.node.active = false;
        this.incorrectAnim.node.active = false;
    }
}

