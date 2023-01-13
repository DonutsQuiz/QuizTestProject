import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { QuizData } from '../Quiz/Data/QuizData';
import { QuizType } from '../Quiz/QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('GameInformation')
export class GameInformation{

    // ゲームに関すること
    qType : QuizType = 'None';
    qNumber : number = 0;
    qAnswer : number = 0;
    qSentence : string = "";
    qSprite : SpriteFrame = null;
    coins : number = 20000;
    thinkTime : number = 600;


}

