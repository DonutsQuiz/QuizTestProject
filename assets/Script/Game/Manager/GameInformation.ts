import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { QuizData } from '../Quiz/Data/QuizData';
import { QuizType } from '../Quiz/QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('GameInformation')
export class GameInformation{

    // ゲームに関すること
    qType : QuizType = 'None';  // クイズの種類
    qNumber : number = 0; // 何問目か
    qSentenceLiver : string = ""; // 問題文 (ライバー側)
    qSentenceUser : string = ""; // 問題文 (ユーザー側)
    qCorNumber : number = 0; // 正解の番号(0:A, 1:B, 2:C, 3:D)
    qSentence : string[] = ["", "", "", ""]; // 選択肢の文
    qSprite : SpriteFrame[] = [null, null, null, null];
    qActTheme : string = "" // アクトのお題 (言う言葉)
    qParTheme : string[] = ["", ""]; // パーソナルのお題
    totalBet : number[] = [0, 0, 0, 0]; // 選択肢ごとのベット数
    odds : number[] = [0, 0, 0, 0]; // 選択肢ごとのオッズ
    coins : number = 0; // 所持コイン数
    thinkTime : number = 0; // 制限時間

    // ランキング
    rankUserName : Array<string> = new Array<string>(); // ユーザー名
    rankUserAcqPoint : Array<number> = new Array<number>(); // 獲得ポイント
    rankUserBetPoint : Array<number> = new Array<number>(); // ベットポイント
    rankTopSprite : SpriteFrame = null; // 一位のアイコン画像


    public DebugInit(){
        this.qNumber = 0;
        this.qSentenceLiver = "";
        this.qCorNumber = 0;
        this.qSentence = ["", "", "", ""];
        this.totalBet = [100, 100, 100, 100];
        this.odds = [1, 1, 1, 1];
        this.coins = 20000;
        this.thinkTime = 600;
    }
}

