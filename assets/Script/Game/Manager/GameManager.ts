import { _decorator, Component, Node, Button, Label, Game } from 'cc';
import { QuizManager } from './QuizManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance : GameManager;
    
    public static Instance() : GameManager {
        if(!GameManager.instance){
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    @property(QuizManager)
    quizManager : QuizManager = null;

    @property(Button)
    private clientButton : Button = null;
    @property(Label)
    private clientLabel : Label = null;

    private clientMode : number = 0;

    start() {
        GameManager.instance = this;
        this.clientButton.node.on(Button.EventType.CLICK, this.ChangeClientMode, this);
    }

    update(deltaTime: number) {
        this.quizManager.OnUpdate();
    }

    // ライバーとユーザーの切り替え(デバッグ用)
    private ChangeClientMode(){
        if(this.clientMode === 0){
            this.clientMode = 1;
            this.clientLabel.string = "ユーザー";
        }
        else if(this.clientMode === 1){
            this.clientMode = 0;
            this.clientLabel.string = "ライバー";
        }
    }

    public GetClientMode() : number{
        return this.clientMode;
    }
}

