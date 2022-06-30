export interface UserProfileDataInput {
    socketId: string;
    userId: string;
    username: string;
    lobbyId: number;
    gameId: number;
    profilePic: string;
  }

export interface UserProfileOutput {
    _id: string;
    username: string;
    profilePic: string;
    tableId: string;
    socketId: string;
    gameId: number;
    lobbyId: number;
    isRobot: boolean;
    isPlay: boolean;
    lastTipsNumber: number;
    tipsNumber: number;
    tipsShowCounter: number;
    createdAt: string;
    updatedAt: string;
}

export interface GetUserInput {
  _id: string;
}
