import { seatsInterface } from './signup';
import { discardedCardsObjInterface } from './throwCard';


export interface defaultTableGamePlayInterface {
  _id: string,
  roundId: string,
  trumpCard: null,
  closedDeck: Array<string>,
  opendDeck: Array<string>,
  turnCount: number,
  dealerPlayer: number,
  declarePlayer: number,
  finishCount:Array<string>,
  potValue: number,
  currentTurn: null,
  currentPlayerInTable: number,
  tie: boolean,
  tableState:string,
  history: Array<string>,
  splitUserId: null,
  requestedPlayerUsername: null,
  splitCount: number,
  enableRejoin: boolean,
  seats: Array<seatsInterface>,
  totalPlayerPoints: number,
  allColludedUsers: boolean,
  tableCurrentTimer: number,
  gameType:string,
  createdAt:string,
  updatedAt:string,
}

export interface defaultRoundInterface {
  _id: string;
  tableId: string;
  roundWinner: Array<string>;
  currentRound: number;
  createdAt: string;
  updatedAt: string;
}

export interface DefaultBaseTable {
  tableState: string;
  seats: Array<seatsInterface>;
}

