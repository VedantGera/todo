import React, { useRef, useState, useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoListItem from './todo-listitem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Todo = () => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  const addTask = () => {
    const taskText = inputRef.current.value.trim();
    if (taskText === '') return;
    inputRef.current.value = '';
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
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

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setTasks(items);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md h-[550px] flex flex-col rounded-lg shadow-lg p-6">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8 h-8" src={todo_icon} alt="todo_icon" />
        <h1 className="text-2xl font-semibold">Task Planner</h1>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-y-auto" data-testid="task-list-container">
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
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
                ))}
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