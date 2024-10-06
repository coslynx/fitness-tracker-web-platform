import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const session = await getServerSession(authOptions);

  if (session) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page if unauthorized
    }
    return Promise.reject(error);
  }
);

export const getUser = async (userId: string) => {
  try {
    const { data } = await apiClient.get(`/users/${userId}`);
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userData: {
  name: string;
  email: string;
  password?: string;
}) => {
  try {
    const { data } = await apiClient.put(`/users`, userData);
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getGoals = async (userId: string) => {
  try {
    const { data } = await apiClient.get(`/goals?user_id=${userId}`);
    return data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoal = async (goalData: {
  name: string;
  type: string;
  target: string;
  deadline: Date;
}) => {
  try {
    const { data } = await apiClient.post('/goals', goalData);
    return data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoal = async (goalData: {
  id: string;
  name: string;
  type: string;
  target: string;
  deadline: Date;
}) => {
  try {
    const { data } = await apiClient.put(`/goals/${goalData.id}`, goalData);
    return data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const deleteGoal = async (goalId: string) => {
  try {
    await apiClient.delete(`/goals/${goalId}`);
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

export const getProgress = async (userId: string) => {
  try {
    const { data } = await apiClient.get(`/progress?user_id=${userId}`);
    return data;
  } catch (error) {
    console.error('Error fetching progress data:', error);
    throw error;
  }
};

export const getFollowingUsers = async (userId: string) => {
  try {
    const { data } = await apiClient.get(`/users/following?user_id=${userId}`);
    return data;
  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
};

export const getUserProgress = async (userId: string) => {
  try {
    const { data } = await apiClient.get(`/progress/${userId}`);
    return data;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

export const createWorkout = async (workoutData: {
  type: string;
  date: Date;
  duration: number;
  intensity: string;
}) => {
  try {
    const { data } = await apiClient.post('/workouts', workoutData);
    return data;
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};

export const updateWorkout = async (workoutData: {
  id: string;
  type: string;
  date: Date;
  duration: number;
  intensity: string;
}) => {
  try {
    const { data } = await apiClient.put(`/workouts/${workoutData.id}`, workoutData);
    return data;
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string) => {
  try {
    await apiClient.delete(`/workouts/${workoutId}`);
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};

export const getAnalytics = async () => {
  try {
    const { data } = await apiClient.get('/analytics');
    return data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export default apiClient;