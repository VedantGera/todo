import React, { useRef, useState, useEffect, createRef } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoListItem from './todo-listitem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Todo = () => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(
    (JSON.parse(localStorage.getItem('tasks')) || []).map(task => ({
      ...task,
      ref: createRef(null)
    }))
  );
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    const taskText = inputRef.current.value.trim();
    if (taskText === '') return;
    inputRef.current.value = '';
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      ref: createRef(null)
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks.map(({ ref, ...rest }) => rest)));
  }, [tasks]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md h-[550px] flex flex-col rounded-lg shadow-lg p-6">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8 h-8" src={todo_icon} alt="todo_icon" />
        <h1 className="text-2xl font-semibold">Task Planner</h1>
        <div className="relative ml-auto">
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="bg-gray-200 text-slate-600 rounded-full px-4 py-2 appearance-none"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      {/* Input Box */}
      <div className="flex my-7 items-center bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={addTask}
          className="bg-orange-500 text-white rounded-full px-6 py-2 h-14 font-semibold hover:cursor-pointer"
        >
          Add Task
        </button>
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto" data-testid="task-list-container">
        <TransitionGroup>
          {tasks
            .filter((task) => {
              if (filter === 'completed') {
                return task.completed;
              } else if (filter === 'incomplete') {
                return !task.completed;
              }
              return true;
            })
            .map(({ id, text, completed, ref }) => {
              return (
                <CSSTransition key={id} nodeRef={ref} timeout={500} classNames="fade">
                  <TodoListItem
                  ref={ref}
                  text={text}
                  id={id}
                  completed={completed}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Todo;