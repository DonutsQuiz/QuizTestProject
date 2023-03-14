import { _decorator, Component, Node, SpriteFrame, math, SphereColliderComponent, TERRAIN_MAX_LAYER_COUNT } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
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

        this.DebugChoiceQuestion();

        super.SetQuiz();

        // 問題文
        QuizModalManager.Instance().GetQuestionModal().SetSprite(this.mSprite = this.mData.mSprite);
        // 結果
        QuizModalManager.Instance().GetChoicesModal().GetResultModal().SetAnswerSprite(this.mSprite);        
    }

    public Initialize(){
        super.Reset();
        QuizModalManager.Instance().GetQuestionModal().SetUI(this.mType = 'Gesture');
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

    private DebugChoiceQuestion(){

        this.mData = QuizDataBase.Instance().GetData<GestureData>('Gesture', this.DecisionAnswer());
        GameManager.Instance().GetGameInfo().qType = this.mType;
        GameManager.Instance().GetGameInfo().qSentence = "この顔を演じてください";
        GameManager.Instance().GetGameInfo().qSentenceUser = "どの顔を演じている？";
        GameManager.Instance().GetGameInfo().qCorNumber = this.mData.mAnswer;

        var tempind : SpriteFrame[] = [null, null, null];
        var templist : number[] = [-1, -1, -1];
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax() - 1; i++){
            var tempdata : GestureData = null;
            do {
                tempdata = QuizDataBase.Instance().GetData<GestureData>('Gesture', this.DecisionAnswer());
                var result : Boolean = false;
                for(var n = 0; n < QuizManager.Instance().GetChoiceMax() - 1; n++){
                    if(tempdata.mIndex === this.mData.mIndex || templist[n] === tempdata.mIndex){
                        result = false;
                        break;
                    }
        
                    if(templist[n] < 0){
                        tempind[n] = tempdata.mSprite;
                        templist[n] = tempdata.mIndex;
                        result = true;
                        break;
                    }
                }
            } while (!result);
        }

        var index : number = 0;
        for(var n = 0; n < QuizManager.Instance().GetChoiceMax(); n++){
            if(n === GameManager.Instance().GetGameInfo().qCorNumber){
                GameManager.Instance().GetGameInfo().qSprite[n] = this.mData.mSprite;
            }
            else{
                GameManager.Instance().GetGameInfo().qSprite[n] = tempind[index];
                index++;
            }
        }
    }
}

