System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Slider, Button, Label, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, BetModal;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Slider = _cc.Slider;
      Button = _cc.Button;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6dbcck0PKVF9pqdfIt6xnvK", "BetModal", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Slider', 'Button', 'Label', 'labelAssembler', 'convertUtils', 'math']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BetModal", BetModal = (_dec = ccclass('BetModal'), _dec2 = property(Node), _dec3 = property(Slider), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Label), _dec7 = property(Button), _dec(_class = (_class2 = class BetModal extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "self", _descriptor, this);

          _initializerDefineProperty(this, "betSlider", _descriptor2, this);

          _initializerDefineProperty(this, "betButtonList", _descriptor3, this);

          _initializerDefineProperty(this, "decideButton", _descriptor4, this);

          _initializerDefineProperty(this, "valueLabel", _descriptor5, this);

          _initializerDefineProperty(this, "closeButton", _descriptor6, this);

          this.coins = 20000;
          this.betValue = 0;
          this.criteriaPoint = 0;
        }

        start() {
          this.decideButton.node.on(Button.EventType.CLICK, function () {
            this.self.active = false;
          }, this);
          this.closeButton.node.on(Button.EventType.CLICK, function () {
            this.self.active = false;
          }, this);
          this.betButtonList[0].node.on(Button.EventType.CLICK, function () {
            this.betValue += 10;
          }, this);
          this.betButtonList[1].node.on(Button.EventType.CLICK, function () {
            this.betValue += 100;
          }, this);
          this.betButtonList[2].node.on(Button.EventType.CLICK, function () {
            this.betValue += 1000;
          }, this);
          this.betButtonList[3].node.on(Button.EventType.CLICK, function () {
            this.betValue = this.coins;
          }, this);
          this.criteriaPoint = this.coins / 10;
        }

        update(deltaTime) {
          this.BetSlider();
        }

        BetSlider() {
          this.betValue = Math.round(this.coins * this.betSlider.progress);
          this.valueLabel.string = this.betValue.toString();
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
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2cad8f2e8f0ca9945b932932ec2f03c926dd27be.js.map