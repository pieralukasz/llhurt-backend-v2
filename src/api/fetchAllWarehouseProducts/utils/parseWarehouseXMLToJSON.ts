import {
  WarehouseInitialResponseType,
  WarehouseValidResponseType,
} from '../../../types/WarehouseResponseType';
import parseInitialResponseToValid from './parseInitialResponseToValid';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const xmlParser = require('xml2js');

const parseXMLtoJSON = async (
  XMLData: WarehouseInitialResponseType[] | string,
): Promise<WarehouseValidResponseType[]> => {
  const parseString = xmlParser.parseString;
  let parsedJSON = null;

  await parseString(XMLData, (err, result) => {
    parsedJSON = result.Zamówienie.Artykuly[0].Artykuł;
  });

  return parseInitialResponseToValid(parsedJSON);
};

export default parseXMLtoJSON;
