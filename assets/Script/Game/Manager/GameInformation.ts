import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameInformation')
export class GameInformation{

    // ゲームに関すること
    qNumber : number = 0;
    qAnswer : number = 0;
    qSentence : string = "";
    coins : number = 20000;
    thinkTime : number = 600;


}

