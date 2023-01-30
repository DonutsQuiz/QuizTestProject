import { _decorator, Component, Node, profiler, Button, InstancedBuffer, Game } from 'cc';
import { ActQuiz } from '../Quiz/ActQuiz';
import { PersonalData, QuizData } from '../Quiz/Data/QuizData';
import { GestureQuiz } from '../Quiz/GestureQuiz';
import { PersonalQuiz } from '../Quiz/PersonalQuiz';
import { QuizComponent, QuizType } from '../Quiz/QuizComponent';
import { GameManager } from './GameManager';
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

    private CHOICE_MAX : number = 4;

    @property(Button)
    startButton : Button = null;
    @property(Number)
    raundMax : number = 0;

    quizType : QuizType = 'None';
    quizComponent : QuizComponent = null;
    answerData : QuizData = null;

    start(){
        QuizManager.instance = this;
        
        this.SetQuizType('Personal');

        this.startButton.node.on(Button.EventType.CLICK, function(){
            this.QuestionPhase();
            this.startButton.node.active = false;
        }, this);
    }

    public OnUpdate(){
        // 全問題が終了したら総合結果に移行する
        if(QuizModalManager.Instance().GetChoicesModal().isNext){
            if(GameManager.Instance().GetGameInfo().qNumber >= this.raundMax){
                QuizModalManager.Instance().GetOverallResultModal().SetIsRoundEnd(true);
            }
            else{
                // デバッグ
                QuizModalManager.Instance().GetChoicesModal().GetTimer().Reset();
                GameManager.Instance().GetGameInfo().thinkTime = 600;
                this.quizComponent.SetQuiz();
            }
            QuizModalManager.Instance().GetChoicesModal().isNext = false;
        }
    }

    public SetQuizType(type : QuizType){
        console.log(type);
        if(this.quizComponent){
            this.quizComponent.destroy();
        }
        if(type === 'Gesture'){
            console.log("gesture");
            this.quizComponent = this.addComponent(GestureQuiz);
        }
        if(type === 'Act'){

            console.log("act");
            this.quizComponent = this.addComponent(ActQuiz);
        }
        if(type === 'Personal'){

            console.log("personal");
            this.quizComponent = this.addComponent(PersonalQuiz);
        }
    }

    // 出題
    private QuestionPhase(){
        console.log(this.quizComponent);
        QuizModalManager.Instance().ChangeModal('Title');
        this.quizComponent.Initialize();
        this.quizComponent.SetQuiz();
    }

    // 選択肢の最大数
    public GetChoiceMax() : number{
        return this.CHOICE_MAX;
    }
}

