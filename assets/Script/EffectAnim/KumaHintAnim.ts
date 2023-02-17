import { _decorator, Component, Node, Label, Animation, UIOpacity, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KumaHintAnim')
export class KumaHintAnim extends Component {
    @property({type: Animation})
    public KumaHintAnim: Animation|null = null;
    @property(Node)
    private hintFrame: Node = null;
    @property(Label)
    private hintLable: Label = null;

    start() {
        this.node.active = false;
        let opacityComp = this.getComponent(UIOpacity);
        opacityComp.opacity = 0;

        this.KumaHintAnim.node.active = false
        let animation = this.KumaHintAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play()
    {
        if(!this.node.active)
        {
            this.FadeIn();
        }
        if(this.KumaHintAnim && !this.KumaHintAnim.node.active)
        {
            this.KumaHintAnim.node.active = true;
            this.KumaHintAnim.play('kumaAnim');
        }
    }   

    public Stop()
    {
        this.FadeOut();

        this.KumaHintAnim.node.active = false;
        this.KumaHintAnim.stop();
        this.hintLable.string = "";
    }

    public SetHintLabel(hlabel: string)
    {
        if(!this.KumaHintAnim.node.active)
        {
            this.hintLable.string = hlabel;
        }
    }

    public SetPos(posX : number, posY : number)
    {
        if(!this.KumaHintAnim.node.active)
        {
            this.node.setPosition(posX, posY, 0);
        }
    }

    public SetFrameSize(width : number, height : number)
    {
        if(!this.KumaHintAnim.node.active)
        {
            let transformComp = this.hintFrame.getComponent(UITransform);
            transformComp.setContentSize(width, height);
        }
    }

    public AnimationReset()
    {
        this.KumaHintAnim.node.active = false;
        this.KumaHintAnim.stop();
        this.hintLable.string = "";

        this.node.active = false;
        let opacityComp = this.getComponent(UIOpacity);
        opacityComp.opacity = 0;
    }

    private async FadeIn()
    {
        this.node.active = true;

        let opacityComp = this.getComponent(UIOpacity);

        while(opacityComp.opacity < 255)
        {
            await new Promise(resolve => setTimeout(resolve, 10));
            opacityComp.opacity = (opacityComp.opacity < 230) ? (opacityComp.opacity + 25) : 255;
        }
    }

    private async FadeOut()
    {

        let opacityComp = this.getComponent(UIOpacity);

        while(opacityComp.opacity > 0)
        {
            await new Promise(resolve => setTimeout(resolve, 1));
            opacityComp.opacity = (opacityComp.opacity > 25) ? (opacityComp.opacity - 25) : 0;
        }
        this.node.active = false;
    }

    public onTriggered(arg: number)
    {
    }
}

