import { Agent } from "./agent";
import { PropertyListing } from "./property-listing";

export interface Recommendation {
  recommendationId: number;
  agentId: number;
  agent: Agent;
  propertyListings: PropertyListing[];
  status: number;
  createdBy: number;
  createdAt: Date;
  modifiedBy: number | null;
  modifiedAt: Date;
  meta: Record<string, unknown>;
}
