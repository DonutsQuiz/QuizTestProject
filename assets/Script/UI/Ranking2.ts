import { _decorator, Component, Node, UITransform, Vec3, ButtonComponent, math } from 'cc';
import { TitleModal } from '../Game/Modal/TitleModal';
import { ListenerNode } from './ListenerNode';
const { ccclass, property } = _decorator;

@ccclass('Ranking2')
export class Ranking2 extends Component {

    @property(UITransform)
    private contentTransform : UITransform = null;
    @property(ListenerNode)
    private listenerNodeList : Array<ListenerNode> = new Array<ListenerNode>();

    private maxCount : number = 10; //ランキングの最大数
    private topNode : number = 0; //表示してるランキングの番号
    private topIndex : number = 0; //一番上のノードのインデックス

    private NODE_SIZE : number = 50; //ランキング一個の大きさ(縦)
    private NODE_MAX : number = 4;
    private TRANS_POS : number = 42;
    private VIEW_HEIGHT : number = 150;

    public OnUpdate(){
        // コンテントのyとトップのノードのyを比べて移動する
        // 42位でちょうど消える
        // コンテントのY座標が42+50*topNodeを超えたら移動する(?)
        // 下にスクロールするとき
        let buttomNode : number = this.topNode + 3;
        let buttomIndex : number = (this.topIndex + 3) % this.NODE_MAX;
        if(this.contentTransform.node.position.y > this.TRANS_POS + this.NODE_SIZE * this.topNode && 
           this.contentTransform.node.position.y < this.contentTransform.height - this.NODE_SIZE * this.NODE_MAX){
            this.listenerNodeList[this.topIndex].node.position = new Vec3(0, this.listenerNodeList[this.topIndex].node.position.y - this.NODE_SIZE * this.NODE_MAX, 0);
            this.listenerNodeList[this.topIndex].SetAchieve(this.topNode + this.NODE_MAX + 1);
            this.topIndex = (this.topIndex + 1) % this.NODE_MAX;
            this.topNode++;
        }
        // 上にスクロールするとき
        if(this.contentTransform.node.position.y < this.TRANS_POS + this.NODE_SIZE * (this.topNode - 1) && 
           this.contentTransform.node.position.y > 0){
            this.listenerNodeList[buttomIndex].node.position = new Vec3(0, this.listenerNodeList[buttomIndex].node.position.y + this.NODE_SIZE * this.NODE_MAX, 0);
            this.listenerNodeList[buttomIndex].SetAchieve(buttomNode - this.NODE_MAX + 1);
            this.topIndex = (this.topIndex + this.NODE_MAX - 1) % this.NODE_MAX;
            this.topNode--;
        }

        // 飛んだときの処理を入れる
        var temp = (this.contentTransform.node.position.y - this.TRANS_POS) / this.NODE_SIZE + 1;
        if(temp < 0) temp = 0;
        temp = Math.floor(temp);
        if(this.topNode != temp){
            const awayIndex = temp - this.topNode;
            if(awayIndex > 0){        //下スクロール
                for(var i = 0; i < awayIndex; i++){
                    if(this.topNode > 5) break;
                    this.listenerNodeList[this.topIndex].node.position = new Vec3(0, this.listenerNodeList[this.topIndex].node.position.y - this.NODE_SIZE * this.NODE_MAX, 0);
                    this.listenerNodeList[this.topIndex].SetAchieve(this.topNode + this.NODE_MAX + 1);
                    this.topIndex = (this.topIndex + 1) % this.NODE_MAX;
                    this.topNode++;
                }
            }
            else if(awayIndex < 0){    // 上スクロール
                for(var i = 0; i < Math.abs(awayIndex); i++){
                    // if(this.topNode < 3) break;
                    buttomIndex = (this.topIndex + 3) % this.NODE_MAX;
                    buttomNode = this.topNode + 3;
                    this.listenerNodeList[buttomIndex].node.position = new Vec3(0, this.listenerNodeList[buttomIndex].node.position.y + this.NODE_SIZE * this.NODE_MAX, 0);
                    this.listenerNodeList[buttomIndex].SetAchieve(buttomNode - this.NODE_MAX + 1);
                    this.topIndex = (this.topIndex + this.NODE_MAX - 1) % this.NODE_MAX;
                    this.topNode--;
                }
            }
        }

    }

    public Generate(){
        this.contentTransform.height = this.NODE_SIZE * this.maxCount;

        // 4以下だったら非表示
        if(this.maxCount < 4){
            for(var i = this.maxCount; i < this.NODE_MAX; i++){
                this.listenerNodeList[i].node.active = false;
            }
        }
        else{
            for(var i = 0; i < this.NODE_MAX; i++){
                this.listenerNodeList[i].node.active = true;
            }
        }

        this.topNode = 0
        this.topIndex = 0;
    }

    public SetMaxCount(max : number){
        this.maxCount = max + 1;
    }



    start() {
        this.Generate();
    }

    update(deltaTime: number) {
        this.OnUpdate();
    }
}

