import React, { useCallback } from 'react';
import Loading from '../components/Loading';
import { AddressTypes, ContactTypes } from '../enum';
import { Addresses, ContactDetails } from '../interfaces/people-interface';
import { useGetAddressesQuery, useGetPeopleListQuery, useGetContactDetailsQuery } from '../services/people';
import { formatDate, getGender, getMaritalStatus } from '../utils';

const Home: React.FC<EmptyObject> = () => {

  const { data: peopleList, isLoading: isPeopleListLoading, refetch } = useGetPeopleListQuery({});
  const { data: addresses, isLoading: isAddressesLoading } = useGetAddressesQuery({}, {skip: isPeopleListLoading || !peopleList?.items});
  const { data: contactList, isLoading: isContactListLoading } = useGetContactDetailsQuery({}, {skip: isPeopleListLoading || !peopleList?.items});
  const headerList = ['First Name', 'Last Name', 'Preferred Name', 'Date of Birth',
  'Gender', 'Status', 'Mobile Number', 'Home Email', 'Office Email', 'Home Address', 'Office Address'];

  const renderTableHeader = () => {
    return Array.from(headerList).map((header, index) => (<th key={`header-field-${index}`}>{header}</th>))
  }

  const renderData = useCallback(() => {
    if (!peopleList?.items.length) {
      return <tr><td colSpan={headerList.length}> No data found </td></tr>;
    }

    return peopleList?.items.map(people => (
        <tr key={people.entryId}>
          <td> {people.firstName} </td>
          <td> {people.lastName} </td>
          <td> {people.preferredName} </td>
          <td> {formatDate(people.dateOfBirth)} </td>
          <td> {getGender(people.gender)} </td>
          <td> {getMaritalStatus(people.maritalStatus)} </td>
          <td> {getContact(people.entryId, ContactTypes.Mobile)} </td>
          <td> {getContact(people.entryId, ContactTypes.Home_Email)} </td>
          <td> {getContact(people.entryId, ContactTypes.Work_Email)} </td>
          <td> {getAddress(people.entryId, AddressTypes.Residential)} </td>
          <td> {getAddress(people.entryId, AddressTypes.Business)} </td>
        </tr>
    ));
  }, [peopleList?.items, addresses?.items, contactList?.items]);

  const getAddress = useCallback((ownerId: string, type: string) => {

    if (isAddressesLoading) return 'Fetching...';

    const data = addresses?.items?.find((address: Addresses) => address.ownerId === ownerId && address.addressType === type);
    if (!data) return null;

    return `${data.city}, ${data.state}, ${data.postcode}, ${data.country}`;
  }, [addresses?.items, isAddressesLoading]);

  const getContact = useCallback((ownerId: string, type: string) => {

    if (isContactListLoading) return 'Fetching...';

    const data = contactList?.items?.find((contact: ContactDetails) => contact.ownerId === ownerId && contact.contactType === type);
    if (!data) return null;

    return data.detail;
  }, [contactList?.items, isContactListLoading]);

  try {
    return (
      <div className="container">
        <Loading loading={isPeopleListLoading} />
        <div className="data-wrapper">
          <table>
            <thead>
              <tr>
                { renderTableHeader() }
              </tr>
            </thead>
            <tbody>
              {renderData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="flex w-full justify-center">
        <button type="button" className="button button-primary" onClick={refetch}> Reload? </button>
      </div>
    );
  }
};

export default Home;