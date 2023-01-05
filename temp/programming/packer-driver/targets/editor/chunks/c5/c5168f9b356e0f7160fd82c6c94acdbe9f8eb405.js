System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _dec2, _class3, _crd, ccclass, property, QuizType, QuizData, QuizComponent;

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

      _export("QuizComponent", QuizComponent = (_dec2 = ccclass('QuizComponent'), _dec2(_class3 = class QuizComponent extends Component {
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

      }) || _class3));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c5168f9b356e0f7160fd82c6c94acdbe9f8eb405.js.map