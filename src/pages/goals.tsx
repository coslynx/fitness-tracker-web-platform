import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoal } from '@/lib/api/client';
import { GoalCard } from '@/components/features/goals/GoalCard';
import { GoalForm } from '@/components/features/goals/GoalForm';
import { GoalList } from '@/components/features/goals/GoalList';

export default function GoalsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    if (user && session) {
      const fetchGoals = async () => {
        try {
          setIsLoading(true);
          const data = await getGoals(user.id);
          setGoals(data);
        } catch (error) {
          console.error('Error fetching goals:', error);
          toast.error('Failed to fetch goals');
        } finally {
          setIsLoading(false);
        }
      };

      fetchGoals();
    }
  }, [user, session]);

  const handleCreateGoal = async (goalData) => {
    setIsCreating(true);

    try {
      const newGoal = await createGoal(goalData);
      setGoals([...goals, newGoal]);
      toast.success('Goal created successfully!');
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating goal:', error);
      toast.error('Failed to create goal');
      setIsCreating(false);
    }
  };

  const handleUpdateGoal = async (goalData) => {
    setIsEditing(true);

    try {
      const updatedGoal = await updateGoal(goalData);
      setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
      toast.success('Goal updated successfully!');
      setIsEditing(false);
      setEditingGoal(null);
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Failed to update goal');
      setIsEditing(false);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(goalId);
        setGoals(goals.filter((goal) => goal.id !== goalId));
        toast.success('Goal deleted successfully!');
      } catch (error) {
        console.error('Error deleting goal:', error);
        toast.error('Failed to delete goal');
      }
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container">
          <h1 className="text-4xl font-bold">Goals</h1>
          <div className="flex justify-center items-center h-48">
            {/* Spinner component */ }
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <h1 className="text-4xl font-bold">Goals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            {isCreating ? (
              <GoalForm
                onSubmit={handleCreateGoal}
                onCancel={() => setIsCreating(false)}
              />
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="btn primary-color"
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Create Goal'}
              </button>
            )}
            {goals.length > 0 && (
              <GoalList goals={goals} onDelete={handleDeleteGoal} onEdit={setEditingGoal} />
            )}
            {goals.length === 0 && (
              <p className="text-lg mt-4">
                You haven't set any goals yet. Start setting goals to track your progress!
              </p>
            )}
          </div>
          {isEditing && (
            <div>
              <GoalForm
                goal={editingGoal}
                onSubmit={handleUpdateGoal}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}