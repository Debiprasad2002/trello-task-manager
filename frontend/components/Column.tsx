import React from 'react';
import TaskCard from './Task';

interface ColumnProps {
  title: string;
}

const Column: React.FC<ColumnProps> = ({ title }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      {/* Map through tasks based on status */}
      {/* <TaskCard ... /> */}
    </div>
  );
};

export default Column;
