// lib/fetchTasks.ts
import { supabase } from './supabaseClient'

export async function fetchTasks(filter: string, userId: string) {
  let query = supabase.from('todos').select('*')

  if (filter === 'Assigned to Me') {
    query = query.eq('assigned_to', userId)
  } else if (filter === 'Created by Me') {
    query = query.eq('created_by', userId)
  } else if (filter === 'Overdue') {
    query = query.lt('due_date', new Date().toISOString().split('T')[0])
  } else if (filter === 'Due Today') {
    query = query.eq('due_date', new Date().toISOString().split('T')[0])
  }

  const { data, error } = await query.order('due_date', { ascending: true })

  if (error) {
    console.error('Error fetching tasks:', error)
  }

  return data
}
