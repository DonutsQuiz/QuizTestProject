import { _decorator, Component, Node, SpriteFrame, math, SphereColliderComponent } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { GestureData } from './Data/QuizData';
import { QuizDataBase } from './Data/QuizDataBase';
import { QuizComponent } from './QuizComponent';
const { ccclass, property } = _decorator;



@ccclass('GestureQuiz')
export class GestureQuiz extends QuizComponent {

    mSprite : SpriteFrame;  // 問題の画像
    mData : GestureData;

    private debugClientMode : ClientMode = 'Liver';

    start() {

    }

    update(deltaTime: number) {
        this.DebugClientMode();
    }

    public SetQuiz(){

        // デバッグ用(本当はサーバーからもらってくる)
        this.mData = QuizDataBase.Instance().GetData<GestureData>('Gesture', this.DecisionAnswer());
        GameManager.Instance().GetGameInfo().qType = this.mType;
        GameManager.Instance().GetGameInfo().qNumber = this.mNumber;
        if(GameManager.Instance().GetClientMode() === 'Liver'){this.mSentence = "この顔を演じてください";}
        else{this.mSentence = "どの顔文字を演じているでしょう";}
        GameManager.Instance().GetGameInfo().qSentence = this.mSentence;
        GameManager.Instance().GetGameInfo().qAnswer = this.mData.mAnswer;
        GameManager.Instance().GetGameInfo().qSprite = this.mData.mSprite;

        this.mData.mAnswer = GameManager.Instance().GetGameInfo().qAnswer;
        this.mData.mSprite = GameManager.Instance().GetGameInfo().qSprite;

        // 問題文
        QuizModalManager.Instance().GetQuestionModal().SetNumber(++GameManager.Instance().GetGameInfo().qNumber);
        QuizModalManager.Instance().GetQuestionModal().SetSentence(GameManager.Instance().GetGameInfo().qSentence);
        QuizModalManager.Instance().GetQuestionModal().SetSprite(this.mSprite = this.mData.mSprite);



        // 選択肢
        QuizModalManager.Instance().GetChoicesModal().SetQuestion("どの顔を演じている?");
        var temp : Array<number> = [-1,-1,-1,-1,-1,-1];
        for(var i : number = 0; i < 6; i++){
            var select : string;
            if(i === 0){select = "A.";}
            else if(i === 1){select = "B.";}
            else if(i === 2){select = "C.";}
            else if(i === 3){select = "D.";}
            else if(i === 4){select = "E.";}
            else if(i === 5){select = "F.";}

            if(i === this.mData.mAnswer){
                QuizModalManager.Instance().GetChoicesModal().SetChoices(i, select, this.mData.mSprite);
                temp[i] = this.mData.mIndex;
            }
            else{
                var tempdata : GestureData = null
                do {
                    tempdata = QuizDataBase.Instance().GetData<GestureData>('Gesture', this.DecisionAnswer());
                    var result : Boolean = false;
                    for(var n = 0; n < temp.length; n++){
                        if(tempdata.mIndex === this.mData.mIndex || temp[n] === tempdata.mIndex){
                            result = false;
                            break;
                        }

                        if(temp[n] === -1){
                            temp[n] = tempdata.mIndex;
                            result = true;
                            break;
                        }
                    }
                } while (!result);

                QuizModalManager.Instance().GetChoicesModal().SetChoices(i, select, tempdata.mSprite);
            }
        }

        // 結果
        QuizModalManager.Instance().GetChoicesModal().GetResultModal().SetAnswerLabel(this.mData.mAnswer ,"");
        QuizModalManager.Instance().GetChoicesModal().GetResultModal().SetAnswerSprite(this.mSprite);        
    }

    public Initialize(){
        super.Reset();
        QuizModalManager.Instance().GetQuestionModal().Initialize(this.mType = 'Gesture');
        this.mSprite = null;  // 問題の画像
        this.mData = null;
    }

    private DecisionAnswer() : number{
        var count = QuizDataBase.Instance().GetDataList<GestureData>('Gesture').length;
        return math.randomRangeInt(0, count);
    }

    // public GetData() : GestureData{
    //     return this.mData;
    // }

    private DebugClientMode(){
        if(GameManager.Instance().GetClientMode() != this.debugClientMode){
            if(GameManager.Instance().GetClientMode() === 'Liver'){
                this.mSentence = "この顔を演じてください";
                this.debugClientMode = 'Liver';
            }
            else{
                this.mSentence = "どの顔を演じているでしょう";
                this.debugClientMode = 'User';
            }
            QuizModalManager.Instance().GetQuestionModal().SetSentence(this.mSentence);
        }
    }
}

