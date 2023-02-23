import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TimeUpModal')
export class TimeUpModal extends Component {

    @property(Button)
    private closeupButton : Button = null;
    @property(Button)
    private closeButton : Button = null;

    private isCloseUp : boolean = false;
    private isDecide : boolean = false;

    public Constructor(){
        this.closeupButton.node.on(Button.EventType.CLICK, function(){this.node.active = false; this.isDecide = true; this.isCloseUp = true;}, this);
        this.closeButton.node.on(Button.EventType.CLICK, function(){this.node.active = false; this.isDecide = true; this.isCloseUp = false;}, this);
    }

    public SetIsActive(is : boolean){
        this.node.active = is;
    }

    public SetIsDecide(is : boolean){
        this.isDecide = is;
    }

    public GetIsActive() : boolean{
        return this.node.active;
    }

    public GetIsCloseUp() : boolean{
        return this.isCloseUp;
    }

    public GetIsDecise() : boolean{
        return this.isDecide;
    }
}

