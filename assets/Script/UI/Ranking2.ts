import { _decorator, Component, Node, UITransform, Vec3, ButtonComponent, math, SpriteFrame, spriteAssembler, Sprite, tiledLayerAssembler, Label } from 'cc';
import { FixReslutRankingData, RankingData } from '../Game/Manager/GameInformation';
import { ListenerNode } from './ListenerNode';
const { ccclass, property } = _decorator;

@ccclass('Ranking2')
export class Ranking2 extends Component {

    @property(UITransform)
    private contentTransform : UITransform = null;
    @property(ListenerNode)
    private listenerNodeList : Array<ListenerNode> = new Array<ListenerNode>();
    @property(SpriteFrame)
    private achiveSprite : Array<SpriteFrame> = new Array<SpriteFrame>();
    @property(Sprite)
    private crownSprite : Sprite = null;
    @property(Label)
    private zeroLabel : Label = null;

    private maxCount : number = 500; //ランキングの最大数
    private topNode : number = 0; //表示してるランキングの番号
    private topIndex : number = 0; //一番上のノードのインデックス

    private NODE_SIZE : number = 50; //ランキング一個の大きさ(縦)
    private NODE_MAX : number = 5;
    private TRANS_POS : number = 42;
    
    private rankOrList : number = 0;  //0:ランキング　1:リスト
    private isResult : boolean = false;

    private rankingList : Array<RankingData> = new Array<RankingData>();
    private resultRankingList : Array<FixReslutRankingData> = new Array<FixReslutRankingData>();

    public OnUpdate(){
        let buttomNode : number = this.topNode + 3;
        let buttomIndex : number = (this.topIndex + 3) % this.NODE_MAX;
        let achiveNumber : number = -1;

        // スクロール処理
        var temp = (this.contentTransform.node.position.y - this.TRANS_POS) / this.NODE_SIZE + 1;
        if(temp < 0) temp = 0;
        temp = Math.floor(temp);
        if(this.topNode != temp){
            const awayIndex = temp - this.topNode;
            if(awayIndex > 0){        //下スクロール
                for(var i = 0; i < awayIndex; i++){
                    if(this.topNode > this.maxCount - this.NODE_MAX - 1) break;
                    this.listenerNodeList[this.topIndex].node.position = new Vec3(0, this.listenerNodeList[this.topIndex].node.position.y - this.NODE_SIZE * this.NODE_MAX, 0);
                    this.SetInformation(this.topIndex, this.topNode + this.NODE_MAX + 1);
                    this.topIndex = (this.topIndex + 1) % this.NODE_MAX;
                    this.topNode++;
                }
            }
            else if(awayIndex < 0){    // 上スクロール
                for(var i = 0; i < Math.abs(awayIndex); i++){
                    buttomIndex = (this.topIndex + this.NODE_MAX - 1) % this.NODE_MAX;
                    buttomNode = this.topNode + this.NODE_MAX - 1;
                    this.listenerNodeList[buttomIndex].node.position = new Vec3(0, this.listenerNodeList[buttomIndex].node.position.y + this.NODE_SIZE * this.NODE_MAX, 0);
                    this.SetInformation(buttomIndex, buttomNode - this.NODE_MAX + 1);
                    this.topIndex = (this.topIndex + this.NODE_MAX - 1) % this.NODE_MAX;
                    this.topNode--;
                }
            }
        }

        // 王冠(学帽)の追尾処理
        if(this.topNode === 0 && this.maxCount > 0){
            this.crownSprite.node.active = true;
            if(this.rankOrList === 0){
                this.crownSprite.node.position = new Vec3(-100, this.listenerNodeList[this.topIndex].node.position.y + 17.5, 0);
            }
            else if(this.rankOrList === 1){
                this.crownSprite.node.position = new Vec3(-140, this.listenerNodeList[this.topIndex].node.position.y + 17.5, 0);
            }
        }
        else{
            this.crownSprite.node.active = false;
        }
    }

    public Generate(){

        this.contentTransform.height = this.NODE_SIZE * this.maxCount;

        // 4以下だったら非表示
        if(this.maxCount < 4){
            for(var i = this.maxCount; i < this.NODE_MAX; i++){
                this.listenerNodeList[i].node.active = false;
            }

            // 0人だったら
            if(this.maxCount === 0){
                this.zeroLabel.node.active = true;

            }

            // 表示する分の情報をセット
            for(var n = 0; n < this.maxCount; n++){
                this.listenerNodeList[n].node.active = true;
                // ランキングかリストか
                this.listenerNodeList[n].SetRankiOrList(this.rankOrList);
                if(this.isResult){
                    this.listenerNodeList[this.topIndex].SetScore(this.resultRankingList[n].Score);
                    this.listenerNodeList[this.topIndex].SetCombo(this.resultRankingList[n].ComboCount); //連続正解
                }
                else{
                    this.listenerNodeList[this.topIndex].SetScore(this.rankingList[n].Score);
                }

                // アチーブの画像
                if(this.rankOrList === 0){
                    this.listenerNodeList[this.topIndex].SetAchieve(n + 1, this.achiveSprite[n]);
                }
                else{
                    this.listenerNodeList[this.topIndex].SetAchieve(n + 1, null);
                }
            }
        }
        else{
            for(var i = 0; i < this.NODE_MAX; i++){
                this.listenerNodeList[i].node.active = true;
                // ランキングかリストか
                this.listenerNodeList[i].SetRankiOrList(this.rankOrList);
                if(this.isResult){
                    this.listenerNodeList[this.topIndex].SetScore(this.resultRankingList[i].Score);
                    this.listenerNodeList[this.topIndex].SetCombo(this.resultRankingList[i].ComboCount);
                }
                else{
                    this.listenerNodeList[this.topIndex].SetScore(this.rankingList[i].Score);
                }

                // アチーブの画像
                if(this.rankOrList === 0){
                    this.listenerNodeList[this.topIndex].SetAchieve(i + 1, this.achiveSprite[i]);
                }
                else{
                    this.listenerNodeList[this.topIndex].SetAchieve(i + 1, null);
                }
            }
        }

        this.topNode = 0
        this.topIndex = 0;
    }

    private SetInformation(index:number, achive:number){

        // ランキングかリストか
        this.listenerNodeList[this.topIndex].SetRankiOrList(this.rankOrList);

        if(this.isResult){
            if(achive < 4 && this.rankOrList === 0){
                this.listenerNodeList[index].SetAchieve(achive, this.achiveSprite[achive - 1]);
            }
            else{
                this.listenerNodeList[index].SetAchieve(achive, null);
            }
            // this.listenerNodeList[this.topIndex].SetScore(this.resultRankingList[index].Score);
        }
        else{
            if(achive < 4 && this.rankOrList === 0){
                this.listenerNodeList[index].SetAchieve(achive, this.achiveSprite[achive - 1]);
            }
            else{
                this.listenerNodeList[index].SetAchieve(achive, null);
            }
            // this.listenerNodeList[this.topIndex].SetScore(this.rankingList[index].Score);
        }
    }

    public SetMaxCount(max : number){
        this.maxCount = max;
    }

    public SetRankingList(list:Array<RankingData>){
        this.rankingList = list;
    }

    public SetResultRankingList(list:Array<FixReslutRankingData>){
        this.resultRankingList = list;
    }
    public SetIsResult(is:boolean){
        this.isResult = is;
    }


    public SetRankOrList(or : number){
        this.rankOrList = or;
    } 



    start() {
        this.Generate();
    }

    update(deltaTime: number) {
        this.OnUpdate();
    }
}

