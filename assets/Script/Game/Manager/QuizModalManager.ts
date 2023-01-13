import { _decorator, Component, Node, instantiate, Prefab, Canvas, Button, Label } from 'cc';
import { ChoicesModal } from '../Modal/ChoicesModal';
import { OverallResultModal } from '../Modal/OverallResultModal';
import { QuestionModal } from '../Modal/QuestionModal';
import { ResultModal } from '../Modal/ResultModal';
import { WaitModal } from '../Modal/WaitModal';
import { ClientMode, GameManager } from './GameManager';
const { ccclass, property } = _decorator;

const ModalType = {
    None     : 'None',
    Question : 'Question',
    Choices  : 'Choices',
    Result   : 'Result',
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
    private questionPrefab : Prefab = null;
    @property(Prefab)
    private choicesPrefab : Prefab = null;
    @property(Prefab)
    private resultPrefab : Prefab = null;
    @property(Prefab)
    private overallPrefab : Prefab = null;

    private question : QuestionModal = null;
    private choices : ChoicesModal = null;
    private result : ResultModal = null;
    private overall : OverallResultModal = null;

    private debugClientMode : ClientMode = 'Liver';
    private debugNowType : ModalType = 'Question';

    start() {
        QuizModalManager.instance = this;

        var temp = instantiate(this.questionPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.question = temp.getComponent(QuestionModal);

        temp = instantiate(this.choicesPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.choices = temp.getComponent(ChoicesModal);

        temp = instantiate(this.resultPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.result = temp.getComponent(ResultModal);

        temp = instantiate(this.overallPrefab);
        temp.setParent(this.canvas);
        temp.active = false;
        this.overall = temp.getComponent(OverallResultModal);
    }

    update(deltaTime: number) {
        //this.DebugClientMode();
    }

    public OnUpdate(deltaTime : number){

    }

    public ChangeModal(nextType : ModalType){
        if(nextType === 'Question'){
            this.choices.node.active = false;
            this.result.node.active = false;
            this.overall.node.active = false;
            this.question.node.active = true;
            this.question.Initialize(GameManager.Instance().GetGameInfo().qType);
        }
        else if(nextType === 'Choices'){
            this.question.node.active = false;
            this.choices.node.active = true;
            this.choices.Initialize();
        }
        else if(nextType === 'Overall'){
            this.question.node.active = false;
            this.choices.node.active = false;
            this.overall.node.active = true;
        }

        this.debugNowType = nextType;
    }

    public Reset(){
        
    }

    public GetQuestionModal() : QuestionModal{
        return this.question;
    }
    public GetChoicesModal() : ChoicesModal{
        return this.choices;
    }
    public GetResultModal() : ResultModal{
        return this.result;
    }
    public GetOverallResultModal() : OverallResultModal{
        return this.overall;
    }
}

