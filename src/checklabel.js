var CheckLabel = ccui.CheckBox.extend({
    label: null,

    ctor: function(normal, clicked, selected, fName, fSize, fColor, touchEnabled = true) {
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
    setText: function(text) {
        this.label.setString(text);
    }
});
