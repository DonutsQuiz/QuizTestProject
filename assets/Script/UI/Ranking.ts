import { _decorator, Component, Node, Prefab, Button, instantiate, Vec3, UITransform } from 'cc';
import { RankingInfo } from '../Game/Manager/GameInformation';
import { GameManager } from '../Game/Manager/GameManager';
import { ListenerNode } from './ListenerNode';
import { RankingUser } from './RankingUser';
const { ccclass, property } = _decorator;

@ccclass('Ranking')
export class Ranking extends Component {

    @property(Node)
    private contentNode : Node = null;
    @property(UITransform)
    private contentTransform : UITransform = null;
    @property(Button)
    private GenerateButton : Button = null;
    @property(Prefab)
    private rankingUser : Prefab = null;
    @property(ListenerNode)
    private firstMenber : Array<ListenerNode> = new Array<ListenerNode>();

    @property(Number)
    private rankingCount : number = 0;
    private rankingCountMax : number = 0;
    private basePositionY : number = -132.5;
    private INTERVAL : number = -50;
    // private rankingList : Array<RankingUser> = new Array<RankingUser>();
    private rankingList : Array<ListenerNode> = new Array<ListenerNode>();

    private isConfirm : boolean = false; //メニューから飛んだかどうか
    private isRanking : boolean = false;

    public Constructor(){
        // this.GenerateButton.node.on(Button.EventType.CLICK, this.Generate, this);

        for(var i = 0; i < this.firstMenber.length; i++){
            this.rankingList.push(this.firstMenber[i]);
        }

        this.rankingCountMax = this.firstMenber.length;
    }

    // start(){
    //     this.GenerateButton.node.on(Button.EventType.CLICK, this.Generate, this);

    //     for(var i = 0; i < this.firstMenber.length; i++){
    //         this.rankingList.push(this.firstMenber[i]);
    //         this.rankingCountMax = this.firstMenber.length;
    //     }
    // }

    public Generate(){
        var count : number = 0;

        // ランキングを減らす処理
        if(this.rankingCount < this.rankingCountMax){
            count = this.rankingCountMax - this.rankingCount;
            for(var i = 0; i < count; i++){
               var temp = this.rankingList.pop();
               temp.node.destroy();
            }
        }
        else{ // ランキングを増やす処理
            count = this.rankingCount - this.rankingCountMax;
            var user : Node;
            for(var i = 0; i < count; i++){
                user = instantiate(this.rankingUser);
                user.setParent(this.contentNode);
                user.position = new Vec3(0, this.basePositionY + (this.INTERVAL * (this.rankingCountMax - 2 + i)), 0);
                user.getComponent(ListenerNode).SetRankiOrList(this.isRanking);
                user.getComponent(ListenerNode).SetAchieve(i + 4);
                this.rankingList.push(user.getComponent(ListenerNode));
                this.contentTransform.height += this.INTERVAL * -1;
            }
        }

        this.rankingCountMax = this.rankingCount;
    }

    public SetRankingCount(count : number){
        this.rankingCount = count;
    }

    public GetRankignUser(index : number) : ListenerNode{
        return this.rankingList[index];
    }

    public GetLength() : number{
        return this.rankingList.length;
    } 

    public SetRankOrList(is : boolean){
        this.isRanking = is;
    }
}

