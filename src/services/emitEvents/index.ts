import { defaulPlayerGamePlayInterface } from '../../interfaces/playerGamePlay';


const emitJoinTableEvent = async (
  tableId: string,
  playerGamePlay: defaulPlayerGamePlayInterface,
  userProfile: any,
  socket: any,
  reconnect: boolean
): Promise<boolean> => {
  
    const userId = userProfile._id;
    const formatedJoinTableResponse = {
      tableId,
      playerGamePlay,
      userProfile,
      reconnect
    };

    socket.emit("response", {
      EVENT : 'JOIN_TABLE',
      tableId,
      data: formatedJoinTableResponse
    });

    const emit = socket.emit("response", {
      EVENT : 'APIT',
      socketId : socket.id,
      data: { tableId, userId }
    });
    return emit;
};


const exportObj = {
  emitJoinTableEvent,
};

export = exportObj;
