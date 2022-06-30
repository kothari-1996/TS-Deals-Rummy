"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const redisWrapper_1 = require("../redisWrapper");
const userProfile_1 = require("../userProfile");
function getTableGamePlay(tableId, currentRound) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `TGP:${tableId}:${currentRound}`;
        const tableGamePlay = yield (0, userProfile_1.getValueFromKey)(key);
        return tableGamePlay;
    });
}
function insertTableGamePlay(tableGamePlay, tableId, currentRound) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `TGP:${tableId}:${currentRound || 1}`;
        const res = yield (0, redisWrapper_1.setValueInKeyWithExpiry)(key, tableGamePlay);
        return res;
    });
}
const exportObj = {
    getTableGamePlay,
    insertTableGamePlay,
};
module.exports = exportObj;
