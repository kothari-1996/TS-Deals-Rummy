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
const index_1 = require("../../defaultGenerator/index");
const index_2 = require("../../cache/userProfile/index");
const index_3 = __importDefault(require("../signup/index"));
function createOrFindUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = userData;
        let userProfileData = yield (0, index_3.default)(userId);
        // console.log("=========userProfileData=========", userProfileData);
        if (userProfileData) {
            userProfileData.socketId = userData.socketId;
            userProfileData.username = userData.username;
            userProfileData.lobbyId = userData.lobbyId;
            userProfileData.gameId = userData.gameId;
            userProfileData.profilePic = userData.profilePic;
        }
        else {
            const userProfileDefault = (0, index_1.defaultUserProfile)(userData);
            userProfileData = userProfileDefault;
        }
        yield (0, index_2.setValueFromKey)(userId, userProfileData);
        return {
            userProfileData,
            signUpData: userData
        };
    });
}
module.exports = createOrFindUser;
