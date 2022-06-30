// import { getTableConfig } from "../../cache/tableConfig";
// import { getTableGamePlay } from "../../cache/tableGamePlay";
// import  selectDealerForRound  from "../../utils/selectDealerForRound";
// import { countDownInterface } from "../../interfaces/round";
// import { insertTableGamePlay } from "../../cache/tableGamePlay";
// import { addValueInSortedSet } from "../../cache/redisWrapper";

// async function roundStartTimer(
//   socket:any,
//   tableId: string,
//   currentRound: number
// ): Promise<boolean> {
//   let lock: any;
//     const [tableConfig, tableGamePlay] = await Promise.all([
//       getTableConfig(tableId),
//       getTableGamePlay(tableId, currentRound)
//     ]);
//     if (!tableGamePlay || !tableConfig) {
//       throw Error('Unable to get data');
//     }


//     const dealerPlayer = await selectDealerForRound(
//       tableGamePlay.seats,
//       currentRound,
//       tableGamePlay.dealerPlayer
//     );

//     const countDownData: countDownInterface = {
//       time: ZKConfig.GAME_START ? ZKConfig.GAME_START : CONFIG.GAME_START,
//       roundId: tableGamePlay.roundId,
//       DLR: dealerPlayer,
//       score: []
//     };
//     tableGamePlay.tableState = 'ROUND_TIMER_STARTED';
//     tableGamePlay.dealerPlayer = dealerPlayer;
//     tableGamePlay.updatedAt = new Date();

//     await insertTableGamePlay(
//       tableGamePlay,
//       tableId,
//       currentRound
//     );

//     const validatedCountDownData: countDownInterface = countDownData;

//     await addValueInSortedSet(
//       'tableId',
//       new Date().getTime(),
//       tableId
//     );

//     socket.emit(EVENTS.GAME_COUNT_DOWN, {
//       tableId,
//       data: validatedCountDownData
//     });

//     const GAME_START: number = ZKConfig.GAME_START
//       ? ZKConfig.GAME_START
//       : CONFIG.GAME_START;
//     const LOCK_IN_PERIOD: number = ZKConfig.LOCK_IN_PERIOD
//       ? ZKConfig.LOCK_IN_PERIOD
//       : CONFIG.LOCK_IN_PERIOD;

//     const lockTime = GAME_START - NUMERICAL.THOUSAND * LOCK_IN_PERIOD;
//     const jobId = `${tableConfig.gameType}:roundTimerStart:${tableId}`;
//     Scheduler.addJob.roundTimerStart({
//       timer: lockTime,
//       jobId,
//       tableId,
//       currentRound
//     });

//     await tableGamePlay.seats.map(async (userData: any) => {
//       showTips(userData.userId, tableId, currentRound);
//     });

//     return false;
// }

// export = roundStartTimer;
