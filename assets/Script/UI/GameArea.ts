import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameArea')
export class GameArea extends Component {

    @property(UITransform)
    private areaTransform : UITransform = null;


    public Constructor(){
        this.areaTransform.width = screen.width;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

