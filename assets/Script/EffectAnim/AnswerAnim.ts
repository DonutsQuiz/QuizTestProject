import { _decorator, Component, Node, Animation, Vec3, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnswerAnim')
export class AnswerAnim extends Component {
    @property({type: Animation})
    private AnswerAnim: Animation|null = null;
    @property(Sprite)
    private UserIcon: Sprite = null;

    private posCenterX: number[] = [100, 100, 100]; //[-95, 95, -95, 95];
    private posCenterY: number[] = [60, 15, -30]; //[27.5, 27.5, -27.5, -27.5];

    private offsetY: number = -163;

    start() {
        this.AnswerAnim.node.active = false;
        // let animation = this.AnswerAnim.node.getComponent(Animation);
        // animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play(selection: number, userIcon: SpriteFrame)
    {
        if(userIcon != null)
            this.UserIcon.spriteFrame = userIcon;

        let pos = new Vec3(this.posCenterX[selection], this.posCenterY[selection] + this.offsetY, 0);
        if(this.AnswerAnim && !this.AnswerAnim.node.active )
        {
            this.node.setPosition(pos);
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

