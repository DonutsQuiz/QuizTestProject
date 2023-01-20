import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RetryModal')
export class RetryModal extends Component {

    @property(Node)
    private self : Node = null;
    @property(Button)
    private cancelBurron : Button = null;
    @property(Button)
    private retryButton : Button = null;

    private isRetry : boolean = false;
    private isDecide : boolean = false;

    start() {
        this.cancelBurron.node.on(Button.EventType.CLICK, function(){this.isDecide = true; this.isRetry = false; this.self.active = false;}, this);
        this.retryButton.node.on(Button.EventType.CLICK, function(){this.isDecide = true; this.isRetry = true; this.self.active = false;}, this);
    }

    public SetActive(){
        this.self.active = true;
    }

    public GetIsRetry() : boolean{
        return this.isRetry;
    }

    public GetIsDecide() : boolean{
        return this.isDecide;
    }

    public Reset(){
        this.isRetry = false;
        this.isDecide = false;
    }
}

