import { seatsInterface } from '../interfaces/signup';

async function selectDealerForRound(
  seats: Array<seatsInterface>,
  round: number,
  lastDealerPlayer: number
): Promise<number> {
  let k = 0;
  if (round >= 1) {
    k = lastDealerPlayer - 1;
    if (k < 0) {
      k = Number(seats.length - 1);
    }
  } else {
    k = Math.floor(Math.random() * Math.floor(seats.length));
  }
  return k;
}

export = selectDealerForRound;
