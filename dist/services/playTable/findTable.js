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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const userProfile_1 = require("../../cache/userProfile");
const tableConfig_1 = require("../../cache/tableConfig");
const createTable_1 = __importDefault(require("./createTable"));
const setupRound_1 = __importDefault(require("../../services/round/setupRound"));
function findOrCreateTable(signUpData, userSignUpData) {
    return __awaiter(this, void 0, void 0, function* () {
        let tableId;
        const key = `Rummy:${signUpData.lobbyId}:${signUpData.maximumSeat}`;
        tableId = yield getAvailableTable(key, signUpData.maximumSeat);
        if (!tableId) {
            tableId = yield (0, createTable_1.default)(signUpData);
            yield (0, setupRound_1.default)({
                tableId,
                roundNum: 1,
                GAME_TYPE: "Rummy"
            });
        }
        return tableId;
    });
}
function getAvailableTable(key, maximumSeat) {
    return __awaiter(this, void 0, void 0, function* () {
        let tableId = '';
        const defaultTableGamePlay = {
            seats: [],
            tableState: ''
        };
        let tableGamePlay = defaultTableGamePlay;
        let seats = tableGamePlay.seats;
        while ((tableGamePlay &&
            tableGamePlay.tableState !== "WAITING_FOR_PLAYERS" &&
            tableGamePlay.tableState !== "ROUND_TIMER_STARTED") ||
            seats.length === maximumSeat) {
            const nullTGP = null;
            tableGamePlay = nullTGP;
            tableId = yield (0, tableConfig_1.popFromQueue)(key);
            if (tableId) {
                const key = `TableGamePlay:${tableId}:1`;
                tableGamePlay = yield (0, userProfile_1.getValueFromKey)(key);
                tableGamePlay = tableGamePlay || defaultTableGamePlay;
                seats = tableGamePlay.seats.filter((ele) => ele.userId);
            }
        }
        return tableId;
    });
}
module.exports = findOrCreateTable;
