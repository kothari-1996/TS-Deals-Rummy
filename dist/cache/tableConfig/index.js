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
const golbal_1 = __importDefault(require("../../constants/golbal"));
const redisWrapper_1 = require("../redisWrapper");
const userProfile_1 = require("../userProfile");
const popFromQueue = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(function (resolve, reject) {
        golbal_1.default.redisClient.lpop(key, function (err, data) {
            if (err)
                reject(err);
            resolve(JSON.parse(data));
        });
    });
});
const setTableConfig = (tableId, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `T:${tableId}`;
    const res = yield (0, redisWrapper_1.setValueInKeyWithExpiry)(key, obj);
    return res;
});
const updateTableConfig = (key, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, userProfile_1.getValueFromKey)(key);
    const updatedObject = Object.assign(Object.assign({}, data), updateObject);
    yield (0, redisWrapper_1.setValueInKeyWithExpiry)(key, updatedObject);
    return updatedObject;
});
const getTableConfig = (tableId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `T:${tableId}`;
    const tableConfig = yield (0, userProfile_1.getValueFromKey)(key);
    return tableConfig;
});
const exportObject = {
    popFromQueue,
    setTableConfig,
    updateTableConfig,
    getTableConfig
};
module.exports = exportObject;
