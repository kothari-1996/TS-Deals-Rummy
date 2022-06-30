import { seatsInterface } from './signup';
import { discardedCardsObjInterface } from './throwCard';

export interface defaulPlayerGamePlayInterface {
  _id: string;
  userId:string;
  roundId:string;
  seatIndex:number;
  userStatus: string;
  indecl: boolean;
  tCount: number;
  timestamp: string;
  cardPoints: number;
  pts: number;
  pickCount: number;
  lastPickCard: string;
  isFirstTurn: boolean;
  dealwinner: number;
  dealPoint : number;
  rank: number;
  currentCards: Array<string>;
  groupingCards: any;
  turnTimeOut: number;
  split: number;
  useRejoin: boolean;
  winningCash: number;
  createdAt: string;
  updatedAt: string;
  }

  export interface DefaultBaseTable {
    tableState: string;
    seats: Array<seatsInterface>;
  }