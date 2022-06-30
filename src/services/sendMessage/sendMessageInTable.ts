import { messageInterface } from '../../interfaces/messageInTable';
import { successRes } from '../../interfaces/signup';
import chooseMessage from '../../utils/chooseInactiveMessage';
import sendMessageEvent from './sendMessageEvent';

async function sendMessageToAll(
  messageData: messageInterface
): Promise<successRes> {
  const { tableSeats, tableId, currentRound, maximumSeat } = messageData;
  
    const sendMessage: string = await chooseMessage(
      tableSeats,
      tableId,
      currentRound,
      maximumSeat
    );
    await sendMessageEvent(tableId, tableSeats, currentRound, sendMessage);
    return { success: true, error: null, tableId };

}

export = sendMessageToAll;
