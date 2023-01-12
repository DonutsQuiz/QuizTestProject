System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Slider, Button, Label, GameManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, BetModal;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../Manager/GameManager", _context.meta, extras);
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
      Slider = _cc.Slider;
      Button = _cc.Button;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6dbcck0PKVF9pqdfIt6xnvK", "BetModal", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Slider', 'Button', 'Label', 'labelAssembler', 'convertUtils', 'math', 'isUnicodeCJK']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BetModal", BetModal = (_dec = ccclass('BetModal'), _dec2 = property(Node), _dec3 = property(Slider), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Label), _dec7 = property(Button), _dec8 = property(Label), _dec(_class = (_class2 = class BetModal extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "self", _descriptor, this);

          _initializerDefineProperty(this, "betSlider", _descriptor2, this);

          _initializerDefineProperty(this, "betButtonList", _descriptor3, this);

          _initializerDefineProperty(this, "decideButton", _descriptor4, this);

          _initializerDefineProperty(this, "valueLabel", _descriptor5, this);

          _initializerDefineProperty(this, "closeButton", _descriptor6, this);

          _initializerDefineProperty(this, "coinsLabel", _descriptor7, this);

          this.coins = 20000;
          this.betValue = 0;
          this.criteriaPoint = 0;
          this.sliderMax = 0;
          this.isDecide = false;
        }

        start() {
          this.coins = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).Instance().GetPlayerInfo().coins;
          this.coinsLabel.string = this.coins.toString();
          this.sliderMax = this.coins / 10;
          this.criteriaPoint = 1.0 / (this.coins / 10);
          this.decideButton.node.on(Button.EventType.CLICK, function () {
            this.self.active = false;
            this.isDecide = true;
          }, this);
          this.closeButton.node.on(Button.EventType.CLICK, function () {
            this.self.active = false;
          }, this);
          this.betButtonList[0].node.on(Button.EventType.CLICK, function () {
            this.betSlider.progress += this.criteriaPoint;
          }, this);
          this.betButtonList[1].node.on(Button.EventType.CLICK, function () {
            this.betSlider.progress += this.criteriaPoint * 10;
          }, this);
          this.betButtonList[2].node.on(Button.EventType.CLICK, function () {
            this.betSlider.progress += this.criteriaPoint * 100;
          }, this);
          this.betButtonList[3].node.on(Button.EventType.CLICK, function () {
            this.betSlider.progress = 1.0;
          }, this);
        }

        update(deltaTime) {
          this.BetSlider();
        }

        BetSlider() {
          if (this.betSlider.progress >= 1.0) {
            this.betSlider.progress = 1.0;
          }

          this.betValue = Math.round(this.sliderMax * this.betSlider.progress) * 10;
          this.valueLabel.string = this.betValue.toString();
        }

        SetIsDecide(dec) {
          this.isDecide = dec;
        }

        GetIsDecide() {
          return this.isDecide;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "self", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "betSlider", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "betButtonList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Array();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "decideButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "valueLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "coinsLabel", [_dec8], {
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
//# sourceMappingURL=849de1f67e103e1ad4517fe9fdbfd91e0eb3f211.js.map