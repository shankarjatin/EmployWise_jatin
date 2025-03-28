import React, { useState } from 'react';
import TableRow from './TableRow';

const DataTable = ({ data }) => {
  const handleEdit = (item) => {
    // Implement edit logic here
    console.log('Editing:', item);
  };

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log('Deleting item with id:', id);
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">Your Data</h2>
      </div>
      <div>
        {data.map((item) => (
          <TableRow 
            key={item.id} 
            item={item} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default DataTable;
