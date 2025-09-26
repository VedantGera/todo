import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoListItem from './todo-listitem';
import DarkModeToggle from './darkmode-toggle';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Todo = () => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [filter, setFilter] = useState('all');

  const addTask = useCallback(() => {
    const taskText = inputRef.current.value.trim();
    if (taskText === '') return;
    inputRef.current.value = '';
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const completeTask = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      if (!destination) return;
      // Disable reordering when a filter is applied to avoid index mismatches
      if (filter !== 'all') return;

      setTasks((prevTasks) => {
        const items = Array.from(prevTasks);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        return items;
      });
    },
    [filter]
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    if (filter === 'incomplete') return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const memoizedTasks = useMemo(() => {
    return filteredTasks.map((task, index) => (
      <Draggable
        key={task.id}
        draggableId={task.id.toString()}
        index={index}
        isDragDisabled={filter !== 'all'}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TodoListItem
              text={task.text}
              id={task.id}
              completed={task.completed}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          </div>
        )}
      </Draggable>
    ));
  }, [filteredTasks, deleteTask, completeTask, filter]);

  return (
    <div className="bg-white dark:bg-stone-800 dark:text-slate-100 place-self-center w-11/12 max-w-md h-[550px] flex flex-col rounded-lg shadow-lg p-6">
      <div className="flex items-center mt-7 gap-2 justify-between">
        <div className="flex items-center gap-2">
          <img className="w-8 h-8" src={todo_icon} alt="todo_icon" />
          <h1 className="text-2xl font-semibold">Task Planner</h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-gray-100 dark:bg-gray-700 text-slate-900 dark:text-slate-100 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <DarkModeToggle />
        </div>
      </div>
      {/* Input Box */}
      <div className="flex my-7 items-center bg-gray-200 dark:bg-gray-800 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-600 dark:placeholder:text-slate-400"
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-y-auto" data-testid="task-list-container">
          <Droppable droppableId="tasks" isDropDisabled={filter !== 'all'}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {memoizedTasks}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Todo;