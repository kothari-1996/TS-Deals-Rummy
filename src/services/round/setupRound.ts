import {
    defaultRoundInterface,
    defaultTableGamePlayInterface
  } from '../../interfaces/tableGamePlay';
  import {
    defaultRoundData,
    defaultTableGamePlayData
  } from '../../defaultGenerator';
  // import { REDIS } from '../../constants';
  import { insertRound } from '../../cache/round';
  import { insertTableGamePlay } from '../../cache/tableGamePlay';
  import { updateTableConfig } from '../../cache/tableConfig';
  
  
interface setUpRoundData {
  tableId: string;
  roundNum: number;
  GAME_TYPE: string;
}
  
async function setupFirstRound(data: setUpRoundData): Promise<boolean> {
    const { tableId, roundNum, GAME_TYPE } = data;
    
      const roundData: defaultRoundInterface =
          defaultRoundData(tableId, roundNum);
      const tableGamePlayData : defaultTableGamePlayInterface =
          defaultTableGamePlayData(roundData._id, GAME_TYPE);
          
       console.log("===========roundData==========", roundData);
       console.log("===========tableGamePlayData==========", tableGamePlayData);
      
      await Promise.all([
        insertRound(roundData, roundNum),
        insertTableGamePlay(tableGamePlayData, tableId, roundNum),
        updateTableConfig(`T:${tableId}`, {currentRound: roundNum} )
      ]);
  
      return true;
}

export = setupFirstRound;