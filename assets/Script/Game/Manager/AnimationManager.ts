import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { StartControll } from '../../EffectAnim/StartControll';
import { ChipControll } from '../../EffectAnim/ChipControll';
import { ResultAnimControll } from '../../EffectAnim/ResultAnimControll';
import { TimeUpAnim } from '../../EffectAnim/TimeUpAnim';
import { CountDownAnim } from '../../EffectAnim/CountDownAnim';
const { ccclass, property } = _decorator;

@ccclass('AnimationManager')
export class AnimationManager extends Component {

    private static instance : AnimationManager;
    
    public static Instance() : AnimationManager {
        if(!AnimationManager.instance){
            AnimationManager.instance = new AnimationManager();
        }

        return AnimationManager.instance;
    }

    @property(Node)
    private canvas: Node = null;

    @property(Prefab) 
    private AnimationPrefab : Prefab = null;

    public startAnim: StartControll = null;
    public betAnim: ChipControll = null;
    public resultAnim: ResultAnimControll = null;
    public timeUpAnim: TimeUpAnim = null;
    public countDownAnim: CountDownAnim = null;

    public userNode: Node = null;
    public liverNode: Node = null;
    public allNode: Node = null;

    public Constructor() {
        AnimationManager.instance = this;

        let temp = instantiate(this.AnimationPrefab);
        temp.setParent(this.canvas);
        temp.active = true;

        this.userNode = temp.getChildByName('UserSide');
        this.liverNode = temp.getChildByName('LiverSide');
        this.allNode = temp.getChildByName('AllSide');

        this.startAnim = this.allNode.getChildByName('StartAnimation').getComponent(StartControll);
        this.betAnim = this.userNode.getChildByName('BetAnimation').getComponent(ChipControll);
        this.resultAnim = this.userNode.getChildByName('ResultAnimation').getComponent(ResultAnimControll);
        this.timeUpAnim = this.allNode.getChildByName('TimeUp').getComponent(TimeUpAnim);
        this.countDownAnim = this.liverNode.getChildByName('CountDown').getComponent(CountDownAnim);
    }

    update(deltaTime: number) {
        
    }
}

