"use strict";

var res = {
    //image
    background: "Background.jpg",
    dialogbg: "dialog_bg.png",
    playbg: "play_bg.png",
    selectbg: "select_select_bg.png",
    selectnormalbg: "select_normal_bg.png",
    cannormalbg: "can_normal_bg.png",
    canselectbg: "can_select_bg.png",
    refresh: "refresh.png",
    close: "close.png",
    prev: "prev.png",
    next: "next.png",
    menubg: "menubg.png",
    resetbg: "angle_reset.png",
    showbg: "angle_show.png",
    gamebg: "gamebg.png",
    messagebg: "messagebox_bg.png",
    completedbg: "completed_bg.png",
    itembg: "item_bg.png",
    titlebg: "title_bg.png"

    //plist

    //fnt

    //tmx

    //bgm

    //effect
};

var typeValues = ["type0.png", "type1.png", "type2.png", "type3.png", "type4.png"];
var angleChars = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"];

//var angleValues = ["angle_1.png", "angle_2.png", "angle_3.png", "angle_4.png", "angle_5.png", "angle_6.png", "angle_7.png", "angle_8.png"];
var angleValues = ["angle1.png", "angle2.png", "angle3.png", "angle4.png", "angle1.png", "angle2.png", "angle3.png", "angle4.png"];
var angleNormalValues = ["angle1_normal.png", "angle2_normal.png", "angle3_normal.png", "angle4_normal.png", "angle1_normal.png", "angle2_normal.png", "angle3_normal.png", "angle4_normal.png"];

var instructionValues = ["one.png", "two.png", "three.png", "four.png", "five.png"];
var indicatorValues = ["Choose the number of cards. \nFewer cards make the game easier.", "Click on a matching set of \nangles and a category.", "If the set does not match, \nyou will need to pick again.", "If the set does match, \nyou will pick the location on the circle \nwhere it should go.", "If an incorrect location is selected, \nyou will need to pick again." /*, 
                                                                                                                                                                                                                                                                                                                                                                                "If the correct location is selected, \nthe \"spoke\" will light up. Congratulations!"*/];

var g_resources = [];

for (i = 0; i < typeValues.length; i++) {
    g_resources.push(typeValues[i]);
}for (i = 0; i < angleChars.length; i++) {
    g_resources.push(angleChars[i]);
}for (i = 0; i < angleValues.length; i++) {
    g_resources.push(angleValues[i]);
}for (i = 0; i < angleNormalValues.length; i++) {
    g_resources.push(angleNormalValues[i]);
}for (i = 0; i < instructionValues.length; i++) {
    g_resources.push(instructionValues[i]);
}for (var i in res) {
    g_resources.push(res[i]);
}var con = {
    playgame: "PLAY GAME",
    highscore: "HIGHSCORE",
    instruction: "INSTRUCTION",

    scenemenu: 0,
    sceneoption: 1,
    scenegame: 2,
    scenehighscore: 3,
    sceneinstruction: 4,
    scenecompleted: 5,

    typeAngle: 0,
    typeType: 1,

    canCompleted: 0,
    canSelected: 1,
    canNormal: 2,

    angleCount: 8,
    typeCount: 5,

    invalidScore: 100000,

    itemStartY: 700,
    itemHeight: 28
};

var connectionTypes = ["Linear pairs", "Alternate exterior", "Alternate interior", "Same-side interior", "Vertical"];
var g_candis = [[{
    state: 0,
    type: 0,
    angA: 0,
    angB: 1
}, {
    state: 0,
    type: 0,
    angA: 2,
    angB: 3
}, {
    state: 0,
    type: 0,
    angA: 4,
    angB: 5
}, {
    state: 0,
    type: 0,
    angA: 6,
    angB: 7
}, {
    state: 0,
    type: 0,
    angA: 0,
    angB: 2
}, {
    state: 0,
    type: 0,
    angA: 1,
    angB: 3
}, {
    state: 0,
    type: 0,
    angA: 4,
    angB: 6
}, {
    state: 0,
    type: 0,
    angA: 5,
    angB: 7
}], [{
    state: 0,
    type: 1,
    angA: 0,
    angB: 7
}, {
    state: 0,
    type: 1,
    angA: 1,
    angB: 6
}], [{
    state: 0,
    type: 2,
    angA: 2,
    angB: 5
}, {
    state: 0,
    type: 2,
    angA: 3,
    angB: 4
}], [{
    state: 0,
    type: 3,
    angA: 2,
    angB: 4
}, {
    state: 0,
    type: 3,
    angA: 3,
    angB: 5
}], [{
    state: 0,
    type: 4,
    angA: 0,
    angB: 3
}, {
    state: 0,
    type: 4,
    angA: 1,
    angB: 2
}, {
    state: 0,
    type: 4,
    angA: 4,
    angB: 7
}, {
    state: 0,
    type: 4,
    angA: 5,
    angB: 6
}]];

var sta = {
    curScene: 0,
    selectCount: 0
};

var highscoreHistory = [{
    rank: 1,
    user: "Imhot",
    score: 16
}, {
    rank: 2,
    user: "smcos",
    score: 16
}, {
    rank: 3,
    user: "ano-",
    score: 16
}];

var isRightCandidate = function isRightCandidate(type, angA, angB) {
    if (type < 0 || type >= g_candis.length) return -1;
    for (i = 0; i < g_candis[type].length; i++) {
        if (g_candis[type][i].angA == angA && g_candis[type][i].angB == angB || g_candis[type][i].angA == angB && g_candis[type][i].angB == angA) {
            if (g_candis[type][i].state == con.canCompleted) return -2;
            return i;
        }
    }return -1;
};