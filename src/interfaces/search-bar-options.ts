import { QOptionGroupProps } from "quasar";

// range-value.interface.ts
export interface RangeValue {
  min: number;
  max: number | null;
}

export interface FilterOptions {
  locations: string[];
  bedrooms: RangeValue | null;
  features: string[] | null;
  price: RangeValue;
  size: RangeValue | null;
}

export interface PriceRange {
  min: number;
  max: number | null;
}

export interface SizeRange {
  min: number;
  max: number | null;
}

export interface BedRange {
  min: number;
  max: number | null;
}

export interface SearchBarOptions {
  territories: Record<string, any>;
  features: QOptionGroupProps["options"];
}

// export interface DistrictOptions {
//   territories: Districts;
// }

export enum SearchMode {
  Buy = "buy",
  Rent = "rent"
}
