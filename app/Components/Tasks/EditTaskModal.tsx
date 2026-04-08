/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
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

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedUserId: "",
  });

  // Update form when task changes
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        assignedUserId: task.assignedUserId || "",
      });
    }
  }, [task]); // This will run whenever task prop changes

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!task?.id) {
      toast.error("No task selected");
      return;
    }

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
      // Reset form when closing
      setForm({
        title: "",
        description: "",
        assignedUserId: "",
      });
    }
  };

  // Don't render if no task (but keep the dialog for closing animation)
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        {task ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Title"
              required
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="Description"
              rows={3}
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
        ) : (
          <div className="py-4 text-center text-gray-500">Loading task data...</div>
        )}
      </DialogContent>
    </Dialog>
  );
}