import React from 'react'
import tick_icon from '../assets/tick.png'
import delete_icon from '../assets/delete.png'
import not_tick from '../assets/not_tick.png'

const TodoListItem = ({text, id, completed, deleteTask}) => {
    return (
        <div className='flex items-center'>
            <div className='flex-1 flex items-center gap-2 my-3 hover:cursor-pointer'>
                <img src={tick_icon} className='w-6 h-6' alt="tick_icon" />
                <div className='text-md text-slate-700 px-2 '>{text}</div>
            </div>
            <img onClick={() => deleteTask(id)} src={delete_icon} className='w-4 h-4 hover:cursor-pointer' alt="delete_icon" />
        </div>
    )
}

export default TodoListItem
