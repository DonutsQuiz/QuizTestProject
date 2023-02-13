import { _decorator, Component, Node, SpriteFrame, Sprite, random, randomRangeInt } from 'cc';
import { QuizType } from '../QuizComponent';
import { ActData, GestureData, PersonalData, QuizData } from './QuizData';
const { ccclass, property } = _decorator;

@ccclass('QuizDataBase')
export class QuizDataBase extends Component {

    private static instance : QuizDataBase;
    
    public static Instance() : QuizDataBase {
        if(!QuizDataBase.instance){
            QuizDataBase.instance = new QuizDataBase();
        }

        return QuizDataBase.instance;
    }

    // お試し用
    @property(SpriteFrame)
    sprite : Array<SpriteFrame> = Array<SpriteFrame>();

    dataList : Array<QuizData> = new Array<QuizData>();

    public Constructor(){
        QuizDataBase.instance = this;

        this.GestureDataInitialize();
        this.ActDataInitialize();
        this.PersonalDataInitialize();
    }

    // 要素の追加
    public Add(data : QuizData){
        this.dataList.push(data);
    }

    // リスト内の要素を取得
    public GetData<T>(type : QuizType, index : number) : T{
        for(const data of this.dataList){
            if(data.mType === type && data.mIndex === index){
                return (data as T);
            }
        }
        return null;
    }

    // リストごと取得
    public GetDataList<T>(type : QuizType) : T[]{
        var tempList = new Array<T>;

        for(const data of this.dataList){
            if(data.mType === type){
                tempList.push((data as T));
            }
        }

        return tempList;
    }

    // ジェスチャーデータの初期化(お試し)
    private GestureDataInitialize(){
        for(var i = 0; i < 6; i++){
            var data : GestureData = new GestureData;
            data.mIndex = i;
            data.mAnswer = randomRangeInt(0, 4);
            data.mSprite = this.sprite[i];
            this.Add(data);
        }
    }

    // アクトデータの初期化(お試し)
    private ActDataInitialize(){

        var sent : string[] = ["疑問", "力を貯めて", "呆然", "関心", "怒り", "とぼけて", "驚き", "失恋"]

        for(var i = 0; i < 8; i++){
            var data : ActData = new ActData;
            data.mIndex = i;
            data.mAnswer = randomRangeInt(0, 4);
            data.mSentence = sent[i];
            this.Add(data);
        }
    }

    // アクトデータの初期化(お試し)
    private PersonalDataInitialize(){

        var sent : string[] = [
            `今日はオフの日。<br/><size=1> </size><br/>次のうち、行きたい場所はどこ？`,
            "やっていたかもしれない職業は？",
            "失敗しそうな料理は？",
            "一番得意な教科は？",
            "ペットにするなら？"
        ];

        var select : string[][] = [
            ["遊園地", "水族館", "百貨店", "ジャングル"],
            ["先生", "警官", "プログラマー", "俳優・モデル"],
            ["ステーキ", "グラタン", "チャーハン", "ハンバーガー"],
            ["国語", "算数", "体育", "道徳"],
            ["いぬ", "ねこ", "ヘビ", "ライオン"]
        ];
    
        for(var i = 0; i < 5; i++){
            var data : PersonalData = new PersonalData();
            data.mIndex = i;
            data.mSentence = sent[i];
            for(var j = 0; j < 4; j++){
                data.mQuestionSent[j] = select[i][j];
            }
            this.Add(data);
        }
    }
}

