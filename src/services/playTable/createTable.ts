import { defaulTableData } from '../../defaultGenerator';
import { setTableConfig } from '../../cache/tableConfig';
import { CreateTableI } from '../../interfaces/signup';

/**
 * Creates table
 * @param {Object} signUpData
 * @param {String} key
 * @returns {String} tableId
 */
async function createTable(signUpData: CreateTableI): Promise<string> {
 
    const tableConfig = defaulTableData(signUpData);
    await setTableConfig(tableConfig._id, tableConfig);
    console.log("======tableConfig=======",tableConfig);
    return tableConfig._id;
}

export = createTable;