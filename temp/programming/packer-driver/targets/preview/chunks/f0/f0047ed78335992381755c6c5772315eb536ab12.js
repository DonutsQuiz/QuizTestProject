System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, SpriteFrame, _dec, _class, _crd, ccclass, property, GameInformation;

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
      SpriteFrame = _cc.SpriteFrame;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cc9fcP1vs9HMpaozry+lA4V", "GameInformation", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameInformation", GameInformation = (_dec = ccclass('GameInformation'), _dec(_class = class GameInformation {
        constructor() {
          this.qType = 'None';
          this.qNumber = 0;
          this.qSentence = "";
          this.qCorNumber = 0;
          this.qCorSent = "";
          this.pIncSent = new String[3]();
          this.qCorSprite = null;
          this.qIncSprite = new SpriteFrame[3]();
          this.coins = 20000;
          this.thinkTime = 600;
        } // 制限時間


      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f0047ed78335992381755c6c5772315eb536ab12.js.map