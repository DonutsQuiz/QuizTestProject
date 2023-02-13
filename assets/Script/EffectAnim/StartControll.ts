import { _decorator, Component, Node, Animation, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartControll')
export class StartControll extends Component {
    @property({type: Animation})
    public StartAnim: Animation|null = null;
    @property(Label)
    private quizLable: Label = null;

    start() {
        this.StartAnim.node.active = false
        let animation = this.StartAnim.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTriggered, this);
    }

    public Play()
    {
        if(this.StartAnim && !this.StartAnim.node.active)
        {
            this.StartAnim.node.active = true;
            this.StartAnim.play('StartAnim');
        }
    }   

    // public SetQuizLabel(cliant: string)
    // {
    //     if(cliant == 'User'){
    //         this.quizLable.string = "クイズ";
    //     }
    //     else if(cliant == 'Liver'){
    //         this.quizLable.string = "推し検定";
    //     }
    // }

    public SetQuizLabel(qlabel: string)
    {
        this.quizLable.string = qlabel;
    }

    public AnimationReset()
    {
        this.StartAnim.node.active = false;
    }
    
    public onTriggered(arg: number)
    {
        
    }
}

