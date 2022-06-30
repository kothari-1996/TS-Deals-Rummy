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
const defaultGenerator_1 = require("../../defaultGenerator");
// import { REDIS } from '../../constants';
const round_1 = require("../../cache/round");
const tableGamePlay_1 = require("../../cache/tableGamePlay");
const tableConfig_1 = require("../../cache/tableConfig");
function setupFirstRound(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tableId, roundNum, GAME_TYPE } = data;
        const roundData = yield (0, defaultGenerator_1.defaultRoundData)(tableId, roundNum);
        const tableGamePlayData = (0, defaultGenerator_1.defaultTableGamePlayData)(roundData._id, GAME_TYPE);
        yield Promise.all([
            (0, round_1.insertRound)(roundData, roundNum),
            (0, tableGamePlay_1.insertTableGamePlay)(tableGamePlayData, tableId, roundNum),
            (0, tableConfig_1.updateTableConfig)(`T:${tableId}`, { currentRound: roundNum })
        ]);
        return true;
    });
}
module.exports = setupFirstRound;
