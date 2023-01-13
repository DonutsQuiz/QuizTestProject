System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Graphics, Label, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, Timer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Graphics = _cc.Graphics;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f3195VlRHhFTIegXMbSPrFq", "Timer", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Graphics', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Timer", Timer = (_dec = ccclass('Timer'), _dec2 = property(Graphics), _dec3 = property(Label), _dec(_class = (_class2 = class Timer extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "time_circle", _descriptor, this);

          _initializerDefineProperty(this, "time_display", _descriptor2, this);

          this.elapsed_time = 0;
          this.time_limit = 1800.0;
          this.isFinish = false;
          this.isEnd = false;
        }

        start() {}

        Reset() {
          this.elapsed_time = 0;
        }

        SetTimeLimit(limit) {
          this.time_limit = limit;
        }

        GetTimeLeft() {
          return this.time_limit - this.elapsed_time;
        }

        GetIsFinish() {
          return this.isFinish;
        }

        GetIsEnd() {
          return this.isEnd;
        }

        Display() {
          if (this.isFinish) this.isFinish = false;
          var second = Math.ceil((this.time_limit - this.elapsed_time) / 60.0);
          var minutes = Math.floor(second / 60.0);
          second %= 60; // 時間を表示

          this.time_display.string = ("00" + minutes).slice(-2) + ":" + ("00" + second).slice(-2); //　時間（サークル）を表示

          var _endAngle = (0.5 - 2.0 * (this.elapsed_time / this.time_limit)) * Math.PI; // console.log(_endAngle);


          this.time_circle.fillColor.fromHEX('#00FFFF');
          this.time_circle.lineWidth = 2;
          this.time_circle.clear();
          this.time_circle.arc(0, 0, 30, 0.5 * Math.PI, _endAngle, true);
          this.time_circle.lineTo(0, 0);
          this.time_circle.close();
          this.time_circle.stroke();
          this.time_circle.fill();

          if (this.elapsed_time < this.time_limit) {
            this.elapsed_time += 1;
          } else {
            if (!this.isEnd) {
              this.isEnd = true;
              this.isFinish = true;
            }
          }
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "time_circle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "time_display", [_dec3], {
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
//# sourceMappingURL=b1c5652e2aeb880536d254cbeb27bbd712df8dce.js.map