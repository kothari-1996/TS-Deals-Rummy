import { UserProfileOutput } from "../../interfaces/userprofile";
import { getTableConfig } from "../../cache/tableConfig";
import { getTableGamePlay, insertTableGamePlay } from "../../cache/tableGamePlay";
import { insertPlayerGamePlay, getPlayerGamePlay } from "../../cache/playerGamePlay";
import { getRound } from "../../cache/round";
import { seatsInterface } from "../../interfaces/signup";
import { defaulPlayerGamePlayData } from "../../defaultGenerator";

async function insertPlayerInTable(
    userData: UserProfileOutput | null,
    tableId: string
  ){
      const tableConfig = await getTableConfig(tableId);
      console.log("=========GET:tableConfig==========", tableConfig);

      if (!tableConfig) throw Error('Unable to get Table Config Data');
      const { currentRound } = tableConfig;
      const [tableGamePlay, roundData] = await Promise.all([
        getTableGamePlay(tableId, currentRound),
        getRound(tableId, currentRound)

      ]);
      console.log("=========GET:tableGamePlay==========", tableGamePlay);
      console.log("=========GET:roundData==========", roundData);

      if (!tableGamePlay) throw Error('Unable to get Table Game Play');
      if (!roundData) throw Error('Unable to get Table Round Data');
  
      const seatIndex = await insertPlayerInSeat(
        tableGamePlay.seats,
        String(userData?._id)
      );
      console.log("=========seatIndex==========", seatIndex);
      
      const isSeatEmpty = await checkIfSeatEmpty(seatIndex, tableGamePlay.seats);
      console.log("=========isSeatEmpty==========", isSeatEmpty);

      let playerGamePlay : any;
  
      if (seatIndex !== -1 && isSeatEmpty) {
        const seatObject: seatsInterface = {
          userId: String(userData?._id),
          seat: seatIndex
        };
        tableGamePlay.seats.splice(seatIndex, 0, seatObject);
        tableGamePlay.currentPlayerInTable += 1;
    
        playerGamePlay = await defaulPlayerGamePlayData(
          String(userData?._id),
          seatIndex,
          roundData._id,
          false
        );
        console.log("============playerGamePlay=============", playerGamePlay);
          
        await Promise.all([
          insertPlayerGamePlay(
            playerGamePlay,
            tableId,
            currentRound
          ),
          insertTableGamePlay(
            tableGamePlay,
            tableId,
            currentRound
          )
        ]);
  
      } else {
        // player is already in a table
        playerGamePlay = await getPlayerGamePlay(
          String(userData?._id),
          tableId,
          currentRound
        );
        if (!playerGamePlay) {
          playerGamePlay = await defaulPlayerGamePlayData(
            String(userData?._id),
            seatIndex,
            roundData._id,
            false
          );
          await insertPlayerGamePlay(
            playerGamePlay,
            tableId,
            currentRound
          );
        }
      }
  
      return {
        tableGamePlay,
        playerGamePlay,
        roundData,
        tableConfig
      };
  }


function insertPlayerInSeat(
    seats: Array<seatsInterface>,
    userId: string
  ): number {
    try {
      let seatIndex = -1;
  
      for (let i = 0; i < seats.length; ++i) {
        const seat: seatsInterface = seats[i];
  
        // found an empty place in array
        if (!seat) break;
  
        if (seat.seat !== i) {
          return i;
        } else if (seat.userId === userId) {
          return seat.seat;
        }
      }
  
      if (seatIndex === -1) {
        seatIndex = seats.length;
      }
      return seatIndex;
      
    } catch (error: any) {
      throw new Error(
        error && error.message && typeof error.message === 'string'
          ? error.message
          : 'insertPlayerInSeat error'
      );
    }
}

async function checkIfSeatEmpty(
    seatIndex: number,
    seats: Array<seatsInterface>
  ): Promise<boolean> {
    for (let i = 0; i < seats.length; ++i) {
      const seat: seatsInterface = seats[i];
  
      if (seat.seat === seatIndex) {
        return false;
      }
    }
    return true;
}
  

export = insertPlayerInTable;