"use strict";

var completedSceneInitialized = false;

var CompletedLayer = cc.Layer.extend({
    selects: null,

    ctor: function ctor() {
        this._super();

        var size = cc.director.getWinSize();
        var sprite = cc.Sprite.create(res.background);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.5);
        this.addChild(sprite, 0);

        var completedbg = cc.Sprite.create(res.completedbg);
        completedbg.setPosition(size.width / 2, size.height / 2 - 80);
        completedbg.setScale(1);
        this.addChild(completedbg, 1);

        var title = new ccui.Text();
        title.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "Completed Sets",
            font: "Arial",
            fontSize: 24,
            color: cc.color(255, 255, 255),
            x: size.width / 2,
            y: size.height - 30
        });
        this.addChild(title, 2);

        var play = new ccui.Text();
        play.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "CONTINUE PLAYING",
            font: "Arial",
            fontSize: 12,
            color: cc.color(0, 0, 0),
            x: size.width / 2,
            y: 30
        });
        this.addChild(play, 2);
        play.setTouchEnabled(true);
        play.addTouchEventListener(this.onContinue, this);

        this.addCompleted(size);
    },
    addCompleted: function addCompleted(size) {
        var curY = con.itemStartY;
        for (i = 0; i < g_candis.length; i++) {
            var titled = false;
            for (var j = 0; j < g_candis[i].length; j++) {
                if (g_candis[i][j].state == con.canCompleted) {
                    if (!titled) {
                        var titlebg = cc.Sprite.create(res.titlebg);
                        titlebg.setPosition(size.width / 2, curY);
                        this.addChild(titlebg, 3);
                        var titleTxt = new ccui.Text();
                        titleTxt.setAnchorPoint(0, 0.5);
                        titleTxt.attr({
                            textAlign: cc.TEXT_ALIGNMENT_LEFT,
                            string: connectionTypes[i],
                            font: "Arial",
                            color: cc.color(0, 0, 0),
                            x: 10,
                            y: curY - 3
                        });
                        this.addChild(titleTxt, 4);
                        curY -= con.itemHeight;
                        titled = true;
                    }
                    var itembg = cc.Sprite.create(res.itembg);
                    itembg.setPosition(size.width / 2, curY);
                    this.addChild(itembg, 3);
                    var itemTxt = new ccui.Text();
                    itemTxt.setAnchorPoint(0, 0.5);
                    itemTxt.attr({
                        textAlign: cc.TEXT_ALIGNMENT_LEFT,
                        string: g_candis[i][j].angA + 1 + " and " + (g_candis[i][j].angB + 1),
                        font: "Arial",
                        color: cc.color(0, 0, 0),
                        x: 10,
                        y: curY - 3
                    });
                    this.addChild(itemTxt, 4);
                    curY -= con.itemHeight;
                }
            }
        }
    },
    onContinue: function onContinue(sender, type) {
        if (type != ccui.Widget.TOUCH_ENDED) return;
        completedSceneInitialized = false;
        cc.director.popScene();
        sta.curScene = con.scenegame;
    }
});

var CompletedScene = cc.Scene.extend({
    onEnter: function onEnter() {
        this._super();

        if (completedSceneInitialized) return;
        completedSceneInitialized = true;

        var layer = new CompletedLayer();
        this.addChild(layer);

        var navLayer = new NavigationLayer();
        this.addChild(navLayer);
    }
});