import { _decorator, Component, Node, Slider, Button, Label, labelAssembler, convertUtils, math, isUnicodeCJK } from 'cc';
import { GameManager } from '../Manager/GameManager';

const { ccclass, property } = _decorator;

@ccclass('BetModal')
export class BetModal extends Component {

    @property(Node)
    private self : Node = null;
    @property(Slider)
    private betSlider : Slider = null;
    @property(Button)
    private betButtonList : Array<Button> = new Array<Button>();
    @property(Button)
    private decideButton : Button = null;
    @property(Label)
    private valueLabel : Label = null;
    @property(Button)
    private closeButton : Button = null;


    private coins : number = 20000; // 所持コイン
    private betValue : number = 0;
    private criteriaPoint : number = 0;
    private sliderMax : number = 0;
    private isDecide : boolean = false;

    private isPushedDecideButton : boolean = false;

    start() {
        this.coins = GameManager.Instance().GetPlayerInfo().coins;
        this.sliderMax = this.coins / 10;
        this.criteriaPoint = 1.0 / (this.coins / 10);
        this.decideButton.node.on(Button.EventType.CLICK, 
            function(){
            this.self.active = false; 
            this.setIsPushedDecideButton();
            this.CheckIsDecide();
        }, this);
        this.closeButton.node.on(Button.EventType.CLICK, function(){this.self.active = false;}, this);
        this.betButtonList[0].node.on(Button.EventType.CLICK, function(){this.betSlider.progress += this.criteriaPoint;}, this);
        this.betButtonList[1].node.on(Button.EventType.CLICK, function(){this.betSlider.progress += this.criteriaPoint * 10;}, this);
        this.betButtonList[2].node.on(Button.EventType.CLICK, function(){this.betSlider.progress += this.criteriaPoint * 100;}, this);
        this.betButtonList[3].node.on(Button.EventType.CLICK, function(){this.betSlider.progress  = 1.0;}, this);
    }

    update(deltaTime: number) {
        this.BetSlider();
    }

    private BetSlider(){
        if(this.betSlider.progress >= 1.0){
            this.betSlider.progress = 1.0;
        }
        this.betValue = Math.round(this.sliderMax * this.betSlider.progress) * 10;
        this.valueLabel.string = this.betValue.toString();
    }

    private setIsPushedDecideButton()
    {
        this.isPushedDecideButton = true;
    }

    public getIsPushedDecideButton()
    {
        let isPushed = this.isPushedDecideButton;
        if(this.isPushedDecideButton) this.isPushedDecideButton = false;
        return isPushed;
    }

    public SetIsDecide(dec : boolean){
        this.isDecide = dec;
    }

    public GetIsDecide() :boolean {
        return this.isDecide;
    }

    private CheckIsDecide(){
        if(this.betValue <= 0){
            this.isDecide = false;
        }
        else{
            this.isDecide = true;
        }
    }
}

