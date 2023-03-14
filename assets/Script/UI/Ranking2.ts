import { _decorator, Component, Node, UITransform } from 'cc';
import { ListenerNode } from './ListenerNode';
const { ccclass, property } = _decorator;

@ccclass('Ranking2')
export class Ranking2 extends Component {

    @property(UITransform)
    private contentTransform : UITransform = null;
    @property(ListenerNode)
    private listenerNodeList : Array<ListenerNode> = new Array<ListenerNode>();

    private nowCount = 4; //ランキングの初期個数
    private maxCount = 5; //ランキングの最大数
    private topNode = 0; //表示してるランキングの番号
    private topIndex = 0; //一番上のノードのインデックス
    private NODE_SIZE = 50; //ランキング一個の大きさ(縦)

    public OnUpdate(){
        // コンテントのyとトップのノードのyを比べて移動する
        // 42位でちょうど消える
        // コンテントのY座標が42+50*topNodeを超えたら移動する(?)
        // if()
    }

    public Generate(){
        this.contentTransform.height = this.NODE_SIZE * this.maxCount;
    }

    public SetMaxCount(max : number){
        this.maxCount = max;
    }



    start() {
        this.Generate();
    }

    update(deltaTime: number) {
        
    }
}

