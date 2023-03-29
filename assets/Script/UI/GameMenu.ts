import { _decorator, Component, Node, Button } from 'cc';
import { GameManager } from '../Game/Manager/GameManager';
import { QuizModalManager } from '../Game/Manager/QuizModalManager';
import { Ranking } from './Ranking';
const { ccclass, property } = _decorator;

@ccclass('GameMenu')
export class GameMenu extends Component {

    @property(Button)
    private helpButton : Button = null;
    @property(Button)
    private rankButton : Button = null;
    @property(Button)
    private statusButton : Button = null;
    @property(Button)
    private exitButton : Button = null;

    public Constructor(){
        this.rankButton.node.on(Button.EventType.CLICK, this.ClickRankButton, this);
        this.statusButton.node.on(Button.EventType.CLICK, this.ClickStatusButton, this);
        this.exitButton.node.on(Button.EventType.CLICK, this.ClickExitButton, this);
    }

    private ClickStatusButton(){
        QuizModalManager.Instance().GetGenreModal().SetConfirm(true);
        QuizModalManager.Instance().GetGenreModal().SetModalType(QuizModalManager.Instance().GetNowType());
        QuizModalManager.Instance().ChangeModal('StatusUp');
    }

    private ClickRankButton(){
        QuizModalManager.Instance().GetRankingModal().SetModalType(QuizModalManager.Instance().GetNowType());
        QuizModalManager.Instance().ChangeModal('Ranking');
        GameManager.Instance().SetParticipantActive(false);
    }

    private ClickExitButton(){
        GameManager.Instance().GetExitModal().active = true;
    }

    public DisplayButton(dis : boolean){
        this.helpButton.node.active = dis;
        this.rankButton.node.active = dis;
        this.statusButton.node.active = dis;
        this.exitButton.node.active = dis;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

