import golbal from "../../constants/golbal"

const setValueFromKey = async <T>(key: string, Data:any): Promise<T | null> => {
    return new Promise(function(resolve, reject) {
        golbal.redisClient.set(key, JSON.stringify(Data), function(err:any, data:any){
            if(err)  
                reject(err);
            resolve(data);
        })
    })
}

const getValueFromKey = async <T>(key: any): Promise<T | null> => {
    return new Promise(function(resolve, reject) {
        golbal.redisClient.get(key, function(err:any, data:any){
            if(err)  
                reject(err);
            resolve(JSON.parse(data));
        })
    })
}



const exportObject = {
    setValueFromKey,
    getValueFromKey
  };
  
  export = exportObject;