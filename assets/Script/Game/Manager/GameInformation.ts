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

export class rankingData{
    userId :  number = -1;
    score : number = -1;
    rank : number = -1;
}

export class ReslutRankingData{
    id : number = -1;
    score : number = -1;
    rank : number = -1;
    conmbo : number = -1;
    correct : boolean = false;
}

export class GenreSet{
    GenreId : number = -1;
    Genre : string = "";
}

@ccclass('GameInformation')
export class GameInformation{

    // ゲームに関すること
    qType : QuizType = 'None';  // クイズの種類
    qNumber : number = 0; // 何問目か
    qSentence : string = ""; // 問題文 (ライバー側)
    qSentenceUser : string = ""; // 問題文 (ユーザー側)
    qCorNumber : number = 0; // 正解の番号(0:A, 1:B, 2:C, 3:D)
    qSelectSent : string[] = ["", "", "", ""]; // 選択肢の文
    qSprite : SpriteFrame[] = [null, null, null, null];
    qActTheme : string = "" // アクトのお題 (言う言葉)
    qParSelect : string[] = ["", "", "", ""]; // パーソナルの選択肢
    totalBet : number[] = [0, 0, 0, 0]; // 選択肢ごとのベット数
    odds : number[] = [0, 0, 0, 0]; // 選択肢ごとのオッズ
    coins : number = 0; // 所持コイン数
    thinkTime : number = 0; // 制限時間
    qGenre : string = "";

    // ランキング
    todayRanking : Array<RankingInfo> = new Array<RankingInfo>(); //今日のランキング
    ranking : Array<RankingInfo> = new Array<RankingInfo>(); //現在のランキング
    lastMonthRanking : Array<RankingInfo> = new Array<RankingInfo>(); // 先月のランキング

    // ランキング(API)
    todayRankingList : Array<rankingData> = new Array<rankingData>();
    monthRankingList : Array<rankingData> = new Array<rankingData>();
    prevMonthRankingList : Array<rankingData> = new Array<rankingData>();
    nowRankingList : Array<ReslutRankingData> = new Array<ReslutRankingData>();


    // グレード
    playCount : number = 0;
    grade : number  = 0;

    // ジャンルセット
    genreSetList : Array<GenreSet> = new Array<GenreSet>();
    genreId : number = -1;

    // ユーザー情報
    hostId : number = 123456789;
    userId : number = 987654321;
    gameId : number = 12345678900987;
    token : string = "asiodjioqwjoajsdjjsakmvbd";


    liverName : string = ""; //ライバーの名前
    subTitle : string = ""; // サブタイトル
    topIndex : number = -1; // 一位のプレイヤーの添字

    hintSentence : Array<string> = new Array<string>(); // ヒントの文章

    isFirstTime : boolean = false; //初プレイかどうか
}

