/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateTaskMutation } from "@/redux/features/task/taskApi";
import { toast } from "sonner";
import { useGetUsersQuery } from "../../../redux/features/user/userApi";

export default function EditTaskModal({ open, setOpen, task }: any) {
  const [updateTask] = useUpdateTaskMutation();
  const { data: usersData } = useGetUsersQuery(undefined);

  // Initialize form directly from task prop
  const [form, setForm] = useState(() => ({
    title: task?.title || "",
    description: task?.description || "",
    assignedUserId: task?.assignedUserId || "",
  }));

  // Reset form when task changes by re-initializing state
  // This uses the fact that React will re-mount components with different keys
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateTask({
        taskId: task.id,
        data: form,
      }).unwrap();

      toast.success("Task updated");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form when modal closes
      setForm({
        title: "",
        description: "",
        assignedUserId: "",
      });
    } else if (task) {
      // Reset form when modal opens with new task
      setForm({
        title: task.title || "",
        description: task.description || "",
        assignedUserId: task.assignedUserId || "",
      });
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Title"
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Description"
          />

          <select
            value={form.assignedUserId}
            onChange={(e) =>
              setForm({ ...form, assignedUserId: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option value="">Unassigned</option>

            {usersData?.data?.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}