import { Logger } from 'lib-pathfinder-node';
import CommonEventEmitter from '../../commonEventEmitter';
import { EVENTS } from '../../constants';
import { userProfileCache } from '../../cache';
import { formateMessageEvent } from '../../formatResponseData';
import { seatsInterface, successRes } from '../../interfaces/signup';
import { activePlayers, inactivePlayers } from '../calculatePlayers';
import { defaulPlayerGamePlayInterface } from '../../interfaces/playerGamePlay';
import { alertMessageInterface } from '../../interfaces/iamBack';
import Errors from '../../errors';

async function sendMessageEvent(
  tableId: string,
  tableSeats: Array<seatsInterface>,
  currentRound: number,
  message: string
): Promise<successRes> {
  try {
    Logger.info(
      `Starting sendMessageEvent for tableId : ${tableId} and round: ${currentRound}`
    );

    const totalActivePlayers: Array<defaulPlayerGamePlayInterface> =
      await activePlayers(tableSeats, tableId, currentRound);
    const inActivePlayers: Array<defaulPlayerGamePlayInterface> =
      await inactivePlayers(tableSeats, tableId, currentRound);

    const allPlayers: Array<defaulPlayerGamePlayInterface> =
      totalActivePlayers.concat(inActivePlayers);

    const playersProfile = await Promise.all(
      allPlayers.map((player) => userProfileCache.getUserProfile(player.userId))
    );

    for (let i = 0; i < playersProfile.length; i++) {
      const userProfile = playersProfile[i];
      if (userProfile) {
        const formateMessageEventResponse: alertMessageInterface =
          await formateMessageEvent(tableId, Number(userProfile._id), message);
        CommonEventEmitter.emit(EVENTS.SEND_MESSAGE_TO_ALL_PLAYERS, {
          socketId: userProfile.socketId,
          data: formateMessageEventResponse,
          tableId
        });
      }
    }

    Logger.info(
      `Ending sendMessageEvent for tableId : ${tableId} and round: ${currentRound}`
    );
    return { success: true, error: null, tableId };
  } catch (error: any) {
    Logger.error(
      error,
      ` table ${tableId} round ${currentRound} function sendMessageEvent`
    );
    throw error instanceof Errors.CancelBattle
      ? CommonEventEmitter.emit(EVENTS.CANCEL_BATTLE, {
          tableId,
          errorMessage:
            error && error.message && typeof error.message === 'string'
              ? error.message
              : 'INTERNAL_ERROR_sendMessageEvent-sendMessageToAll()'
        })
      : error;
  }
}

export = sendMessageEvent;
