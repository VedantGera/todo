import React from 'react'
import Todo from './components/todo'

const App = () => {
  return (
    <div className="grid py-4 h-screen bg-stone-100 text-slate-900 dark:bg-stone-900 dark:text-slate-100"> 
    <Todo/>
    </div>
  )
}

export default App