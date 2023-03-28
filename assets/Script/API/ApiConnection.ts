import { _decorator, Component, Node,Label } from 'cc';
import {axios} from "db://assets/Script/API/packages";
import { GameManager } from '../Game/Manager/GameManager';
import { QuizModalManager } from '../Game/Manager/QuizModalManager';
import { GameMenu } from '../UI/GameMenu';
// import { GameManager } from '../Game/Manager/GameManager';
// import { QuizModalManager } from '../Game/Manager/QuizModalManager';
const { ccclass, property } = _decorator;

@ccclass('ApiConnection')
export class ApiConnection extends Component {
    // apiURL:string = "http://mixch-live-game-quiz-dev-1389688123.ap-northeast-1.elb.amazonaws.com/api/";
    apiURL:string = "https://quiz-dev.mgmt.game.livegame.mixch.tv/api/";

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
                console.log(data);
                GameManager.Instance().GetGameInfo().gameId = data.GameId;
                GameManager.Instance().GetGameInfo().genreSetList = data.GenreSet;
                GameManager.Instance().GetGameInfo().todayRankingList = data.DailyRankings;
                GameManager.Instance().GetGameInfo().prevMonthRankingList = data.PrevMonthlyRankings;
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
    async createQuiz(userId:number,token:string, gameId:number,order:number,genreId:number){
        let data = {userId:userId,token:token,gameId:gameId,order:order,genreId:genreId};
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


    // 解答の設定(ライバー)
    async setAnswer(userId:number,token:string,gameId:number,order:number,choice:number){
        let data = {userId:userId,token:token,gameId:gameId,order:order,choiceId:choice};
        let config = {
            headers:{
                "Content-Type": "application/json"
            }
        };
    
        return await axios.post(this.apiURL + `game/setAnswer`,data,config)
            .then((response)=>{
                return response;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // 解答の設定(ユーザー)
    async guestAnswer(userId:number,token:string,gameId:number,hostId:number,order:number,choice:number){
        let data = {userId:userId,token:token,gameId:gameId,hostUserId:hostId,order:order,choiceId:choice};
        let config = {
            headers:{
                "Content-Type": "application/json"
            }
        };
    
        return await axios.post(this.apiURL + `game/guestAnswer`,data,config)
            .then((response)=>{
                return response;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // ゲーム復旧
    async restoreGameProgress(userId:number,token:string,gameId:number,order:number){
        let data = {userId:userId,token:token,gameId:gameId,order:order};
        let config = {
            headers:{
                "Content-Type": "application/json"
            }
        };
    
        return await axios.post(this.apiURL + `game/restoreGameProgress`,data,config)
            .then((response)=>{
                let data = JSON.parse(atob(response.data));
                console.log(data);
                return data;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }



    // 結果の集計
    async fixResult(userId:number,token:string,gameId:number,order:number){
        let data = {userId:userId,token:token,gameId:gameId,order:order};
        let config = {
            headers:{
                "Content-Type": "application/json"
            }
        };
    
        return await axios.post(this.apiURL + `game/fixResult`,data,config)
            .then((response)=>{
                let data = JSON.parse(atob(response.data));
                GameManager.Instance().GetGameInfo().nowRankingList = data.QuizScoreRankings;
                for(var i  = 0; i < data.QuizScoreRankings.length; i++){
                    if(data.QuizScoreRankings[i].UserId === GameManager.Instance().GetGameInfo().userId){
                        GameManager.Instance().GetGameInfo().rankInfo = data.QuizScoreRankings[i];
                    }
                }
                console.log(data);
                console.log(GameManager.Instance().GetGameInfo().rankInfo);
                return data;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // グレードの取得
    async getGameGrade(userId:number,token:string, gameId:number,order:number){
        let data = "?userId="+userId+"&token="+token+"&gameId="+gameId+"&order="+order;
    
        return await axios.get(this.apiURL + `game/getGameGrade` + data)
            .then((response)=>{
                let data = JSON.parse(atob(response.data));
                GameManager.Instance().GetGameInfo().grade = data.Grade;
                GameManager.Instance().GetGameInfo().playCount = data.PlayCount;
                return data;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // 今日のランキング
    async getDailyRanking(hostId:number,date:Date){
        let data = "?hostUserId="+hostId+"&year="+date.getFullYear()+"&month="+(date.getMonth() + 1)+"&day="+date.getDate();
    
        return await axios.get(this.apiURL + `ranking/getDailyRanking` + data)
            .then((response)=>{
                let data = JSON.parse(atob(response.data));
                GameManager.Instance().GetGameInfo().todayRankingList = data.Rankings;
                // console.log(GameManager.Instance().GetGameInfo().todayRankingList);
                return data;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }


    // 今月のランキング
    async getMonthlyRanking(hostId:number,date:Date){
        let data = "?hostUserId="+hostId+"&year="+date.getFullYear()+"&month="+(date.getMonth() + 1);
    
        return await axios.get(this.apiURL + `ranking/getMonthlyRanking` + data)
            .then((response)=>{
                let data = JSON.parse(atob(response.data));
                GameManager.Instance().GetGameInfo().monthRankingList = data.Rankings;
                // console.log(GameManager.Instance().GetGameInfo().monthRankingList);
                return data;
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                return error;
            });
    }
}

