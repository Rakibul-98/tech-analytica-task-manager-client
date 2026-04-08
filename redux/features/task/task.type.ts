export enum TaskStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedUserId?: string;
  assignedUser?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  assignedUserId?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  assignedUserId?: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface GetAllTasksQueryParams {
  status?: TaskStatus;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface TasksResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Task[];
}

export interface TaskResponse {
  success: boolean;
  message: string;
  data: Task;
}

export interface DeleteTaskResponse {
  success: boolean;
  message: string;
}
