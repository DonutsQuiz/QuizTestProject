import { _decorator, Component, Node, PageView, Label, Button, labelAssembler } from 'cc';
import { QuizModalManager } from '../Manager/QuizModalManager';
const { ccclass, property } = _decorator;

class UserInfomation{
    constructor(name : string, coin : number){
        this.mName = name;
        this.mCoin = coin;
    }

    mName : string;
    mCoin : number;
}

@ccclass('OverallResultModal')
export class OverallResultModal extends Component {

    @property(Label)
    rankName : Array<Label> = new Array<Label>();
    @property(Label)
    rankCoin : Array<Label> = new Array<Label>();
    @property(Button)
    nextButton : Button = null;
    @property(Button)
    rankChangeButton : Button = null;
    @property(Label)
    rankChangeLabel : Label = null;
    @property(Label)
    rankLabel : Label = null;

    userList : Array<UserInfomation> = new Array<UserInfomation>();
    displayNumber : number = 10;
    nowRankMode : number = 0;

    start() {
        this.TestPlayerInfo();

        for(var i = 0; i < this.displayNumber; i++){
            this.rankName[i].string = (i + 1).toString() + "位 : " + this.userList[i].mName;
            this.rankCoin[i].string = this.userList[i].mCoin + "コイン";
        }

        this.nextButton.node.on(Button.EventType.CLICK, function(){
            QuizModalManager.Instance().ChangeModal('Question');
        })

        this.rankChangeButton.node.on(Button.EventType.CLICK, this.ChangeRanking, this);
    }

    update(deltaTime: number) {
        
    }


    private TestPlayerInfo(){
        this.userList.push(new UserInfomation("パンダ", 10000));
        this.userList.push(new UserInfomation("キリン", 9000));
        this.userList.push(new UserInfomation("マングース", 8000));
        this.userList.push(new UserInfomation("インパラ", 7000));
        this.userList.push(new UserInfomation("シロクマ", 6000));
        this.userList.push(new UserInfomation("ライオン", 5000));
        this.userList.push(new UserInfomation("サイ", 4000));
        this.userList.push(new UserInfomation("ゾウ", 3000));
        this.userList.push(new UserInfomation("カメレオン", 2000));
        this.userList.push(new UserInfomation("サメ", 1000));
    }

    private ChangeRanking(){
        if(this.nowRankMode === 0){
            this.rankLabel.string = "BETコインランキング";
            this.rankChangeLabel.string = "獲得コインランキング";
            this.nowRankMode = 1;
        }
        else{
            this.rankLabel.string = "獲得コインランキング";
            this.rankChangeLabel.string = "BETコインランキング";
            this.nowRankMode = 0;
        }
    }
}

