import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ExitModal')
export class ExitModal extends Component {

    @property(Button)
    private backButton : Button = null;
    @property(Button)
    private exitButton : Button = null;

    public Constructor(){
        this.backButton.node.on(Button.EventType.CLICK, this.ClickBackButton, this);
        this.exitButton.node.on(Button.EventType.CLICK, this.ClickExitButton, this);
    }

    private ClickBackButton(){
        this.node.active = false;
    }

    private ClickExitButton(){
        this.node.active = false;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

