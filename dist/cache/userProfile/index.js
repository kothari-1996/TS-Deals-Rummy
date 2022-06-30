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
const setValueFromKey = (key, Data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(function (resolve, reject) {
        golbal_1.default.redisClient.set(key, JSON.stringify(Data), function (err, data) {
            if (err)
                reject(err);
            resolve(data);
        });
    });
});
const getValueFromKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(function (resolve, reject) {
        golbal_1.default.redisClient.get(key, function (err, data) {
            if (err)
                reject(err);
            resolve(JSON.parse(data));
        });
    });
});
const exportObject = {
    setValueFromKey,
    getValueFromKey
};
module.exports = exportObject;
