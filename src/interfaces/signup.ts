interface errorObj {
    errorCode: number;
    errorMessage: string;
}
export interface errorRes {
    success: boolean;
    error: errorObj | null;
}

export interface CreateTableI {
    socketId: string;
    userId: string;
    username: string;
    entryFee: number;
    roundCount: number;
    lobbyId: number;
    maximumSeat: number;
    cardCount: number;
    gameId: number;
    profilePic: string;
  }

export interface seatsInterface {
    userId: string;
    seat: number;
}

export interface SignupInput {
    lobbyId: number;
    gameId: number;
    tableId?: string;
    username: string;
    profilePic: string;
  }

export interface SignupOutput {
    socketId: string;
    username: string;
    entryFee: number;
    roundCount: number;
    lobbyId: number;
    maximumSeat: number;
    cardCount: number;
    gameId: number;
    profilePic: string;
}

export interface successRes {
    success: boolean;
    error: any;
    tableId?: string;
  }