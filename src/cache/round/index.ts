import { defaultRoundInterface } from "../../interfaces/tableGamePlay";
import { roundInterface } from "../../interfaces/round";
import { setValueInKeyWithExpiry } from "../redisWrapper"
import { getValueFromKey } from "../userProfile"


async function insertRound(
    roundData: defaultRoundInterface,
    currentRound: number
  ): Promise<boolean> {
    try {
      const key = `R:${roundData.tableId}:${
        currentRound || 1
      }`;
      return setValueInKeyWithExpiry(key, roundData);
    } catch (error) {
      return false;
    }
  }

  async function getRound(
    tableId: string,
    currentRound: number
  ): Promise<roundInterface | null> {
    const key = `R:${tableId}:${currentRound}`;
      return getValueFromKey<roundInterface>(key);
  }

  const exportObj = {
    insertRound,
    getRound
  };
  
  export = exportObj;
  