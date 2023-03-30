import { _decorator, Component, Node, UIOpacity, UITransform, Vec3, lerp, Button, Vec2, Sprite, Prefab, instantiate, getRenderArea, VerticalTextAlignment } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('StatusModal')
export class StatusModal extends Component {

    @property(Node)
    private player: Node = null
    @property(UITransform)
    private content : UITransform = null;
    @property(Button)
    private onemoreButton : Button = null;
    @property(Button)
    private debugJumpButton : Button = null;
    @property(Prefab)
    private checkPointPrefab : Prefab = null;
    @property(Node)
    private pointParentNode : Node = null;
    @property(Number)
    private generatePointNum : number = 0;
    @property(Vec2)
    private basePoint : Vec2 = null;

    private JUMP_ANIME_TIME = 2;
    private jumpAnimationTime = -1;
    private INTERVAL_HORIZON : number = 80;
    private INTERVAL_VERTICAL : number = 32;
    private CONTENT : number = 0;
    private checkPointList : Array<Node> = new Array<Node>();

    public Constructor(){
        this.debugJumpButton.node.on(Button.EventType.CLICK, this.ClickDebugJump, this);
        this.onemoreButton.node.on(Button.EventType.CLICK, function(){
            QuizModalManager.Instance().ChangeModal('Genre');
            GameManager.Instance().SetParticipantActive(true);},
            this);

        this.Generate();
    }

    OnUpdate(deltaTime : number){
        if(this.jumpAnimationTime >= 0){
            this.jumpAnimationTime -= deltaTime;
            let timerate = 1 - (this.jumpAnimationTime / this.JUMP_ANIME_TIME);
            this.player.position = this.checkPointList[GameManager.Instance().GetGameInfo().status].position.lerp(this.checkPointList[GameManager.Instance().GetGameInfo().status + 1].position, timerate);
            this.player.position = new Vec3(this.player.position.x, this.player.position.y + Math.sin(timerate * 3.14) * 50, this.player.position.z);

            // contentをズラす処理
            //this.content.node.position = new Vec3(this.content.node.position.x, this.content.node.position.y - 10 * deltaTime, this.content.node.position.z);


            if(this.jumpAnimationTime < 0){
                GameManager.Instance().GetGameInfo().status++;
            }
        }
        else{
            this.jumpAnimationTime = -1;
        }
    }

    private ClickDebugJump(){
        this.jumpAnimationTime = this.JUMP_ANIME_TIME;
    }

    public Generate(){
        if(this.checkPointList.length < this.generatePointNum){
            for(var i = this.checkPointList.length; i < this.generatePointNum; i++){

                var temp = instantiate(this.checkPointPrefab);
                temp.setParent(this.pointParentNode);
                let tempx  : number = 0;
                if(i % 4 === 0){
                    tempx = this.basePoint.x + this.INTERVAL_HORIZON * 0;
                }
                else if(i % 2 === 1){
                    tempx = this.basePoint.x + this.INTERVAL_HORIZON * 1;
                }
                else if(i % 4 === 2){
                    tempx = this.basePoint.x + this.INTERVAL_HORIZON * 2;
                }
                temp.position = new Vec3(
                    tempx,
                    this.basePoint.y + this.INTERVAL_VERTICAL * i,
                    0);
                this.checkPointList.push(temp);
            }
        }

    }


    start() {
        this.Constructor();
    }

    update(deltaTime: number) {
        this.OnUpdate(deltaTime);
    }
}

