import { _decorator, Component, Node, Button, Label, Vec3, SpriteFrame, spriteAssembler, Sprite, ConstantForce, labelAssembler } from 'cc';
import { GameMenu } from '../../UI/GameMenu';
import { ClientMode, GameManager } from '../Manager/GameManager';
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
    private genreLabelList : Array<Label> = new Array<Label>();
    @property(Label)
    private titleLabel : Label = null;
    @property(Label)
    private startTitleLabel : Label = null;
    @property(Node)
    private genreRootNode : Node = null;
    @property(Node)
    private countRoot : Node = null;
    @property(Node)
    private genreBook : Node = null;
    @property(Label)
    private genreExplaLabel : Label = null;

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

    private debugClientMode : ClientMode = 'Liver';


    public Constructor(){
        this.genreButton[0].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(0)}, this);
        this.genreButton[1].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(1)}, this);
        this.genreButton[2].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(2)}, this);
        this.genreButton[3].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(3)}, this);
        this.genreButton[4].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(4)}, this);
        this.genreButton[5].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(5)}, this);

        this.startButton.node.on(Button.EventType.CLICK, this.ClickStartButton, this);
        this.backButton.node.on(Button.EventType.CLICK, this.ClickBackButton, this);
    }

    public OnUpdate(deltaTime: number){

        this.DebugUpdate();

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
        this.SetUI();
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
            this.genreLabel.string = GameManager.Instance().GetGameInfo().genreSetList[gen].Genre;
            GameManager.Instance().GetGameInfo().genreId = GameManager.Instance().GetGameInfo().genreSetList[gen].GenreId;
            QuizManager.Instance().quizComponent.SetQuiz();
            this.genreExplaLabel.string = GameManager.Instance().GetGameInfo().genreSetList[gen].Description;
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
        GameManager.Instance().GetParticipant().SetIsRecruitment(false);
        GameManager.Instance().GetParticipant().SetUI();

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

        //問題数とorderの減算処理
        GameManager.Instance().GetGameInfo().qNumber = (GameManager.Instance().GetGameInfo().qNumber + QuizManager.Instance().raundMax - 1) % QuizManager.Instance().raundMax;
        GameManager.Instance().GetGameInfo().order--;
    }

    public SetUI(){
        for(var i = 0; i < 4; i++){
            this.genreLabelList[i].string = GameManager.Instance().GetGameInfo().genreSetList[i].Genre;
        }

        if(GameManager.Instance().GetClientMode() === 'Liver'){
            this.titleLabel.string = "問題ジャンルを選ぼう";
            this.startTitleLabel.node.active = false;
            this.startButton.node.active = true;
            this.genreBook.position = new Vec3(0, 30, 0);
            this.countRoot.active = true;
            this.genreRootNode.active = true;
        }
        else if(GameManager.Instance().GetClientMode() === 'User'){
            this.titleLabel.string = "ライバーが出題テーマを選択中";
            this.startButton.node.active = false;
            this.startTitleLabel.node.active = true;
            this.genreBook.position = new Vec3(0, -15, 0);
            this.countRoot.active = false;
            this.genreRootNode.active = false;
        }
    }

    public SetConfirm(is : boolean){
        this.isConfirm = is;
    }

    public SetModalType(type : ModalType){
        this.modalType = type;
    }


    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            this.SetUI();
            this.debugClientMode = GameManager.Instance().GetClientMode();
        }
    }
}

