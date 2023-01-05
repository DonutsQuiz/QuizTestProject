import { _decorator, Component, Node, Label, SpriteFrame } from 'cc';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizData } from './Data/QuizData';

const { ccclass, property } = _decorator;

const QuizType = {
    None    : 'None',
    Gesture : 'Gesture',
    Act     : 'Act',
    Quiz    : 'Quiz',
} as const;

export type QuizType = typeof QuizType[keyof typeof QuizType];

@ccclass('QuizComponent')
export abstract class QuizComponent extends Component {

    mType : QuizType;
    mNumber : number;
    mSentence : string;
    abstract mData : QuizData;

    public abstract Initialize() : void;
    public abstract SetQuiz() : void;

    public Reset(){
        this.mType = 'None';
        this.mNumber = 0;
        this.mSentence = "";
    }

    public GetQuizData():QuizData{
        return this.mData;
    }
}

