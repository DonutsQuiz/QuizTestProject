import { _decorator, Component } from 'cc';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass} = _decorator;

@ccclass('TitleModal')
export class TitleModal extends Component {

    private MODAL_CHANGE_TIME :number = 4.0; // 次のモーダルに移行するまでの時間(定数)
    private modalChangeTime :number = 4.0;  // 次のモーダルに移行するまでの時間(変数)

    
    public Constructor(){
        this.modalChangeTime = this.MODAL_CHANGE_TIME;
    }

    public OnUpdate(deltaTime: number){
        if(this.modalChangeTime > 0.0){
            this.modalChangeTime -= deltaTime;
        }
        else{
            QuizModalManager.Instance().ChangeModal('Rule');
            this.modalChangeTime = this.MODAL_CHANGE_TIME;
        }
    }
}

