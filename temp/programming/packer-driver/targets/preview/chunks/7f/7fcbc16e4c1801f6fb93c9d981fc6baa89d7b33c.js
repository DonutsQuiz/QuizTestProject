System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, QuizData, _dec, _class, _crd, ccclass, property, GestureData;

  function _reportPossibleCrUseOfQuizData(extras) {
    _reporterNs.report("QuizData", "../QuizComponent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      QuizData = _unresolved_2.QuizData;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a6789ag7uFOCbGUDs533o0s", "GestureData", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GestureData", GestureData = (_dec = ccclass('GestureData'), _dec(_class = class GestureData extends (_crd && QuizData === void 0 ? (_reportPossibleCrUseOfQuizData({
        error: Error()
      }), QuizData) : QuizData) {
        constructor() {
          super(...arguments);
          this.mSprite = void 0;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7fcbc16e4c1801f6fb93c9d981fc6baa89d7b33c.js.map