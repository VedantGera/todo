import React from 'react';
import tick_icon from '../assets/tick.png';
import delete_icon from '../assets/delete.png';
import not_tick from '../assets/not_tick.png';

const TodoListItem = ({ text, id, completed, deleteTask, completeTask }) => {
  return (
    <div className="flex items-center w-full" data-testid={`task-item-${id}`}>
      <div className="flex-1 flex items-center gap-2 my-3 hover:cursor-pointer">
        <img
          onClick={() => completeTask(id)}
          src={completed ? tick_icon : not_tick}
          className="w-6 h-6"
          alt="tick_icon"
        />
        <div
          className={
            'text-md text-slate-700 dark:text-slate-200 px-2 decoration-slate-500 dark:decoration-slate-400 break-all ' +
            (completed ? 'line-through' : '')
          }
        >
          {text}
        </div>
      </div>
      <img
        onClick={() => deleteTask(id)}
        src={delete_icon}
        className="w-4 h-4 hover:cursor-pointer"
        alt="delete_icon"
      />
    </div>
  );
};

export default TodoListItem;
