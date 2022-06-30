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
function insertRound(roundData, currentRound) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const key = `R:${roundData.tableId}:${currentRound || 1}`;
            return (0, redisWrapper_1.setValueInKeyWithExpiry)(key, roundData);
        }
        catch (error) {
            return false;
        }
    });
}
function getRound(tableId, currentRound) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `R:${tableId}:${currentRound}`;
        return (0, userProfile_1.getValueFromKey)(key);
    });
}
const exportObj = {
    insertRound,
    getRound
};
module.exports = exportObj;
