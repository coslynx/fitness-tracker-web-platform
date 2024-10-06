import { supabase } from '@/lib/supabase';
import { Goal } from '@/types/goal';

export const goalService = {
  async getGoals(userId: string): Promise<Goal[] | null> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching goals:', error);
      return null;
    }

    return data;
  },

  async createGoal(goalData: Goal): Promise<Goal | null> {
    const { data, error } = await supabase
      .from('goals')
      .insert(goalData)
      .single();

    if (error) {
      console.error('Error creating goal:', error);
      return null;
    }

    return data;
  },

  async updateGoal(goalId: string, goalData: Goal): Promise<Goal | null> {
    const { data, error } = await supabase
      .from('goals')
      .update(goalData)
      .eq('id', goalId)
      .single();

    if (error) {
      console.error('Error updating goal:', error);
      return null;
    }

    return data;
  },

  async deleteGoal(goalId: string): Promise<void> {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', goalId);

    if (error) {
      console.error('Error deleting goal:', error);
    }
  },
};