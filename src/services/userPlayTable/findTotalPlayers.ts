import { seatsInterface } from '../../interfaces/signup';
import { defaultTableGamePlayInterface } from '../../interfaces/tableGamePlay';
import  userProfile  from '../../utils/userProfile';


const findTotalPlayersCount = async (
  tableGamePlay: defaultTableGamePlayInterface
): Promise<number> => {

    const filteredSeats = tableGamePlay.seats.filter(
      (seat: seatsInterface) => seat.userId
    );

    const playerInfoPromise = filteredSeats.map((seat: seatsInterface) =>
    userProfile.getUser({ _id: seat.userId })
    );
    
    const totalPlayers = await Promise.all(playerInfoPromise);
    console.log("=============totalPlayers=============", totalPlayers);
    const totalPlayersCount = totalPlayers.length;

    return totalPlayersCount;

};

export = findTotalPlayersCount;
