import {
  WarehouseInitialResponseType,
  WarehouseValidResponseType,
} from '../../../types/WarehouseResponseType';
import removeAllSpecialCharacters from '../../../utils/removeAllSpecialCharacters';

const parseInitialResponseToValid = (
  initialResponse: WarehouseInitialResponseType[],
): WarehouseValidResponseType[] => {
  return initialResponse.map((product) => {
    return {
      EAN: removeAllSpecialCharacters(product.$.EAN),
      category: removeAllSpecialCharacters(product.NazwaKategorii[0]),
      color: removeAllSpecialCharacters(product.Kolor[0]),
      isAvailable: +product.Ilość[0] === 0,
      name: product.Nazwa[0],
      size: removeAllSpecialCharacters(product.Rozmiar[0]),
    };
  }) as WarehouseValidResponseType[];
};

export default parseInitialResponseToValid;
