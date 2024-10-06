import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { getGoals } from '@/lib/api/client';
import { GoalCard } from './GoalCard';
import { GoalForm } from './GoalForm';
import { Goal } from '@/types/goal';

interface GoalListProps {
  goals: Goal[];
  onDelete: (goalId: string) => void;
  onEdit: (goal: Goal | null) => void;
}

export const GoalList: React.FC<GoalListProps> = ({ goals, onDelete, onEdit }) => {
  const { user } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchGoals = async () => {
        setIsLoading(true);
        try {
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
  }, [user]);

  return (
    <div>
      {goals.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={() => onDelete(goal.id)}
              onEdit={() => onEdit(goal)}
            />
          ))}
        </ul>
      )}
      {goals.length === 0 && (
        <p className="text-lg mt-4">
          You haven't set any goals yet. Start setting goals to track your progress!
        </p>
      )}
    </div>
  );
};