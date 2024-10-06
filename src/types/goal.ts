import { GoalType } from "./goalType";

export interface Goal {
  id: string;
  name: string;
  type: GoalType;
  target: string;
  deadline: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: "in_progress" | "completed" | "canceled";
}