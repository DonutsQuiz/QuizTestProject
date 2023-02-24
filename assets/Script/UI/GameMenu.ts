import { _decorator, Component, Node, Button } from 'cc';
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
    private listButton : Button = null;
    @property(Button)
    private exitButton : Button = null;

    public Constructor(){
        this.rankButton.node.on(Button.EventType.CLICK, this.ClickRankButton, this);
        this.listButton.node.on(Button.EventType.CLICK, this.ClickListButton, this);
    }

    private ClickListButton(){
        QuizModalManager.Instance().GetGenreModal().SetConfirm(true);
        QuizModalManager.Instance().GetGenreModal().SetModalType(QuizModalManager.Instance().GetNowType());
        QuizModalManager.Instance().ChangeModal('Genre');
    }

    private ClickRankButton(){
        QuizModalManager.Instance().GetRankingModal().SetModalType(QuizModalManager.Instance().GetNowType());
        QuizModalManager.Instance().ChangeModal('Ranking');
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

