'use client';
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { capitalizeFirstWord } from '@/hooks/capitalise';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import EditTodoModal, { Todo } from './EditTodoModal';

interface TodoCardProps {
  todo?: Todo;
  onClick?: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo = { id: 0, title: 'Untitled Task', completed: false },
  onClick = () => {},
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white shadow rounded-xl hover:bg-gray-100 cursor-pointer ${
        todo.completed ? 'bg-white bg-opacity-15' : ''
      }`}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Todo: ${todo.title}`}
    >
      {/* Left section */}
      <div className='flex items-center gap-3' onClick={onClick}>
        {todo.completed ? (
          <CheckCircle className='text-green-500' aria-hidden />
        ) : (
          <Circle className='text-gray-400' aria-hidden />
        )}
        <span
          className={`text-base ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {capitalizeFirstWord(todo.title)}
        </span>
      </div>

      {/* Right section (actions) */}
      <div className='flex items-center gap-3'>
        <EditTodoModal todo={todo} />
        <ConfirmDeleteDialog todoId={todo.id} />
      </div>
    </div>
  );
};

export default TodoCard;
