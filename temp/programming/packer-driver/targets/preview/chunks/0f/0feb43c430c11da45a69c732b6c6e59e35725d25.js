System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, math, QuizModalManager, GestureDataBase, QuizComponent, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, GestureQuiz;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfQuizModalManager(extras) {
    _reporterNs.report("QuizModalManager", "../Manager/QuizModalManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGestureData(extras) {
    _reporterNs.report("GestureData", "./Data/GestureData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGestureDataBase(extras) {
    _reporterNs.report("GestureDataBase", "./Data/GestureDataBase", _context.meta, extras);
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
      QuizModalManager = _unresolved_2.QuizModalManager;
    }, function (_unresolved_3) {
      GestureDataBase = _unresolved_3.GestureDataBase;
    }, function (_unresolved_4) {
      QuizComponent = _unresolved_4.QuizComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "97fb89wqPpOUqr/cntQXCe2", "GestureQuiz", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame', 'math', 'SphereColliderComponent']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GestureQuiz", GestureQuiz = (_dec = ccclass('GestureQuiz'), _dec2 = property(_crd && GestureDataBase === void 0 ? (_reportPossibleCrUseOfGestureDataBase({
        error: Error()
      }), GestureDataBase) : GestureDataBase), _dec(_class = (_class2 = class GestureQuiz extends (_crd && QuizComponent === void 0 ? (_reportPossibleCrUseOfQuizComponent({
        error: Error()
      }), QuizComponent) : QuizComponent) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "dataList", _descriptor, this);

          this.mSprite = void 0;
          this.mData = void 0;
        }

        start() {}

        update(deltaTime) {}

        SetQuiz() {
          // 問題文
          this.mData = this.dataList.GetData(this.DecisionAnswer());
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetNumber(++this.mNumber);
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSentence(this.mSentence = "この顔を演じてください");
          (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetQuestionModal().SetSprite(this.mSprite = this.mData.mSprite); // 選択肢

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
                tempdata = this.dataList.GetData(this.DecisionAnswer());
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
          return math.randomRangeInt(0, this.dataList.GetAllData().length);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dataList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0feb43c430c11da45a69c732b6c6e59e35725d25.js.map