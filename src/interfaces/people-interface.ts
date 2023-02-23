import { Educational, Gender, HousingStatus, MaritalStatus, ResidencyStatus, UserGroup } from "../enum";

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

export interface GetPeopleResponse {
  items: People[];
  lastEvaluatedKey: string;
}

