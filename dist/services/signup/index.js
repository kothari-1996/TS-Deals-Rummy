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
const userProfile_1 = require("../../cache/userProfile");
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfileData = yield (0, userProfile_1.getValueFromKey)(userId);
    // console.log("=====userProfileData======", userProfileData);
    if (userProfileData) {
        yield (0, userProfile_1.setValueFromKey)(userId, userProfileData);
    }
    return userProfileData;
});
module.exports = getUser;
