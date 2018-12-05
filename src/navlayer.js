var NavigationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();

        var back = new ccui.Text();
        back.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "Back",
            font: "Arial",
            color: cc.color(200,200,200),
            x: size.width - 40,
            y: 20
        });

        back.setTouchEnabled(true);
        back.addTouchEventListener(this.onTouch, this);
        this.addChild(back, 1);
    },
    onTouch: function (sender, type){
        /*switch (type)
        {
            case ccui.Widget.TOUCH_CANCELLED:
                break;  
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;

            case ccui.Widget.TOUCH_ENDED:
                break;
        }*/
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        switch (sta.curScene) {
            case con.scenemenu:
                cc.log("exit");
                //menuSceneInitialized = false;
                //cc.director.popScene();
                //sta.curScene = con.scenemenu;
                break;
            case con.sceneoption:
                optionSceneInitialized = false;
                cc.director.popScene();
                sta.curScene = con.scenemenu;
                break;
            case con.scenegame:
                gameSceneInitialized = false;
                cc.director.popScene();
                sta.curScene = con.sceneoption;
                break;
            case con.scenehighscore:
                highscoreSceneInitialized = false;
                cc.director.popScene();
                sta.curScene = con.scenemenu;
                break;
            case con.sceneinstruction:
                instructionSceneInitialized = false;
                cc.director.popScene();
                sta.curScene = con.scenemenu;
                break;
            case con.scenecompleted:
                completedSceneInitialized = false;
                cc.director.popScene();
                sta.curScene = con.scenegame;
                break;
        }
    }
});
