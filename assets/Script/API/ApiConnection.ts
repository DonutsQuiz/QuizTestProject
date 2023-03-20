import { _decorator, Component, Node,Label } from 'cc';
import {axios} from "db://assets/Script/API/packages";
import { GameManager } from '../Game/Manager/GameManager';
import { QuizModalManager } from '../Game/Manager/QuizModalManager';
// import { GameManager } from '../Game/Manager/GameManager';
// import { QuizModalManager } from '../Game/Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('ApiConnection')
export class ApiConnection extends Component {
    apiURL:string = "http://mixch-live-game-quiz-dev-1389688123.ap-northeast-1.elb.amazonaws.com/api/";

    private gameId:number = 2;


    // ホストの設定
    async registerHost(userId:number,token:string){
        let data = {userId:userId,token:token};
        let config = {
            headers:{
                "Content-Type": "application/json"
            }
        };

        return await axios.post(this.apiURL + `game/registerHost`,data,config)
            .then((response)=>{
                let data = JSON.parse(atob(response.data));
                GameManager.Instance().GetGameInfo().gameId = data.GameId;
                GameManager.Instance().GetGameInfo().genreSetList = data.GenreSet;
                GameManager.Instance().GetGameInfo().todayRankingList = data.DailyRankings;
                GameManager.Instance().GetGameInfo().prevMonthRankingList = data.PrevMonthlyRankings;
                console.log(GameManager.Instance().GetGameInfo().genreSetList);
                return data;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // ゲストの設定
    async registerGuest(userId:number,token:string,gameId:number,hostId:number){
        let data = {userId:userId,token:token,gameId:gameId,hostUserId:hostId};
        let config = {
            headers:{
                "Content-Type": "application/json"
            }
        };

        return await axios.post(this.apiURL + `game/registerGuest`,data,config)
            .then((response)=>{
                // let data = JSON.parse(atob(response.data));
                // return data;
                return response;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // クイズの生成
    async createQuiz(userId:number,token:string, gameId:number, genreId:number){
        let data = {userId:userId,token:token,gameId:gameId,order:1,genreId:genreId};
        let config = {
            headers:{
                "Content-Type": "application/json"
            }
        };

        return await axios.post(this.apiURL + `game/createQuiz`,data,config)
            .then((response)=>{
                let data = JSON.parse(atob(response.data));
                console.log(data);
                GameManager.Instance().GetGameInfo().qSentence = data.Quiz;
                GameManager.Instance().GetGameInfo().qSelectSent = data.Choices;
                GameManager.Instance().GetGameInfo().hintSentence = data.Hints;
                GameManager.Instance().GetGameInfo().qGenre = data.Genre;
                QuizModalManager.Instance().GetQuestionModal().SetQuizInfoUI();
                QuizModalManager.Instance().GetChoicesModal().SetQuizInfoUI();
                return data;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // /// ゲストの設定
    // async registerGuest(userId:number,token:string,gameId:number,hostId:number){
    //     let data = {userId:userId,token:token,gameId:gameId,hostUserId:hostId};
    //     let config = {
    //         headers:{
    //             "Content-Type": "application/json"
    //         }
    //     };
    
    //     return await axios.post(this.apiURL + `game/registerGuest`,data,config)
    //         .then((response)=>{
    //             // let data = JSON.parse(atob(response.data));
    //             // return data;
    //             return response;
    //         })
    //         .catch((error)=>{
    //             console.log("error");
    //             console.log(error);
    //             return error;
    //         });
    // }



    //test
    registerHost2(userId:number,token:string){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log("registerHost2");
                console.log(res);
                console.log(jsonData);
            }
        }
        //通信が失敗
        xhr.onerror = (err) => {
            console.log("register 2 error");
            console.log(err);
        }

        let postURL = this.apiURL + `game/registerHost`;
        xhr.open("POST",postURL,true);
        xhr.setRequestHeader("Content-Type","application/json");
        let data = {
            userId: userId,
            token: token
        };
        xhr.send(JSON.stringify(data));
    }

    // クイズ生成
    createQuiz2(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            //通信が成功
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)){
                let res = atob(xhr.responseText); //base 64にエンコードされたレスポンスをデコードする
                let jsonData = JSON.parse(res); //json化を行う
                console.log(res);
                console.log(jsonData);
                // GameManager.Instance().GetGameInfo().qSentence = jsonData.Question;
                // GameManager.Instance().GetGameInfo().qSelectSent = jsonData.Choices;
                // GameManager.Instance().GetGameInfo().hintSentence = jsonData.Hints;
                // GameManager.Instance().GetGameInfo().qGenre = jsonData.Genre;
                // QuizModalManager.Instance().GetQuestionModal().SetQuizInfoUI();
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

