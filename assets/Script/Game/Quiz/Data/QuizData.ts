import { _decorator, Component, Node, SpriteFrame } from 'cc';
import { QuizType } from '../QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('QuizData')
export abstract class QuizData{
    abstract mType : QuizType;
    mIndex :  number = -1;
    mAnswer : number = -1;
}

export class GestureData extends QuizData{
    mType: QuizType = 'Gesture';
    mSprite : SpriteFrame = null;
}

export class ActData extends QuizData{
    mType: QuizType = 'Act';
    mSentence : string = "";
}

export class PersonalData extends QuizData{
    mType: QuizType = 'Personal';
    mSentence : string = "";
    mQuestionSent : string[] = ["", "", "", ""];
}

