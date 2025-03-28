import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TableRow = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <div>
        <h3 className="text-gray-200">{item.name}</h3>
        <p className="text-gray-400">{item.description}</p>
      </div>
      <div className="flex space-x-2">
        <IconButton 
          aria-label="edit" 
          onClick={() => onEdit(item)} 
          className="text-blue-500 hover:text-blue-400"
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          aria-label="delete" 
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-400"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TableRow;
