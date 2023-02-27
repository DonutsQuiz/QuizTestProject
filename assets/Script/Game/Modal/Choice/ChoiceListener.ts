import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChoiceListener')
export class ChoiceListener extends Component {

    @property(Button)
    private BackButton : Button = null;

    public Constructor(){
        this.BackButton.node.on(Button.EventType.CLICK, this.ClickBackButton, this);
    }

    private ClickBackButton(){

    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

