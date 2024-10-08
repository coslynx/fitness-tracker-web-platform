import { UserRole } from './userRole';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  subscriptionId?: string;
  subscriptionStatus?: string;
}