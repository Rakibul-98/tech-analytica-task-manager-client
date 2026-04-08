/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useCreateTaskMutation } from "@/redux/features/task/taskApi";
import { toast } from "sonner";

export default function CreateTaskModal({ open, setOpen }: any) {
  const [createTask] = useCreateTaskMutation();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createTask(form).unwrap();
      toast.success("Task created");
      setOpen(false);
      setForm({ title: "", description: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-100">
        <h2 className="text-lg font-semibold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}