import golbal from "../../constants/golbal"
import { setValueInKeyWithExpiry } from "../redisWrapper"
import { getValueFromKey } from "../userProfile"
import { defaultTableConfig } from "../../interfaces/tableConfig"


const popFromQueue = async <T>(key: string): Promise<T | null> => {
    return new Promise(function(resolve, reject) {
        golbal.redisClient.lpop(key, function(err:any, data:any){
            if(err)  reject(err);
            resolve(JSON.parse(data));
        })
    })
}

const pushIntoQueue = async <T>(key: string, element:any): Promise<T | null> => {
  return new Promise(function(resolve, reject) {
      golbal.redisClient.lpush(key, JSON.stringify(element), function(err:any, data:any){
          if(err)  reject(err);
          resolve(JSON.parse(data));
      })
  })
}

const setTableConfig = async (
    tableId: string,
    obj: defaultTableConfig
  ): Promise<boolean> => {
    const key = `T:${tableId}`;
    const res = await setValueInKeyWithExpiry(key, obj);
    return res;
  };

const updateTableConfig = async (
    key: string,
    updateObject: any
  ): Promise<defaultTableConfig> => {
    const data = await getValueFromKey<defaultTableConfig>(key);
    const updatedObject = { ...data, ...updateObject };

    await setValueInKeyWithExpiry(key, updatedObject);
  
    return updatedObject;
  };

const getTableConfig = async (
    tableId: string
  ): Promise<defaultTableConfig | null> => {
      const key = `T:${tableId}`;
      const tableConfig = await getValueFromKey<defaultTableConfig>(key);
      return tableConfig;
  };

const exportObject = {
    popFromQueue,
    pushIntoQueue,
    setTableConfig,
    updateTableConfig,
    getTableConfig
  };
  
  export = exportObject;