System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Animation, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, ChipControll;

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
      Animation = _cc.Animation;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e72d8OCp29Es6SEGLDN6t2f", "ChipControll", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Animation', 'EventMouse', 'input', 'Input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ChipControll", ChipControll = (_dec = ccclass('ChipControll'), _dec2 = property({
        type: Animation
      }), _dec(_class = (_class2 = class ChipControll extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "ChipAnim", _descriptor, this);
        }

        start() {}

        Play() {
          if (this.ChipAnim) {
            this.ChipAnim.play('BetChip');
          }
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ChipAnim", [_dec2], {
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
//# sourceMappingURL=2a5ec1a68a7c96bad0a3d3798ae26c9766bfba7f.js.map