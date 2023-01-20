import { _decorator, Component, Node, Animation , Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScrollAnim')
export class ScrollAnim extends Component {

    @property({type: Animation})
    scrollAnim: Array<Animation> = new Array<Animation>();

    frameTotalNum: number = 5;
    frameNum: number = 4;

    start() {
        this.scrollAnim[0].node.active = false
        for(let i = 0; i < this.frameTotalNum; i++)
        {
            this.scrollAnim[i].node.active = false
            let animation = this.scrollAnim[i].node.getComponent(Animation);
            animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
        }
        this.Play();
    }

    public Play()
    {
        if(this.scrollAnim[this.frameNum])
        {
            this.scrollAnim[this.frameNum].node.active = true
            this.scrollAnim[this.frameNum].play('scrollUser' + (this.frameNum + 1).toString());
        }
    }       

    update(deltaTime: number) {

    }

    public async onTriggered(arg: number)
    {
        this.frameNum -= 1;

        if(this.frameNum == 0){
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        else{
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        this.Play();
        // console.log("triggered!!");
    }
}
