import { _decorator, Component, Node, Button, Label, Game } from 'cc';
import { PlayerInfomation } from '../PlayerInfomation';
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

    @property(QuizManager)
    quizManager : QuizManager = null;

    @property(Button)
    private clientButton : Button = null;
    @property(Label)
    private clientLabel : Label = null;

    private clientMode : ClientMode = 'Liver';
    private playerInfo : PlayerInfomation = new PlayerInfomation();
    private gameInformation : GameInformation = new GameInformation();

    start() {
        GameManager.instance = this;
        this.clientButton.node.on(Button.EventType.CLICK, this.ChangeClientMode, this);
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

    public GetPlayerInfo() : PlayerInfomation{
        return this.playerInfo;
    }

    public GetGameInfo() : GameInformation{
        return this.gameInformation;
    }
}

