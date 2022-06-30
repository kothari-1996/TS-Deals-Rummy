import { seatsInterface } from './signup';

export interface messageInterface {
  tableSeats: Array<seatsInterface>;
  tableId: string;
  currentRound: number;
  maximumSeat: number;
}
