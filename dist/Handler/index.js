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
const signupHandler_1 = __importDefault(require("./signupHandler"));
const event_1 = __importDefault(require("../constants/event"));
const handler = (socket, eventData) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    switch (eventData.event.toLowerCase()) {
        case event_1.default.SIGN_UP_SOCKET_EVENT:
            response = yield (0, signupHandler_1.default)(socket, eventData);
            // joinTable(response, socket, false);
            break;
        default:
            break;
    }
    ;
});
module.exports = handler;
