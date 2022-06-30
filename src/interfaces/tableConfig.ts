export interface defaultTableConfig {
  _id : string,
  gameType: string,
  roundCount: number,
  currentRound: number,
  lobbyId: number,
  giftSendEnable: boolean,
  multiWinner: boolean,
  maximumPoints: number,
  minimumSeat: number,
  maximumSeat: number,
  gameStartTimer: number,
  userTurnTimer: number,
  userFinishTimer: number,
  secondaryTimer: number,
  entryFee: number,
  manualSplit: boolean,
  gifts: any,
  winner: any,
  createdAt: string,
  updatedAt: string,
  validDeclareCheck: true,
  }

  export interface NewGTIResponse {
    isFTUE: boolean;
    tableId: string;
    seatIndex: number;
    activePlayers: number;
    currentRound: number;
    closedDeck:Array<string>;
    opendDeck:Array<string>;
    turnCount:number;
    dealerPlayer:number;
    declarePlayer:number;
    gameStartTimer: number;
    turnTimer: number;
    tableState: string;
    playersDetail: Array<playersDetailsInterface>;
  }

  interface profileI {
    userId: string;
    username: string;
    avatar: string;
  }

  export interface playersDetailsInterface {
    profile: profileI;
    seatIndex: number;
    dealwinner: number;
    dealPoint: number;
    pts :number;
    rank: number;
    userStatus: string;
  }