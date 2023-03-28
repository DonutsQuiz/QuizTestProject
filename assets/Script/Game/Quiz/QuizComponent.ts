import { _decorator, Component, Node, Label, SpriteFrame } from 'cc';
import { GameMenu } from '../../UI/GameMenu';
import { GameManager } from '../Manager/GameManager';
import { QuizManager } from '../Manager/QuizManager';
import { QuizModalManager } from '../Manager/QuizModalManager';
import { QuizData } from './Data/QuizData';

const { ccclass, property } = _decorator;

const QuizType = {
    None    : 'None',
    Gesture : 'Gesture',
    Act     : 'Act',
    Personal    : 'Personal',
} as const;

export type QuizType = typeof QuizType[keyof typeof QuizType];

@ccclass('QuizComponent')
export abstract class QuizComponent extends Component {

    mType : QuizType;
    mNumber : number;
    mSentence : string;
    abstract mData : QuizData;

    public abstract Initialize() : void;
    //public abstract SetQuiz() : void;

    public SetQuiz(){

        // 何問目かをセット
        GameManager.Instance().GetGameInfo().qNumber = (GameManager.Instance().GetGameInfo().qNumber + 1) % (QuizManager.Instance().raundMax + 1);
        if(GameManager.Instance().GetGameInfo().qNumber === 0) GameManager.Instance().GetGameInfo().qNumber = 1;
        GameManager.Instance().GetGameInfo().order++;

        // 問題生成をリクエスト
        GameManager.Instance().GetApiConnect().createQuiz(
            GameManager.Instance().GetGameInfo().hostId,
            GameManager.Instance().GetGameInfo().token,
            GameManager.Instance().GetGameInfo().gameId,
            GameManager.Instance().GetGameInfo().order,
            GameManager.Instance().GetGameInfo().genreId
        );

        // // 問題文
        // QuizModalManager.Instance().GetQuestionModal().SetNumber(++GameManager.Instance().GetGameInfo().qNumber);
        // QuizModalManager.Instance().GetQuestionModal().SetSentence(GameManager.Instance().GetGameInfo().qSentence);
        
        // 選択肢
        QuizModalManager.Instance().GetChoicesModal().SetQuestion(GameManager.Instance().GetGameInfo().qSentence);
        for(var i : number = 0; i < QuizManager.Instance().GetChoiceMax(); i++){
            QuizModalManager.Instance().GetChoicesModal().SetChoices(i, GameManager.Instance().GetGameInfo().qSelectSent[i], GameManager.Instance().GetGameInfo().qSprite[i]);
        }
        
        // 結果
        QuizModalManager.Instance().GetChoicesModal().GetResultModal().SetAnswerLabel(GameManager.Instance().GetGameInfo().qCorNumber ,GameManager.Instance().GetGameInfo().qSelectSent[GameManager.Instance().GetGameInfo().qCorNumber]);
    }

    public Reset(){
        this.mType = 'None';
        this.mNumber = 0;
        this.mSentence = "";
    }

    public GetQuizData():QuizData{
        return this.mData;
    }
}

