export interface Agent {
  agentId: number;
  alias: string;
  aliasAlt: Record<string, any>;
  firstName: string;
  lastName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  licenseNo: string;
  status: number;
  agencyId: number;
  imagePath: string;
  createdAt: Date;
  createdBy: number;
  modifiedAt: Date;
  modifiedBy: number;
  meta: Record<string, any>;
}
