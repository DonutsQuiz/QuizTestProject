import { _decorator, Component, Node } from 'cc';
import { PersonalData } from './Data/QuizData';
import { QuizComponent } from './QuizComponent';
const { ccclass, property } = _decorator;

@ccclass('PersonalQuiz')
export class PersonalQuiz extends QuizComponent {

    mData : PersonalData;

    start() {

    }

    update(deltaTime: number) {
        
    }

    public Initialize(){

    }
}

