System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, QuizComponent, QuizModalManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _crd, ccclass, property, QuizManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfQuizComponent(extras) {
    _reporterNs.report("QuizComponent", "../Quiz/QuizComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizData(extras) {
    _reporterNs.report("QuizData", "../Quiz/QuizComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizModalManager(extras) {
    _reporterNs.report("QuizModalManager", "./QuizModalManager", _context.meta, extras);
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
      QuizComponent = _unresolved_2.QuizComponent;
    }, function (_unresolved_3) {
      QuizModalManager = _unresolved_3.QuizModalManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "de4c0/K585NhqGr0Dzkd6Gm", "QuizManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'profiler', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuizManager", QuizManager = (_dec = ccclass('QuizManager'), _dec2 = property(_crd && QuizComponent === void 0 ? (_reportPossibleCrUseOfQuizComponent({
        error: Error()
      }), QuizComponent) : QuizComponent), _dec3 = property(Button), _dec(_class = (_class2 = (_class3 = class QuizManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "quizComponent", _descriptor, this);

          _initializerDefineProperty(this, "startButton", _descriptor2, this);

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
          if ((_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
            error: Error()
          }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().GetChoics() > -1) {
            (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().GetResultModal().SetInfo((_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().GetChoicesModal().GetChoics(), this.quizComponent.GetQuizData());
          }
        }

      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "quizComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "startButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=84eb9dbf313fe6d961d015b311e709a3453a1824.js.map