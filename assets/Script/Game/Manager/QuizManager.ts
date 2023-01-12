import { _decorator, Component, Node, profiler, Button, InstancedBuffer } from 'cc';
import { QuizData } from '../Quiz/Data/QuizData';
import { GestureQuiz } from '../Quiz/GestureQuiz';
import { QuizComponent, QuizType } from '../Quiz/QuizComponent';
import { QuizModalManager } from './QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('QuizManager')
export class QuizManager extends Component {

    private static instance : QuizManager;

    public static Instance() : QuizManager {
        if(!QuizManager.instance){
            QuizManager.instance = new QuizManager();
        }

        return QuizManager.instance;
    }

    @property(Button)
    startButton : Button = null;
    @property(Number)
    raundMax : number = 0;

    quizType : QuizType = 'None';
    quizComponent : QuizComponent = null;
    answerData : QuizData = null;

    start(){
        QuizManager.instance = this;
        
        this.SetQuizType('Gesture');

        this.startButton.node.on(Button.EventType.CLICK, function(){
            this.QuestionPhase();
            this.startButton.node.active = false;
        }, this);
    }

    public OnUpdate(){
        //this.AnswerPhase();

        // 全問題が終了したら総合結果に移行する
        if(QuizModalManager.Instance().GetResultModal().isNext){
            if(this.quizComponent.mNumber >= this.raundMax){
                QuizModalManager.Instance().ChangeModal('Overall');
            }
            else{
                this.quizComponent.SetQuiz();
            }
            QuizModalManager.Instance().GetResultModal().isNext = false;
        }
    }

    public SetQuizType(type : QuizType){
        
        if(this.quizComponent){
            this.quizComponent.destroy();
        }

        if(type === 'Gesture'){
            this.quizComponent = this.addComponent(GestureQuiz);
        }
        if(type === 'Act'){
        }
        if(type === 'Quiz'){
        }
    }

    // 出題
    private QuestionPhase(){
        this.quizComponent.Initialize();
        this.quizComponent.SetQuiz();
    }

    // 
    AnswerPhase(){
        if(QuizModalManager.Instance().GetChoicesModal().GetChoics() > -1){
            QuizModalManager.Instance().GetResultModal().SetInfo(QuizModalManager.Instance().GetChoicesModal().GetChoics(),this.quizComponent.GetQuizData());
        }
    }
}

