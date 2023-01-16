import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { QuizData } from '../Quiz/Data/QuizData';
import { QuizType } from '../Quiz/QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('GameInformation')
export class GameInformation{

    // ゲームに関すること
    qType : QuizType = 'None';  // クイズの種類
    qNumber : number = 0; // 何問目か
    qSentence : string = ""; // 問題文
    qCorNumber : number = 0; // 正解の番号(0:A, 1:B, 2:C, 3:D)
    qCorSent : string = ""; // 正解の選択肢
    qIncSent : string[] = [null, null, null, null]; // 不正解の選択肢
    qCorSprite : SpriteFrame = null; // 正解の画像(ジェスチャー用)
    qIncSprite : SpriteFrame[] = [null, null, null, null]; // 不正解の画像(ジェスチャー用)
    totalBet : number[] = [100, 100, 100, 100]; // 選択肢ごとのベット数
    odds : number[] = [1, 1, 1, 1]; // 選択肢ごとのオッズ
    coins : number = 20000; // 所持コイン数
    thinkTime : number = 600; // 制限時間
}

