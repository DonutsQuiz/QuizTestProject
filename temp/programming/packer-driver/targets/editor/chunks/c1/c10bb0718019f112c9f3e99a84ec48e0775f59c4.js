System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, instantiate, Prefab, ChoicesModal, OverallResultModal, QuestionModal, ResultModal, WaitModal, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _crd, ccclass, property, ModalType, QuizModalManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfChoicesModal(extras) {
    _reporterNs.report("ChoicesModal", "../Modal/ChoicesModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfOverallResultModal(extras) {
    _reporterNs.report("OverallResultModal", "../Modal/OverallResultModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuestionModal(extras) {
    _reporterNs.report("QuestionModal", "../Modal/QuestionModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResultModal(extras) {
    _reporterNs.report("ResultModal", "../Modal/ResultModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWaitModal(extras) {
    _reporterNs.report("WaitModal", "../Modal/User/WaitModal", _context.meta, extras);
  }

  function _reportPossibleCrUseOfClientMode(extras) {
    _reporterNs.report("ClientMode", "./GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "./GameManager", _context.meta, extras);
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
      Node = _cc.Node;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      ChoicesModal = _unresolved_2.ChoicesModal;
    }, function (_unresolved_3) {
      OverallResultModal = _unresolved_3.OverallResultModal;
    }, function (_unresolved_4) {
      QuestionModal = _unresolved_4.QuestionModal;
    }, function (_unresolved_5) {
      ResultModal = _unresolved_5.ResultModal;
    }, function (_unresolved_6) {
      WaitModal = _unresolved_6.WaitModal;
    }, function (_unresolved_7) {
      GameManager = _unresolved_7.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e8e61oQ30BNjrMIzO7wTeiS", "QuizModalManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'instantiate', 'Prefab', 'Canvas', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);
      ModalType = {
        None: 'None',
        Question: 'Question',
        Choices: 'Choices',
        Result: 'Result',
        Overall: 'Overall',
        Wait: 'Wait'
      };

      _export("QuizModalManager", QuizModalManager = (_dec = ccclass('QuizModalManager'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec(_class = (_class2 = (_class3 = class QuizModalManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "canvas", _descriptor, this);

          _initializerDefineProperty(this, "questionPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "choicesPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "resultPrefab", _descriptor4, this);

          _initializerDefineProperty(this, "overallPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "waitPrefab", _descriptor6, this);

          this.question = null;
          this.choices = null;
          this.result = null;
          this.overall = null;
          this.wait = null;
          this.debugClientMode = 'Liver';
          this.debugNowType = 'Question';
        }

        static Instance() {
          if (!QuizModalManager.instance) {
            QuizModalManager.instance = new QuizModalManager();
          }

          return QuizModalManager.instance;
        }

        start() {
          QuizModalManager.instance = this;
          var temp = instantiate(this.questionPrefab);
          temp.setParent(this.canvas);
          temp.active = false;
          this.question = temp.getComponent(_crd && QuestionModal === void 0 ? (_reportPossibleCrUseOfQuestionModal({
            error: Error()
          }), QuestionModal) : QuestionModal);
          temp = instantiate(this.choicesPrefab);
          temp.setParent(this.canvas);
          temp.active = false;
          this.choices = temp.getComponent(_crd && ChoicesModal === void 0 ? (_reportPossibleCrUseOfChoicesModal({
            error: Error()
          }), ChoicesModal) : ChoicesModal);
          temp = instantiate(this.resultPrefab);
          temp.setParent(this.canvas);
          temp.active = false;
          this.result = temp.getComponent(_crd && ResultModal === void 0 ? (_reportPossibleCrUseOfResultModal({
            error: Error()
          }), ResultModal) : ResultModal);
          temp = instantiate(this.overallPrefab);
          temp.setParent(this.canvas);
          temp.active = false;
          this.overall = temp.getComponent(_crd && OverallResultModal === void 0 ? (_reportPossibleCrUseOfOverallResultModal({
            error: Error()
          }), OverallResultModal) : OverallResultModal);
          temp = instantiate(this.waitPrefab);
          temp.setParent(this.canvas);
          temp.active = false;
          this.wait = temp.getComponent(_crd && WaitModal === void 0 ? (_reportPossibleCrUseOfWaitModal({
            error: Error()
          }), WaitModal) : WaitModal);
        }

        update(deltaTime) {
          this.DebugClientMode();
        }

        OnUpdate(deltaTime) {}

        ChangeModal(nextType) {
          if (nextType === 'Question') {
            this.result.node.active = false;
            this.overall.node.active = false;
            this.question.node.active = true;
          } else if (nextType === 'Choices') {
            this.question.node.active = false;
            this.choices.node.active = true;
          } else if (nextType === 'Result') {
            this.choices.node.active = false;
            this.result.node.active = true;
          } else if (nextType === 'Overall') {
            this.question.node.active = false;
            this.choices.node.active = false;
            this.overall.node.active = true;
          }

          this.debugNowType = nextType;
        }

        GetQuestionModal() {
          return this.question;
        }

        GetChoicesModal() {
          return this.choices;
        }

        GetResultModal() {
          return this.result;
        }

        GetOverallResultModal() {
          return this.overall;
        }

        DebugClientMode() {
          if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetClientMode() != this.debugClientMode) {
            this.debugClientMode = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).Instance().GetClientMode();

            if (this.debugClientMode === 'Liver') {
              if (this.debugNowType === 'Question') {
                this.wait.node.active = false;
                this.question.node.active = true;
              } else if (this.debugNowType === 'Choices') {
                this.choices.node.active = true;
              } else if (this.debugNowType === 'Result') {
                this.result.node.active = true;
              } else if (this.debugNowType === 'Overall') {
                this.overall.node.active = true;
              }
            } else if (this.debugClientMode === 'User') {
              if (this.debugNowType === 'Question') {
                this.wait.node.active = true;
                this.question.node.active = false;
              } else if (this.debugNowType === 'Choices') {
                this.choices.node.active = true;
              } else if (this.debugNowType === 'Result') {
                this.result.node.active = true;
              } else if (this.debugNowType === 'Overall') {
                this.overall.node.active = true;
              }
            }
          }
        }

      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "questionPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "choicesPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "resultPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "overallPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "waitPrefab", [_dec7], {
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
//# sourceMappingURL=c10bb0718019f112c9f3e99a84ec48e0775f59c4.js.map