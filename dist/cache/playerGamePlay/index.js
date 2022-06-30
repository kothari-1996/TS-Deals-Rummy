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
const userProfile_1 = require("../userProfile");
const redisWrapper_1 = require("../redisWrapper");
function insertPlayerGamePlay(playerGamePlay, tableId, currentRound) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `PGP:${playerGamePlay.userId}:${tableId}:${currentRound}`;
        const res = yield (0, redisWrapper_1.setValueInKeyWithExpiry)(key, playerGamePlay);
        return res;
    });
}
const getPlayerGamePlay = (userId, tableId, currentRound) => __awaiter(void 0, void 0, void 0, function* () {
    const keyData = `PGP:${userId}:${tableId}:${currentRound}`;
    const playerGamePlay = yield (0, userProfile_1.getValueFromKey)(keyData);
    return playerGamePlay;
});
const exportedObject = {
    insertPlayerGamePlay,
    getPlayerGamePlay
};
module.exports = exportedObject;
