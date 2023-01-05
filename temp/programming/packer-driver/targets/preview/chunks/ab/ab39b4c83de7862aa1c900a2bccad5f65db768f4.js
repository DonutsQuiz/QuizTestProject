System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Button, QuizModalManager, UserInfomation, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, OverallResultModal;

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
      Label = _cc.Label;
      Button = _cc.Button;
    }, function (_unresolved_2) {
      QuizModalManager = _unresolved_2.QuizModalManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "60303lw86JBQoj9t3HW+SQC", "OverallResultModal", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'PageView', 'Label', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);
      UserInfomation = class UserInfomation {
        constructor(name, coin) {
          this.mName = void 0;
          this.mCoin = void 0;
          this.mName = name;
          this.mCoin = coin;
        }

      };

      _export("OverallResultModal", OverallResultModal = (_dec = ccclass('OverallResultModal'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Button), _dec(_class = (_class2 = class OverallResultModal extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "rankName", _descriptor, this);

          _initializerDefineProperty(this, "rankCoin", _descriptor2, this);

          _initializerDefineProperty(this, "nextButton", _descriptor3, this);

          this.userList = new Array();
          this.displayNumber = 10;
        }

        start() {
          this.TestPlayerInfo();

          for (var i = 0; i < this.displayNumber; i++) {
            this.rankName[i].string = (i + 1).toString() + "位 : " + this.userList[i].mName;
            this.rankCoin[i].string = this.userList[i].mCoin + "コイン";
          }

          this.nextButton.node.on(Button.EventType.CLICK, function () {
            (_crd && QuizModalManager === void 0 ? (_reportPossibleCrUseOfQuizModalManager({
              error: Error()
            }), QuizModalManager) : QuizModalManager).Instance().ChangeModal('Question');
          });
        }

        update(deltaTime) {}

        TestPlayerInfo() {
          this.userList.push(new UserInfomation("パンダ", 10000));
          this.userList.push(new UserInfomation("キリン", 9000));
          this.userList.push(new UserInfomation("マングース", 8000));
          this.userList.push(new UserInfomation("インパラ", 7000));
          this.userList.push(new UserInfomation("シロクマ", 6000));
          this.userList.push(new UserInfomation("ライオン", 5000));
          this.userList.push(new UserInfomation("サイ", 4000));
          this.userList.push(new UserInfomation("ゾウ", 3000));
          this.userList.push(new UserInfomation("カメレオン", 2000));
          this.userList.push(new UserInfomation("サメ", 1000));
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rankName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Array();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rankCoin", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Array();
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nextButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ab39b4c83de7862aa1c900a2bccad5f65db768f4.js.map