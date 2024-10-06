import { useState, useEffect } from 'react';
import { ProgressData } from '@/types/progress';
import { Card } from '@/components/ui/Card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip
);

interface ProgressChartProps {
  progressData: ProgressData | null;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  progressData,
}) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (progressData) {
      const labels = progressData.workouts.map((workout) =>
        new Date(workout.date).toLocaleDateString()
      );
      const datasets = [
        {
          label: 'Weight',
          data: progressData.workouts.map((workout) => workout.weight),
          borderColor: '#007bff', // Primary blue
          backgroundColor: '#007bff', // Primary blue
        },
      ];

      setChartData({ labels, datasets });
    }
  }, [progressData]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Progress Chart</h2>
      <div className="h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Weight Progress Over Time',
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Weight (kg)',
                  font: {
                    size: 14,
                  },
                },
              },
            },
          }}
        />
      </div>
    </Card>
  );
};