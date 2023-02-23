import React, { useCallback } from 'react';
import Loading from '../components/Loading';
import { useGetPeopleListQuery } from '../services/people';
import { formatDate, getGender, getMaritalStatus } from '../utils';

const Home: React.FC<EmptyObject> = () => {

  const { data: peopleList, isLoading, refetch } = useGetPeopleListQuery({});
  const headerList = ['First Name', 'Last Name', 'Preferred Name', 'Date of Birth', 'Gender', 'Status'];

  const renderTableHeader = () => {
    return Array.from(headerList).map((header, index) => (<th key={`header-field-${index}`}>{header}</th>))
  }

  const renderData = useCallback(() => {
    try {
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
          </tr>
      ));
    } catch {
      return (
        <tr>
          <td colSpan={headerList.length}>
            <button type="button" className="button button-primary" onClick={refetch}> Reload? </button>
          </td>
        </tr>
      );
    }
  }, [peopleList]);

  return (
    <div className="container">
      <Loading loading={isLoading} />
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
};

export default Home;