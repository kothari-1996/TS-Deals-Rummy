import { UserProfileDataInput, UserProfileOutput } from "../../interfaces/userprofile"
import { defaultUserProfile } from "../../defaultGenerator/index"
import { setValueFromKey } from "../../cache/userProfile/index"
import getUser from "../signup/index";

async function createOrFindUser(
    userData: UserProfileDataInput
  ): Promise<{
    userProfileData: UserProfileOutput | null;
    signUpData : UserProfileDataInput;
  }>{
    const { userId } = userData;
    let userProfileData = await getUser(userId);
    console.log("=========GET:userProfileData=========", userProfileData);
    if (userProfileData) {
        userProfileData.socketId = userData.socketId;
        userProfileData.username = userData.username;
        userProfileData.lobbyId = userData.lobbyId;
        userProfileData.gameId = userData.gameId;
        userProfileData.profilePic = userData.profilePic;
    } else {
        const userProfileDefault = defaultUserProfile(userData);
        userProfileData = userProfileDefault;
    }
    await setValueFromKey(userId, userProfileData);
    return {
      userProfileData,
      signUpData: userData
    };
  }

export =  createOrFindUser; 