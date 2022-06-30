import { defaultTableConfig,
         NewGTIResponse, 
         playersDetailsInterface 
    } from "../interfaces/tableConfig";
import { defaultTableGamePlayInterface } from "../interfaces/tableGamePlay";
import { defaulPlayerGamePlayInterface } from "../interfaces/playerGamePlay";
import { UserProfileOutput } from "../interfaces/userprofile";
import { seatsInterface } from "../interfaces/signup";
import { getPlayerGamePlay } from "../cache/playerGamePlay";
import { getValueFromKey } from "../cache/userProfile";


async function formateUpdatedGameTableData(
    tableConfig: defaultTableConfig,
    tableGamePlay: defaultTableGamePlayInterface,
    playerData: defaulPlayerGamePlayInterface
  ): Promise<NewGTIResponse> {

      const tablePlayers: Array<playersDetailsInterface> = [];
  
      const availablePlayerIds: Array<string> = tableGamePlay.seats.map(
        (e: seatsInterface): string => e.userId
      );
      // console.log("===========availablePlayerIds============", availablePlayerIds);
      const availablePlayerLength: number = availablePlayerIds.length;


  
      const availablePGP: Array<defaulPlayerGamePlayInterface | null> =
        await Promise.all(
          availablePlayerIds.map(async (id: string) => {
            return await getPlayerGamePlay(
              id.toString(),
              tableConfig._id,
              tableConfig.currentRound
            );
          })
        );
      // console.log("===========availablePGP============", availablePGP);
      

      const availableUsers: Array<UserProfileOutput | null> = await Promise.all(
        availablePlayerIds.map(async (id: string) => await getValueFromKey(id))
      );
      // console.log("===========availableUsers============", availableUsers);
      

      for (let i = 0; i < availablePlayerLength; i++) {
        const playerGamePlay = availablePGP[i];
        const userProfileData = availableUsers[i];
  
        if (playerGamePlay && userProfileData) {
          const seatPlayer: playersDetailsInterface = {
            profile: {
              userId: playerGamePlay.userId,
              username: userProfileData.username,
              avatar: userProfileData.profilePic
            },
            seatIndex: playerGamePlay.seatIndex,
            dealwinner: playerGamePlay.dealwinner,
            dealPoint: playerGamePlay.dealPoint,
            pts: playerGamePlay.pts,
            rank: playerGamePlay.rank,
            userStatus: playerGamePlay.userStatus
          };
          tablePlayers.push(seatPlayer);
        }
      }
  
      const data: NewGTIResponse = {
        isFTUE: false,
        tableId: tableConfig._id,
        seatIndex: playerData.seatIndex,
        activePlayers: tableGamePlay.currentPlayerInTable,
        currentRound:
          tableGamePlay.tableState === "WAITING_FOR_PLAYERS" ||
          tableGamePlay.tableState === "ROUND_TIMER_STARTED"
            ? 0
            : tableConfig.currentRound,
        gameStartTimer: tableConfig.gameStartTimer,
        turnTimer: tableConfig.userTurnTimer,
        tableState: tableGamePlay.tableState,
        closedDeck : tableGamePlay.closedDeck,
        opendDeck : tableGamePlay.opendDeck,
        turnCount : tableGamePlay.turnCount,
        dealerPlayer : tableGamePlay.dealerPlayer,
        declarePlayer : tableGamePlay.declarePlayer,
        playersDetail: tablePlayers
      };
      return data;
    
  }



const exportObj = {
    formateUpdatedGameTableData
};
  
export = exportObj;