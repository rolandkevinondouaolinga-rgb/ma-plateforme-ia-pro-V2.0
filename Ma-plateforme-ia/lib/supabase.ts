import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user:', error)
    return null
  }
  return data
}

export async function updateUserPlan(userId: string, plan: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ plan, updated_at: new Date().toISOString() })
    .eq('id', userId)
  
  if (error) {
    console.error('Error updating user plan:', error)
    throw error
  }
}

export async function saveAnalysis(userId: string, responses: any, results: any) {
  const { error } = await supabase
    .from('ai_analyses')
    .insert({
      user_id: userId,
      responses,
      results,
      global_score: results.globalScore,
      profile_type: results.profileType,
      created_at: new Date().toISOString()
    })
  
  if (error) {
    console.error('Error saving analysis:', error)
    throw error
  }
}

export async function incrementUserUsage(userId: string, type: 'analyses' | 'chat_messages') {
  const field = type === 'analyses' ? 'analyses_count' : 'chat_messages_count'
  
  const { error } = await supabase.rpc('increment_user_usage', {
    user_id: userId,
    usage_type: field
  })
  
  if (error) {
    console.error('Error incrementing usage:', error)
  }
}

export async function getUserUsage(userId: string) {
  const { data } = await supabase
    .from('profiles')
    .select('analyses_count, chat_messages_count, plan')
    .eq('id', userId)
    .single()
  
  return data || { analyses_count: 0, chat_messages_count: 0, plan: 'free' }
}