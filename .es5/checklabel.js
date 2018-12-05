"use strict";

var CheckLabel = ccui.CheckBox.extend({
    label: null,

    ctor: function ctor(normal, clicked, selected, fName, fSize, fColor) {
        var touchEnabled = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

        this._super();

        this.loadTextures(normal, clicked, selected);
        this.setTouchEnabled(touchEnabled);

        this.label = new ccui.Text();
        this.label.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "texxt",
            fontName: fName,
            fontSize: fSize,
            color: fColor,
            x: this.width / 2,
            y: this.height / 2
        });

        this.addChild(this.label);
    },
    setText: function setText(text) {
        this.label.setString(text);
    }
});