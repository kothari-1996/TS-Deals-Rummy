import { getValueFromKey } from "../userProfile";
import { defaulPlayerGamePlayInterface } from "../../interfaces/playerGamePlay";
import { setValueInKeyWithExpiry } from "../redisWrapper";


async function insertPlayerGamePlay(
    playerGamePlay: defaulPlayerGamePlayInterface,
    tableId: string,
    currentRound: number
  ): Promise<boolean> {
    const key = `PGP:${playerGamePlay.userId}:${tableId}:${currentRound}`;
   
      const res = await setValueInKeyWithExpiry(key, playerGamePlay);
      return res;
  }
  
const getPlayerGamePlay = async (
    userId: string,
    tableId: string,
    currentRound: number
  ): Promise<defaulPlayerGamePlayInterface | null> => {
    const keyData = `PGP:${userId}:${tableId}:${currentRound}`;
      const playerGamePlay =
        await getValueFromKey<defaulPlayerGamePlayInterface>(keyData);  
      return playerGamePlay;
};

  
const exportedObject = {
    insertPlayerGamePlay,
    getPlayerGamePlay
};

export = exportedObject;