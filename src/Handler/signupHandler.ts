
import { errorRes } from "../interfaces/signup"
import { createOrFindUser } from "../services/userPlayTable/index"
import  findTableForUser  from "../services/userPlayTable/findTableForUser";
import { formateUpdatedGameTableData } from "../formatResponseData"


async function signUpHandler(socket:any, eventData : any) {
  let signUpData = eventData.data;

  const userSignUp = await createOrFindUser({
    socketId : socket.id.toString(),
    userId: signUpData?.userId,
    lobbyId: signUpData.lobbyId,
    gameId: signUpData.gameId,
    username: signUpData.username,
    profilePic: signUpData.profilePic
  });

  const userProfile = userSignUp.userProfileData;
  
  const findTableInput = {
    ...userSignUp.signUpData,
    ...{
      entryFee: 10,
      roundCount: 2,
      maximumSeat: 2,
      cardCount: 13
    }
  }
  // console.log("=============findTableInput=============", findTableInput);
  // console.log("=============userProfile=============", userProfile);

  const { tableConfig, tableGamePlay, playerGamePlay } = 
  await findTableForUser(findTableInput, userProfile);

  // console.log("=============tableConfig=============", tableConfig);
  // console.log("=============tableGamePlay=============", tableGamePlay);
  // console.log("=============playerGamePlay=============", playerGamePlay);


  const formatedGTIResponse = await formateUpdatedGameTableData(
    tableConfig,
    tableGamePlay,
    playerGamePlay
  );
  return formatedGTIResponse;
}

export = signUpHandler
