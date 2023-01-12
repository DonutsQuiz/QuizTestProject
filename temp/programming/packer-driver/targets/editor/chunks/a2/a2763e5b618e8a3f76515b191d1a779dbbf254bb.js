System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, QuizType, QuizComponent;

  function _reportPossibleCrUseOfQuizData(extras) {
    _reporterNs.report("QuizData", "./Data/QuizData", _context.meta, extras);
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

      _export("QuizComponent", QuizComponent = (_dec = ccclass('QuizComponent'), _dec(_class = class QuizComponent extends Component {
        constructor(...args) {
          super(...args);
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a2763e5b618e8a3f76515b191d1a779dbbf254bb.js.map