"use strict";

var CheckBoxLayer = ccui.CheckBox.extend({
    ctor: function ctor(normal, clicked, selected) {
        var touchEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        this._super();

        this.loadTextures(normal, clicked, selected);
        this.setTouchEnabled(touchEnabled);
    }
});

var CheckLabelScaleRotate = cc.Layer.extend({
    checkbox: null,
    value: 0,

    ctor: function ctor(normal, clicked, selected) {
        var touchEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        this._super();

        this.checkbox = new CheckBoxLayer(normal, clicked, selected, touchEnabled);
        this.addChild(this.checkbox);
    },
    setValue: function setValue(val) {
        this.value = val;
    }
});