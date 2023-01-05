import { _decorator, Component, Node, Button, Label, SpriteFrame, Sprite } from 'cc';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { ResultModal } from './ResultModal';
const { ccclass, property } = _decorator;

@ccclass('ChoicesModal')
export class ChoicesModal extends Component {

    @property(Button)
    buttonList : Array<Button> = new Array<Button>();
    @property(Label)
    labelList : Array<Label> = new Array<Label>();
    @property(Sprite)
    spriteList : Array<Sprite> = new Array<Sprite>();
    @property(Label)
    questionLabel : Label = null;

    choiceNumber : number = -1;

    start() {
        this.buttonList[0].node.on(Button.EventType.CLICK, function(){this.Choice(0);}, this);
        this.buttonList[1].node.on(Button.EventType.CLICK, function(){this.Choice(1);}, this);
        this.buttonList[2].node.on(Button.EventType.CLICK, function(){this.Choice(2);}, this);
        this.buttonList[3].node.on(Button.EventType.CLICK, function(){this.Choice(3);}, this);
        this.buttonList[4].node.on(Button.EventType.CLICK, function(){this.Choice(4);}, this);
        this.buttonList[5].node.on(Button.EventType.CLICK, function(){this.Choice(5);}, this);
    }

    update(deltaTime: number) {
        
    }

    // クリックした時
    private Choice(index : number) {
        this.choiceNumber = index;
        QuizModalManager.Instance().ChangeModal('Result');
        QuizModalManager.Instance().GetResultModal().SetCoinLabel("400");
    }

    // 選択肢を設定
    public SetChoices(index : number, text : string, sprite : SpriteFrame){
        this.labelList[index].string = text;
        this.spriteList[index].spriteFrame = sprite;
    }

    
    public GetChoics() : number{
        return this.choiceNumber;
    }

    public SetQuestion(sent : string){
        this.questionLabel.string = sent;
    }
}

