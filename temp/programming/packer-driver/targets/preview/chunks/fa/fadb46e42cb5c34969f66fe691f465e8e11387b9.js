System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, ChoicesModal, QuestionModal, ResultModal, QuizComponent, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _crd, ccclass, property, QuizManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfChoicesModal(extras) {
    _reporterNs.report("ChoicesModal", "./Modal/ChoicesModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuestionModal(extras) {
    _reporterNs.report("QuestionModal", "./Modal/QuestionModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResultModal(extras) {
    _reporterNs.report("ResultModal", "./Modal/ResultModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizComponent(extras) {
    _reporterNs.report("QuizComponent", "./QuizComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizData(extras) {
    _reporterNs.report("QuizData", "./QuizComponent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Button = _cc.Button;
    }, function (_unresolved_2) {
      ChoicesModal = _unresolved_2.ChoicesModal;
    }, function (_unresolved_3) {
      QuestionModal = _unresolved_3.QuestionModal;
    }, function (_unresolved_4) {
      ResultModal = _unresolved_4.ResultModal;
    }, function (_unresolved_5) {
      QuizComponent = _unresolved_5.QuizComponent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "de4c0/K585NhqGr0Dzkd6Gm", "QuizManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'profiler', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuizManager", QuizManager = (_dec = ccclass('QuizManager'), _dec2 = property(_crd && QuestionModal === void 0 ? (_reportPossibleCrUseOfQuestionModal({
        error: Error()
      }), QuestionModal) : QuestionModal), _dec3 = property(_crd && ChoicesModal === void 0 ? (_reportPossibleCrUseOfChoicesModal({
        error: Error()
      }), ChoicesModal) : ChoicesModal), _dec4 = property(_crd && ResultModal === void 0 ? (_reportPossibleCrUseOfResultModal({
        error: Error()
      }), ResultModal) : ResultModal), _dec5 = property(_crd && QuizComponent === void 0 ? (_reportPossibleCrUseOfQuizComponent({
        error: Error()
      }), QuizComponent) : QuizComponent), _dec6 = property(Button), _dec(_class = (_class2 = (_class3 = class QuizManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "questionModal", _descriptor, this);

          _initializerDefineProperty(this, "choicesModal", _descriptor2, this);

          _initializerDefineProperty(this, "resultModal", _descriptor3, this);

          _initializerDefineProperty(this, "quizComponent", _descriptor4, this);

          _initializerDefineProperty(this, "startButton", _descriptor5, this);

          this.answerData = null;
        }

        static Instance() {
          if (!QuizManager.instance) {
            QuizManager.instance = new QuizManager();
          }

          return QuizManager.instance;
        }

        start() {
          this.startButton.node.on(Button.EventType.CLICK, function () {
            this.QuestionPhase();
            this.startButton.node.active = false;
          }, this);
        }

        OnUpdate() {
          this.AnswerPhase();
        } // 出題


        QuestionPhase() {
          this.quizComponent.Initialize();
          this.quizComponent.SetQuiz();
        } // 


        AnswerPhase() {
          if (this.choicesModal.GetChoics() > -1) {
            this.resultModal.SetInfo(this.choicesModal.GetChoics(), this.quizComponent.GetQuizData());
          }
        } // 出題
        // 回答
        // 答え合わせ


      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "questionModal", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "choicesModal", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "resultModal", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "quizComponent", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "startButton", [_dec6], {
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
//# sourceMappingURL=fadb46e42cb5c34969f66fe691f465e8e11387b9.js.map