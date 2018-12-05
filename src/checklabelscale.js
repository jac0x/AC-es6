var CheckBoxLayer = ccui.CheckBox.extend({
    ctor: function(normal, clicked, selected, touchEnabled = true) {
        this._super();

        this.loadTextures(normal, clicked, selected);
        this.setTouchEnabled(touchEnabled);
    }
});

var CheckLabelScale = cc.Layer.extend({
    valSprite: null,
    checkbox: null,
    data: null,

    ctor: function(normal, clicked, selected, touchEnabled = true) {
        this._super();

        this.checkbox = new CheckBoxLayer(normal, clicked, selected,touchEnabled);
        this.addChild(this.checkbox, 0);

        this.valSprite = null;
    },
    setText: function(text) {
        //this.label.setString(text);
    },
    setSize: function(w, h) {
        if (w != -1)
            this.checkbox.setScaleX(w / this.checkbox.width);
        if (h != -1)
            this.checkbox.setScaleY(h / this.checkbox.height);
    },
    setValue: function(data) {
        this.data = data;
        if (this.valSprite != null)
            this.removeChild(this.valSprite);
        
        if (this.data.type == con.typeType)
            this.valSprite = cc.Sprite.create(typeValues[this.data.value]);
        else
            this.valSprite = cc.Sprite.create(angleChars[this.data.value]);
        this.valSprite.setPosition(0, 0);
        this.valSprite.setScale(1);
        this.addChild(this.valSprite, 1);
    }
});
