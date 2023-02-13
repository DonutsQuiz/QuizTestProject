import { _decorator, Component, Node, Prefab, Button, instantiate, Vec3, UITransform } from 'cc';
import { RankingInfo } from '../Game/Manager/GameInformation';
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
    @property(RankingUser)
    private firstMenber : Array<RankingUser> = new Array<RankingUser>();

    @property(Number)
    private rankingCount : number = 0;
    private rankingCountMax : number = 0;
    private basePositionY : number = -217;
    private INTERVAL : number = -26;
    private rankingList : Array<RankingUser> = new Array<RankingUser>();

    public Constructor(){
        this.GenerateButton.node.on(Button.EventType.CLICK, this.Generate, this);

        for(var i = 0; i < this.firstMenber.length; i++){
            this.rankingList.push(this.firstMenber[i]);
            this.rankingCountMax = this.firstMenber.length;
        }
    }

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
                user.position = new Vec3(0, this.basePositionY + (this.INTERVAL * (this.rankingCountMax - 5 + i + 1)), 0);
                this.rankingList.push(user.getComponent(RankingUser));
                this.contentTransform.height += this.INTERVAL * -1;
            }
        }

        this.rankingCountMax = this.rankingCount;
    }

    public SetRankingCount(count : number){
        this.rankingCount = count;
    }

    public GetRankignUser(index : number) : RankingUser{
        return this.rankingList[index];
    }

    public GetLength() : number{
        return this.rankingList.length;
    } 
}

