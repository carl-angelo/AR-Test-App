import { AddressTypes, ContactTypes, Educational, Gender, HousingStatus, MaritalStatus, OwnerType, ResidencyStatus, UserGroup } from "../enum";

export interface People {
  entryId: string;
  entryStatus: string;
  createdDate: string;
  updateDate: string;
  createdBy: string;
  updatedBy: string;
  firstName: string;
  lastName: string;
  userGroup: UserGroup;
  userRoles: string[];
  practiceId: string;
  adviserId: string;
  clientGroupId: string;
  title: string;
  middleName: string;
  preferredName: string;
  dateOfBirth: Date;
  maritalStatus: MaritalStatus;
  gender: Gender;
  housingStatus: HousingStatus;
  residencyStatus: ResidencyStatus;
  isTaxResident: boolean;
  countryOfResidence: string;
  countryOfCitizenship: string;
  countryOfBirth: string;
  hasDeclaredBankruptcy: boolean;
  educationalAttainment: Educational;
  completedCourses: string;
  businessName: string;
  noted: string;
  authorisedRepresentativeNumber: string;
  xplanId: number;
}

export interface ApiResponse<T> {
  items: T[];
  lastEvaluatedKey: string;
}

export interface Addresses {
  entryId: string;
  entryStatus: string;
  createDate: string;
  updateDate: string;
  createdBy: string;
  updatedBy: string;
  ownerId: string;
  ownerType: OwnerType;
  addressType: AddressTypes;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface ContactDetails {
  entryId: string;
  entryStatus: string;
  createDate: string;
  updateDate: string;
  createdBy: string;
  updatedBy: string;
  ownerId: string;
  ownerType: OwnerType;
  contactType: ContactTypes;
  detail: string;
}