import axios from 'axios';
import parseWarehouseXMLToJSON from './utils';
import {
  WarehouseInitialResponseType,
  WarehouseValidResponseType,
} from '../../types/WarehouseResponseType';
import config from '../../environments';

const fetchAllWarehouseProducts = async (): Promise<
  WarehouseValidResponseType[]
> => {
  try {
    const { data } = await axios.get<WarehouseInitialResponseType[]>(
      config().warehouseUrl,
    );

    return await parseWarehouseXMLToJSON(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchAllWarehouseProducts;
