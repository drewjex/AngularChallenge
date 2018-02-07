import { Contact } from './contact';

export class Company {
  CompanyID: number;
  AccountId?: number;
  CompanyName: string;
  StreetAddress?: string;
  StreetAddress2?: string;
  City?: string;
  State?: string;
  Country?: string;
  ZipCode?: number;
  webSite?: string;
  CreatedDate: Date;
  Contacts?: Contact[];
  status?: string;
  type?: string;
}
