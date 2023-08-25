export interface ListingRequest {
  listingRequestId: number;
  listingMode: number;
  askingPrice: number;
  rentalPrice: number;
  saleableArea: number;
  address: string;
  description: string;
  noOfBedRooms: number;
  bathRoom: number;
  features: number[];
  userName: string;
  email: string;
  phone: string;
  status: number;
  createdAt: Date;
  createdBy: number;
  modifiedAt: Date;
  modifiedBy: number;
  meta: Record<string, unknown>;
}
