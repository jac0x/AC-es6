var gameSceneInitialized = false;

var counter = 0;
var selectedType = 0;
var selectedCandi = 0;
var ready = false;
var dialogOpen = false;

var BoardLayer = cc.Layer.extend({
    resetBg: null,
    showBg: null,
    txtMove: null,
    txtCompleted: null,
    angles: [],
    moves: 0,
    angA: 0,
    angB: 0,

    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();
        var originX = size.width / 2;
        var originY = size.height / 2 + 75;

        this.txtMove = new ccui.Text();
        this.txtMove.setAnchorPoint(0, 0);
        this.txtMove.attr({
            textAlign: cc.TEXT_ALIGNMENT_LEFT,
            string: "Moves : 0",
            font: "Arial",
            x: 10,
            y: size.height - 25
        });
        this.addChild(this.txtMove);
        this.moves = 0;

        this.txtCompleted = new ccui.Text();
        this.txtCompleted.setAnchorPoint(1, 0);
        this.txtCompleted.attr({
            textAlign: cc.TEXT_ALIGNMENT_RIGHT,
            string: "Completed List",
            font: "Arial",
            x: size.width - 10,
            y: size.height - 25
        });
        this.addChild(this.txtCompleted);
        this.txtCompleted.setTouchEnabled(true);
        this.txtCompleted.addTouchEventListener(this.onCompleted, this);

        var gamebg = cc.Sprite.create(res.gamebg);
        gamebg.setPosition(originX, originY);
        this.addChild(gamebg, 0);

        this.resetBg = cc.Sprite.create(res.resetbg);
        this.resetBg.setPosition(originX, originY);
        this.addChild(this.resetBg, 1);

        this.showBg = cc.Sprite.create(res.showbg);
        this.showBg.setPosition(originX, originY);
        this.addChild(this.showBg, 1);

        this.angles = [];
        var xOffs = [30, 62, 16, 48];
        var yOffs = [84, 78, 47, 42];
        for (i = 0; i < angleValues.length / 2; i ++ ){
            var angle = new CheckLabelScaleRotate(angleNormalValues[i], angleValues[i], angleValues[i]);
            angle.x = originX + xOffs[i];
            angle.y = originY + yOffs[i];
            angle.checkbox.addTouchEventListener(this.onAngle, this);
            angle.setValue(i);
            this.addChild(angle);
            this.angles.push(angle);
        }
        for (i = 0; i < angleValues.length / 2; i ++ ){
            var angle = new CheckLabelScaleRotate(angleNormalValues[i], angleValues[i], angleValues[i]);
            angle.x = originX + xOffs[i] - 76;
            angle.y = originY + yOffs[i] - 94;
            angle.checkbox.addTouchEventListener(this.onAngle, this);
            angle.setValue(i+angleValues.length/2);
            this.addChild(angle);
            this.angles.push(angle);
        }
        this.init();
    },
    init: function() {
        // hideAll
        this.showBg.setVisible(false);

        for (i = 0; i < this.angles.length; i ++){
            this.angles[i].checkbox.setSelected(false);
            this.angles[i].setVisible(false);
        }

        // init moves
        this.moves = 0;
        this.txtMove.setString("Moves : " + this.moves);
    },
    onReplay: function(container = this) {
        container.getParent().canLayer.init();
        container.init();
    },
    onCompleted: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        if (dialogOpen){
            return;
        }
        
        cc.director.pushScene(new CompletedScene());
        sta.curScene = con.scenecompleted;
    },
    place: function() {
        g_candis[selectedType][selectedCandi].state = con.canCompleted;
        if (!this.getParent().canLayer.place()){
            showMessageBoxOkCancel(this, "Game over...",
            "Completed puzzle in " + this.moves + " moves...",
            this.onReplay, null, "PLAY AGAIN", "CANCEL");
            setHighscore(this.moves);
        }
    },
    refresh: function() {
        // hideAll
        this.showBg.setVisible(false);

        for (i = 0; i < this.angles.length; i ++){
            this.angles[i].checkbox.setSelected(false);
            this.angles[i].setVisible(false);
        }
    },
    getReady: function () {
        counter = 0;

        this.showBg.setVisible(true);

        for (i = 0; i < this.angles.length; i ++){
            this.angles[i].checkbox.setSelected(false);
            this.angles[i].setVisible(true);
        }
    },
    onAngle: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        if (dialogOpen){
            sender.setSelected(!sender.isSelected());
            return;
        }
        else if (ready){
            counter ++;
            if (counter == 1){
                this.angA = sender.getParent().value;
            }
            else if (counter == 2){
                this.angB = sender.getParent().value;

                if ((g_candis[selectedType][selectedCandi].angA == this.angA && g_candis[selectedType][selectedCandi].angB == this.angB) || 
                    (g_candis[selectedType][selectedCandi].angA == this.angB && g_candis[selectedType][selectedCandi].angB == this.angA)){
                    if (g_candis[selectedType][selectedCandi].state != con.canCompleted){
                        // increase Move
                        this.moves ++;
                        this.txtMove.setString("Moves : " + this.moves);
                    }
                    showMessageBoxOK(this, "Success", "Set Is Correctly Placed.", null);
                    this.place();
                    this.refresh();
                }
                else{
                    // increase Move
                    this.moves ++;
                    this.txtMove.setString("Moves : " + this.moves);

                    showMessageBoxOkCancel(this, "Try again",
                    "That is an incorrect place for the set.",
                    null, this.onNewTry, "TRY AGAIN", "CANCEL");
                    
                    this.getReady();
                }
                sender.setSelected(true);
            }
        }
        else{
            showMessageBoxOK(this, "Invalid move", 
                "You must select 3 cards before playing on the circle.", 
                null);
            sender.setSelected(!sender.isSelected());
        }
    },
    onNewTry: function (container = this) {
        container.refresh();
        container.getParent().canLayer.refresh();
    }
});

var CanLayer = cc.Layer.extend({
    candidates: null,
    boardState: null,

    ctor:function (selCnt) {
        this._super();

        var size = cc.director.getWinSize();

        var refreshBtn = new ccui.Button();
        refreshBtn.loadTextures(res.refresh);
        refreshBtn.x = size.width - 20;
        refreshBtn.y = 160;
        this.addChild(refreshBtn);
        refreshBtn.setTouchEnabled(true);
        refreshBtn.addTouchEventListener(this.onRefresh, this);

        this.candidates = [];
        var gap = 2, space = 5;
        var firstRow = Math.ceil(sta.selectCount / 2);
        var firstWidth = (size.width - 10) / firstRow;
        for (i = 0; i < firstRow; i ++){
            var can = new CheckLabelScale(res.cannormalbg, 
                res.canselectbg, res.canselectbg);
            can.x = size.width / 2 - firstWidth * (firstRow / 2 - i - 0.5);
            can.y = 120;
            can.setSize(firstWidth - 8, -1);
            can.checkbox.addTouchEventListener(this.onCandidate, this);
            this.candidates.push(can);
            this.addChild(can);
        }
        var secondRow = Math.floor(sta.selectCount / 2);
        var secondWidth = (size.width - 10) / secondRow;
        for (i = 0; i < secondRow; i ++){
            var can = new CheckLabelScale(res.cannormalbg, 
                res.canselectbg, res.canselectbg);
            can.x = size.width / 2 - secondWidth * (secondRow / 2 - i - 0.5);
            can.y = 64;
            can.setSize(secondWidth - 8, -1);
            can.checkbox.addTouchEventListener(this.onCandidate, this);
            this.candidates.push(can);
            this.addChild(can);
        }

        this.init();
        this.refresh();
    },
    init: function() {
        for (i = 0; i < this.candidates.length; i ++)
            this.candidates[i].selected = false;
        counter = 0;
        ready = false;
        dialogOpen = false;

        for (i = 0; i < g_candis.length; i ++)
            for (var j = 0; j < g_candis[i].length; j ++)
                g_candis[i][j].state = con.canNormal;
        
        this.refresh();
    },
    onRefresh: function(sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        this.refresh();
    },
    refresh: function() {
        this.deselectAll();

        for (i = 0; i < g_candis.length; i ++)
            for (var j = 0; j < g_candis[i].length; j ++)
                if (g_candis[i][j].state == con.canSelected)
                    g_candis[i][j].state = con.canNormal;

        var avails = [];
        // get available types
        for (i = 0; i < g_candis.length; i ++){
            for (var j = 0; j < g_candis[i].length; j ++){
                if (g_candis[i][j].state == con.canNormal){
                    avails.push(i);
                    break;
                }
            }
        }
        
        // finished
        if (avails.length == 0)
            return false;
        
        // get one type
        var selType = avails[Math.floor(Math.random() * avails.length)];
        avails.splice(selType, 1);
        // get available candidates in that type
        var candiAvails = []
        for (i = 0; i < g_candis[selType].length; i ++)
            if (g_candis[selType][i].state == con.canNormal)
                candiAvails.push(i);
        // get one candidate
        var selCandi = candiAvails[Math.floor(Math.random() * candiAvails.length)];
        
        // select it!
        g_candis[selType][selCandi].state = con.canSelected;

        var sels = [
            {
                type: con.typeType,
                value: selType
            },
            {
                type: con.typeAngle,
                value: g_candis[selType][selCandi].angA
            },
            {
                type: con.typeAngle,
                value: g_candis[selType][selCandi].angB
            }
        ]
        
        avails = [];
        for (i = 0; i < con.typeCount; i ++)
            if (i != selType)
                avails.push(i);
        
        candiAvails = [];
        for (i = 0; i < con.angleCount; i ++)
            if (i != g_candis[selType][selCandi].angA && i != g_candis[selType][selCandi].angB)
                candiAvails.push(i);
        
        // get remainings randomly
        while (sels.length < sta.selectCount) {
            // 0.38 ~ 5/(5+8)
            if (Math.random() < 0.38 && avails.length){
                // select type
                var tmp = Math.floor(Math.random() * avails.length);
                sels.push({
                    type: con.typeType,
                    value: avails[tmp]
                });
                avails.splice(tmp, 1);
            }
            else{
                // select angle
                var tmp = Math.floor(Math.random() * candiAvails.length);
                sels.push({
                    type: con.typeAngle,
                    value: candiAvails[tmp]
                });
                candiAvails.splice(tmp, 1);
            }
        }

        // shuffle selected indices
        shuffle(sels);

        for (i = 0; i < this.candidates.length; i ++)
            this.candidates[i].setValue(sels[i]);

        return true;
    },
    checkSet: function() {
        var sels = [];
        var typeData = null;
        for (i = 0; i < this.candidates.length; i ++)
            if (this.candidates[i].selected){
                if (this.candidates[i].data.type == con.typeType)
                    typeData = this.candidates[i].data;
                else
                    sels.push(this.candidates[i].data);
            }
        
        if (sels.length != 2)
            return -1;
        
        selectedCandi = isRightCandidate(typeData.value, sels[0].value, sels[1].value);
        if (selectedCandi != -2 && selectedCandi != -1){
            selectedType = typeData.value;
            return selectedCandi;
        }
        return selectedCandi;
    },
    getReady: function(container = this) {
        // ready to place
        ready = true;

        // selectedTriple is set in checkSet()

        container.getParent().boardLayer.getReady();
    },
    onCandidate: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        if (ready || dialogOpen){
            sender.setSelected(!sender.isSelected());
            return;
        }
        
        for (i = 0; i < this.candidates.length; i ++){
            if (sender == this.candidates[i].checkbox){
                // at this point, select is not affected yet
                if (!sender.isSelected()){
                    counter ++;
                    this.candidates[i].selected = true;
                    if (counter == 3){
                        switch(this.checkSet()){
                        case -2:
                            showMessageBoxOK(this, "Set already completed", 
                            "That set is already completed.", 
                            this.deselectAll);
                            break;
                        case -1:
                            showMessageBoxOK(this, "Try again", 
                            "Those 3 cards do not form a set.", 
                            this.deselectAll);
                            break;
                        default:
                            showMessageBoxOK(this, "That's a set", 
                            "Now touch respective circle to make a set.", 
                            this.getReady);
                        }
                    }
                }
                else{
                    counter --;
                    this.candidates[i].selected = false;
                }
            }
            else{
                
            }
        }
    },
    deselectAll: function (container = this) {
        for (i = 0; i < container.candidates.length; i ++){
            container.candidates[i].checkbox.setSelected(false);
            container.candidates[i].selected = false;
        }
        counter = 0;
        ready = false;
    },
    place: function () {
        // change state

        if (!this.refresh()){
            // finished
            return false;
        }
        return true;
    }
});

var GameLayer = cc.Layer.extend({
    boardLayer: null,
    canLayer: null,

    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();
        var sprite = cc.Sprite.create(res.background);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.5);
        this.addChild(sprite, 0);

        this.boardLayer = new BoardLayer();
        this.addChild(this.boardLayer, 1);

        this.canLayer = new CanLayer();
        this.addChild(this.canLayer, 1);
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (gameSceneInitialized)
            return;
        gameSceneInitialized = true;

        var layer = new GameLayer();
        this.addChild(layer);

        var navLayer = new NavigationLayer();
        this.addChild(navLayer);
    }
});

var showMessageBoxOK = function(parent, title, message, callback){
    dialogOpen = true;

    var layBackground = cc.LayerColor.create(cc.color(0,0,0,125));
    parent.addChild(layBackground, 10);

    var size = cc.director.getWinSize();

    var messagebg = cc.Sprite.create(res.messagebg);
    messagebg.setPosition(size.width / 2, size.height / 2);
    layBackground.addChild(messagebg, 1);

    var lblTitle = cc.LabelTTF.create(title, "Arial", 12);
    lblTitle.setFontFillColor(cc.color(0,0,0));
    lblTitle.setAnchorPoint(0,0);
    lblTitle.setPosition(size.width / 2 - 200 + 20, size.height / 2 + 50 - 35);
    layBackground.addChild(lblTitle, 2);

    var lblMessage = cc.LabelTTF.create(message, "Arial", 12);
    lblMessage.setFontFillColor(cc.color(0,0,0));
    lblMessage.setAnchorPoint(0,0);
    lblMessage.setPosition(size.width / 2 - 200 + 20, size.height / 2 - 10);
    layBackground.addChild(lblMessage, 2);

    var menu = cc.Menu.create();
    menu.setPosition(0, 0);
    layBackground.addChild(menu, 3);

    var btnText = cc.LabelTTF.create("OK", "Arial", 12);
    btnText.setFontFillColor(cc.color(0,150,150));
    //btnText.setAnchorPoint(0,0);
    var btnOK = cc.MenuItemLabel.create(
        btnText,
        function(){
            dialogOpen = false;
            layBackground.removeAllChildren(true);
            layBackground.removeFromParent(true);
            if (callback)
                callback(parent);
        },
        this
    );
    btnOK.setPosition(size.width - 80, size.height / 2 - 50 + 15);
    menu.addChild(btnOK);
};

var showMessageBoxOkCancel = function(parent, title, message, OkCallback, CancelCallback, okText, cancelText){
    dialogOpen = true;

    var layBackground = cc.LayerColor.create(cc.color(0,0,0,125));
    parent.addChild(layBackground, 10);

    var size = cc.director.getWinSize();

    var messagebg = cc.Sprite.create(res.messagebg);
    messagebg.setPosition(size.width / 2, size.height / 2);
    layBackground.addChild(messagebg, 1);

    var lblTitle = cc.LabelTTF.create(title, "Arial", 12);
    lblTitle.setFontFillColor(cc.color(0,0,0));
    lblTitle.setAnchorPoint(0,0);
    lblTitle.setPosition(size.width / 2 - 200 + 20, size.height / 2 + 50 - 35);
    layBackground.addChild(lblTitle, 2);

    var lblMessage = cc.LabelTTF.create(message, "Arial", 12);
    lblMessage.setFontFillColor(cc.color(0,0,0));
    lblMessage.setAnchorPoint(0,0);
    lblMessage.setPosition(size.width / 2 - 200 + 20, size.height / 2 - 10);
    layBackground.addChild(lblMessage, 2);

    var menu = cc.Menu.create();
    menu.setPosition(0, 0);
    layBackground.addChild(menu, 3);

    var btnOkText = cc.LabelTTF.create(okText, "Arial", 12);
    btnOkText.setFontFillColor(cc.color(0,150,150));
    var btnOk = cc.MenuItemLabel.create(
        btnOkText,
        function(){
            dialogOpen = false;
            layBackground.removeAllChildren(true);
            layBackground.removeFromParent(true);
            if (OkCallback)
                OkCallback(parent);
        },
        this
    );
    btnOk.setPosition(size.width - 110, size.height / 2 - 50 + 15);
    menu.addChild(btnOk);

    var btnCancelText = cc.LabelTTF.create(cancelText, "Arial", 12);
    btnCancelText.setFontFillColor(cc.color(0,150,150));
    var btnCancel = cc.MenuItemLabel.create(
        btnCancelText,
        function(){
            dialogOpen = false;
            layBackground.removeAllChildren(true);
            layBackground.removeFromParent(true);
            if (CancelCallback)
                CancelCallback(parent);
        },
        this
    );
    btnCancel.setPosition(size.width - 180, size.height / 2 - 50 + 15);
    menu.addChild(btnCancel);
};

var shuffle = function (a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
