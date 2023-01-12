System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, GameInformation;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cc9fcP1vs9HMpaozry+lA4V", "GameInformation", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameInformation", GameInformation = (_dec = ccclass('GameInformation'), _dec(_class = class GameInformation extends Component {
        constructor() {
          super(...arguments);
          this.qNumber = 0;
          this.qAnswer = 0;
          this.coins = 20000;
          this.thinkTime = 600;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0b02d41e89bffa45236cbcb6622ed9918a69cf0a.js.map