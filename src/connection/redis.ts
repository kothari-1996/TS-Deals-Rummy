// import { RedisClient, createClient } from 'redis';
// import { RedisCred } from '../interfaces/redis';

//   interface connectionsMapI {
//     redisClient: RedisClient;
//     pubClient: RedisClient;
//     subClient: RedisClient;
//   }

// let connectionsMap: connectionsMapI | null = null;
// const connectionCallback = async (resolve: any, reject: any) => {

//   const gamePlayConfig: RedisCred = {
//       host: 'localhost',
//       port: 6379
//   }

//   const redisClient: RedisClient = createClient(gamePlayConfig);
//   redisClient.on('ready', () => console.log('Redis Client success'));
//   redisClient.on('error', (err: any) => console.log('Redis Client Error', err));

// };

// const init = async () => new Promise(connectionCallback);
// const getInstances = (): connectionsMapI | null => connectionsMap;

// export default { redisconnect : init, getInstances }


import { RedisCred } from '../interfaces/redis';
import { createClient } from 'redis';
import golbal from "../constants/golbal";

function connect(){

    const gamePlayConfig: RedisCred = {
      host: 'localhost',
      port: 6379
  }

  let redisClient = createClient(gamePlayConfig);
  redisClient.on('ready', () => console.log('Redis Client connect : success'));
  golbal.redisClient = redisClient
  redisClient.on('error', (err:any) => console.log('Redis Client Error', err));

}

export default { redisconnect : connect }

