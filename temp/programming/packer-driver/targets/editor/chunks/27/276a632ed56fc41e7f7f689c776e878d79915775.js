System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, math, GameManager, QuizModalManager, QuizDataBase, QuizComponent, _dec, _class, _crd, ccclass, property, GestureQuiz;

  function _reportPossibleCrUseOfClientMode(extras) {
    _reporterNs.report("ClientMode", "../Manager/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Manager/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizModalManager(extras) {
    _reporterNs.report("QuizModalManager", "../Manager/QuizModalManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGestureData(extras) {
    _reporterNs.report("GestureData", "./Data/QuizData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizDataBase(extras) {
    _reporterNs.report("QuizDataBase", "./Data/QuizDataBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizComponent(extras) {
    _reporterNs.report("QuizComponent", "./QuizComponent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      math = _cc.math;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }, function (_unresolved_3) {
      QuizModalManager = _unresolved_3.QuizModalManager;
    }, function (_unresolved_4) {
      QuizDataBase = _unresolved_4.QuizDataBase;
    }, function (_unresolved_5) {
      QuizComponent = _unresolved_5.QuizComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "97fb89wqPpOUqr/cntQXCe2", "GestureQuiz", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame', 'math', 'SphereColliderComponent']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GestureQuiz", GestureQuiz = (_dec = ccclass('GestureQuiz'), _dec(_class = class GestureQuiz extends (_crd && QuizComponent === void 0 ? (_reportPossibleCrUseOfQuizComponent({
        error: Error()
      }), QuizComponent) : QuizComponent) {
        constructor(...args) {
          super(...args);
          this.mSprite = void 0;
          this.mData = void 0;
          this.debugClientMode = 'Liver';
        }

        start() {}

        update(deltaTime) {
          this.DebugClientMode();
        }

        SetQuiz() {
          // デバッグよう(本当はサーバーからもらってくる)
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qNumber = this.mNumber;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qSentence = this.mSentence;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qAnswer = this.mData.mAnswer;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qSprite = this.mData.mSprite; // 問題文

          this.mData = (_crd && QuizDataBase === void 0 ? (_reportPossibleCrUseOfQuizDataBase({
            error: Error()
          }), QuizDataBase) : QuizDataBase).Instance().GetData('Gesture', this.DecisionAnswer());
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetNumber(++this.mNumber);

          if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetClientMode() === 'Liver') {
            (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSentence(this.mSentence = "この顔を演じてください");
          } else {
            (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSentence(this.mSentence = "どの顔文字を演じているでしょう");
          }

          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSprite(this.mSprite = this.mData.mSprite); // 選択肢

          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().SetQuestion("どの顔を演じている?");
          var temp = [-1, -1, -1, -1, -1, -1];

          for (var i = 0; i < 6; i++) {
            var select;

            if (i === 0) {
              select = "A.";
            } else if (i === 1) {
              select = "B.";
            } else if (i === 2) {
              select = "C.";
            } else if (i === 3) {
              select = "D.";
            } else if (i === 4) {
              select = "E.";
            } else if (i === 5) {
              select = "F.";
            }

            if (i === this.mData.mAnswer) {
              (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
                error: Error()
              }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().SetChoices(i, select, this.mData.mSprite);
              temp[i] = this.mData.mIndex;
            } else {
              var tempdata = null;

              do {
                tempdata = (_crd && QuizDataBase === void 0 ? (_reportPossibleCrUseOfQuizDataBase({
                  error: Error()
                }), QuizDataBase) : QuizDataBase).Instance().GetData('Gesture', this.DecisionAnswer());
                var result = false;

                for (var n = 0; n < temp.length; n++) {
                  if (tempdata.mIndex === this.mData.mIndex || temp[n] === tempdata.mIndex) {
                    result = false;
                    break;
                  }

                  if (temp[n] === -1) {
                    temp[n] = tempdata.mIndex;
                    result = true;
                    break;
                  }
                }
              } while (!result);

              (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
                error: Error()
              }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().SetChoices(i, select, tempdata.mSprite);
            }
          } // 結果


          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetResultModal().SetAnswerLabel(this.mData.mAnswer, "");
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetResultModal().SetAnswerSprite(this.mSprite);
        }

        Initialize() {
          super.Reset();
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().Initialize(this.mType = 'Gesture');
          this.mSprite = null; // 問題の画像

          this.mData = null;
        }

        DecisionAnswer() {
          var count = (_crd && QuizDataBase === void 0 ? (_reportPossibleCrUseOfQuizDataBase({
            error: Error()
          }), QuizDataBase) : QuizDataBase).Instance().GetDataList('Gesture').length;
          return math.randomRangeInt(0, count);
        } // public GetData() : GestureData{
        //     return this.mData;
        // }


        DebugClientMode() {
          if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetClientMode() != this.debugClientMode) {
            if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).Instance().GetClientMode() === 'Liver') {
              this.mSentence = "この顔を演じてください";
              this.debugClientMode = 'Liver';
            } else {
              this.mSentence = "どの顔を演じているでしょう";
              this.debugClientMode = 'User';
            }

            (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSentence(this.mSentence);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=276a632ed56fc41e7f7f689c776e878d79915775.js.map