import { getTableConfig } from '../../cache/tableConfig'
import  findUserFromSeatIndex  from '../../utils/findUserFromSeatIndex'
import { getValueFromKey } from "../../cache/userProfile";
import { getPlayerGamePlay } from "../../cache/playerGamePlay";
import { getTableGamePlay } from "../../cache/tableGamePlay";
import { NewGTIResponse } from '../../interfaces/tableConfig'
import { successRes } from "../../interfaces/signup";
import { emitJoinTableEvent } from "../emitEvents";
import  findTotalPlayersCount  from "../userPlayTable/findTotalPlayers";
import { pushIntoQueue } from "../../cache/tableConfig";
// import { messageInterface } from "../../interfaces/messageInTable";
// import { sendMessageToAll } from "../sendMessage";
// import { roundStartTimer } from "../../services/round/index";


async function joinTable(
    response: NewGTIResponse,
    socket: any,
    reconnect: boolean
  ): Promise<successRes> {
    
    let tempUserId = '';
      if (response && 'tableId' in response) {
        const { tableId, seatIndex, playersDetail } = response;
          
        const userId: string = await findUserFromSeatIndex(
          seatIndex,
          playersDetail
        );
        tempUserId = userId;
        console.log("============tempUserId=============", tempUserId);
          

        const tableConfig = await getTableConfig(tableId);
        console.log("===========GET:tableConfig===========", tableConfig);
        if (!tableConfig) throw Error('Unable to get table config data');
  
        const [userProfile, playerGamePlay, tableGamePlay] = await Promise.all([
         getValueFromKey(userId),
         getPlayerGamePlay(
            userId.toString(),
            tableId,
            tableConfig.currentRound
          ),
         getTableGamePlay(tableId, tableConfig.currentRound)
        ]);
        console.log("==============userProfile===============", userProfile);
        console.log("==============playerGamePlay===============", playerGamePlay);
        console.log("===============tableGamePlay===============", tableGamePlay); 

        if (!userProfile) throw Error('Unable to get user data');
        if (!playerGamePlay) throw Error('Unable to get player data');
        if (!tableGamePlay) throw Error('Unable to get table game play data');
  
        // if (
        //   reconnect &&
        //   tableGamePlay.tableState !== 'WAITING_FOR_PLAYERS' &&
        //   tableGamePlay.tableState !== 'ROUND_TIMER_STARTED'
        // ) {
        //   const selectMessageData: messageInterface = {
        //     tableSeats: tableGamePlay.seats,
        //     tableId,
        //     currentRound: tableConfig.currentRound,
        //     maximumSeat: tableConfig.maximumSeat
        //   };
        //   sendMessageToAll(selectMessageData);
        // }
  
        await emitJoinTableEvent(
          tableId,
          playerGamePlay,
          userProfile,
          socket,
          reconnect
        );
  
        if (reconnect) {
           await socket.emit("response", {
            EVENT : "SIGNUP",
            tableConfig,
            tableGamePlay,
            userProfile,
            isRejoin: true,
            reason: 'Rejoined successfully'
          });
        } else {
           await socket.emit("response", {
            EVENT : "SIGNUP",
            tableConfig,
            tableGamePlay,
            userProfile,
            isJoined: true,
            reason: 'Joined successfully'
          });
        }
  
        if (!reconnect) {
          const totalPlayersCount = await findTotalPlayersCount(tableGamePlay);
          console.log("=========totalPlayersCount============", totalPlayersCount);
          
          if (totalPlayersCount < tableConfig.maximumSeat) {
            await pushIntoQueue(
              `Rummy:${tableConfig.lobbyId}:${tableConfig.maximumSeat}`,
              tableId
            );
          }
  
          // if (totalPlayersCount === tableConfig.maximumSeat) {
          //   await roundStartTimer(socket, tableId, tableConfig.currentRound);
          // }

        }
      }
      return {
        success: true,
        error: null
      }
  }

  export = joinTable;