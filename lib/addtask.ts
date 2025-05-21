// lib/addtask.ts
import { supabase } from './supabaseClient'

export async function addTask(task: string, assignedTo: string, dueDate: string, userId: string) {
  const { data, error } = await supabase.from('todos').insert([
    {
      task,
      assigned_to: assignedTo,
      due_date: dueDate,
      created_by: userId,
      is_complete: false,
    },
  ])

  if (error) {
    console.error('Error adding task:', error)
  }

  return data
}
