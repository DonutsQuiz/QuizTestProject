import { _decorator, Component, Node, Animation, EventMouse, input, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChipControll')
export class ChipControll extends Component {

    @property({type: Animation})
    public ChipAnim: Animation|null = null;

    start() {
    }

    public Play()
    {
        if(this.ChipAnim)
        {
            this.ChipAnim.play('BetChip');
        }
    }       

    update(deltaTime: number) {

    }
}

