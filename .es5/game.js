"use strict";

var menuSceneInitialized = false;

var MenuScene = cc.Scene.extend({

    onEnter: function onEnter() {
        this._super();

        // cc.director.setDisplayStats(false);

        if (menuSceneInitialized) return;
        menuSceneInitialized = true;

        var size = cc.director.getWinSize();
        var sprite = cc.Sprite.create(res.background);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.5);
        this.addChild(sprite, 0);

        var playItem = new ccui.Button();
        playItem.setTitleText(con.playgame);
        playItem.loadTextures(res.menubg);
        playItem.setTitleColor(cc.color(255, 255, 255));
        playItem.x = size.width / 2;
        playItem.y = size.height / 2 + 50;
        this.addChild(playItem, 2);
        playItem.setTouchEnabled(true);
        playItem.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED) return;
            cc.director.pushScene(new OptionScene());
            sta.curScene = con.sceneoption;
        }, this);

        var highItem = new ccui.Button();
        highItem.setTitleText(con.highscore);
        highItem.loadTextures(res.menubg);
        highItem.setTitleColor(cc.color(255, 255, 255));
        highItem.x = size.width / 2;
        highItem.y = size.height / 2;
        this.addChild(highItem, 2);
        highItem.setTouchEnabled(true);
        highItem.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED) return;
            cc.director.pushScene(new HighscoreScene());
            sta.curScene = con.scenehighscore;
        }, this);

        var instItem = new ccui.Button();
        instItem.setTitleText(con.instruction);
        instItem.loadTextures(res.menubg);
        instItem.setTitleColor(cc.color(255, 255, 255));
        instItem.x = size.width / 2;
        instItem.y = size.height / 2 - 50;
        this.addChild(instItem, 2);
        instItem.setTouchEnabled(true);
        instItem.addTouchEventListener(function (sender, type) {
            if (type != ccui.Widget.TOUCH_ENDED) return;
            cc.director.pushScene(new InstructionScene());
            sta.curScene = con.sceneinstruction;
        }, this);

        var navLayer = new NavigationLayer();
        this.addChild(navLayer);
        sta.curScene = con.scenemenu;
    }
});