import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { getGoals, createGoal, updateGoal } from '@/lib/api/client';
import { Goal } from '@/types/goal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

interface GoalFormProps {
  goal?: Goal;
  onSubmit: (goalData: Goal) => Promise<void>;
  onCancel?: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ goal, onSubmit, onCancel }) => {
  const router = useRouter();
  const { user } = useStore();

  const [name, setName] = useState(goal?.name || '');
  const [type, setType] = useState(goal?.type || 'weight-loss');
  const [target, setTarget] = useState(goal?.target || '');
  const [deadline, setDeadline] = useState(goal?.deadline || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const goalTypes: string[] = ['weight-loss', 'muscle-gain', 'distance-running'];

  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setType(goal.type);
      setTarget(goal.target);
      setDeadline(goal.deadline);
    }
  }, [goal]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!name || !target || !deadline) {
      setErrors({
        name: !name ? 'Name is required' : '',
        target: !target ? 'Target is required' : '',
        deadline: !deadline ? 'Deadline is required' : '',
      });
      return;
    }

    setIsLoading(true);
    try {
      const goalData = {
        name,
        type,
        target,
        deadline,
      };

      await onSubmit(goalData);
      if (onCancel) {
        onCancel();
      } else {
        router.push('/goals');
      }
      toast.success('Goal saved successfully!');
    } catch (error) {
      console.error('Error saving goal:', error);
      toast.error('Failed to save goal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-bold mb-4">
        {goal ? 'Edit Goal' : 'Create Goal'}
      </h2>
      <div className="grid gap-4 mt-4">
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Select
          label="Type"
          options={goalTypes}
          value={type}
          onChange={(e) => setType(e)}
          placeholder="Select Goal Type"
        />
        <Input
          label="Target"
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          error={errors.target}
        />
        <Input
          label="Deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          error={errors.deadline}
        />
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : goal ? 'Update Goal' : 'Create Goal'}
          </Button>
        </div>
      </div>
    </form>
  );
};