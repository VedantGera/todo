import React, { useRef, useState, useEffect } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoListItem from './todo-listitem'

const Todo = () => {
  const inputRef = useRef(null)
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])

  const addTask = () => {
    const task = inputRef.current.value.trim()
    console.log(task)
    inputRef.current.value = ""
    const task_item = {
      id: Date.now(),
      text: task,
      completed: false
    }
    setTasks([...tasks, task_item])
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const completeTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
  }
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  return (
    <div className="bg-white place-self-center w-11/12 max-w-md min-h-[550px] flex flex-col rounded-lg shadow-lg p-6">
        <div className="flex items-center mt-7 gap-2">
            <img className="w-8 h-8" src={todo_icon} alt="todo_icon" />
            <h1 className="text-2xl font-semibold">Task Planner</h1>
        </div>  
        {/* Input Box */}
        <div className='flex my-7 items-center bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type = "text" placeholder= "Add your task" />
            <button onClick={addTask} className='bg-orange-500 text-white rounded-full px-6 py-2 h-14 font-semibold hover:cursor-pointer'>Add Task</button>
        </div>
        {/* List */}
        <div>
            {tasks.map(task => (
                <TodoListItem key={task.id} text={task.text} id={task.id} completed={task.completed} deleteTask={deleteTask} completeTask={completeTask} />
            ))}
        </div>
    </div>
  )
}

export default Todo