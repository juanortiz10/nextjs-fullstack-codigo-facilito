import { supabase } from './supabase';

export type Tarea = {
  id: string
  title: string
  completed: boolean
  created_at: string
}

export async function getHomeworks(): Promise<Tarea[]> {
  const { data, error } = await supabase
    .from('homeworks')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getHomework(id: string): Promise<Tarea | undefined> {
  const { data, error } = await supabase
    .from('homeworks')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data ?? undefined
}

export async function createHomework(title: string): Promise<Tarea> {
  const { data, error } = await supabase
    .from('homeworks')
    .insert({ title })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateHomework(
  id: string,
  cambios: Partial<Pick<Tarea, 'title' | 'completed'>>,
): Promise<Tarea | undefined> {
  const { data, error } = await supabase
    .from('homeworks')
    .update(cambios)
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) throw error
  return data ?? undefined
}

export async function deleteHomeWork(id: string): Promise<boolean> {
  const { error } = await supabase.from('homeworks').delete().eq('id', id)
  return !error
}