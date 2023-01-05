System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, QuizModalManager, _dec, _class, _dec2, _dec3, _class3, _class4, _descriptor, _crd, ccclass, property, QuizType, QuizData, QuizComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfQuizModalManager(extras) {
    _reporterNs.report("QuizModalManager", "../Manager/QuizModalManager", _context.meta, extras);
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
      QuizModalManager = _unresolved_2.QuizModalManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "236dfgsV7xHrbQXcAUYXmx8", "QuizComponent", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);
      QuizType = {
        None: 'None',
        Gesture: 'Gesture',
        Act: 'Act',
        Quiz: 'Quiz'
      };

      _export("QuizData", QuizData = (_dec = ccclass('QuizData'), _dec(_class = class QuizData {
        constructor() {
          this.mIndex = void 0;
          this.mAnswer = void 0;
        }

      }) || _class));

      _export("QuizComponent", QuizComponent = (_dec2 = ccclass('QuizComponent'), _dec3 = property(_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
        error: Error()
      }), QuizModalManager) : QuizModalManager), _dec2(_class3 = (_class4 = class QuizComponent extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "modalManager", _descriptor, this);

          this.mType = void 0;
          this.mNumber = void 0;
          this.mSentence = void 0;
          this.mData = void 0;
        }

        Reset() {
          this.mType = 'None';
          this.mNumber = 0;
          this.mSentence = "";
        }

        GetQuizData() {
          return this.mData;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class4.prototype, "modalManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class4)) || _class3));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7968da3bc39ad17a0a3550884f2fdd092ede8e93.js.map