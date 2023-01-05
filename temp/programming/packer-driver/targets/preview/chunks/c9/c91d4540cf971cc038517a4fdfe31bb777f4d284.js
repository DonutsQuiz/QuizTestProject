System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, QuizManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfQuizManager(extras) {
    _reporterNs.report("QuizManager", "./QuizManager", _context.meta, extras);
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
      Button = _cc.Button;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      QuizManager = _unresolved_2.QuizManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "be307ptn3pMyIKCFZh/j5ls", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(_crd && QuizManager === void 0 ? (_reportPossibleCrUseOfQuizManager({
        error: Error()
      }), QuizManager) : QuizManager), _dec3 = property(Button), _dec4 = property(Label), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "quizManager", _descriptor, this);

          _initializerDefineProperty(this, "clientButton", _descriptor2, this);

          _initializerDefineProperty(this, "clientLabel", _descriptor3, this);

          this.clientMode = 0;
        }

        start() {
          this.clientButton.node.on(Button.EventType.CLICK, function () {});
        }

        update(deltaTime) {
          this.quizManager.OnUpdate();
        } // ライバーとユーザーの切り替え(デバッグ用)


        ChangeClientMode() {
          if (this.clientMode === 0) {
            this.clientMode = 1;
            this.clientLabel.string = "ユーザー";
          } else if (this.clientMode === 1) {
            this.clientMode = 0;
            this.clientLabel.string = "ライバー";
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "quizManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clientButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clientLabel", [_dec4], {
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
//# sourceMappingURL=c91d4540cf971cc038517a4fdfe31bb777f4d284.js.map