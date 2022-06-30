"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const findUser_1 = __importDefault(require("./findUser"));
const exportObj = {
    createOrFindUser: findUser_1.default,
};
module.exports = exportObj;
