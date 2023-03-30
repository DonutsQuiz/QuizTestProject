import { _decorator, Component, Node, UIOpacity, UITransform, Vec3, lerp, Button } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('StatusModal')
export class StatusModal extends Component {

    @property(Node)
    private pointList : Array<Node> = new Array<Node>();
    @property(Node)
    private player: Node = null
    @property(UITransform)
    private content : UITransform = null;
    @property(Button)
    private onemoreButton : Button = null;
    @property(Button)
    private debugJumpButton : Button = null;

    private JUMP_ANIME_TIME = 2;
    private jumpAnimationTime = -1;
    private CONTENT : number = 0;

    public Constructor(){
        this.debugJumpButton.node.on(Button.EventType.CLICK, this.ClickDebugJump, this);
        this.onemoreButton.node.on(Button.EventType.CLICK, function(){
            QuizModalManager.Instance().ChangeModal('Genre');
            GameManager.Instance().SetParticipantActive(true);},
            this);
    }

    OnUpdate(deltaTime : number){
        if(this.jumpAnimationTime >= 0){
            this.jumpAnimationTime -= deltaTime;
            let timerate = 1 - (this.jumpAnimationTime / this.JUMP_ANIME_TIME);
            this.player.position = this.pointList[GameManager.Instance().GetGameInfo().status].position.lerp(this.pointList[GameManager.Instance().GetGameInfo().status + 1].position, timerate);
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


    start() {
        this.Constructor();
    }

    update(deltaTime: number) {
        this.OnUpdate(deltaTime);
    }
}

