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
const findTable_1 = __importDefault(require("../../services/playTable/findTable"));
const insertPlayerInTable_1 = __importDefault(require("../../services/userPlayTable/insertPlayerInTable"));
const findTableForUser = (data, userProfile) => __awaiter(void 0, void 0, void 0, function* () {
    const tableId = yield (0, findTable_1.default)(data, userProfile);
    console.log("=============tableId==============", tableId);
    const insertPlayerRes = yield (0, insertPlayerInTable_1.default)(userProfile, tableId);
    const playerGamePlay = insertPlayerRes.playerGamePlay;
    const tableGamePlay = insertPlayerRes === null || insertPlayerRes === void 0 ? void 0 : insertPlayerRes.tableGamePlay;
    const tableConfig = insertPlayerRes === null || insertPlayerRes === void 0 ? void 0 : insertPlayerRes.tableConfig;
    return {
        tableConfig,
        tableGamePlay,
        playerGamePlay
    };
});
module.exports = findTableForUser;
