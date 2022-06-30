"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const createTable_1 = __importDefault(require("./createTable"));
const findTable_1 = __importDefault(require("./findTable"));
const exportObj = {
    createTable: createTable_1.default,
    findTable: findTable_1.default,
};
module.exports = exportObj;
