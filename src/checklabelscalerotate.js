var CheckBoxLayer = ccui.CheckBox.extend({
    ctor: function(normal, clicked, selected, touchEnabled = true) {
        this._super();

        this.loadTextures(normal, clicked, selected);
        this.setTouchEnabled(touchEnabled);
    }
});

var CheckLabelScaleRotate = cc.Layer.extend({
    checkbox: null,
    value: 0,

    ctor: function(normal, clicked, selected, touchEnabled = true) {
        this._super();

        this.checkbox = new CheckBoxLayer(normal, clicked, selected,touchEnabled);
        this.addChild(this.checkbox);
    },
    setValue: function(val) {
        this.value = val;
    }
});
