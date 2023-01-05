System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, SpriteFrame, GestureData, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, GestureDataBase;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGestureData(extras) {
    _reporterNs.report("GestureData", "./GestureData", _context.meta, extras);
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
      SpriteFrame = _cc.SpriteFrame;
    }, function (_unresolved_2) {
      GestureData = _unresolved_2.GestureData;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6325f6JcUlOjoybJ2MAb+6L", "GestureDataBase", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GestureDataBase", GestureDataBase = (_dec = ccclass('GestureDataBase'), _dec2 = property(SpriteFrame), _dec(_class = (_class2 = class GestureDataBase extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sprite", _descriptor, this);

          this.data = new Array();
        }

        start() {
          for (var i = 0; i < 6; i++) {
            var temp = new (_crd && GestureData === void 0 ? (_reportPossibleCrUseOfGestureData({
              error: Error()
            }), GestureData) : GestureData)();
            temp.mSprite = this.sprite[i];
            temp.mAnswer = i;
            temp.mIndex = i;
            this.Add(temp);
          }
        }

        Add(data) {
          this.data.push(data);
        }

        GetAllData() {
          return this.data;
        }

        GetData(index) {
          return this.data[index];
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Array();
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c661c6a40c84e11bc5d69110d5f96f6fcb9e8d12.js.map