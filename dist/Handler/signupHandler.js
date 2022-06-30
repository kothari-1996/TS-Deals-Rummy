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
const index_1 = require("../services/userPlayTable/index");
const findTableForUser_1 = __importDefault(require("../services/userPlayTable/findTableForUser"));
function signUpHandler(socket, eventData) {
    return __awaiter(this, void 0, void 0, function* () {
        let signUpData = eventData.data;
        const userSignUp = yield (0, index_1.createOrFindUser)({
            socketId: socket.id.toString(),
            userId: signUpData.userId,
            lobbyId: signUpData.lobbyId,
            gameId: signUpData.gameId,
            username: signUpData.username,
            profilePic: signUpData.profilePic
        });
        const userProfile = userSignUp.userProfileData;
        const findTableInput = Object.assign(Object.assign({}, userSignUp.signUpData), {
            entryFee: 10,
            roundCount: 2,
            maximumSeat: 2,
            cardCount: 13
        });
        // console.log("=============findTableInput=============", findTableInput);
        // console.log("=============userProfile=============", userProfile);
        // const { tableConfig, tableGamePlay, playerGamePlay }
        yield (0, findTableForUser_1.default)(findTableInput, userProfile);
        // const formatedGTIResponse = await formateUpdatedGameTableData(
        //   tableConfig,
        //   tableGamePlay,
        //   playerGamePlay
        // );
        // return formatedGTIResponse;
    });
}
module.exports = signUpHandler;
