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
const tableConfig_1 = require("../../cache/tableConfig");
/**
 * Creates table
 * @param {Object} signUpData
 * @param {String} key
 * @returns {String} tableId
 */
function createTable(signUpData) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableConfig = (0, defaultGenerator_1.defaulTableData)(signUpData);
        yield (0, tableConfig_1.setTableConfig)(tableConfig._id, tableConfig);
        return tableConfig._id;
    });
}
module.exports = createTable;
