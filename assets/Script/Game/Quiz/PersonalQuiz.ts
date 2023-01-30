import { _decorator, Component, Node, math } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { PersonalData } from './Data/QuizData';
import { QuizDataBase } from './Data/QuizDataBase';
import { QuizComponent } from './QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('PersonalQuiz')
export class PersonalQuiz extends QuizComponent {

    mData : PersonalData;

    public Initialize(){

    }



    public SetQuiz(){
        this.DebugChoiceQuestion();

        super.SetQuiz();
    }


    private DecisionAnswer() : number{
        var count = QuizDataBase.Instance().GetDataList<PersonalData>('Personal').length;
        return math.randomRangeInt(0, count);
    }

    private DebugChoiceQuestion(){
        this.mData = QuizDataBase.Instance().GetData<PersonalData>('Personal', this.DecisionAnswer());
        GameManager.Instance().GetGameInfo().qType = this.mData.mType;
        GameManager.Instance().GetGameInfo().qSentenceLiver = this.mData.mSentence;
        GameManager.Instance().GetGameInfo().qSentenceUser = this.mData.mSentence;

        for(var n = 0; n < QuizManager.Instance().GetChoiceMax(); n++){
            GameManager.Instance().GetGameInfo().qSentence[n] = this.mData.mQuestionSent[n];
            // GameManager.Instance().GetGameInfo().qParSelect[n] = this.mData.mQuestionSent[n];
        }
    }
}

