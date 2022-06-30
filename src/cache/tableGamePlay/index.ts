import { setValueInKeyWithExpiry } from "../redisWrapper"
import { defaultTableGamePlayInterface } from "../../interfaces/tableGamePlay"
import { getValueFromKey } from "../userProfile"


async function getTableGamePlay(
  tableId: string,
  currentRound: number
): Promise<defaultTableGamePlayInterface | null> {
  const key = `TGP:${tableId}:${currentRound}`;
    const tableGamePlay =
      await getValueFromKey<defaultTableGamePlayInterface>(key);
      return tableGamePlay;
}

async function insertTableGamePlay(
    tableGamePlay: defaultTableGamePlayInterface,
    tableId: string,
    currentRound: number
  ): Promise<boolean> {
    const key = `TGP:${tableId}:${
      currentRound || 1
    }`;
      const res = await setValueInKeyWithExpiry(key, tableGamePlay);
      return res;
  }

  const exportObj = {
    getTableGamePlay,
    insertTableGamePlay,
  };
  
  export = exportObj;