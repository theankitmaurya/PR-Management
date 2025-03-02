export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: Date;
  createdAt: Date;
  assignedTo?: string;
  projectId: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DragItem {
  id: string;
  type: string;
  status: TaskStatus;
  index: number;
}
