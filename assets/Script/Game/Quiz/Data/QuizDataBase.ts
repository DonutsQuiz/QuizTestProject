import { _decorator, Component, Node, SpriteFrame, Sprite, random, randomRangeInt } from 'cc';
import { QuizType } from '../QuizComponent';
import { ActData, GestureData, QuizData } from './QuizData';
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

    start() {
        QuizDataBase.instance = this;

        this.GestureDataInitialize();
        this.ActDataInitialize();
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

    // ジェスチャーデータの初期化(お試し)
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
}

