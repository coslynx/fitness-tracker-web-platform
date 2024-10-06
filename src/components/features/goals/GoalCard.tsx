import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { deleteGoal } from '@/lib/api/client';
import { Goal } from '@/types/goal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { GoalForm } from './GoalForm';

interface GoalCardProps {
  goal: Goal;
  onDelete: () => void;
  onEdit: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete, onEdit }) => {
  const router = useRouter();
  const { user } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteGoal(goal.id);
      onDelete();
      toast.success('Goal deleted successfully!');
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete goal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{goal.name}</h3>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onEdit} size="sm">
            Edit
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(true)} size="sm">
            Delete
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>
          Type: <span className="font-bold">{goal.type}</span>
        </p>
        <p>
          Target: <span className="font-bold">{goal.target}</span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p>
          Deadline: <span className="font-bold">{goal.deadline}</span>
        </p>
        {/* Add progress bar or other progress indicator here */}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Delete Goal">
        <p>Are you sure you want to delete this goal?</p>
        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </Card>
  );
};