var instructionSceneInitialized = false;
var curIndex = 0;

var IndicatorLayer = cc.Layer.extend({
    indicatorText: null,
    prevBtn: null,
    nextBtn: null,

    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();

        // indicator
        this.indicatorText = new ccui.Text();
        this.indicatorText.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "",
            font: "Arial 8px",
            color: cc.color(0,0,0),
            x: size.width / 2,
            y: size.height /2 - 300
        });
        this.addChild(this.indicatorText);

        this.prevBtn = new ccui.Button();
        this.prevBtn.loadTextures(res.prev);
        this.prevBtn.x = size.width / 2 - 200;
        this.prevBtn.y = size.height / 2 - 300;
        this.addChild(this.prevBtn);
        this.prevBtn.setTouchEnabled(true);
        this.prevBtn.addTouchEventListener(this.onPrev, this);

        this.nextBtn = new ccui.Button();
        this.nextBtn.loadTextures(res.next);
        this.nextBtn.x = size.width / 2 + 200;
        this.nextBtn.y = size.height / 2 - 300;
        this.addChild(this.nextBtn);
        this.nextBtn.setTouchEnabled(true);
        this.nextBtn.addTouchEventListener(this.onNext, this);

        this.setIndex(0);
    },
    setText: function (text) {
        this.indicatorText.setString(text);
    },
    setIndex: function(idx) {
        curIndex = idx;
        this.setText(indicatorValues[curIndex]);
        
        if (curIndex == 0)
            this.prevBtn.setVisible(false);
        else
            this.prevBtn.setVisible(true);
        
        if (curIndex == indicatorValues.length - 1)
            this.nextBtn.setVisible(false);
        else
            this.nextBtn.setVisible(true);

        if (this.getParent())
            this.getParent().imageLayer.setIndex(curIndex);
    },
    onPrev: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        if (curIndex > 0)
            this.setIndex(curIndex - 1);
    },
    onNext: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        if (curIndex < indicatorValues.length - 1)
            this.setIndex(curIndex + 1);
    }
});

var ImageLayer = cc.Layer.extend({
    sprites: null,

    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();

        this.sprites = [];
        for (i = 0; i < instructionValues.length; i ++){
            var sprite = cc.Sprite.create(instructionValues[i]);
            sprite.setPosition(size.width / 2, size.height / 2 + 50);
            sprite.setScale(0.6);
            this.addChild(sprite);
            this.sprites.push(sprite);
        }

        this.setIndex(0);
    },
    setIndex: function(idx) {
        curIndex = idx;
        for (i = 0; i < this.sprites.length; i ++){
            this.sprites[i].setVisible(false);
        }
        this.sprites[curIndex].setVisible(true);
    }
});

var InstructionLayer = cc.Layer.extend({
    indicatorLayer: null,
    imageLayer: null,

    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();

        var layBackground = cc.LayerColor.create(cc.color(255,255,255));

        //var sprite = cc.Sprite.create(res.background);
        //sprite.setPosition(size.width / 2, size.height / 2);
        //sprite.setScale(0.5);
        this.addChild(layBackground, 0);
        
        this.imageLayer = new ImageLayer();
        this.addChild(this.imageLayer, 1);
        
        this.indicatorLayer = new IndicatorLayer();
        this.addChild(this.indicatorLayer, 1);
    }
});

var InstructionScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (instructionSceneInitialized)
            return;
        instructionSceneInitialized = true;

        var layer = new InstructionLayer();
        this.addChild(layer);

        var navLayer = new NavigationLayer();
        this.addChild(navLayer);
    }
});
