import React from 'react';
import Column from './Column';

const Board: React.FC = () => {
  return (
    <div className="board">
      <Column title="To-Do" />
      <Column title="In Progress" />
      <Column title="Under Review" />
      <Column title="Completed" />
    </div>
  );
};

export default Board;
