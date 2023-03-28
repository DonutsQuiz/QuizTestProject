import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BlessingAnim')
export class BlessingAnim extends Component {
    @property(Animation)
    private BlessingAnim: Animation[] = [];

    start() {
        for(let i = 0; i < this.BlessingAnim.length; ++i){
            this.BlessingAnim[i].node.active = false;
            this.BlessingAnim[i].on(Animation.EventType.FINISHED, ()=>{this.onTriggered(i)}, this);
        }
    }

    public Play(){
        for(let i = 0; i < this.BlessingAnim.length; ++i){
            var animState = this.BlessingAnim[i].getState('BlessingAnim');
            if(!animState.isPlaying)
            {
                var random = Math.random();
                if(random < 0.3)
                {
                    this.BlessingAnim[i].node.active = true;
                    this.BlessingAnim[i].play();
                }
            }
        }
    }

    public Reset(){
        for(let i = 0; i < this.BlessingAnim.length; ++i){
            this.BlessingAnim[i].stop();
            this.BlessingAnim[i].node.active = false;
        }
    }

    update(deltaTime: number) {

    }

    private onTriggered(arg: number)
    {
        this.BlessingAnim[arg].node.active = false;
    }
}

