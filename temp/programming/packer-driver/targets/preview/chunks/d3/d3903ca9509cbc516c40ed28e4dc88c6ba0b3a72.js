System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, Color, Sprite, QuestionModal, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, ResultModal;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfQuizData(extras) {
    _reporterNs.report("QuizData", "../QuizComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuestionModal(extras) {
    _reporterNs.report("QuestionModal", "./QuestionModal", _context.meta, extras);
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
      Label = _cc.Label;
      Color = _cc.Color;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      QuestionModal = _unresolved_2.QuestionModal;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6169eWeG3xIQ6FgYSngok17", "ResultModal", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'labelAssembler', 'Label', 'SpriteFrame', 'Color', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ResultModal", ResultModal = (_dec = ccclass('ResultModal'), _dec2 = property(Button), _dec3 = property(_crd && QuestionModal === void 0 ? (_reportPossibleCrUseOfQuestionModal({
        error: Error()
      }), QuestionModal) : QuestionModal), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Sprite), _dec(_class = (_class2 = class ResultModal extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "nextButton", _descriptor, this);

          _initializerDefineProperty(this, "questionModal", _descriptor2, this);

          _initializerDefineProperty(this, "resultLabel", _descriptor3, this);

          _initializerDefineProperty(this, "answerLabel", _descriptor4, this);

          _initializerDefineProperty(this, "answerSprite", _descriptor5, this);
        }

        start() {
          this.nextButton.node.on(Button.EventType.CLICK, function () {
            this.node.active = false;
            this.questionModal.node.active = true;
          }, this);
        }

        update(deltaTime) {}

        SetInfo(choice, data) {
          if (choice === data.mAnswer) {
            this.resultLabel.string = "正解";
            this.resultLabel.color = new Color(0, 255, 0, 255);
          } else {
            this.resultLabel.string = "不正解";
            this.resultLabel.color = new Color(255, 0, 0, 255);
          }
        }

        SetAnswerSprite(sprite) {
          this.answerSprite.spriteFrame = sprite;
        }

        SetAnswerLabel(ansnum, label) {
          if (ansnum === 0) {
            this.answerLabel.string = "A.";
          } else if (ansnum === 1) {
            this.answerLabel.string = "B.";
          } else if (ansnum === 2) {
            this.answerLabel.string = "C.";
          } else if (ansnum === 3) {
            this.answerLabel.string = "D.";
          } else if (ansnum === 4) {
            this.answerLabel.string = "E.";
          } else if (ansnum === 5) {
            this.answerLabel.string = "F.";
          }

          this.answerLabel.string += label;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nextButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "questionModal", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "resultLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "answerLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "answerSprite", [_dec6], {
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
//# sourceMappingURL=d3903ca9509cbc516c40ed28e4dc88c6ba0b3a72.js.map