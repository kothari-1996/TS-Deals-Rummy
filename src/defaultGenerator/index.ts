import { UserProfileDataInput, UserProfileOutput } from "../interfaces/userprofile"
import { defaultRoundInterface } from "../interfaces/tableGamePlay";
import { SignupOutput } from "../interfaces/signup";
import { defaultTableConfig } from "../interfaces/tableConfig";
import { defaultTableGamePlayInterface } from "../interfaces/tableGamePlay";
const { ObjectId } = require("mongodb")

function defaultUserProfile(userData: UserProfileDataInput): UserProfileOutput {
    const currentTimestamp = new Date();
    return {
      _id: userData.userId ? userData.userId.toString() : ObjectId().toString(),
      username: userData.username,
      profilePic: userData.profilePic,
      tableId: '',
      socketId: userData.socketId,
      gameId: userData.gameId,
      lobbyId: userData.lobbyId,
      isRobot: false,
      isPlay: false,
      lastTipsNumber: -1,
      tipsNumber: 0,
      tipsShowCounter: 0,
      createdAt: currentTimestamp.toString(),
      updatedAt: currentTimestamp.toString(),
    };
}

function defaulTableData(signUpData : SignupOutput): defaultTableConfig {
  const currentTimestamp = new Date();
  return {
    _id : ObjectId().toString(),
    gameType: "Rummy",
    roundCount: signUpData.roundCount,
    currentRound: 1,
    lobbyId: signUpData.lobbyId,
    giftSendEnable: false,
    multiWinner: false,
    // rakePercentage: signUpData.rakePercentage,
    maximumPoints: 160,
    minimumSeat: 2,
    maximumSeat: signUpData.maximumSeat,
    gameStartTimer: 15000,
    userTurnTimer: 30000,
    userFinishTimer: 30000,
    secondaryTimer: 15000,
    // collusionEnabled: signUpData.Collusion,
    entryFee: signUpData.entryFee,
    manualSplit: true,
    gifts: [],
    winner: [],
    createdAt: currentTimestamp.toString(),
    updatedAt: currentTimestamp.toString(),
    // bonusMultiplier: signUpData.bonusMultiplier,
    validDeclareCheck: true,
  };
}

function defaultRoundData(
    tableId: string,
    roundNum: number
  ): defaultRoundInterface {
    const currentTimestamp = new Date();
    const data = {
      _id: ObjectId().toString(),
      tableId,
      roundWinner: [],
      currentRound: roundNum,
      createdAt: currentTimestamp.toString(),
      updatedAt: currentTimestamp.toString()
    };
  
    return data;
}

function defaultTableGamePlayData(
    roundId:string,
    gameType:string,
  ):defaultTableGamePlayInterface {
    const currentTimestamp = new Date();
    const data ={
      _id: ObjectId().toString(),
      roundId,
      trumpCard: null,
      closedDeck: [],
      opendDeck: [],
      turnCount: 0,
      dealerPlayer: -1,
      declarePlayer: -1,
      finishCount: [],
      potValue: 0,
      currentTurn: null,
      currentPlayerInTable: 0,
      tie: false,
      tableState:"",
      history: [],
      splitUserId: null,
      requestedPlayerUsername: null,
      splitCount: 0,
      enableRejoin: false,
      seats: [],
      totalPlayerPoints: 0,
      allColludedUsers: false,
      tableCurrentTimer: 0,
      gameType : gameType,
      createdAt: currentTimestamp.toString(),
      updatedAt: currentTimestamp.toString(),
    };
    return data
  }

function defaulPlayerGamePlayData(
    userId : string,
    seatIndex : number,
    roundId : string,
    isRejoin : boolean,
  ) {
    const currentTimestamp = new Date();
    const data = {
      _id: ObjectId().toString(),
      userId,
      roundId,
      seatIndex,
      userStatus: "Playing",
      indecl: false,
      tCount: 0,
      timestamp: currentTimestamp.toString(),
      cardPoints: 0,
      pts: 0,
      pickCount: 0,
      lastPickCard: '',
      isFirstTurn: true,
      dealwinner: 0,
      dealPoint:80,
      rank: 0,
      currentCards: [],
      groupingCards: {
        pure: [],
        seq: [],
        set: [],
        dwd: [],
      },
      turnTimeOut: 0,
      split: 2,
      useRejoin: isRejoin || false,
      winningCash: 0,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };
    return data;
}


const exportedObject = {
    defaultUserProfile,
    defaulTableData,
    defaultRoundData,
    defaultTableGamePlayData,
    defaulPlayerGamePlayData
};



  
export = exportedObject;