export type WarehouseInitialResponseType = {
  $: {
    EAN: string;
  };
  NazwaKategorii: string[];
  Nazwa: string[];
  Kolor: string[];
  Rozmiar: string[];
  Ilość: string[];
};

export type WarehouseValidResponseType = {
  EAN: string;
  category: string;
  name: string;
  color: string;
  size: string;
  isAvailable: boolean;
};
