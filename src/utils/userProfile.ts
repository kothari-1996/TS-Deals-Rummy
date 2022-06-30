import { GetUserInput, UserProfileOutput } from "../interfaces/userprofile";
import { getValueFromKey, setValueFromKey } from "../cache/userProfile";

async function getUser(obj: GetUserInput): Promise<UserProfileOutput | null> {
    const userProfileData= await getValueFromKey(obj._id);
    if (userProfileData) return userProfileData as UserProfileOutput | null;

    if (userProfileData)
      await setValueFromKey(obj._id.toString(), userProfileData);
      
    return userProfileData as UserProfileOutput | null;
 
}

const exportedObject = { getUser };
export = exportedObject;
