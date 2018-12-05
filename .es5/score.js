"use strict";

var getHighscore = function getHighscore() {
    var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify(8)));
    if (value == null) return con.invalidScore;
    return parseInt(value);
};

var setHighscore = function setHighscore(score) {
    if (getHighscore() > score) {
        cc.sys.localStorage.setItem(JSON.stringify(8), JSON.stringify(score));
    }
};