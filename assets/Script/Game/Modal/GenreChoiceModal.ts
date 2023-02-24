import { _decorator, Component, Node, Button } from 'cc';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('GenreChoiceModal')
export class GenreChoiceModal extends Component {

    @property(Node)
    private selectNode : Node = null;
    @property(Node)
    private startNode : Node = null;
    @property(Button)
    private startButton : Button = null;
    @property(Button)
    private backButton : Button = null;
    @property(Button)
    private genreButton : Array<Button> = new Array<Button>();

    @property(Node)
    private certStartNode : Node = null;

    private animationTime = 0.0;
    private isNext = false;



    public Constructor(){
        for(var i = 0; i < 6; i++){
            this.genreButton[i].node.on(Button.EventType.CLICK, this.ClickGenreButton, this);
        }

        this.startButton.node.on(Button.EventType.CLICK, this.ClickStartButton, this);
        this.backButton.node.on(Button.EventType.CLICK, this.ClickBackButton, this);
    }

    public OnUpdate(deltaTime: number){
        if(!this.isNext) return;

        if(this.animationTime > 0.0){
            this.animationTime -= deltaTime;
        }
        else{
            QuizModalManager.Instance().ChangeModal('Question');        
            this.selectNode.active = true;
            this.startNode.active = false;
            this.certStartNode.active = false;
            this.isNext = false;
        }
    }

    // ジャンルを選択
    private ClickGenreButton(){
        this.selectNode.active = false;
        this.startNode.active = true;
    }

    // 出題スタート
    private ClickStartButton(){
        this.startNode.active = false;
        this.certStartNode.active = true;
        this.isNext = true;
        this.animationTime = 3.0;
    }

    // 選択に戻る
    private ClickBackButton(){
        this.selectNode.active = true;
        this.startNode.active = false;
    }
}

