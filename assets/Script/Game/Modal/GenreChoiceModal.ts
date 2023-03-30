import { _decorator, Component, Node, Button, Label, Vec3, SpriteFrame, spriteAssembler, Sprite, ConstantForce, labelAssembler } from 'cc';
import { GameMenu } from '../../UI/GameMenu';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('GenreChoiceModal')
export class GenreChoiceModal extends Component {

    @property(Node) //ジャンル選択ノード
    private selectNode : Node = null;
    @property(Node) //確認ノード
    private startNode : Node = null;
    @property(Button) //出題スタートボタン
    private startButton : Button = null;
    @property(Button) //戻る
    private backButton : Button = null;
    @property(Button) // ジャンル選択ボタン
    private genreButton : Array<Button> = new Array<Button>();
    @property(Label) // ジャンルの文字
    private genreLabelList : Array<Label> = new Array<Label>();
    @property(Label)// ジャンル選択前の見出し
    private titleLabel : Label = null;
    @property(Label) // ジャンル選択後の見出し(見えるのはユーザーだけ)
    private waitLabel : Label = null;
    @property(Node) //出題回数のノード
    private countRoot : Node = null;
    @property(Node) // 並んだ本のノード
    private booksNode : Node = null;
    @property(Node) // 開いた本のノード
    private genreBook : Node = null;
    @property(Label)  //本に書いてあるジャンルの名前
    private genreLabel : Label = null;
    @property(Label) //ジャンルの説明ラベル
    private genreExplaLabel : Label = null;
    @property(GameMenu) // ゲームメニュー
    private gameMenu : GameMenu = null;
    @property(Node) //次のモーダルにいく時の蓋絵
    private certStartNode : Node = null;

    private animationTime = 0.0;
    private isNext = false;

    private debugClientMode : ClientMode = 'Liver';


    public Constructor(){
        this.genreButton[0].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(0)}, this);
        this.genreButton[1].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(1)}, this);
        this.genreButton[2].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(2)}, this);
        this.genreButton[3].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(3)}, this);
        this.genreButton[4].node.on(Button.EventType.CLICK, function(){this.ClickGenreButton(4)}, this);

        this.startButton.node.on(Button.EventType.CLICK, this.ClickStartButton, this);
        this.backButton.node.on(Button.EventType.CLICK, this.ClickBackButton, this);

        this.gameMenu.Constructor();
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

    // ジャンルを選択
    private ClickGenreButton(gen : number){
        this.startNode.active = true;
        this.genreLabel.string = GameManager.Instance().GetGameInfo().genreSetList[gen].Genre;
        GameManager.Instance().GetGameInfo().genreId = GameManager.Instance().GetGameInfo().genreSetList[gen].GenreId;
        QuizManager.Instance().quizComponent.SetQuiz();
        this.genreExplaLabel.string = GameManager.Instance().GetGameInfo().genreSetList[gen].Description;
        this.selectNode.active = false;
        this.backButton.node.active = true;
    }

    // 出題スタート
    private ClickStartButton(){
        this.startNode.active = false;
        this.certStartNode.active = true;
        this.isNext = true;
        this.backButton.node.active = false;
        this.gameMenu.DisplayButton(false);
        this.animationTime = 3.0;

        GameManager.Instance().GetParticipant().SetIsRecruitment(false);
        GameManager.Instance().GetParticipant().SetUI();
    }

    // 選択に戻る
    private ClickBackButton(){
        this.selectNode.active = true;
        this.startNode.active = false;
        this.backButton.node.active = false;
        
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
            this.waitLabel.node.active = false;
            this.startButton.node.active = true;
            this.booksNode.scale = new Vec3(1,1,1);
            this.genreBook.position = new Vec3(0, 30, 0);
            this.genreBook.scale = new Vec3(1, 1, 1);
            this.countRoot.active = true;
            this.gameMenu.DisplayButton(true);
            this.genreButton.forEach(element => {element.node.active = true;});
        }
        else if(GameManager.Instance().GetClientMode() === 'User'){
            this.titleLabel.string = "ライバーが出題テーマを選択中";
            this.waitLabel.node.active = true;
            this.startButton.node.active = false;
            this.booksNode.scale = new Vec3(1.1,1.1,1.1);
            this.genreBook.position = new Vec3(0, -15, 0);
            this.genreBook.scale = new Vec3(1.1, 1.1, 1.1);
            this.countRoot.active = false;
            this.gameMenu.DisplayButton(false);
            this.genreButton.forEach(element => {element.node.active = false;});
        }
    }


    private DebugUpdate(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            this.SetUI();
            this.debugClientMode = GameManager.Instance().GetClientMode();
        }
    }
}

