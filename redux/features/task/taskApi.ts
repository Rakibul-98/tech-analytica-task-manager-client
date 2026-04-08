import { baseApi } from "../../api/baseApi";
import {
  CreateTaskRequest,
  DeleteTaskResponse,
  GetAllTasksQueryParams,
  TaskResponse,
  TasksResponse,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
} from "./task.type";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<TaskResponse, CreateTaskRequest>({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    getAllTasks: builder.query<TasksResponse, GetAllTasksQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, value.toString());
            }
          });
        }
        const queryString = queryParams.toString();
        return {
          url: `/tasks${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Tasks"],
    }),

    getSingleTask: builder.query<TaskResponse, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "GET",
      }),
      providesTags: (result, error, taskId) => [{ type: "Tasks", id: taskId }],
    }),

    updateTask: builder.mutation<
      TaskResponse,
      { taskId: string; data: UpdateTaskRequest }
    >({
      query: ({ taskId, data }) => ({
        url: `/tasks/${taskId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        "Tasks",
        { type: "Tasks", id: taskId },
      ],
    }),

    updateTaskStatus: builder.mutation<
      TaskResponse,
      { taskId: string; data: UpdateTaskStatusRequest }
    >({
      query: ({ taskId, data }) => ({
        url: `/tasks/${taskId}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { taskId }) => [
        "Tasks",
        { type: "Tasks", id: taskId },
      ],
    }),

    deleteTask: builder.mutation<DeleteTaskResponse, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = tasksApi;
