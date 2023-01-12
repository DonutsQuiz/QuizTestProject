import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerInfomation')
export class PlayerInfomation extends Component {

    coins : number = 20000;
    thinkTime : number = 600;
}

