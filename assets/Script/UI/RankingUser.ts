import { _decorator, Component, Node, Label, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RankingUser')
export class RankingUser extends Component {

    @property(UITransform)
    private transform : UITransform = null;
    @property(Label)
    private infoLabel : Label = null;

    public SetHeight(height : number){
        this.transform.height = height;
    }

    public SetInfomation(info : string){
        this.infoLabel.string = info;
    }

    public GetInfomation() : string{
        return this.infoLabel.string;
    }
}

