//       case EVENTS.SIGN_UP_SOCKET_EVENT: // User signUp
//       case EVENTS.SAVE_CARDS_IN_GROUPS_SOCKET_EVENT: // Save Cards In Groups
//       case EVENTS.PICK_FROM_CLOSE_DECK_SOCKET_EVENT: // Pick From Close Deck
//       case EVENTS.PICK_FROM_OPEN_DECK_SOCKET_EVENT: // Pick From Open Deck
//       case EVENTS.DISCARD_CARD_SOCKET_EVENT: // Discard Card - Throw Card After Pick Card
//       case EVENTS.SHOW_POPUP_ERROR_MESSAGES_SOCKET_EVENT: // Show popup open messages
//       case EVENTS.DROP_SOCKET_EVENT: // Drop Cards
//       case EVENTS.DECLARE_SOCKET_EVENT: // Declare
//       case EVENTS.FINISH_SOCKET_EVENT: // Finish
//       case EVENTS.LEAVE_TABLE_SOCKET_EVENT:
//       case EVENTS.SCORE_CARD_SOCKET_EVENTS:
//       case EVENTS.GET_LAST_WINNER_DATA_SOCKET_EVENT:
//       case EVENTS.GAME_PLAYING_TABLE_INFO_SOCKET_EVENT:
//       case EVENTS.PLAY_MORE_YES_SOCKET_EVENT: // PlayMore
//       case EVENTS.SET_EMOJI_SOCKET_EVENT:
//       case EVENTS.DISCONNECT:




//      const getRandomInt = (min, max) => {
//   / +-------------------------------------------------------------------+
//           desc:this function generates random integer between min and max.
//           i/p:min->lower bound,max->upper bound
//           o/p:random int
//       +-------------------------------------------------------------------+ /


//   const rnd =
//     Math.floor(
//       Math.random() * (parseInt(max, 10) - parseInt(min, 10) + 1),
//     ) + parseInt(min, 10);
//   return Number(rnd);
// };


function defaultUserData(signUpData) {
    // generates the user default fields for the game
    const currentTimestamp = new Date();
  
  
    const data = {
      id: signUpData.userId.toString(),
      username: !signUpData.username
        ? `Guest${getRandomInt(1, 99999999)}`
        : signUpData.username,
      userId: signUpData.userId, // (signUpData.ID) ? signUpData.ID : userId,
      profilePic: signUpData.profilePic, // profile picture,
      deviceId: signUpData.deviceId, // //device ids
      rejoinId: '', // rejoinId
      gameId: signUpData.gameId, // gameId get in
      socketId: signUpData.socketId,
      isVIPMember: signUpData.isVIPMember,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      mobileNumber: signUpData.mobileNumber,
    };
    if (signUpData.Chips) data.Chips = signUpData.Chips;
    return data;
  }
  
  function defaulTableData(signUpData) {
    const currentTimestamp = new Date();
    const data = {
      _id:
        signUpData.gameType === RUMMY_TYPES.TOURNAMENT
          ? signUpData.tableId
          : ObjectID().toString(),
      gameType: signUpData.gameType,
      roundCount: signUpData.roundCount,
      currentRound: NUMERICAL.ONE,
      lobbyId: signUpData.lobbyId,
      giftSendEnable: signUpData.giftSendEnable,
      multiWinner: signUpData.multiWinner,
      rakePercentage: signUpData.rakePercentage,
      maximumPoints: signUpData.maximumPoints,
      minimumSeat: signUpData.minimumSeat,
      maximumSeat: signUpData.maximumSeat,
      gameStartTimer: signUpData.gameStartTimer,
      userTurnTimer: signUpData.userTurnTimer,
      userFinishTimer: signUpData.userFinishTimer,
      secondaryTimer: signUpData.secondaryTimer,
      collusionEnabled: signUpData.Collusion,
      bootValue: signUpData.bootValue,
      manualSplit: Boolean(signUpData.manualSplit),
      gifts: [],
      winner: [],
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      bonusMultiplier: signUpData.bonusMultiplier,
      validDeclareCheck: signUpData.validDeclareCheck,
    };
    if (signUpData.tournamentId) {
      data.tournamentId = signUpData.tournamentId;
    }
    if (signUpData.totalLevels) {
      data.totalLevels = signUpData.totalLevels;
    }
    if (signUpData.currentLevel) {
      data.currentLevel = signUpData.currentLevel;
    }
    if (signUpData.levelTime) {
      data.levelTime = signUpData.levelTime;
    }
    if (signUpData.roundTime) {
      data.roundTime = signUpData.roundTime;
    }
    if (signUpData.startTime) {
      data.levelStartTime = signUpData.startTime.toString();
    }
    if (signUpData.endTime) {
      data.levelEndTime = signUpData.endTime.toString();
    }
    if (signUpData.levelId) {
      data.levelId = signUpData.levelId;
    }
    if (signUpData.nextStartTime) {
      data.nextLevelStartTime = signUpData.nextStartTime.toString();
    }
  
  
    if (signUpData.finalLevel) {
      data.finalLevel = signUpData.finalLevel;
    }
  
  
    return data;
  }
  
  function defaultTableGamePlayData(
    roundId,
    oldTableGameData = {},
    gameType,
  ) {
    const currentTimestamp = new Date();
    const data = {
      _id: ObjectID().toString(),
      roundId,
      trumpCard: null,
      closedDeck: [],
      opendDeck: [],
      turnCount: 0,
      dealerPlayer: -1,
      declarePlayer: -1,
      finishCount: [],
      potValue:
        oldTableGameData && oldTableGameData.potValue
          ? oldTableGameData.potValue
          : 0,
      currentTurn: null,
      currentPlayerInTable: oldTableGameData.currentPlayerInTable,
      tie: false,
      tableState:
        oldTableGameData.tableState || TABLE_STATE.WAITING_FOR_PLAYERS,
      history: [],
      splitUserId: null,
      requestedPlayerUsername: null,
      splitCount: 0,
      enableRejoin: false,
      seats: [],
      totalPlayerPoints: 0,
      allColludedUsers: false,
      tableCurrentTimer: oldTableGameData.tableCurrentTimer || 0,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };
    if (gameType === RUMMY_TYPES.POINTS) {
      data.audience = [];
    }
    return data;
  }
  
  function defaulPlayerGamePlayData(
    userObjectId,
    seatIndex,
    roundId,
    dealPoint,
    isRejoin,
  ) {
    const currentTimestamp = new Date();
    const data = {
      _id: ObjectID().toString(),
      userObjectId,
      roundId,
      seatIndex,
      userStatus: PLAYER_STATE.PLAYING,
      indecl: false,
      tCount: 0,
      timestamp: currentTimestamp.toString(),
      cardPoints: 0,
      pts: 0,
      pickCount: 0,
      lastPickCard: '',
      isFirstTurn: true,
      dealwinner: 0,
      dealPoint,
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
  
  function defaultRoundData(tableId, roundNum) {
    const currentTimestamp = new Date();
    const data = {
      _id: ObjectID().toString(),
      tableId,
      roundWinner: [],
      roundCount: roundNum,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };
  
  
    return data;
  }