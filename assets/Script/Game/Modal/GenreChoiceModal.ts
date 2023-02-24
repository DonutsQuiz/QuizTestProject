import { _decorator, Component, Node, Button, Label, Vec3 } from 'cc';
import { ModalType, QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('GenreChoiceModal')
export class GenreChoiceModal extends Component {

    @property(Node) //ジャンル選択ノード
    private selectNode : Node = null;
    @property(Node) //確認ノード
    private startNode : Node = null;
    @property(Node) //問題リストノード
    private quistionListNode : Node = null;
    @property(Button) //出題スタートボタン
    private startButton : Button = null;
    @property(Button) //戻る
    private backButton : Button = null;
    @property(Button)
    private genreButton : Array<Button> = new Array<Button>();
    @property(Label)
    private titleLabel : Label = null;
    @property(Node)
    private genreRootNode : Node = null;

    @property(Node)
    private certStartNode : Node = null;

    private animationTime = 0.0;
    private isNext = false;
    private isConfirm : boolean = false; //メニューから飛んだかどうか
    private modalType : ModalType = 'None';


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

    public Initialize(){
        if(this.isConfirm){
            this.backButton.node.active = true;
            this.titleLabel.string = "検定をコンプリートしよう！";
            this.genreRootNode.position = new Vec3(0, -25, 0);
        }
        else{
            this.backButton.node.active = false;
            this.titleLabel.string = "出題テーマをえらぼう";
            this.genreRootNode.position = new Vec3(0, -12, 0);
        }
    }

    // ジャンルを選択
    private ClickGenreButton(){
        if(this.isConfirm){
            this.quistionListNode.active = true;
        }
        else{
            this.startNode.active = true;
        }
        this.selectNode.active = false;
        this.backButton.node.active = true;
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
        if(this.selectNode.active){
            QuizModalManager.Instance().ChangeModal(this.modalType);
            this.isConfirm = false;
            this.modalType = 'None';
        }
        else if(this.startNode.active){
            this.selectNode.active = true;
            this.startNode.active = false;
            this.backButton.node.active = false;
        }
        else if(this.quistionListNode.active){
            this.selectNode.active = true;
            this.quistionListNode.active = false;
        }

    }

    public SetConfirm(is : boolean){
        this.isConfirm = is;
    }

    public SetModalType(type : ModalType){
        this.modalType = type;
    }
}

