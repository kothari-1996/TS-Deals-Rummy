import { Logger } from 'lib-pathfinder-node';
import { seatsInterface } from '../interfaces/signup';
import { notActivePlayers } from '../services/calculatePlayers';
import { CONFIG, EMPTY, NUMERICAL } from '../constants';
import { getConfig } from '../connection/zk';

const ZKConfig = getConfig();

async function chooseMessage(
  tableSeats: Array<seatsInterface>,
  tableId: string,
  currentRound: number,
  maximumSeat: number
): Promise<string> {
  
    const { left, bot } = await notActivePlayers(
      tableSeats,
      tableId,
      currentRound
    );

    let msg = EMPTY;

    if (left >= maximumSeat - NUMERICAL.ONE) {
      msg =
        maximumSeat - NUMERICAL.ONE + ' ' + ZKConfig.TUQ
          ? ZKConfig.TUQ
          : CONFIG.TUQ;
    } else if (bot == maximumSeat - NUMERICAL.ONE) {
      msg =
        maximumSeat - NUMERICAL.ONE + ' ' + ZKConfig.TUIA
          ? ZKConfig.TUIA
          : CONFIG.TUIA;
    } else if (bot == maximumSeat) {
      msg = ZKConfig.AUIA ? ZKConfig.AUIA : CONFIG.AUIA;
    }
    return msg;
 
}

export = chooseMessage;
