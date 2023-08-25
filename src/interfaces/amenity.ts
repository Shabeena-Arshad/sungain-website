export interface Amenity {
  amenityId: number;
  amenityName: string;
  amenityNameAlt: string;
  amenityValue: number;
  status: number;
  createdAt: Date;
  createdBy: number;
  modifiedAt: Date;
  modifiedBy: number;
  meta: Record<string, unknown>;
}
