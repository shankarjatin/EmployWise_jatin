import React from 'react';
import UserTable from './UserTable';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-6">Users</h1>
      <UserTable />
    </div>
  );
};

export default HomePage;
