import { _decorator, Component, Node,Label } from 'cc';
import { GameManager } from '../Game/Manager/GameManager';
import { QuizModalManager } from '../Game/Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('ApiConnection2')
export class ApiConnection2 extends Component {
    apiURL:string = "http://mixch-live-game-quiz-dev-1389688123.ap-northeast-1.elb.amazonaws.com/api/";

    private gameId = -1;
    private hostId = 123456789;
    private gestId = 987654321;
    private token = "asiodjioqwjoajsdjjsakmvbd";
    private date : Date = new Date();


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


    // ホストを登録
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
            userId: this.hostId,
            token: this.token
        };
        xhr.send(JSON.stringify(data));
    }


    // ゲストを登録
    registerGuest(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                // let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                // console.log(jsonData);
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }

        let postURL = this.apiURL + `game/registerGuest`;
        xhr.open("POST",postURL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        let data = {
            userId: this.gestId,
            token: this.token,
            gameId: this.gameId,
            hostUserId: this.hostId
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
                GameManager.Instance().GetGameInfo().qSentence = jsonData.Quiz;
                GameManager.Instance().GetGameInfo().qSelectSent = jsonData.Choices;
                GameManager.Instance().GetGameInfo().hintSentence = jsonData.Hints;
                GameManager.Instance().GetGameInfo().qGenre = jsonData.Genre;
                QuizModalManager.Instance().GetQuestionModal().SetQuizInfoUI();
                QuizModalManager.Instance().GetChoicesModal().SetQuizInfoUI();
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
            userId: this.hostId,
            token: this.token,
            gameId: this.gameId,
            order: 1,
            genreId: 10001
        };
        xhr.send(JSON.stringify(data));
    }



    // 解答の設定(ライバー)
    setAnswer(answer : number){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                // let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                // console.log(jsonData);
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
            userId: this.hostId,
            token: this.token,
            gameId: this.gameId,
            order: 1,
            choiceId: answer
        };
        xhr.send(JSON.stringify(data));
    }



    // 解答の設定(ユーザー)
    guestAnswer(answer : number){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                // let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                // console.log(jsonData);
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }

        let postURL = this.apiURL + `game/guestAnswer`;
        xhr.open("POST",postURL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        let data = {
            userId: this.gestId,
            token: this.token,
            gameId: this.gameId,
            hostUserId: this.hostId,
            order: 1,
            choiceId: answer
        };
        xhr.send(JSON.stringify(data));
    }



    // 結果の集計
    fixResult(){
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

        let postURL = this.apiURL + `game/fixResult`;
        xhr.open("POST",postURL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        let data = {
            userId: this.hostId,
            token: this.token,
            gameId: this.gameId,
            order: 1
        };
        xhr.send(JSON.stringify(data));
    }



    // 今日のランキング
    getDailyRanking(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
                GameManager.Instance().GetGameInfo().todayRankingList = jsonData.Rankings;
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }
        let url = this.apiURL + "ranking/getDailyRanking?hostUserId=" + this.hostId + "&year=" + this.date.getFullYear() + "&month=" + (this.date.getMonth() + 1) + "&day=" + this.date.getDate();
        xhr.open("GET",url,true);
        xhr.send();
    }



    // 今月のランキング
    getMonthlyRanking(){
        let date = new Date();
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
                GameManager.Instance().GetGameInfo().monthRankingList = jsonData.Rankings;
            }
        }
            //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }
        let url = this.apiURL + "ranking/getMonthlyRanking?hostUserId="+ this.hostId +"&year=" + date.getFullYear() + "&month=" + (this.date.getMonth() + 1);
        xhr.open("GET",url,true);
        xhr.send();
    }


    //グレードを取得
    getGameGrade(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
                GameManager.Instance().GetGameInfo().playCount = jsonData.PlayCount;
                GameManager.Instance().GetGameInfo().grade = jsonData.Grade;
            }
        }
            //通信が失敗
        xhr.onerror = (err) => {
            console.log("error");
            console.log(err);
        }
        let url = this.apiURL + "ranking/getGameGrade?userId=" + this.hostId + "&token=" + this.token;
        xhr.open("GET",url,true);
        xhr.send();
    }
}

