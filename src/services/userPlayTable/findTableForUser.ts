import findOrCreateTable  from "../../services/playTable/findTable";
import { CreateTableI } from "../../interfaces/signup"
import { UserProfileOutput } from "../../interfaces/userprofile";
import insertPlayerInTable  from "../../services/userPlayTable/insertPlayerInTable"
import { defaultTableConfig } from "../../interfaces/tableConfig";
import { defaultTableGamePlayInterface } from "../../interfaces/tableGamePlay";
import { defaulPlayerGamePlayInterface } from "../../interfaces/playerGamePlay";

const findTableForUser = async (
    data: CreateTableI,
    userProfile: UserProfileOutput | null,
  ): Promise<{
    tableConfig: defaultTableConfig;
    tableGamePlay: defaultTableGamePlayInterface;
    playerGamePlay: defaulPlayerGamePlayInterface;
  }> => {

      const tableId = await findOrCreateTable(data, userProfile);
      console.log("=============tableId==============", tableId);
      
      const insertPlayerRes = await insertPlayerInTable(userProfile, tableId);
      const playerGamePlay = insertPlayerRes.playerGamePlay;
      const tableGamePlay = insertPlayerRes?.tableGamePlay;
      const tableConfig = insertPlayerRes?.tableConfig;
  
    return {
        tableConfig,
        tableGamePlay,
        playerGamePlay
    };
}
export = findTableForUser;
  