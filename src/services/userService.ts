import { supabase } from '@/lib/supabase';
import { User } from '@/types/user';
import { UserRole } from '@/types/userRole';

export const userService = {
  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  },

  async createUser(userData: {
    name: string;
    email: string;
    password?: string;
  }): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: UserRole.USER,
      })
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    return data;
  },

  async updateUser(userId: string, userData: {
    name?: string;
    email?: string;
    password?: string;
  }): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }

    return data;
  },

  async deleteUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
    }
  },
};