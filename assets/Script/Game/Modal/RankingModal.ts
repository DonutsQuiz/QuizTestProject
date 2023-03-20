import { _decorator, Component, Node, Button, labelAssembler, Label, spriteAssembler, Sprite, game, UITransform, Vec3 } from 'cc';
import { Ranking } from '../../UI/Ranking';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { ModalType, QuizModalManager } from '../Manager/QuizModalManager';
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
    @property(Button)
    private backButton : Button = null;
    @property(Node)
    private underbarTransform : Node = null;
    @property(Button)
    private nowRankButton : Button = null;
    @property(Button)
    private monthRankButton : Button = null;
    @property(Ranking)
    private ranking : Ranking = null;

    private rankingMode : number = 0; //今月：０　先月：１

    private modalType : ModalType = 'None';

    private debugClientMode : ClientMode = 'Liver';


    public Constructor(){
        this.nextButton.node.on(Button.EventType.CLICK, this.ClickFunction, this);
        this.backButton.node.on(Button.EventType.CLICK, this.ClickBackButton, this);
        this.nowRankButton.node.on(Button.EventType.CLICK, function(){this.ClickSwitchingButton(0);}, this);
        this.monthRankButton.node.on(Button.EventType.CLICK, function(){this.ClickSwitchingButton(1);}, this);

        this.ranking.Constructor();
        this.ranking.SetRankOrList(true);
        // this.ranking.SetRankingCount()
        this.ranking.Generate();

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

        this.ranking.SetRankingCount(GameManager.Instance().GetGameInfo().todayRankingList.length);
        this.ranking.Generate();
    }

    private ClickFunction(){
        if(this.rankingMode === 0){
            QuizModalManager.Instance().ChangeModal('Question');
        }
        else if(this.rankingMode === 1){
            QuizModalManager.Instance().ChangeModal('Title');
        }
    }
    private ClickBackButton(){
        QuizModalManager.Instance().ChangeModal(this.modalType);
        GameManager.Instance().SetParticipantActive(true);
        this.modalType = 'None';
    }
    private ClickSwitchingButton(mode : number){
        if(mode === 0){ //今回のランキング
            this.underbarTransform.position = new Vec3(this.nowRankButton.node.position.x, this.nowRankButton.node.position.y - 15.0, this.nowRankButton.node.position.z);
        }
        else if(mode === 1){ //今月のランキング
            this.underbarTransform.position = new Vec3(this.monthRankButton.node.position.x, this.monthRankButton.node.position.y - 15.0, this.monthRankButton.node.position.z);
        }
    }


    public SetRankingMode(mode : number){
        this.rankingMode = mode;
    }
    public SetModalType(type : ModalType){
        this.modalType = type;
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

