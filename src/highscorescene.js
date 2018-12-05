var highscoreSceneInitialized = false;

var HighscoreLayer = cc.Layer.extend({
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
            textAlign: cc.TEXT_ALIGNMENT_LEFT,
            string: "Highscore!!!",
            font: "Arial 14px",
            color: cc.color(0,0,0),
            x: size.width / 2 - 25,
            y: size.height /2 + 80
        });
        this.addChild(text, 2);

        var score = getHighscore();

        var yourScore = new ccui.Text();
        yourScore.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "Your Score : " + (score == con.invalidScore ? "?" : score),
            font: "Arial 12px",
            color: cc.color(0,0,0),
            x: size.width / 2,
            y: size.height /2 + 55
        });
        this.addChild(yourScore, 2);

        // rank
        var rankHeader = new ccui.Text();
        rankHeader.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "Rank",
            font: "Arial 12px",
            color: cc.color(0,0,0),
            x: size.width / 2 - 55,
            y: size.height /2 + 20
        });
        this.addChild(rankHeader, 2);

        // user
        var userHeader = new ccui.Text();
        userHeader.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "User",
            font: "Arial 12px",
            color: cc.color(0,0,0),
            x: size.width / 2,
            y: size.height /2 + 20
        });
        this.addChild(userHeader, 2);

        // score
        var scoreHeader = new ccui.Text();
        scoreHeader.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: "Score",
            font: "Arial 12px",
            color: cc.color(0,0,0),
            x: size.width / 2 + 55,
            y: size.height /2 + 20
        });
        this.addChild(scoreHeader, 2);

        var history = [];
        // get HighscoreHistory
        if (highscoreHistory[0].score > score){
            history.push({
                rank: 1,
                user: "You",
                score: score
            });
            history.push(highscoreHistory[0]);
            history.push(highscoreHistory[1]);
        }
        else{
            history.push(highscoreHistory[0]);
            history.push(highscoreHistory[1]);
            history.push(highscoreHistory[2]);
        }

        // display HighscoreHistory
        for (i = 0; i < 3; i ++){
            // rank
            var rankText = new ccui.Text();
            rankText.attr({
                textAlign: cc.TEXT_ALIGNMENT_CENTER,
                string: history[i].rank,
                font: "Arial 12px",
                color: cc.color(0,0,0),
                x: size.width / 2 - 55,
                y: size.height /2 - i * 30 - 10
            });
            this.addChild(rankText, 2);

            // user
            var userText = new ccui.Text();
            userText.attr({
                textAlign: cc.TEXT_ALIGNMENT_CENTER,
                string: history[i].user,
                font: "Arial 12px",
                color: cc.color(0,0,0),
                x: size.width / 2,
                y: size.height /2 - i * 30 - 10
            });
            this.addChild(userText, 2);

            // score
            var scoreText = new ccui.Text();
            scoreText.attr({
                textAlign: cc.TEXT_ALIGNMENT_CENTER,
                string: history[i].score,
                font: "Arial 12px",
                color: cc.color(0,0,0),
                x: size.width / 2 + 55,
                y: size.height /2 - i * 30 - 10
            });
            this.addChild(scoreText, 2);
        }

        var button = new ccui.Button();
        button.loadTextures(res.close);
        button.x = size.width / 2 + 70;
        button.y = size.height / 2 + 90;
        this.addChild(button, 2);
        button.setTouchEnabled(true);
        button.addTouchEventListener(this.onClose, this);
    },
    onClose: function (sender, type){
        if (type != ccui.Widget.TOUCH_ENDED)
            return;
        highscoreSceneInitialized = false;
        cc.director.popScene();
        sta.curScene = con.scenemenu;
    }
});

var HighscoreScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        if (highscoreSceneInitialized)
            return;
        highscoreSceneInitialized = true;

        var layer = new HighscoreLayer();
        this.addChild(layer);

        var navLayer = new NavigationLayer();
        this.addChild(navLayer);
    }
});
