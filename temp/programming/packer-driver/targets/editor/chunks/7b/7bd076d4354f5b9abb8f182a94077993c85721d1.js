System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, SpriteFrame, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, QuizDataBase;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfQuizType(extras) {
    _reporterNs.report("QuizType", "../QuizComponent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGestureData(extras) {
    _reporterNs.report("GestureData", "./QuizData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQuizData(extras) {
    _reporterNs.report("QuizData", "./QuizData", _context.meta, extras);
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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91ce4q5nQ1Ab48lBm8whcZo", "QuizDataBase", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuizDataBase", QuizDataBase = (_dec = ccclass('QuizDataBase'), _dec2 = property(SpriteFrame), _dec(_class = (_class2 = (_class3 = class QuizDataBase extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sprite", _descriptor, this);

          this.dataList = new Array();
        }

        static Instance() {
          if (!QuizDataBase.instance) {
            QuizDataBase.instance = new QuizDataBase();
          }

          return QuizDataBase.instance;
        } // お試し用


        start() {
          QuizDataBase.instance = this;
        } // 要素の追加


        Add(data) {
          this.dataList.push(data);
        } // リスト内の要素を取得


        GetData(type, index) {
          for (const data of this.dataList) {
            if (data.mType === type && data.mIndex === index) {
              return data;
            }
          }

          return null;
        } // リストごと取得


        GetDataList(type) {
          var tempList = new Array();

          for (const data of this.dataList) {
            if (data.mType === type) {
              tempList.push(data);
            }
          }

          return tempList;
        } // ジェスチャーデータの初期化(お試し)


        GestureDataInitialize() {
          var data;

          for (var i = 0; i < 6; i++) {
            data.mIndex = i;
            data.mAnswer = i;
            data.mSprite = this.sprite[i];
            this.Add(data);
          }
        }

      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return Array();
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7bd076d4354f5b9abb8f182a94077993c85721d1.js.map