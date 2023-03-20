import { _decorator, Component, Node, Button, Label, Vec3, SpriteFrame, spriteAssembler, Sprite, ConstantForce } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
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
    @property(SpriteFrame)
    private genreIconSpriteList : Array<SpriteFrame> = new Array<SpriteFrame>();
    @property(Label)
    private titleLabel : Label = null;
    @property(Node)
    private genreRootNode : Node = null;

    //スタート
    @property(Sprite)
    private genreIconSprite : Sprite = null;
    @property(Label)
    private genreLabel : Label = null;
    //リスト
    @property(Sprite)
    private listGenreIconSprite : Sprite = null;
    @property(Label)
    private listGenreLabel : Label = null;

    @property(Node)
    private certStartNode : Node = null;

    private genreName : string[] = ["日常生活", "スポーツ", "ゲーム", "料理", "仕事", "価値観"];

    private animationTime = 0.0;
    private isNext = false;
    private isConfirm : boolean = false; //メニューから飛んだかどうか
    private modalType : ModalType = 'None';


    public Constructor(){
        this.genreButton[0].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(1)}, this);
        this.genreButton[1].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(2)}, this);
        this.genreButton[2].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(3)}, this);
        this.genreButton[3].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(4)}, this);
        this.genreButton[4].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(5)}, this);
        this.genreButton[5].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(6)}, this);

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
            GameManager.Instance().SetParticipantActive(false);
        }
        else{
            this.backButton.node.active = false;
            this.titleLabel.string = "出題テーマをえらぼう";
            this.genreRootNode.position = new Vec3(0, -12, 0);
        }
    }

    // ジャンルを選択
    private ClickGenreButton(gen : number){
        if(this.isConfirm){ //メニューから飛んだ場合
            this.quistionListNode.active = true;
            this.listGenreIconSprite.spriteFrame = this.genreIconSpriteList[gen];
            this.listGenreLabel.string = this.genreName[gen];
        }
        else{ //ゲーム最中
            this.startNode.active = true;
            this.genreIconSprite.spriteFrame = this.genreIconSpriteList[gen];
            this.genreLabel.string = GameManager.Instance().GetGameInfo().genreSetList[gen - 1].Genre;
            GameManager.Instance().GetGameInfo().genreId = gen + 10000;
            QuizManager.Instance().quizComponent.SetQuiz();
        }
        this.selectNode.active = false;
        this.backButton.node.active = true;
    }

    // 出題スタート
    private ClickStartButton(){
        this.startNode.active = false;
        this.certStartNode.active = true;
        this.isNext = true;
        this.backButton.node.active = false;
        this.animationTime = 3.0;
        // QuizManager.Instance().get
    }

    // 選択に戻る
    private ClickBackButton(){
        if(this.selectNode.active){
            this.isConfirm = false;
            if(this.modalType === 'Genre'){
                this.Initialize();
            }
            else{
                QuizModalManager.Instance().ChangeModal(this.modalType);
            }
            GameManager.Instance().SetParticipantActive(true);
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

