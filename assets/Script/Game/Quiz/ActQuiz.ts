import { _decorator, Component, Node, math, game, Game } from 'cc';
import { ClientMode, GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { ActData } from './Data/QuizData';
import { QuizDataBase } from './Data/QuizDataBase';
import { QuizComponent } from './QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('ActQuiz')
export class ActQuiz extends QuizComponent {

    mSentence : string = "";
    mData : ActData;

    private debugClientMode : ClientMode = 'Liver';
    
    start() {

    }

    update(deltaTime: number) {
        
    }

    public SetQuiz(){
        this.DebugChoiceQuestion();

        super.SetQuiz();     

        // 選択肢
        QuizModalManager.Instance().GetChoicesModal().SetQuestion("どれを演じている?");
    }


    public Initialize(){
        super.Reset();
        QuizModalManager.Instance().GetQuestionModal().SetUI(this.mType = 'Act');
        this.mSentence = null;
        this.mData = null;
    }

    private DecisionAnswer() : number{
        var count = QuizDataBase.Instance().GetDataList<ActData>('Act').length;
        return math.randomRangeInt(0, count);
    }

    private DebugChoiceQuestion(){

        this.mData = QuizDataBase.Instance().GetData<ActData>('Act', this.DecisionAnswer());
        GameManager.Instance().GetGameInfo().qActTheme = "はぁ";
        GameManager.Instance().GetGameInfo().qType = this.mType;
        GameManager.Instance().GetGameInfo().qSentenceLiver = "<color=#000000>" + GameManager.Instance().GetGameInfo().qSentence[GameManager.Instance().GetGameInfo().qCorNumber] + "の<br/>" + "「" + GameManager.Instance().GetGameInfo().qActTheme + "」" + "を演じてください" + "</color>";
        GameManager.Instance().GetGameInfo().qSentenceUser = "どの「" + GameManager.Instance().GetGameInfo().qActTheme + "」を演じている？";
        GameManager.Instance().GetGameInfo().qCorNumber = this.mData.mAnswer;


        var tempind : string[] = [null, null, null];
        var templist : number[] = [-1, -1, -1];
        for(var i = 0; i < QuizManager.Instance().GetChoiceMax() - 1; i++){
            var tempdata : ActData = null;
            do {
                tempdata = QuizDataBase.Instance().GetData<ActData>('Act', this.DecisionAnswer());
                var result : Boolean = false;
                for(var n = 0; n < QuizManager.Instance().GetChoiceMax() - 1; n++){
                    if(tempdata.mIndex === this.mData.mIndex || templist[n] === tempdata.mIndex){
                        result = false;
                        break;
                    }
        
                    if(templist[n] < 0){
                        tempind[n] = tempdata.mSentence;
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
                GameManager.Instance().GetGameInfo().qSentence[n] = this.mData.mSentence;
            }
            else{
                GameManager.Instance().GetGameInfo().qSentence[n] = tempind[index];
                index++;
            }
        }
    }
}

