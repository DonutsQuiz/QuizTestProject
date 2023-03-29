import { _decorator, Component, Node, Animation, Vec2, Vec3, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnswerAnim')
export class AnswerAnim extends Component {
    @property({type: Animation})
    private AnswerAnim: Animation|null = null;
    @property(Sprite)
    private UserIcon: Sprite = null;

    @property(Vec3)
    private displayPos : Vec3[] = [];


    start() {
        this.AnswerAnim.node.active = false;
        // let animation = this.AnswerAnim.node.getComponent(Animation);
        // animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play(selection: number, userIcon: SpriteFrame)
    {
        if(userIcon != null)
            this.UserIcon.spriteFrame = userIcon;

        if(this.AnswerAnim && !this.AnswerAnim.node.active )
        {
            this.node.setPosition(this.displayPos[selection]);
            this.AnswerAnim.node.active = true;
            this.AnswerAnim.play();
        }
    }       

    update(deltaTime: number) {

    }

    public AnimationReset()
    {
        this.AnswerAnim.node.active = false;
    }

    public onTriggered(arg: number)
    {

    }
}

