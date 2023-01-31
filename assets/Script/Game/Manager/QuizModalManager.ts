import { _decorator, Component, Node, instantiate, Prefab, Canvas, Button, Label } from 'cc';
import { ChoicesModal } from '../Modal/ChoicesModal';
import { OverallResultModal } from '../Modal/OverallResultModal';
import { QuestionModal } from '../Modal/QuestionModal';
import { RankingModal } from '../Modal/RankingModal';
import { ResultModal } from '../Modal/ResultModal';
import { RuleModal } from '../Modal/RuleModal';
import { TitleModal } from '../Modal/TitleModal';
import { WaitModal } from '../Modal/WaitModal';
import { ClientMode, GameManager } from './GameManager';
const { ccclass, property } = _decorator;

const ModalType = {
    None     : 'None',
    Title    : 'Title',
    Rule     : 'Rule',
    Ranking  : 'Ranking',
    Question : 'Question',
    Choices  : 'Choices',
    Overall  : 'Overall',
} as const;

export type ModalType = typeof ModalType[keyof typeof ModalType];

@ccclass('QuizModalManager')
export class QuizModalManager extends Component {

    private static instance : QuizModalManager;
    
    public static Instance() : QuizModalManager {
        if(!QuizModalManager.instance){
            QuizModalManager.instance = new QuizModalManager();
        }

        return QuizModalManager.instance;
    }

    @property(Node)
    canvas : Node = null;
    @property(Prefab)
    private titlePrefab : Prefab = null;
    @property(Prefab)
    private rulePrefab : Prefab = null;
    @property(Prefab)
    private rankingPrefab : Prefab = null;
    @property(Prefab)
    private questionPrefab : Prefab = null;
    @property(Prefab)
    private choicesPrefab : Prefab = null;
    @property(Prefab)
    private overallPrefab : Prefab = null;

    private title : TitleModal = null;
    private rule : RuleModal = null;
    private ranking : RankingModal = null;
    private question : QuestionModal = null;
    private choices : ChoicesModal = null;
    private overall : OverallResultModal = null;

    private debugClientMode : ClientMode = 'Liver';
    private nowType : ModalType = 'Title';

    public Constructor(){
        QuizModalManager.instance = this;

        var temp = instantiate(this.titlePrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.title = temp.getComponent(TitleModal);
        this.title.Constructor();

        temp = instantiate(this.rulePrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.rule = temp.getComponent(RuleModal);
        this.rule.Constructor();

        temp = instantiate(this.rankingPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.ranking = temp.getComponent(RankingModal);
        this.ranking.Constructor();

        temp = instantiate(this.questionPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.question = temp.getComponent(QuestionModal);
        this.question.Constructor();

        temp = instantiate(this.choicesPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.choices = temp.getComponent(ChoicesModal);
        this.choices.Constructor();

        temp = instantiate(this.overallPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.overall = temp.getComponent(OverallResultModal);
        this.overall.Constructor();
    }

    public OnUpdate(deltaTime : number){
        if(this.nowType === 'Title'){
            this.title.OnUpdate(deltaTime);
        }
        else if(this.nowType === 'Rule'){
            this.rule.OnUpdate(deltaTime);
        }
        else if(this.nowType === 'Ranking'){
            this.ranking.OnUpdate();
        }
        else if(this.nowType === 'Question'){
            this.question.OnUpdate(deltaTime);
        }
        else if(this.nowType === 'Choices'){
            this.choices.OnUpdate(deltaTime);
        }
        else if(this.nowType === 'Overall'){
            this.overall.OnUpdate(deltaTime);
        }
    }

    public ChangeModal(nextType : ModalType){
        this.title.node.active = false;
        this.rule.node.active = false;
        this.ranking.node.active = false;
        this.question.node.active = false;
        this.choices.node.active = false;
        this.overall.node.active = false;

        if(nextType === 'Title'){
            this.title.node.active = true;
            this.title.SetIsFirst(true);
        }
        else if(nextType === 'Rule'){
            this.rule.node.active = true;
        }
        else if(nextType === 'Ranking'){
            this.ranking.node.active = true;
        }
        else if(nextType === 'Question'){
            this.question.node.active = true;
            this.question.SetUI(GameManager.Instance().GetGameInfo().qType);
        }
        else if(nextType === 'Choices'){
            this.choices.node.active = true;            
            this.choices.Initialize();
        }
        else if(nextType === 'Overall'){
            this.overall.node.active = true;
            this.overall.Initialize();
            this.overall.SetUI();
        }

        this.nowType = nextType;
    }

    public Reset(){
        
    }

    public GetQuestionModal() : QuestionModal{
        return this.question;
    }
    public GetChoicesModal() : ChoicesModal{
        return this.choices;
    }
    public GetOverallResultModal() : OverallResultModal{
        return this.overall;
    }
}

