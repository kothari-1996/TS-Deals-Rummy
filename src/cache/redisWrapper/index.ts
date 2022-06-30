import global from "../../constants/golbal";

const setValueInKeyWithExpiry = async (
    key: string,
    obj: any
  ): Promise<boolean> => {
    const exp: number = 600000;
    return global.redisClient.setex(key, exp, JSON.stringify(obj));
  };

const addValueInSortedSet = async (
    key: string,
    score: number,
    value: string
): Promise<number> => global.redisClient.sadd(key, score, value);
  

const exportObject = {
    setValueInKeyWithExpiry,
    addValueInSortedSet
};

export = exportObject;