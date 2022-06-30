import { CreateTableI, seatsInterface } from "../../interfaces/signup"
import { DefaultBaseTable } from "../../interfaces/tableGamePlay"
import { getValueFromKey } from "../../cache/userProfile"
import { popFromQueue } from "../../cache/tableConfig"
import createTable from './createTable';
import setupFirstRound  from "../../services/round/setupRound"


async function findOrCreateTable(signUpData: CreateTableI , userSignUpData:any)
{
    let tableId: string;
    const key = `Rummy:${signUpData.lobbyId}:${signUpData.maximumSeat}`;
   
    tableId = await getAvailableTable(key, signUpData.maximumSeat);
    console.log("<<<<<<<=========GET::tableId==========>>>>>>>", tableId);

    if (!tableId) {
      tableId = await createTable(signUpData);
      console.log("===========CREATE tableId===========", tableId);
      await setupFirstRound({
        tableId,
        roundNum: 1,
        GAME_TYPE: "Rummy"
      });
    }
    return tableId;
 }

 async function getAvailableTable(
  key: string,
  maximumSeat: number
): Promise<string> {
    
    let tableId = '';
    const defaultTableGamePlay: DefaultBaseTable | null = {
      seats: [],
      tableState: ''
    };
    let tableGamePlay: DefaultBaseTable | null = defaultTableGamePlay;
    let seats: seatsInterface[] = tableGamePlay.seats;
    while (
      (tableGamePlay &&
        tableGamePlay.tableState !== "WAITING_FOR_PLAYERS" &&
        tableGamePlay.tableState !== "ROUND_TIMER_STARTED") ||
      seats.length === maximumSeat
    ){
      const nullTGP = null;
      tableGamePlay = nullTGP;    
      tableId = await popFromQueue<any>(key);
      console.log("==========POP tableId=========", tableId);
      
      if (tableId) {
        const key = `TGP:${tableId}:1`;
        tableGamePlay = await getValueFromKey(key);
        tableGamePlay = tableGamePlay || defaultTableGamePlay;
        console.log("==============tableGamePlay==================", tableGamePlay);
        
        seats = tableGamePlay.seats.filter(
          (ele: seatsInterface): string => ele.userId
        );
        console.log("==========Seats==========", seats);
      }
    }
    return tableId;
}
 export = findOrCreateTable;