import { _decorator, Component, Node, Button, Label, Game } from 'cc';
import { GameInformation } from './GameInformation';
import { QuizManager } from './QuizManager';
const { ccclass, property } = _decorator;

const ClientMode = {
    Liver : 'Liver',
    User : 'User',
} as const;

export type ClientMode = typeof ClientMode[keyof typeof ClientMode];

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance : GameManager;
    
    public static Instance() : GameManager {
        if(!GameManager.instance){
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    @property(QuizManager) //クイズマネージャー
    quizManager : QuizManager = null;

    @property(Button) // ライバーとユーザーを変えるボタン
    private clientButton : Button = null;
    @property(Label) // 今ライバー側かユーザー側か
    private clientLabel : Label = null;

    private clientMode : ClientMode = 'Liver';
    private gameInformation : GameInformation = new GameInformation();

    start() {
        GameManager.instance = this;
        this.clientButton.node.on(Button.EventType.CLICK, this.ChangeClientMode, this);
        this.gameInformation.DebugInit();
    }

    update(deltaTime: number) {
        this.quizManager.OnUpdate();
    }

    // ライバーとユーザーの切り替え(デバッグ用)
    private ChangeClientMode(){
        if(this.clientMode === 'Liver'){
            this.clientMode = 'User';
            this.clientLabel.string = "ユーザー";
        }
        else if(this.clientMode === 'User'){
            this.clientMode = 'Liver';
            this.clientLabel.string = "ライバー";
        }
    }

    public GetClientMode() : ClientMode{
        return this.clientMode;
    }

    public GetGameInfo() : GameInformation{
        return this.gameInformation;
    }
}

