import React from 'react';
import UserTable from '../component/UserTable';
import UserTableCard from '../component/UserTableCard';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-6">Users</h1>
      <UserTable />
      <UserTableCard />

    </div>
  );
};

export default HomePage;
