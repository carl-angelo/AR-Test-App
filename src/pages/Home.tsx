import React, { useEffect } from 'react';
import Loading from '../components/Loading';
import { useGetPeopleListQuery } from '../services/people';

const Home: React.FC<EmptyObject> = () => {

  const { data: peopleList, isLoading } = useGetPeopleListQuery({});

  useEffect(() => {
    console.log('!!!', peopleList);
  }, [peopleList])

  return (
    <>
      <Loading loading={isLoading} />
      test
    </>
  );
};

export default Home;