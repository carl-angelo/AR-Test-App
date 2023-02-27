import React, { useCallback, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { AddressTypes, ContactTypes, Sort } from '../enum';
import { Addresses, ContactDetails, TableData } from '../interfaces/people-interface';
import { useGetAddressesQuery, useGetPeopleListQuery, useGetContactDetailsQuery } from '../services/people';
import { formatDate, getGender, getMaritalStatus } from '../utils';
import Table from '../components/Table';


const Home: React.FC<EmptyObject> = () => {

  const { data: peopleList, isLoading: isPeopleListLoading, refetch } = useGetPeopleListQuery({});
  const { data: addresses, isLoading: isAddressesLoading } = useGetAddressesQuery({}, {skip: isPeopleListLoading || !peopleList?.items});
  const { data: contactList, isLoading: isContactListLoading } = useGetContactDetailsQuery({}, {skip: isPeopleListLoading || !peopleList?.items});
  const headerList = ['', 'First Name', 'Last Name', 'Preferred Name', 'Date of Birth',
  'Gender', 'Status', 'Mobile Number', 'Home Email', 'Office Email', 'Home Address', 'Office Address'];
  const fieldNames = ['entryId', 'firstName', 'lastName', 'preferredName', 'dateOfBirth', 'gender', 'maritalStatus', 'mobile', 'home_email', 'office_email', 'home_address', 'office_address'];

  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<TableData[]>([]);
  const [filter, setFilter] = useState('');

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected((previous) => [...previous, e.target.value]);
    } else {
      setSelected((previous) => [...previous.filter(prev => prev !== e.target.value)]);
    }
  };

  const buildData = useCallback(() => {
    if (!peopleList?.items.length) {
      return <tr><td colSpan={headerList.length}> No data found </td></tr>;
    }
    let container = [...peopleList.items]
      .filter(people => people.userRoles.includes('primary_client'));

    if (filter) {
      container = container
        .filter(people => people.firstName.toLowerCase().includes(filter.toLowerCase()) ||
          people.lastName.toLowerCase().includes(filter.toLowerCase()) || people.preferredName.toLowerCase().includes(filter.toLowerCase()));
    }

    const newData: TableData[] = container
      .map(people => (
        {
          entryId: people.entryId,
          firstName: people.firstName,
          lastName: people.lastName,
          preferredName: people.preferredName,
          dateOfBirth: formatDate(people.dateOfBirth),
          gender: getGender(people.gender),
          maritalStatus: getMaritalStatus(people.maritalStatus),
          mobile: getContact(people.entryId, ContactTypes.Mobile),
          home_email: getContact(people.entryId, ContactTypes.Home_Email),
          office_email: getContact(people.entryId, ContactTypes.Work_Email),
          home_address: getAddress(people.entryId, AddressTypes.Residential),
          office_address: getAddress(people.entryId, AddressTypes.Business)
        } as TableData
    ));
    setData(newData);
  }, [peopleList?.items, addresses?.items, contactList?.items, filter]);

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

  useEffect(() => {
    buildData();
  }, [peopleList?.items, addresses?.items, contactList?.items, filter]);

  return (
    <div className="container">
      <Loading loading={isPeopleListLoading} />
      <Table
        headerList={headerList}
        fieldNames={fieldNames}
        data={data}
        selected={selected}
        setSelected={handleSelect}
        setFilter={setFilter}
      />
    </div>
  );
};

export default Home;