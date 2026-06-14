import React, { useState } from 'react'

const FILTERS = ['All', 'Active', 'Completed']

const Todo = () => {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState('All')


  const addTask = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }])
    setInput('')
  }

  
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }


  const startEdit = (task) => {
    setEditId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    const trimmed = editText.trim()
    if (!trimmed) return
    setTasks(tasks.map(t => t.id === id ? { ...t, text: trimmed } : t))
    setEditId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditText('')
  }


  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed))
  }


  const filtered = tasks.filter(t => {
    if (filter === 'Active') return !t.completed
    if (filter === 'Completed') return t.completed
    return true
  })

  const activeCount = tasks.filter(t => !t.completed).length

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8 tracking-tight">
           My Tasks
        </h1>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
            className="flex-1 border border-indigo-200 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow transition-colors"
          >
            Add
          </button>
        </div>

      
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

         
          <div className="flex border-b border-gray-100">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  filter === f
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-gray-50">
            {filtered.length === 0 && (
              <li className="py-10 text-center text-gray-400 text-sm">
                {filter === 'Completed' ? 'No completed tasks yet.' : 'Nothing to do — enjoy your day!'}
              </li>
            )}

            {filtered.map(task => (
              <li key={task.id} className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/40 transition-colors group">

                
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer shrink-0"
                />

                
                {editId === task.id ? (
                  <div className="flex flex-1 gap-2">
                    <input
                      autoFocus
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEdit(task.id)
                        if (e.key === 'Escape') cancelEdit()
                      }}
                      className="flex-1 border border-indigo-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-xs text-gray-400 hover:text-gray-600 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                    >
                      {task.text}
                    </span>

                  
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(task)}
                        title="Edit"
                        className="text-gray-400 hover:text-indigo-500 text-sm px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        title="Delete"
                        className="text-gray-400 hover:text-red-500 text-sm px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {tasks.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
              <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
              {tasks.some(t => t.completed) && (
                <button
                  onClick={clearCompleted}
                  className="hover:text-red-400 transition-colors"
                >
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Todo