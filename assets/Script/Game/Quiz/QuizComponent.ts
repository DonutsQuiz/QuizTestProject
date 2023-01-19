import { _decorator, Component, Node, Label, SpriteFrame } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizData } from './Data/QuizData';

const { ccclass, property } = _decorator;

const QuizType = {
    None    : 'None',
    Gesture : 'Gesture',
    Act     : 'Act',
    Personal    : 'Personal',
} as const;

export type QuizType = typeof QuizType[keyof typeof QuizType];

@ccclass('QuizComponent')
export abstract class QuizComponent extends Component {

    mType : QuizType;
    mNumber : number;
    mSentence : string;
    abstract mData : QuizData;

    public abstract Initialize() : void;
    //public abstract SetQuiz() : void;

    public SetQuiz(){
        // 問題文
        QuizModalManager.Instance().GetQuestionModal().SetNumber(++GameManager.Instance().GetGameInfo().qNumber);
        QuizModalManager.Instance().GetQuestionModal().SetSentence(GameManager.Instance().GetGameInfo().qSentenceLiver);
        
        // 選択肢
        //var index : number = 0;
        QuizModalManager.Instance().GetChoicesModal().SetQuestion(GameManager.Instance().GetGameInfo().qSentenceUser);
        for(var i : number = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            QuizModalManager.Instance().GetChoicesModal().SetChoices(i, GameManager.Instance().GetGameInfo().qSentence[i], GameManager.Instance().GetGameInfo().qSprite[i]);

            // if(i === GameManager.Instance().GetGameInfo().qCorNumber){
            //     QuizModalManager.Instance().GetChoicesModal().SetChoices(i, GameManager.Instance().GetGameInfo().qCorSent, GameManager.Instance().GetGameInfo().qCorSprite);
            // }
            // else{
            //     QuizModalManager.Instance().GetChoicesModal().SetChoices(i, GameManager.Instance().GetGameInfo().qIncSent[index], GameManager.Instance().GetGameInfo().qIncSprite[index]);
            //     index++;
            // }
        }
        
        // 結果
        QuizModalManager.Instance().GetChoicesModal().GetResultModal().SetAnswerLabel(GameManager.Instance().GetGameInfo().qCorNumber ,GameManager.Instance().GetGameInfo().qSentence[GameManager.Instance().GetGameInfo().qCorNumber]);    
    }

    public Reset(){
        this.mType = 'None';
        this.mNumber = 0;
        this.mSentence = "";
    }

    public GetQuizData():QuizData{
        return this.mData;
    }
}

