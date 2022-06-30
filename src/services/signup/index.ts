import { error } from 'console';
import { getValueFromKey, setValueFromKey} from '../../cache/userProfile';
import { UserProfileOutput } from '../../interfaces/userprofile';

const getUser = async(userId: string) => {

    const userProfileData = await getValueFromKey<UserProfileOutput>(userId); 
    return userProfileData 
}

export = getUser