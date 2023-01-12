System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Button, Vec3, Sprite, GameManager, QuizModalManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, QuestionModal;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Manager/GameManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizModalManager(extras) {
    _reporterNs.report("QuizModalManager", "../Manager/QuizModalManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizType(extras) {
    _reporterNs.report("QuizType", "../Quiz/QuizComponent", _context.meta, extras);
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
      Label = _cc.Label;
      Button = _cc.Button;
      Vec3 = _cc.Vec3;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }, function (_unresolved_3) {
      QuizModalManager = _unresolved_3.QuizModalManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8f505dW075BBrirWGbRu7Nb", "QuestionModal", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Button', 'Vec2', 'Vec3', 'SpriteFrame', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuestionModal", QuestionModal = (_dec = ccclass('QuestionModal'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(Sprite), _dec7 = property(Button), _dec8 = property(Button), _dec9 = property(Label), _dec(_class = (_class2 = class QuestionModal extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "qNumber", _descriptor, this);

          _initializerDefineProperty(this, "qSentence", _descriptor2, this);

          _initializerDefineProperty(this, "qSelect", _descriptor3, this);

          _initializerDefineProperty(this, "qImageFrame", _descriptor4, this);

          _initializerDefineProperty(this, "qSpriteFrame", _descriptor5, this);

          _initializerDefineProperty(this, "qStartB", _descriptor6, this);

          _initializerDefineProperty(this, "qSelectB", _descriptor7, this);

          _initializerDefineProperty(this, "qWaitLabel", _descriptor8, this);

          this.debugClientMode = 0;
          this.debugQuizMode = 'None';
        }

        start() {
          this.qStartB.node.on(Button.EventType.CLICK, function () {
            (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().ChangeModal('Choices');
          }, this);
        }

        update(deltaTime) {
          this.DebugModalUpdate();
        }

        SetNumber(num) {
          this.qNumber.string = "第" + num.toString() + "問";
        }

        SetSentence(sent) {
          this.qSentence.string = sent;
        }

        SetSelect(sele) {
          for (const sent in sele) {
            this.qSelect.string += sent;
          }
        }

        SetSprite(sprite) {
          this.qSpriteFrame.spriteFrame = sprite;
        }

        Initialize(qtype) {
          this.debugQuizMode = qtype;
          this.node.active = true;
          this.qNumber.node.active = true;
          this.qSentence.node.active = true;
          this.qSelect.node.active = false;
          this.qImageFrame.active = false;
          this.qSpriteFrame.node.active = false;
          this.qStartB.node.active = false;
          this.qSelectB.forEach(element => {
            element.node.active = false;
          });
          this.qWaitLabel.node.active = false;

          if (qtype === 'Gesture') {
            // ジェスチャー
            if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
              error: Error()
            }), GameManager) : GameManager).Instance().GetClientMode() === 0) {
              this.qSentence.node.setPosition(new Vec3(0, 75, 0));
              this.qSentence.fontSize = 23;
              this.qImageFrame.active = true;
              this.qSpriteFrame.node.active = true;
              this.qStartB.node.active = true;
              this.debugClientMode = 0;
            } else {
              this.qSentence.node.setPosition(new Vec3(0, 0, 0));
              this.qSentence.fontSize = 19;
              this.qWaitLabel.node.active = true;
              this.debugClientMode = 1;
            }
          } else if (qtype === 'Act') {
            // アクト
            this.qSentence.node.setPosition(new Vec3(0, 50, 0));
            this.qStartB.node.active = true;
          } else if (qtype === 'Quiz') {
            // クイズ
            this.qSentence.node.setPosition(new Vec3(0, 75, 0));
            this.qSelect.node.active = true;
            this.qSelectB.forEach(element => {
              element.node.active = true;
            });
          }
        }

        DebugModalUpdate() {
          if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetClientMode() != this.debugClientMode) {
            this.node.active = true;
            this.qNumber.node.active = true;
            this.qSentence.node.active = true;
            this.qSelect.node.active = false;
            this.qImageFrame.active = false;
            this.qSpriteFrame.node.active = false;
            this.qStartB.node.active = false;
            this.qSelectB.forEach(element => {
              element.node.active = false;
            });
            this.qWaitLabel.node.active = false;

            if (this.debugQuizMode === 'Gesture') {
              // ジェスチャー
              if ((_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
                error: Error()
              }), GameManager) : GameManager).Instance().GetClientMode() === 0) {
                this.qSentence.node.setPosition(new Vec3(0, 75, 0));
                this.qSentence.fontSize = 23;
                this.qImageFrame.active = true;
                this.qSpriteFrame.node.active = true;
                this.qStartB.node.active = true;
                this.debugClientMode = 0;
              } else {
                this.qSentence.node.setPosition(new Vec3(0, 0, 0));
                this.qSentence.fontSize = 19;
                this.qWaitLabel.node.active = true;
                this.debugClientMode = 1;
              }
            } else if (this.debugQuizMode === 'Act') {
              // アクト
              this.qSentence.node.setPosition(new Vec3(0, 50, 0));
              this.qStartB.node.active = true;
            } else if (this.debugQuizMode === 'Quiz') {
              // クイズ
              this.qSentence.node.setPosition(new Vec3(0, 75, 0));
              this.qSelect.node.active = true;
              this.qSelectB.forEach(element => {
                element.node.active = true;
              });
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "qNumber", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "qSentence", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "qSelect", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "qImageFrame", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "qSpriteFrame", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "qStartB", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "qSelectB", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Array();
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "qWaitLabel", [_dec9], {
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
//# sourceMappingURL=d6397c7509efba8acb2d31e2330243ad0f355f41.js.map