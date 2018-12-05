var optionSceneInitialized = false;

var OptionLayer = cc.Layer.extend({
    selects: null,

    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();
        var sprite = cc.Sprite.create(res.background);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.5);
        this.addChild(sprite, 0);

        var dialogbg = cc.Sprite.create(res.dialogbg);
        dialogbg.setPosition(size.width / 2, size.height / 2);
        dialogbg.setScale(1);
        this.addChild(dialogbg, 1);

        var text = new ccui.Text();
        text.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "Select No. of Cards:",
            font: "Arial",
            color: cc.color(0,0,0),
            x: size.width / 2,
            y: size.height /2 + 80
        });
        this.addChild(text, 2);

        var button = new ccui.Button();
        button.setTitleText("PLAY");
        button.loadTextures(res.playbg);
        button.setTitleColor(cc.color(0, 0, 0));
        button.x = size.width / 2;
        button.y = size.height / 2 - 70;
        this.addChild(button, 2);
        button.setTouchEnabled(true);
        button.addTouchEventListener(this.onPlay, this);

        this.selects = [];
        for (i = 5; i < 9; i ++){
            var select = new CheckLabel(res.selectnormalbg, 
                res.selectbg, res.selectbg,
                "Arial", 14, cc.color(0,0,0));
            select.setText(i);
            select.x = size.width / 2;
            select.y = size.height / 2 - 27*(i-7);
            this.addChild(select, 2);
            select.addTouchEventListener(this.onSelect, this);
            this.selects.push(select);
        }
        this.selects[0].setSelected(true);
    },
    onPlay: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        for (i = 0; i < this.selects.length; i ++){
            if (this.selects[i].isSelected()){
                sta.selectCount = i+5;
                cc.director.pushScene(new GameScene());
                sta.curScene = con.scenegame;
                break;
            }
        }
    },
    onSelect: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        
        for (i = 0; i < this.selects.length; i ++){
            if (sender == this.selects[i]){
            }
            else{
                this.selects[i].setSelected(false);
            }
        }
    }
});

var OptionScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (optionSceneInitialized)
            return;
        optionSceneInitialized = true;

        var layer = new OptionLayer();
        this.addChild(layer);

        var navLayer = new NavigationLayer();
        this.addChild(navLayer);
    }
});
