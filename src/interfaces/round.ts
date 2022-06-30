import { seatsInterface } from './signup';

export interface roundInterface {
    _id: string;
    tableId: string;
    currentRound: number;
    roundWinner: number[];
    scores: any;
    createdAt: string;
    updatedAt: string;
  }

  export interface countDownInterface {
    time: number;
    roundId: string;
    DLR: number;
    score: Array<seatsInterface>;
  }