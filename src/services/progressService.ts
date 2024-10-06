import { supabase } from '@/lib/supabase';
import { ProgressData } from '@/types/progress';

export const progressService = {
  async getUserProgress(userId: string): Promise<ProgressData | null> {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }

    return data;
  },
};