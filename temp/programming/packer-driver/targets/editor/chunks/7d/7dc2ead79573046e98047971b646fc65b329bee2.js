System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, GestureDataBase, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, QuizDataBase;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGestureDataBase(extras) {
    _reporterNs.report("GestureDataBase", "./GestureDataBase", _context.meta, extras);
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
    }, function (_unresolved_2) {
      GestureDataBase = _unresolved_2.GestureDataBase;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91ce4q5nQ1Ab48lBm8whcZo", "QuizDataBase", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuizDataBase", QuizDataBase = (_dec = ccclass('QuizDataBase'), _dec2 = property(_crd && GestureDataBase === void 0 ? (_reportPossibleCrUseOfGestureDataBase({
        error: Error()
      }), GestureDataBase) : GestureDataBase), _dec(_class = (_class2 = (_class3 = class QuizDataBase extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "gesture", _descriptor, this);
        }

        static Instance() {
          if (!QuizDataBase.instance) {
            QuizDataBase.instance = new QuizDataBase();
          }

          return QuizDataBase.instance;
        }

        start() {
          QuizDataBase.instance = this;
        }

        update(deltaTime) {}

        GetGestureDataBase() {
          return this.gesture;
        }

      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gesture", [_dec2], {
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
//# sourceMappingURL=7dc2ead79573046e98047971b646fc65b329bee2.js.map