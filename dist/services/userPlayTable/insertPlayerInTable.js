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
const tableConfig_1 = require("../../cache/tableConfig");
const tableGamePlay_1 = require("../../cache/tableGamePlay");
const playerGamePlay_1 = require("../../cache/playerGamePlay");
const round_1 = require("../../cache/round");
const defaultGenerator_1 = require("../../defaultGenerator");
function insertPlayerInTable(userData, tableId) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `T:${tableId}`;
        const tableConfig = yield (0, tableConfig_1.getTableConfig)(key);
        if (!tableConfig)
            throw Error('Unable to get Table Config Data');
        const { currentRound } = tableConfig;
        const [tableGamePlay, roundData] = yield Promise.all([
            (0, tableGamePlay_1.getTableGamePlay)(tableId, currentRound),
            (0, round_1.getRound)(tableId, currentRound)
        ]);
        if (!tableGamePlay)
            throw Error('Unable to get Table Game Play');
        if (!roundData)
            throw Error('Unable to get Table Round Data');
        const seatIndex = yield insertPlayerInSeat(tableGamePlay.seats, String(userData === null || userData === void 0 ? void 0 : userData._id));
        const isSeatEmpty = yield checkIfSeatEmpty(seatIndex, tableGamePlay.seats);
        let playerGamePlay;
        if (seatIndex !== -1 && isSeatEmpty) {
            const seatObject = {
                userId: String(userData === null || userData === void 0 ? void 0 : userData._id),
                seat: seatIndex
            };
            tableGamePlay.seats.splice(seatIndex, 0, seatObject);
            tableGamePlay.currentPlayerInTable += 1;
            playerGamePlay = yield (0, defaultGenerator_1.defaulPlayerGamePlayData)(String(userData === null || userData === void 0 ? void 0 : userData._id), seatIndex, roundData._id, false);
            yield Promise.all([
                (0, playerGamePlay_1.insertPlayerGamePlay)(playerGamePlay, tableId, currentRound),
                (0, tableGamePlay_1.insertTableGamePlay)(tableGamePlay, tableId, currentRound)
            ]);
        }
        else {
            // player is already in a table
            playerGamePlay = yield (0, playerGamePlay_1.getPlayerGamePlay)(String(userData === null || userData === void 0 ? void 0 : userData._id), tableId, currentRound);
            if (!playerGamePlay) {
                playerGamePlay = yield (0, defaultGenerator_1.defaulPlayerGamePlayData)(String(userData === null || userData === void 0 ? void 0 : userData._id), seatIndex, roundData._id, false);
                yield (0, playerGamePlay_1.insertPlayerGamePlay)(playerGamePlay, tableId, currentRound);
            }
        }
        return {
            tableGamePlay,
            playerGamePlay,
            roundData,
            tableConfig
        };
    });
}
function insertPlayerInSeat(seats, userId) {
    try {
        let seatIndex = -1;
        for (let i = 0; i < seats.length; ++i) {
            const seat = seats[i];
            // found an empty place in array
            if (!seat)
                break;
            if (seat.seat !== i) {
                return i;
            }
            else if (seat.userId === userId) {
                return seat.seat;
            }
        }
        if (seatIndex === -1) {
            seatIndex = seats.length;
        }
        return seatIndex;
    }
    catch (error) {
        throw new Error(error && error.message && typeof error.message === 'string'
            ? error.message
            : 'insertPlayerInSeat error');
    }
}
function checkIfSeatEmpty(seatIndex, seats) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < seats.length; ++i) {
            const seat = seats[i];
            if (seat.seat === seatIndex) {
                return false;
            }
        }
        return true;
    });
}
module.exports = insertPlayerInTable;
