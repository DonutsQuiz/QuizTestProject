import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { QuizData } from '../Quiz/Data/QuizData';
import { QuizType } from '../Quiz/QuizComponent';
const { ccclass, property } = _decorator;

export class RankingInfo{
    mName : string = "";
    mPoint : number = 0;
    mBet : number = 0;
    mTotalPoint : number = 0;
    mSprite : SpriteFrame = null;
}

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
    qParSelect : string[] = ["", "", "", ""]; // パーソナルの選択肢
    totalBet : number[] = [0, 0, 0, 0]; // 選択肢ごとのベット数
    odds : number[] = [0, 0, 0, 0]; // 選択肢ごとのオッズ
    coins : number = 0; // 所持コイン数
    thinkTime : number = 0; // 制限時間

    // ランキング
    todayRanking : Array<RankingInfo> = new Array<RankingInfo>(); //今日のランキング
    ranking : Array<RankingInfo> = new Array<RankingInfo>(); //現在のランキング
    lastMonthRanking : Array<RankingInfo> = new Array<RankingInfo>(); // 先月のランキング

    liverName : string = ""; //ライバーの名前
    subTitle : string = ""; // サブタイトル
    topIndex : number = -1; // 一位のプレイヤーの添字

    hintSentence : Array<string> = new Array<string>(); // ヒントの文章

    isFirstTime : boolean = false; //初プレイかどうか
}

