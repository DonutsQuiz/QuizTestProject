System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, QuestionModal, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TestMenu;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfQuestionModal(extras) {
    _reporterNs.report("QuestionModal", "./Quiz/Modal/QuestionModal", _context.meta, extras);
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
    }, function (_unresolved_2) {
      QuestionModal = _unresolved_2.QuestionModal;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fe959re92NM44IhUKzgyHXU", "TestMenu", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'ButtonComponent', 'Enum', 'NodeEventType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TestMenu", TestMenu = (_dec = ccclass('TestMenu'), _dec2 = property(Button), _dec3 = property(_crd && QuestionModal === void 0 ? (_reportPossibleCrUseOfQuestionModal({
        error: Error()
      }), QuestionModal) : QuestionModal), _dec(_class = (_class2 = class TestMenu extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "button", _descriptor, this);

          _initializerDefineProperty(this, "modal", _descriptor2, this);
        }

        start() {
          this.button[0].node.on(Button.EventType.CLICK, function () {
            this.ClickFunction('Gesture');
          }, this);
          this.button[1].node.on(Button.EventType.CLICK, function () {
            this.ClickFunction('Act');
          }, this);
          this.button[2].node.on(Button.EventType.CLICK, function () {
            this.ClickFunction('Quiz');
          }, this);
        }

        ClickFunction(name) {
          this.modal.Initialize(name);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "button", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Array();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "modal", [_dec3], {
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
//# sourceMappingURL=5c39636790f5af460ee40fc11253b988b2ded46f.js.map