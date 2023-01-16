System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, math, GameManager, QuizManager, QuizModalManager, QuizDataBase, QuizComponent, _dec, _class, _crd, ccclass, property, GestureQuiz;

  function _reportPossibleCrUseOfClientMode(extras) {
    _reporterNs.report("ClientMode", "../Manager/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Manager/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizManager(extras) {
    _reporterNs.report("QuizManager", "../Manager/QuizManager", _context.meta, extras);
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
      QuizManager = _unresolved_3.QuizManager;
    }, function (_unresolved_4) {
      QuizModalManager = _unresolved_4.QuizModalManager;
    }, function (_unresolved_5) {
      QuizDataBase = _unresolved_5.QuizDataBase;
    }, function (_unresolved_6) {
      QuizComponent = _unresolved_6.QuizComponent;
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
          // デバッグ用(本当はサーバーからもらってくる)
          this.mData = (_crd && QuizDataBase === void 0 ? (_reportPossibleCrUseOfQuizDataBase({
            error: Error()
          }), QuizDataBase) : QuizDataBase).Instance().GetData('Gesture', this.DecisionAnswer());
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qType = this.mType;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qNumber = this.mNumber;

          if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetClientMode() === 'Liver') {
            this.mSentence = "この顔を演じてください";
          } else {
            this.mSentence = "どの顔文字を演じているでしょう";
          }

          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qSentence = this.mSentence;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qCorNumber = this.mData.mAnswer;
          (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qCorSprite = this.mData.mSprite; // ここまで

          this.mData.mAnswer = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qCorNumber;
          this.mData.mSprite = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qCorSprite; // 問題文

          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetNumber(++(_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qNumber);
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSentence((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qSentence);
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSprite(this.mSprite = this.mData.mSprite); // 選択肢

          var index = 0;
          var tempind = [false, false, false];
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().SetQuestion("どの顔を演じている?");

          for (var i = 0; i < (_crd && QuizManager === void 0 ? (_reportPossibleCrUseOfQuizManager({
            error: Error()
          }), QuizManager) : QuizManager).Instance().GetChoiceMax(); i++) {
            var select;

            if (i === 0) {
              select = "A";
            } else if (i === 1) {
              select = "B";
            } else if (i === 2) {
              select = "C";
            } else if (i === 3) {
              select = "D";
            } // デバッグ用


            if (i != this.mData.mAnswer) {
              var tempdata = null;

              do {
                tempdata = (_crd && QuizDataBase === void 0 ? (_reportPossibleCrUseOfQuizDataBase({
                  error: Error()
                }), QuizDataBase) : QuizDataBase).Instance().GetData('Gesture', this.DecisionAnswer());
                var result = false;

                for (var n = 0; n < (_crd && QuizManager === void 0 ? (_reportPossibleCrUseOfQuizManager({
                  error: Error()
                }), QuizManager) : QuizManager).Instance().GetChoiceMax() - 1; n++) {
                  if (tempdata.mIndex === this.mData.mIndex || (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                    error: Error()
                  }), GameManager) : GameManager).Instance().GetGameInfo().qIncSprite[n] === tempdata.mSprite) {
                    result = false;
                    break;
                  }

                  if (tempind[n] === false) {
                    (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                      error: Error()
                    }), GameManager) : GameManager).Instance().GetGameInfo().qIncSprite[n] = tempdata.mSprite;
                    tempind[n] = true;
                    result = true;
                    break;
                  }
                }
              } while (!result);
            }

            if (i === this.mData.mAnswer) {
              (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
                error: Error()
              }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().SetChoices(i, select, (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).Instance().GetGameInfo().qCorSprite);
            } else {
              (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
                error: Error()
              }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().SetChoices(i, select, (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).Instance().GetGameInfo().qIncSprite[index]);
              index++;
            }
          } // 結果


          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().GetResultModal().SetAnswerLabel(this.mData.mAnswer, "");
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().GetResultModal().SetAnswerSprite(this.mSprite);
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
//# sourceMappingURL=9b794fa71dabeda27ce9b13387bcc0ee7b1d3d21.js.map