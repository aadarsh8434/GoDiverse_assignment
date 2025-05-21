'use client'
import { useState, useEffect } from 'react'
import { fetchTasks } from '../lib/fetchTasks'
import { addTask } from '../lib/addtask'
import { Session } from '@supabase/supabase-js'

export default function TodoList({ session }: { session: Session }) {
  const [tasks, setTasks] = useState<any[]>([])
  const [task, setTask] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState('All')

  const userId = session.user.id

  async function loadTasks() {
    const data = await fetchTasks(filter, userId)
    setTasks(data || [])
  }

  useEffect(() => {
    loadTasks()
  }, [filter])

  const handleAdd = async () => {
    const trimmedTask = task.trim()
    const trimmedAssignedTo = assignedTo.trim()
    const trimmedDueDate = dueDate.trim()
  
    if (trimmedTask.length < 3 || !trimmedAssignedTo || !trimmedDueDate) {
      alert('Fill all fields')
      return
    }
  
    await addTask(trimmedTask, trimmedAssignedTo, trimmedDueDate, userId)
    setTask('')
    setAssignedTo('')
    setDueDate('')
    loadTasks()
  }
  

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Todo List</h1>

      <label>Filter:</label>
      <select value={filter} onChange={e => setFilter(e.target.value)} className="mb-4 block border w-full p-2 rounded">
        <option>All</option>
        <option>Assigned to Me</option>
        <option>Created by Me</option>
        <option>Overdue</option>
        <option>Due Today</option>
      </select>

      <input
        placeholder="Task"
        value={task}
        onChange={e => setTask(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
      />
      <input
        placeholder="Assigned to (User ID)"
        value={assignedTo}
        onChange={e => setAssignedTo(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
      />

      <button onClick={handleAdd} className="bg-black text-white py-2 px-4 mb-4 rounded hover:bg-gray-800">
        Add Task
      </button>

      <ul>
        {tasks.map(t => (
          <li key={t.id} className="border p-2 mb-2 flex justify-between items-center rounded">
            <div>
              <p>{t.task}</p>
              <p className="text-sm text-gray-500">Due: {t.due_date}</p>
            </div>
            <span>{t.is_complete ? '✅' : '❌'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
