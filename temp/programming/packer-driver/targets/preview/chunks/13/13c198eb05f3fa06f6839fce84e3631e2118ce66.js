System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, GestureData, _dec, _class, _crd, ccclass, property, QuizData;

  function _reportPossibleCrUseOfQuizType(extras) {
    _reporterNs.report("QuizType", "../QuizComponent", _context.meta, extras);
  }

  _export("GestureData", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9d856iXH+RIA6x66h8NblJf", "QuizData", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuizData", QuizData = (_dec = ccclass('QuizData'), _dec(_class = class QuizData {
        constructor() {
          this.mType = 'None';
          this.mIndex = -1;
          this.mAnswer = -1;
        }

      }) || _class));

      _export("GestureData", GestureData = class GestureData extends QuizData {
        constructor() {
          super(...arguments);
          this.mSprite = null;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=13c198eb05f3fa06f6839fce84e3631e2118ce66.js.map