import { _decorator, Component, Node, Button, labelAssembler, Label, math } from 'cc';
import { GameManager } from '../Game/Manager/GameManager';
import { QuizModalManager } from '../Game/Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('DebugScript')
export class DebugScript extends Component {

    @property(Button)
    private actionButton : Button = null;
    @property(Label)
    private actionLabel : Label = null;


    private USER_MAX : number = 20;
    private actionCount : number = 0; //何階目のアクションか

    

    start() {
        this.actionButton.node.on(Button.EventType.CLICK, this.ClickActionButton, this);

        this.actionLabel.string = "参加";
    }

    update(deltaTime: number) {


    }

    private ClickActionButton(){
        if(this.actionCount === 0){
            for(var i = 0; i < this.USER_MAX; i++){
                var choice = Math.floor(Math.random() * 3);
                GameManager.Instance().GetApiConnect().registerGuest(
                    GameManager.Instance().GetGameInfo().userId + i + 1,
                    GameManager.Instance().GetGameInfo().token,
                    GameManager.Instance().GetGameInfo().gameId,
                    GameManager.Instance().GetGameInfo().hostId,
                );
            }
            this.actionLabel.string = "回答";
            this.actionCount++;
        }
        if(this.actionCount === 1 && QuizModalManager.Instance().GetNowType() === "Choices"){
            for(var i = 0; i < this.USER_MAX; i++){
                var choice = Math.floor(Math.random() * 3) + 1;
                GameManager.Instance().GetApiConnect().guestAnswer(
                    GameManager.Instance().GetGameInfo().userId + i + 1,
                    GameManager.Instance().GetGameInfo().token,
                    GameManager.Instance().GetGameInfo().gameId,
                    GameManager.Instance().GetGameInfo().hostId,
                    GameManager.Instance().GetGameInfo().order,
                    choice
                )
            }
        }
    }
}

