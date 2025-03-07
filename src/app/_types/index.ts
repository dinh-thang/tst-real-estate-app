export enum PropertyType {
  HOUSE= "House",
  APARTMENT= "Apartment",
  CONDO= "Condo",
}

export type Property = {
  title: string;
  location: string;
  price: number;
  type: PropertyType;
};

