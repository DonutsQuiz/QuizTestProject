System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, Color, Sprite, UITransform, Size, GameManager, QuizModalManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, ResultModal;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfClientMode(extras) {
    _reporterNs.report("ClientMode", "../Manager/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Manager/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizModalManager(extras) {
    _reporterNs.report("QuizModalManager", "../Manager/QuizModalManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizData(extras) {
    _reporterNs.report("QuizData", "../Quiz/Data/QuizData", _context.meta, extras);
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
      UITransform = _cc.UITransform;
      Size = _cc.Size;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }, function (_unresolved_3) {
      QuizModalManager = _unresolved_3.QuizModalManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6169eWeG3xIQ6FgYSngok17", "ResultModal", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'labelAssembler', 'Label', 'SpriteFrame', 'Color', 'Sprite', 'UITransform', 'Vec2', 'Size']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ResultModal", ResultModal = (_dec = ccclass('ResultModal'), _dec2 = property(Button), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Sprite), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Sprite), _dec(_class = (_class2 = class ResultModal extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "nextButton", _descriptor, this);

          _initializerDefineProperty(this, "resultLabel", _descriptor2, this);

          _initializerDefineProperty(this, "answerLabel", _descriptor3, this);

          _initializerDefineProperty(this, "answerSprite", _descriptor4, this);

          _initializerDefineProperty(this, "coinLabel", _descriptor5, this);

          _initializerDefineProperty(this, "answerSentence", _descriptor6, this);

          _initializerDefineProperty(this, "answerImage", _descriptor7, this);

          this.isNext = false;
          this.debugClientMode = 'Liver';
        }

        start() {
          this.nextButton.node.on(Button.EventType.CLICK, function () {
            (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().ChangeModal('Question');
            this.isNext = true;
          }, this);
        }

        update(deltaTime) {
          this.DebugModalUpdate();
        }

        SetInfo(choice, data) {
          if (choice === (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetGameInfo().qAnswer) {
            this.resultLabel.string = "正解";
            this.resultLabel.color = new Color(0, 255, 0, 255);
            this.coinLabel.node.active = true;
          } else {
            this.resultLabel.string = "不正解";
            this.resultLabel.color = new Color(255, 0, 0, 255);
            this.coinLabel.node.active = false;
          }

          if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetClientMode() === 'Liver') {
            this.nextButton.node.active = true;
            this.coinLabel.node.active = false;
            this.debugClientMode = 'Liver';
          } else {
            this.nextButton.node.active = false;
            this.coinLabel.node.active = true;
            this.debugClientMode = 'User';
          }
        }

        SetAnswerSprite(sprite) {
          this.answerImage.spriteFrame = sprite;
          this.answerImage.getComponent(UITransform).setContentSize(new Size(36, 36));
        }

        SetAnswerLabel(ansnum, label) {
          this.answerSentence.string = "答えは";

          if (ansnum === 0) {
            this.answerSentence.string += "A.";
          } else if (ansnum === 1) {
            this.answerSentence.string += "B.";
          } else if (ansnum === 2) {
            this.answerSentence.string += "C.";
          } else if (ansnum === 3) {
            this.answerSentence.string += "D.";
          } else if (ansnum === 4) {
            this.answerSentence.string += "E.";
          } else if (ansnum === 5) {
            this.answerSentence.string += "F.";
          }

          this.answerSentence.string += "!!!";
        }

        SetCoinLabel(coin) {
          this.coinLabel.string = coin + "コイン獲得!!";
        }

        DebugModalUpdate() {
          if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetClientMode() != this.debugClientMode) {
            if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).Instance().GetClientMode() === 'Liver') {
              this.nextButton.node.active = true;
              this.coinLabel.node.active = false;
              this.debugClientMode = 'Liver';
            } else {
              this.nextButton.node.active = false;
              this.coinLabel.node.active = true;
              this.debugClientMode = 'User';
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nextButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resultLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "answerLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "answerSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "coinLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "answerSentence", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "answerImage", [_dec8], {
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
//# sourceMappingURL=2b18b8dba3521ff5a89ed3186b39c5cf70cc4097.js.map