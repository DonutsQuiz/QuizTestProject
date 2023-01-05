System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _class2, _crd, ccclass, property, QuizDataBase;

  function _reportPossibleCrUseOfQuizType(extras) {
    _reporterNs.report("QuizType", "../QuizComponent", _context.meta, extras);
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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91ce4q5nQ1Ab48lBm8whcZo", "QuizDataBase", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("QuizDataBase", QuizDataBase = (_dec = ccclass('QuizDataBase'), _dec(_class = (_class2 = class QuizDataBase extends Component {
        constructor() {
          super(...arguments);
          this.dataList = new Array();
        }

        static Instance() {
          if (!QuizDataBase.instance) {
            QuizDataBase.instance = new QuizDataBase();
          }

          return QuizDataBase.instance;
        }

        start() {
          QuizDataBase.instance = this;
        } // 要素の追加


        Add(data) {
          this.dataList.push(data);
        } // リスト内の要素を取得


        GetData(type, index) {
          for (var data of this.dataList) {
            if (data.mType === type && data.mIndex === index) {
              return data;
            }
          }

          return null;
        } // リストごと取得


        GetDataList(type) {
          var tempList = new Array();

          for (var data of this.dataList) {
            if (data.mType === type) {
              tempList.push(data);
            }
          }

          return tempList;
        }

      }, _class2.instance = void 0, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f27e800b842a24ce29eb62f85316612bba083d6c.js.map