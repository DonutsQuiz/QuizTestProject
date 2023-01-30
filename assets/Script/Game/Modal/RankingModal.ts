import { _decorator, Component, Node, Button, labelAssembler, Label, spriteAssembler, Sprite, game } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('RankingModal')
export class RankingModal extends Component {

    @property(Button)
    nextButton : Button = null;
    @property(Label)
    nameLabelList : Array<Label> = new Array<Label>();
    @property(Label)
    pointLabelList : Array<Label> = new Array<Label>();

    private debugClientMode : ClientMode = 'Liver';


    public Constructor(){
        this.nextButton.node.on(Button.EventType.CLICK ,function(){QuizModalManager.Instance().ChangeModal('Question')});

        this.SetUI();
    }

    public OnUpdate(){

    }

    public SetUI(){
        for(var i = 0; i < 4; i++){
            this.nameLabelList[i].string  = GameManager.Instance().GetGameInfo().lastMonthRanking[i].mName;
            this.pointLabelList[i].string = GameManager.Instance().GetGameInfo().lastMonthRanking[i].mPoint.toString() + "点";
        }
    }

    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.nextButton.node.active = true;
                this.debugClientMode = 'Liver';
            }
            else if(GameManager.Instance().GetClientMode() === 'User'){
                this.nextButton.node.active = false;
                this.debugClientMode = 'User';
            }
        }
    }
}

