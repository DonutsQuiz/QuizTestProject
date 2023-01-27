import { _decorator, Component, Node, Button } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('RuleModal')
export class RuleModal extends Component {

    @property(Button)
    private rankButton : Button = null;

    private debugClientMode : ClientMode = 'Liver';

    public Constructor(){
this.rankButton.node.on(Button.EventType.CLICK, function(){QuizModalManager.Instance().ChangeModal('Ranking')});
    }

    public OnUpdate(deltaTime: number){
        this.DebugUpdate();
    }

    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.rankButton.node.active = true;
                this.debugClientMode = 'Liver';
            }
            else if(GameManager.Instance().GetClientMode() === 'User'){
                this.rankButton.node.active = false;
                this.debugClientMode = 'User';
            }
        }
    }
}

