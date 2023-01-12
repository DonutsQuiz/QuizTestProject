System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _crd, ccclass, property, GameInformation;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cc9fcP1vs9HMpaozry+lA4V", "GameInformation", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameInformation", GameInformation = (_dec = ccclass('GameInformation'), _dec(_class = class GameInformation {
        constructor() {
          this.qNumber = 0;
          this.qAnswer = 0;
          this.qSentence = "";
          this.coins = 20000;
          this.thinkTime = 600;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=72b751fa8c8513262e11e25d5061b7d9908879b6.js.map