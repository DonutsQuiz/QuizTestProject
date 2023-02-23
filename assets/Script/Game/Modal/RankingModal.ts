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
    @property(Label)
    liverNameLabel : Label = null;

    private rankingMode : number = 0; //今月：０　先月：１

    private debugClientMode : ClientMode = 'Liver';


    public Constructor(){
        this.nextButton.node.on(Button.EventType.CLICK, this.ClickFunction, this);

        this.SetUI();
    }

    public OnUpdate(){
        this.DebugUpdate();
    }

    public SetUI(){
        for(var i = 0; i < 4; i++){
            this.nameLabelList[i].string  = GameManager.Instance().GetGameInfo().lastMonthRanking[i].mName;
            this.pointLabelList[i].string = GameManager.Instance().GetGameInfo().lastMonthRanking[i].mPoint.toString() + "点";
        }
        this.liverNameLabel.string = "「" + GameManager.Instance().GetGameInfo().liverName +  "」の推し検定";
    }

    private ClickFunction(){
        if(this.rankingMode === 0){
            QuizModalManager.Instance().ChangeModal('Question');
        }
        else if(this.rankingMode === 1){
            QuizModalManager.Instance().ChangeModal('Title');
        }
    }

    public SetRankingMode(mode : number){
        this.rankingMode = mode;
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

