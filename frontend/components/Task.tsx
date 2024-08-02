import React from 'react';

interface TaskProps {
  title: string;
  description?: string;
  status: string;
}

const Task: React.FC<TaskProps> = ({ title, description, status }) => {
  return (
    <div className="task">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <p>Status: {status}</p>
    </div>
  );
};

export default Task;
