import { _decorator, Component, Node,Label } from 'cc';
import { GameManager } from '../Game/Manager/GameManager';
import { QuizModalManager } from '../Game/Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('ApiConnection2')
export class ApiConnection2 extends Component {
    apiURL:string = "http://mixch-live-game-quiz-dev-1389688123.ap-northeast-1.elb.amazonaws.com/api/";

    private gameId = -1;


    onGet(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }
        let url = this.apiURL + "ranking/getMonthlyRanking?hostUserId=123456&year=2023&month=1";
        xhr.open("GET",url,true);
        xhr.send();
    }

    registerHost(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
                this.gameId = jsonData.GameId;
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }

        let postURL = this.apiURL + `game/registerHost`;
        xhr.open("POST",postURL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        let data = {
            userId: 123456789,
            token: "asiodjioqwjoajsdjjsakmvbd"
        };
        xhr.send(JSON.stringify(data));
    }

    // クイズ生成
    createQuiz(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
                GameManager.Instance().GetGameInfo().qSentence = jsonData.Question;
                GameManager.Instance().GetGameInfo().qSelectSent = jsonData.Choices;
                GameManager.Instance().GetGameInfo().hintSentence = jsonData.Hints;
                GameManager.Instance().GetGameInfo().qGenre = jsonData.Genre;
                QuizModalManager.Instance().GetQuestionModal().SetQuizInfoUI();
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }

        let postURL = this.apiURL + `game/createQuiz`;
        xhr.open("POST",postURL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        let data = {
            userId: 123456789,
            token: "asiodjioqwjoajsdjjsakmvbd",
            gameId: this.gameId,
            order: 1,
            genreId: 10001
        };
        xhr.send(JSON.stringify(data));
    }

    setAnswer(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }

        let postURL = this.apiURL + `game/setAnswer`;
        xhr.open("POST",postURL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        let data = {
            userId: 123456789,
            token: "asiodjioqwjoajsdjjsakmvbd",
            gameId: this.gameId,
            order: 2,
            choiceId: 2

        };
        xhr.send(JSON.stringify(data));
    }
}

