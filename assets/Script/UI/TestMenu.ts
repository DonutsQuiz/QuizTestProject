import { _decorator, Component, Node, Button, ButtonComponent, Enum, NodeEventType } from 'cc';
import { QuizManager } from '../Game/Manager/QuizManager';
import { QuizModalManager } from '../Game/Manager/QuizModalManager';
import { QuestionModal } from '../Game/Modal/QuestionModal';
import { QuizType } from '../Game/Quiz/QuizComponent';

const { ccclass, property } = _decorator;

@ccclass('TestMenu')
export class TestMenu extends Component {

    @property(Button)
    button : Array<Button> = new Array<Button>();

    start() {
        this.button[0].node.on(Button.EventType.CLICK, function(){this.ClickFunction('Gesture')},this);
        this.button[1].node.on(Button.EventType.CLICK, function(){this.ClickFunction('Act')},this);
        this.button[2].node.on(Button.EventType.CLICK, function(){this.ClickFunction('Personal')},this);
    }

    private ClickFunction(name : QuizType){
        QuizModalManager.Instance().GetQuestionModal().Initialize(name);
        QuizManager.Instance().SetQuizType(name);
    }
}

