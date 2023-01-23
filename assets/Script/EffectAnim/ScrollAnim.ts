import { _decorator, Component, Node, Animation , Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScrollAnim')
export class ScrollAnim extends Component {

    @property({type: Animation})
    scrollAnim: Array<Animation> = new Array<Animation>();

    private frameTotalNum: number = 5;
    private frameNum: number = 4;

    start() {
        this.Reset();
        for(let i = 0; i < this.frameTotalNum; i++)
        {
            let animation = this.scrollAnim[i].node.getComponent(Animation);
            animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
        }
    }

    public Play()
    {
        // console.log("scroll");
        if(this.frameNum == this.frameTotalNum - 1)
        {
            this._Play();
        }
    }  
    
    private _Play()
    {
        // console.log("_scroll");

        if(this.scrollAnim[this.frameNum])
        {
            this.scrollAnim[this.frameNum].node.active = true
            this.scrollAnim[this.frameNum].play('scrollUser' + (this.frameNum + 1).toString());
        }

        this.frameNum--;
    }

    public Reset()
    {
        this.frameNum = this.frameTotalNum - 1;
        for(let i = 0; i < this.frameTotalNum; i++)
        {
            this.scrollAnim[i].node.active = false

            let posY = this.scrollAnim[i].node.position.y;
            this.scrollAnim[i].node.setPosition(-500, posY, 0);
        }
    }

    update(deltaTime: number) {

    }

    public async onTriggered(arg: number)
    {
        // console.log("trigger");

        if(this.frameNum == 0){
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        else{
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        this._Play();
        // console.log("triggered!!");
    }
}
