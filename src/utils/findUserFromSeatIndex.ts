import { playersDetailsInterface } from '../interfaces/tableConfig';

async function findUserFromSeatIndex(
  seatIndex: number,
  playersDetail: Array<playersDetailsInterface>
): Promise<string> {

    const playerData = playersDetail.filter((player) => {
      return player.seatIndex === seatIndex;
    });
    return playerData[0].profile.userId;
}

export = findUserFromSeatIndex;
